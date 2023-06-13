// // Delete an item from the list
// async function deleteItem(index) {
//     const item = data[index];
//     const confirmation = confirm(`Êtes-vous sûr de vouloir supprimer la pizza "${item.pizza}" ?`);

//     if (confirmation) {
//         try {
//             const response = await fetch(`http://localhost:3000/pizza/${item.id}`, {
//                 method: "DELETE",
//             });

//             if (!response.ok) {
//                 throw new Error("Error deleting pizza.");
//             }

//             data.splice(index, 1);
//             renderList();
//             alert("Pizza supprimée avec succès !");
//         } catch (error) {
//             console.log("Error deleting pizza:", error);
//             alert("Erreur lors de la suppression de la pizza.");
//         }
//     }
// }
