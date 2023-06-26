const dataArrayOriginal = [];
const dataArray = [];
const init = async () => {
  await displayInformations();

  await fillTheDom();

  await GatherAllItems();

  await updateTheDom();

  await checkTheValue();
};
init();

// Function to call the API asynchronously
async function displayInformations() {
  const response = await fetch("recipes.json", Headers);

  if (!response.ok) {
    const message = `An error has occured: ${response.status}`;
    throw new Error(message);
  }
  const data = await response.json();
  data.recipes.forEach((el) => {
    dataArrayOriginal.push(el);
    dataArray.push(el);
  });

  //   dataArray
  return data;
}

// async function to fill the dom 
// with the data from the API (but called since the DataArray for a question of performance)
async function fillTheDom() {
  const main = document.querySelector("main");
  //  We loop through the array of objects
  // to display every recipe inside an HTML Article element
  for (const recipe of dataArray) {
    const article = document.createElement("article");
    article.classList.add("recipe__card");
    main.appendChild(article);
    article.innerHTML = `
                <div class = 'fake__image' > </div>
                <div class = 'recipe__body'> 
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
                                } </span>   
                                <span> : ${
                                  ingredient.quantity ? ingredient.quantity : ""
                                } </span> 
                                <span>  ${
                                  ingredient.unit ? ingredient.unit : ""
                                } </span>
                            </li>`
                          )
                          .join("")}
                     </ul>
                     <p class = "recipe__ingredients">${recipe.description}</p>
                    </div>
                </div>
                `;
  }
}

const emptyArray        = [];
let LatestArrayVersion  = [];
// We gather all the items (ingredients, appliances and ustensils) in one array
// to be able to filter them later
// and check if the input value is included in the array
async function GatherAllItems() {
  for (const recipe of dataArray) {
    emptyArray.push(recipe.appliance);
    emptyArray.push(recipe.ustensils);
    for (const ingredients of recipe.ingredients) {
      emptyArray.push(ingredients.ingredient);
    }
  }
  // Second step: remove the duplicates from the array
  // and use flat method to remove the nested arrays
  const newArrayWithoutDuplicates = [...new Set(emptyArray)];
  LatestArrayVersion = newArrayWithoutDuplicates.flat();
  updateTheDom(LatestArrayVersion);
  for (let i = 0; i < LatestArrayVersion.length; i++) {
    LatestArrayVersion[i] = LatestArrayVersion[i].toLowerCase();
  }
}


let IngredientsArray  = [];
let recipeAppliances  = [];
let recipeUstensils   = [];
async function checkTheValue() {
      for (const recipe of dataArray) {
        const flatUstensils = recipe.ustensils.flat();
        for (const ingredient of recipe.ingredients) {
          IngredientsArray.push(ingredient.ingredient);
        }
        recipe.appliance = recipe.appliance.toLowerCase();
        recipeAppliances.push(recipe.appliance);
        recipe.ustensils = flatUstensils.flat().map((ustensil) => ustensil.toLowerCase());
        recipeUstensils.push(recipe.ustensils);
        recipeUstensils = recipeUstensils.flat();
        IngredientsArray = IngredientsArray.map((ingredient) => ingredient.toLowerCase());
      }
}

const queryInput  = document.querySelector(".query__input");
const main        = document.querySelector("main");
async function updateTheDom() {
  queryInput.addEventListener("keyup", (e) => {
      const inputValue = queryInput.value.toLowerCase();
      if(inputValue.length > 3 && LatestArrayVersion.includes(inputValue)) {
        console.log("yes");
        // console.log(IngredientsArray, recipeAppliances, recipeUstensils);
        IngredientsArray.includes(inputValue) ? console.log("yes") : console.log("no");
        console.log(recipeUstensils);
        console.log(recipeAppliances);
      }
      else {
        console.log("no");
      }
    })
}


// const queryInput = document.querySelector(".query__input");
// const emptyArray = [];
// displayInformations().then((data) => {
//   // First step: create an array with all the ingredients, appliances and ustensils
//   for (recipe of data.recipes) {
//     emptyArray.push(recipe.appliance);
//     emptyArray.push(recipe.ustensils);

//     for (const ingredients of recipe.ingredients) {
//       emptyArray.push(ingredients.ingredient);
//     }
//   }
//   // Second step: remove the duplicates from the array
//   // and use flat method to remove the nested arrays
//   const newArrayWithoutDuplicates = [...new Set(emptyArray)];
//   const LatestArrayVersion = newArrayWithoutDuplicates.flat();

//   // The user types in the input and the recipes are filtered
//   // if the value matches with the ingredients, appliances or ustensils
//   // we will display some recipes if not, we will display all the recipes
//   const main = document.querySelector("main");
//   queryInput.addEventListener("keyup", (e) => {
//     main.innerHTML = "";
//     const inputValue = e.target.value;
//     if (LatestArrayVersion.includes(inputValue)) {
//       for (oneRecipe of data.recipes) {
//         const article = document.createElement("article");
//         article.classList.add("recipe__card");
//         const flatUstensils = oneRecipe.ustensils.flat();
//         const IngredientsArray = [];
//         for (const ingredient of oneRecipe.ingredients) {
//           IngredientsArray.push(ingredient.ingredient);
//         }
//         if (
//           oneRecipe.appliance === inputValue ||
//           oneRecipe.ustensils.includes(inputValue) ||
//           IngredientsArray.includes(inputValue)
//         ) {
//           updateIngredientsList(inputValue);
//           updateAppliancesList(inputValue);
//           updateUstensilsList(inputValue);
//           main.appendChild(article);
//           article.innerHTML = `
//         <div class = 'fake__image' > </div>
//         <div class = 'recipe__body   ${oneRecipe.appliance}'> 
//             <div class = 'recipe__header'>
//                 <h1 class = "recipe__title"> ${oneRecipe.name} </h1>
//                 <span class = "recipe__time"> <i class="fa-regular fa-clock recipe__clock"></i> ${
//                   oneRecipe.time
//                 } min </span>
//             </div>
//             <div class = "recipe__preparation">
//              <ul>
//                 ${oneRecipe.ingredients
//                   .map(
//                     (ingredient) =>
//                       `<li>  
//                      <span class = "ingredient__name">  ${
//                        ingredient.ingredient
//                      }  </span>   
//                     <span> : ${
//                       ingredient.quantity ? ingredient.quantity : ""
//                     } </span> 
//                     <span>  ${ingredient.unit ? ingredient.unit : ""} </span>
//                     </li>`
//                   )
//                   .join("")}
                
