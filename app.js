// Function to call the API asynchronously
async function displayInformations() {
  const response = await fetch("recipes.json", Headers);

  if (!response.ok) {
    const message = `An error has occured: ${response.status}`;
    throw new Error(message);
  }
  const data = await response.json();
  return data;
}

// Function to display the recipes with their titles, time and ingredients
displayInformations().then((data) => {
  const main = document.querySelector("main");
  for (const recipe of data.recipes) {
    const article = document.createElement("article");
    article.classList.add("recipe__card");
    main.appendChild(article);
    article.innerHTML = `
        <div class = 'fake__image' > </div>
        <div class = 'recipe__body   ${recipe.appliance}'> 
            <div class = 'recipe__header'>
                <h1 class = "recipe__title"> ${recipe.name} </h1>
                <span class = "recipe__time"> <i class="fa-regular fa-clock recipe__clock"></i> ${
                  recipe.time
                } min </span>
            </div>
            <div class = "recipe__preparation">
             <ul>
                ${recipe.ingredients
                  .map(
                    (ingredient) =>
                      `<li>  
                     <span class = "ingredient__name">  ${
                       ingredient.ingredient
                     }  </span>   
                    <span> : ${
                      ingredient.quantity ? ingredient.quantity : ""
                    } </span> 
                    <span>  ${ingredient.unit ? ingredient.unit : ""} </span>
                    </li>`
                  )
                  .join("")}
                
             </ul>
             <p class = "recipe__ingredients">
             ${recipe.description}
             </p>
            </div>
        </div>
        `;
  }
});
const emptyArray = [];
displayInformations().then((data) => {
  for (recipe of data.recipes) {
      console.log(Object.values(recipe));
      console.log(recipe.appliance);
      console.log(recipe.ustensils);
      for (const ingredients of recipe.ingredients) {
          console.log(ingredients.ingredient);
          emptyArray.push(ingredients.ingredient);
      }
  }
        emptyArray.push(recipe.appliance);
        emptyArray.push(recipe.ustensils);
        console.log(emptyArray);
//         for (oneRecipe of data.recipes) {
//           if (oneRecipe.includes(emptyArray)) {
//             console.log("ok");
//           }
//            else {
//             console.log("no");                               
//         }
// }
});