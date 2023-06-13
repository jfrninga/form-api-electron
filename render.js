const list = document.getElementById("list");
const addButton = document.getElementById("addButton");
const popup = document.getElementById("popup");
const popupTitle = document.getElementById("popupTitle");
const popupPizzaInput = document.getElementById("pizzaInput");
const popupIngredientsInput = document.getElementById("ingredientsInput");
const popupPrixInput = document.getElementById("prixInput");
const popupSaveButton = document.getElementById("popupSaveButton");
const popupCancelButton = document.getElementById("popupCancelButton");

let data = [];
let editIndex = -1;

// Fetch data from the backend
async function fetchData() {
  try {
    const response = await fetch("http://localhost:3000/pizza");
    const jsonData = await response.json();
    data = jsonData;
    renderList();
  } catch (error) {
    console.log("Error fetching data:", error);
  }
}

// Show popup with title and button labels
function showPopup(title, saveLabel, cancelLabel) {
  popupTitle.textContent = title;
  popupPizzaInput.value = "";
  popupIngredientsInput.value = "";
  popupPrixInput.value = "";

  popupSaveButton.textContent = saveLabel;
  popupCancelButton.textContent = cancelLabel;

  popup.style.display = "flex";
  popupPizzaInput.focus();
}

// Hide popup
function hidePopup() {
  popup.style.display = "none";
}

// Add an item to the list
async function addItem(pizza, ingredients, prix) {
  const item = {
    pizza,
    ingredients,
    prix,
  };

  // Check if the pizza already exists in the data array
  const pizzaExists = data.some((existingPizza) => existingPizza.pizza === pizza);
  if (pizzaExists) {
    alert("Cette pizza existe déjà !");
    return; // Stop execution if the pizza already exists
  }

  try {
    const response = await fetch("http://localhost:3000/pizza", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-cache",
      },
      body: JSON.stringify(item),
    });

    if (!response.ok) {
      throw new Error("Error adding pizza.");
    }

    const newPizza = await response.json();
    data.push(newPizza);
    renderList();
    alert("Pizza ajoutée avec succès !");
    hidePopup();
  } catch (error) {
    console.log("Error adding pizza:", error);
    alert("Erreur lors de l'ajout de la pizza.");
  }
}

// Edit an item in the list
async function editItem(index, newPizza, newIngredients, newPrix) {
  const item = data[index];
  item.pizza = newPizza;
  item.ingredients = newIngredients;
  item.prix = newPrix;
  renderList();

  try {
    const response = await fetch(`http://localhost:3000/pizza/${item.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(item),
    });

    if (!response.ok) {
      throw new Error("Error updating pizza.");
    }

    alert("Pizza mise à jour avec succès !");
  } catch (error) {
    console.log("Error updating pizza:", error);
    alert("Erreur lors de la mise à jour de la pizza.");
  }
}

// Delete an item from the list
async function deleteItem(index) {
  const item = data[index];
  const confirmation = confirm(`Êtes-vous sûr de vouloir supprimer la pizza "${item.pizza}" ?`);

  if (confirmation) {
    try {
      const response = await fetch(`http://localhost:3000/pizza/${item.id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Error deleting pizza.");
      }

      data.splice(index, 1);
      renderList();
      alert("Pizza supprimée avec succès !");
    } catch (error) {
      console.log("Error deleting pizza:", error);
      alert("Erreur lors de la suppression de la pizza.");
    }
  }
}

// Render the list
function renderList() {
  list.innerHTML = "";

  data.forEach((item, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <span>Pizza: ${item.pizza}</span>
      <span>Ingrédients: ${item.ingredients}</span>
      <span>Prix: ${item.prix}</span>
      <button class="editButton">Éditer</button>
      <button class="deleteButton">Supprimer</button>
    `;

    const editButton = li.querySelector(".editButton");
    const deleteButton = li.querySelector(".deleteButton");

    editButton.addEventListener("click", () => {
      showPopup("Éditer la pizza", "Enregistrer", "Annuler");
      popupPizzaInput.value = item.pizza;
      popupIngredientsInput.value = item.ingredients;
      popupPrixInput.value = item.prix;
      editIndex = index;
    });

    deleteButton.addEventListener("click", () => {
      deleteItem(index);
    });

    list.appendChild(li);
  });
}

// Handle popup save button click
popupSaveButton.addEventListener("click", () => {
  const inputPizza = popupPizzaInput.value.trim();
  const inputIngredients = popupIngredientsInput.value.trim();
  const inputPrix = popupPrixInput.value.trim();

  if (inputPizza !== "" && inputIngredients !== "" && inputPrix !== "") {
    if (editIndex !== -1) {
      editItem(editIndex, inputPizza, inputIngredients, inputPrix);
      editIndex = -1;
    } else {
      addItem(inputPizza, inputIngredients, inputPrix);
    }

    hidePopup();
  }
});

// Handle popup cancel button click
popupCancelButton.addEventListener("click", () => {
  hidePopup();
});

// Handle add button click
addButton.addEventListener("click", () => {
  showPopup("Ajouter une pizza", "Ajouter", "Annuler");
  editIndex = -1; // Réinitialiser l'index d'édition
});

// Initial render
fetchData();