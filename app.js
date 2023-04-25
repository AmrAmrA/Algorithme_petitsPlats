
// Function to call the API asynchronously
async function displayInformations() {
  const response = await fetch("recipes.json", Headers);
  console.log(response.body);
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
                     <span class = "ingredient__name">  ${ingredient.ingredient}  </span>   
                    <span> : ${ingredient.quantity ? ingredient.quantity : ""} </span> 
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

// Function to display ingredients items
// and sort them in alphabetical order
const emptyArray = [];
const listIngredients = document.querySelector(".listIngredients");
function displayIngredients() {
  const ingredients = document.querySelectorAll(".ingredient__name");
  ingredients.forEach((ingredient) => {
    emptyArray.push(ingredient.textContent);
  });
  function removeDuplicates(emptyArray) {
    const unique = [];
    emptyArray.forEach((ingredientItem) => {
      emptyArray.sort((a, b) => a.localeCompare(b));
      if (!unique.includes(ingredientItem)) {
       
        unique.push(ingredientItem);
        listIngredients.innerHTML += `<li> ${ingredientItem.replace(':', '')} </li>`;
      }
    });
    return unique;
  }
  removeDuplicates(emptyArray);
}
setTimeout(displayIngredients, 200);

// Creating list of appliances items
const listAppliances = document.querySelector(".listAppliances");
let arrayConcated = [];
displayInformations().then((data) => {
  for (let i = 0; i < data.recipes.length; i++) {
    appliancesArray = data.recipes[i].appliance;
    arrayConcated = arrayConcated.concat(appliancesArray);
  }
  function removeDouble(arrayConcated) {
    const unique = [];
    arrayConcated.forEach((appliancesItems) => {
      if (!unique.includes(appliancesItems)) {
        unique.push(appliancesItems);
        listAppliances.innerHTML += `<li> ${appliancesItems} </li>`;
      }
    });
    return unique;
  }
  removeDouble(arrayConcated);
});

// Creating list of ustensils items
const listUstensils = document.querySelector(".listUstensils");
let arrayConcatedUstensils = [];
displayInformations().then((data) => {
  for (let i = 0; i < data.recipes.length; i++) {
    ustensilsArray = data.recipes[i].ustensils;
    arrayConcatedUstensils = arrayConcatedUstensils.concat(ustensilsArray);
  }
  function removeDouble(arrayConcatedUstensils) {
    const unique = [];
    arrayConcatedUstensils.forEach((ustensilsItems) => {
      if (!unique.includes(ustensilsItems)) {
        unique.push(ustensilsItems);
        listUstensils.innerHTML += `<li> ${ustensilsItems} </li>`;
      }
    });
    return unique;
  }
  removeDouble(arrayConcatedUstensils);
});

// ------------------ SEARCH BAR ------------------ //
const queryInput = document.querySelector(".query__input");

// Function to search recipes by ingredients
queryInput.addEventListener("keyup", searchByIngredients);
function searchByIngredients() {
  const recipe_cards = document.querySelectorAll(".recipe__card");
  const ingredients = document.querySelectorAll(".ingredient__name");
  recipe_cards.forEach((recipe_card) => {
    if (recipe_card.textContent.includes(queryInput.value)) {
      recipe_card.style.display = "block";
    } else {
      recipe_card.style.display = "none";
    }
  });
}
searchByIngredients();

// ------------------ BUTTONS ------------------ //
const buttons = document.querySelectorAll(".button");
buttons.forEach((button) => {
  button.addEventListener("click", () => {
    const type = button.getAttribute("data-type");
    switch(type){
      case 'listIngredients':
        listUstensils.classList.remove("display__list");
        listAppliances.classList.remove("display__list");
        break;
      case 'listAppliances':
        listUstensils.classList.remove("display__list");
        listIngredients.classList.remove("display__list");
        break;
      case 'listUstensils':
        listIngredients.classList.remove("display__list");
        listAppliances.classList.remove("display__list");
        break;
    }
    document.querySelector(`.${type}`).classList.toggle("display__list");
  });
});
// const ingredientButton = document.querySelector(".ingredient__button");
// ingredientButton.addEventListener("click", () => {
//   listIngredients.classList.toggle("display__list");
//   if (listIngredients.classList.contains("display__list")) {
//     listUstensils.classList.remove("display__list");
//     listAppliances.classList.remove("display__list");
//   }
// });

// const devicesButton = document.querySelector(".devices__button");
// devicesButton.addEventListener("click", () => {
//   listAppliances.classList.toggle("display__list");
//   if (listAppliances.classList.contains("display__list")) {
//     listUstensils.classList.remove("display__list");
//     listIngredients.classList.remove("display__list");
//   }
// });

// const toolsButton = document.querySelector(".tools__button");
// toolsButton.addEventListener("click", () => {
//   listUstensils.classList.toggle("display__list");
//   if (listUstensils.classList.contains("display__list")) {
//     listAppliances.classList.remove("display__list");
//     listIngredients.classList.remove("display__list");
//   }
// });

// ------------------ Search with labels ------------------ //
const querySection = document.querySelector(".buttons__selected");
function searchByIngredientsButton() {
  const ingredientsItems = document.querySelectorAll(".listIngredients li");
  ingredientsItems.forEach((ingredientItem) => {
    ingredientItem.addEventListener("click", () => {
        ingredientSpan = ingredientItem;
        querySection.appendChild(ingredientSpan);
        ingredientSpan.classList.add("ingredients__selected__setup");
        const recipe_cards = document.querySelectorAll(".recipe__card");
        recipe_cards.forEach((recipe_card) => {
          if (recipe_card.textContent.includes(ingredientSpan.textContent)) {
            recipe_card.style.display = "block";
          } else {
            recipe_card.style.display = "none";
          }
        });
      });
    });
}
setTimeout(searchByIngredientsButton, 200);



function searchByAppliancesButton() {
  const appliancesItems = document.querySelectorAll(".listAppliances li");
  appliancesItems.forEach((appliancesItem) => {
    appliancesItem.addEventListener("click", () => {
      const applianceSpan = appliancesItem;
      querySection.appendChild(applianceSpan);
      applianceSpan.classList.add("appliance__selected__setup");
      const recipe_cards = document.querySelectorAll(".recipe__card");
      for (const recipeCard of recipe_cards) {
        if (recipeCard.firstElementChild.nextElementSibling.classList[1] == applianceSpan.outerText) {
          recipeCard.style.display = "block";
        } else {
          recipeCard.style.display = "none";
        }
      }
    });
  });
}
setTimeout(searchByAppliancesButton, 200);
 

// function searchBy
