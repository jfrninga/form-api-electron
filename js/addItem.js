// // Add an item to the list
// async function addItem(pizza, ingredients, prix) {
//     const item = {
//         pizza,
//         ingredients,
//         prix,
//     };

//     try {
//         const response = await fetch("http://localhost:3000/pizza", {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json",
//             },
//             body: JSON.stringify(item),
//         });

//         if (!response.ok) {
//             throw new Error("Error adding pizza.");
//         }

//         const newPizza = await response.json();
//         data.push(newPizza);
//         renderList();
//         alert("Pizza ajoutée avec succès !");
//         hidePopup();
//     } catch (error) {
//         console.log("Error adding pizza:", error);
//         alert("Erreur lors de l'ajout de la pizza.");
//     }
// }