//              </ul>
//              <p class = "recipe__ingredients">
//              ${oneRecipe.description}
//              </p>
//             </div>
//         </div>
//         `;
//         }
//       }
//     } else {
//       const listIngredients = document.querySelector(".listIngredients");
//       listIngredients.innerHTML = "";
//       const listAppliances = document.querySelector(".listAppliances");
//       listAppliances.innerHTML = "";
//       const listUstensils = document.querySelector(".listUstensils");
//       listUstensils.innerHTML = "";
//       fillIngredientsList();
//       fillAppliancesList();
//       fillUstensilsList();
//       for (const recipe of data.recipes) {
//         function createRecipes() {
//           const article = document.createElement("article");
//           article.classList.add("recipe__card");
//           main.appendChild(article);
//           article.innerHTML = `
//               <div class = 'fake__image' > </div>
//               <div class = 'recipe__body   ${recipe.appliance}'> 
//                   <div class = 'recipe__header'>
//                       <h1 class = "recipe__title"> ${recipe.name} </h1>
//                       <span class = "recipe__time"> <i class="fa-regular fa-clock recipe__clock"></i> ${
//                         recipe.time
//                       } min </span>
//                   </div>
//                   <div class = "recipe__preparation">
//                    <ul>
//                       ${recipe.ingredients
//                         .map(
//                           (ingredient) =>
//                             `<li>  
//                            <span class = "ingredient__name">  ${
//                              ingredient.ingredient
//                            }  </span>   
//                           <span> : ${
//                             ingredient.quantity ? ingredient.quantity : ""
//                           } </span> 
//                           <span>  ${
//                             ingredient.unit ? ingredient.unit : ""
//                           } </span>
//                           </li>`
//                         )
//                         .join("")}
                      
//                    </ul>
//                    <p class = "recipe__ingredients">
//                    ${recipe.description}
//                    </p>
//                   </div>
//               </div>
//               `;
//         }
//         createRecipes();
//       }
//     }
//   });
// });