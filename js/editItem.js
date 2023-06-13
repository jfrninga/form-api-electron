// // Edit an item in the list
// async function editItem(index, newPizza, newIngredients, newPrix) {
//     const item = data[index];
//     item.pizza = newPizza;
//     item.ingredients = newIngredients;
//     item.prix = newPrix;
//     renderList();

//     try {
//         const response = await fetch(`http://localhost:3000/pizza/${item.id}`, {
//             method: "PUT",
//             headers: {
//                 "Content-Type": "application/json",
//             },
//             body: JSON.stringify(item),
//         });

//         if (!response.ok) {
//             throw new Error("Error updating pizza.");
//         }

//         alert("Pizza mise à jour avec succès !");
//     } catch (error) {
//         console.log("Error updating pizza:", error);
//         alert("Erreur lors de la mise à jour de la pizza.");
//     }
// }
