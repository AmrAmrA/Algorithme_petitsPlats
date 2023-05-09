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

const queryInput = document.querySelector(".query__input");
const emptyArray = [];
displayInformations().then((data) => {
  // First step: create an array with all the ingredients, appliances and ustensils
  for (recipe of data.recipes) {
    emptyArray.push(recipe.appliance);
    emptyArray.push(recipe.ustensils);

    for (const ingredients of recipe.ingredients) {
      emptyArray.push(ingredients.ingredient);
    }
  }
  // Second step: remove the duplicates from the array 
  // and use flat method to remove the nested arrays
  const newArrayWithoutDuplicates = [...new Set(emptyArray)];
  const LatestArrayVersion = newArrayWithoutDuplicates.flat();
  
  
  
  
  
  // The user types in the input and the recipes are filtered
  // if the value matches with the ingredients, appliances or ustensils
  // we will display some recipes if not, we will display all the recipes
  const main = document.querySelector("main");
  queryInput.addEventListener("keyup", (e) => {
    main.innerHTML = "";
    const inputValue = e.target.value;
    if (LatestArrayVersion.includes(inputValue)) {
      for (oneRecipe of data.recipes) {
        const article = document.createElement("article");
        article.classList.add("recipe__card");
        const flatUstensils = oneRecipe.ustensils.flat();
        const IngredientsArray = []
         for (const ingredient of oneRecipe.ingredients) {
          IngredientsArray.push(ingredient.ingredient);
         }
         console.log(oneRecipe.ustensils);
        if (
          oneRecipe.appliance === inputValue ||
          oneRecipe.ustensils.includes(inputValue) ||
          IngredientsArray.includes(inputValue)
        ) {
          main.appendChild(article);
          article.innerHTML = `
        <div class = 'fake__image' > </div>
        <div class = 'recipe__body   ${oneRecipe.appliance}'> 
            <div class = 'recipe__header'>
                <h1 class = "recipe__title"> ${oneRecipe.name} </h1>
                <span class = "recipe__time"> <i class="fa-regular fa-clock recipe__clock"></i> ${
                  oneRecipe.time
                } min </span>
            </div>
            <div class = "recipe__preparation">
             <ul>
                ${oneRecipe.ingredients
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
             ${oneRecipe.description}
             </p>
            </div>
        </div>
        `;
        }
      }
    } else {
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
  }});
});
