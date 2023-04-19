let main = document.querySelector("main");

// Function to call the API asynchronously
async function displayInformations() {
  const response = await fetch("recipes.json");
  if (!response.ok) {
    const message = `An error has occured: ${response.status}`;
    throw new Error(message);
  }
  const data = await response.json();
  return data;
}

// Function to display the recipes with their titles, time and ingredients
displayInformations().then((data) => {
  for (let i = 0; i < data.recipes.length; i++) {
    const article = document.createElement("article");
    article.classList.add("recipe__card");
    main.appendChild(article);
    article.innerHTML = `
        <div class = 'fake__image' > </div>
        <div class = 'recipe__body   ${data.recipes[i].appliance}'> 
            <div class = 'recipe__header'>
                <h5 class = "recipe__title"> ${data.recipes[i].name} </h5>
                <h5 class = "recipe__time"> <i class="fa-regular fa-clock recipe__clock"></i> ${
                  data.recipes[i].time
                } min </h5>
            </div>
            <div class = "recipe__preparation">
             <ul>
                ${data.recipes[i].ingredients
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
             ${data.recipes[i].description}
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
    ustensilsArray = data.recipes[i].ustensils;
    arrayConcated = arrayConcated.concat(ustensilsArray);
  }
  function removeDouble(arrayConcated) {
    const unique = [];
    arrayConcated.forEach((ustensilsItems) => {
      if (!unique.includes(ustensilsItems)) {
        unique.push(ustensilsItems);
        listAppliances.innerHTML += `<li> ${ustensilsItems} </li>`;
      }
    });
    return unique;
  }
  removeDouble(arrayConcated);
});

// Creating list of ustensils items
const listUstensils = document.querySelector(".listUstensils");
let arrayConcatedAppliances = [];
displayInformations().then((data) => {
  for (let i = 0; i < data.recipes.length; i++) {
    appliancesArray = data.recipes[i].appliance;
    arrayConcatedAppliances = arrayConcatedAppliances.concat(appliancesArray);
  }
  function removeDouble(arrayConcatedAppliances) {
    const unique = [];
    arrayConcatedAppliances.forEach((appliancesItems) => {
      if (!unique.includes(appliancesItems)) {
        unique.push(appliancesItems);
        listUstensils.innerHTML += `<li> ${appliancesItems} </li>`;
      }
    });
    return unique;
  }
  removeDouble(arrayConcatedAppliances);
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
const ingredientButton = document.querySelector(".ingredient__button");
ingredientButton.addEventListener("click", () => {
  listIngredients.classList.toggle("display__list");
  if (listIngredients.classList.contains("display__list")) {
    listUstensils.classList.remove("display__list");
    listAppliances.classList.remove("display__list");
  }
});

const devicesButton = document.querySelector(".devices__button");
devicesButton.addEventListener("click", () => {
  listAppliances.classList.toggle("display__list");
  if (listAppliances.classList.contains("display__list")) {
    listUstensils.classList.remove("display__list");
    listIngredients.classList.remove("display__list");
  }
});

const toolsButton = document.querySelector(".tools__button");
toolsButton.addEventListener("click", () => {
  listUstensils.classList.toggle("display__list");
  if (listUstensils.classList.contains("display__list")) {
    listAppliances.classList.remove("display__list");
    listIngredients.classList.remove("display__list");
  }
});

// ------------------ Search with buttons ------------------ //
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
  const ustensilsItems = document.querySelectorAll(".listUstensils li");
  ustensilsItems.forEach((ustensilsItem) => {
    ustensilsItem.addEventListener("click", () => {
      const applianceSpan = ustensilsItem;
      querySection.appendChild(applianceSpan);
      applianceSpan.classList.add("ustensils__selected__setup");
      const recipe_cards = document.querySelectorAll(".recipe__card");
      recipe_cards.forEach((recipe_body) => {
        console.log(applianceSpan.textContent);
        if (recipe_body.innerHTML.includes(applianceSpan.textContent)) {

          recipe_body.style.display = "block";
        } else {
          recipe_body.style.display = "none";

        }
      });
    });
  });
}
setTimeout(searchByAppliancesButton, 200);