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
function addItem(pizza, ingredients, prix) {
  const item = {
    pizza,
    ingredients,
    prix,
    id: Date.now(),
  };

  data.push(item);
  renderList();
}

// Edit an item in the list
function editItem(index, newPizza, newIngredients, newPrix) {
  data[index].pizza = newPizza;
  data[index].ingredients = newIngredients;
  data[index].prix = newPrix;
  renderList();
}

// Delete an item from the list
function deleteItem(index) {
  const pizzaName = data[index].pizza;
  const confirmation = confirm(
    `Êtes-vous sûr de vouloir supprimer la pizza "${pizzaName}" ?`
  );
  if (confirmation) {
    data.splice(index, 1);
    renderList();
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
      showPopup("Éditer l'élément", "Enregistrer", "Annuler");
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
  showPopup("Ajouter un élément", "Ajouter", "Annuler");
  editIndex = -1; // Réinitialiser l'index d'édition
});

// Initial render
renderList();