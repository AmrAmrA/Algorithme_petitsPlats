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
        function createRecipes() {
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
        createRecipes();
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
        createRecipes();
    }
  }});
});



// ------------- Buttons ranges // Labels ----------------- //
const labels = document.querySelectorAll("label");
// texts of the ingredients, appliances and ustensils 
// who dissapear when the user clicks on the button
const textIngredient    = document.querySelector(".text__ingredient");
const textAppliance     = document.querySelector(".text__appliance"); 
const textUstensil      = document.querySelector(".text__ustensil");
// Lists of the ingredients, appliances and ustensils
// which will be displayed when the user clicks on the button
const listUstensils     = document.querySelector(".listUstensils");
const listAppliances    = document.querySelector(".listAppliances");
const listIngredients   = document.querySelector(".listIngredients");

// Buttons of the ingredients, appliances and ustensils 
// Which will display the list of ingredients, appliances and ustensils
const toolsButton       = document.querySelector(".tools__button");
const devicesButton     = document.querySelector(".devices__button");
const ingredientsButton = document.querySelector(".ingredient__button");
const buttons           = document.querySelectorAll(".recipe__button");
//  Chevron of every button which will rotate when the user clicks on it
const redChevron        = document.querySelector(".red__chevron");
const greenChevron      = document.querySelector(".green__chevron");
const blueChevron       = document.querySelector(".blue__chevron");

// inputs of the ingredients, appliances and ustensils 
// who appear when the user clicks on the button
const ingredientsInput  = document.querySelector(".ingredients__place");
const devicesInput      = document.querySelector(".devices__place");
const ustensilsInput    = document.querySelector(".ustensils__place");
// Using Foreach to add an event listener to each button
// When the user clicks on a button : 
// The list of ingredients, appliances or ustensils will be displayed
// And the chevron will rotate
labels.forEach((label) => {
  label.addEventListener("click", () => {
    const type = label.getAttribute("data-type");
    switch(type){
      case 'listIngredients':
        listUstensils.classList.remove        ("display__list");
        listAppliances.classList.remove       ("display__list");
        toolsButton.classList.remove          ("toolsButtonTransition");
        redChevron.classList.remove           ("rotateChevron");
        devicesButton.classList.remove        ("toolsButtonTransition");
        greenChevron.classList.remove         ("rotateChevron");
        devicesInput.classList.remove         ("recipe__preparation");
        ustensilsInput.classList.remove       ("recipe__preparation");
        ingredientsInput.classList.toggle     ("recipe__preparation");
        ingredientsButton.classList.toggle    ("toolsButtonTransition");
        blueChevron.classList.toggle          ("rotateChevron");
        textIngredient.classList.toggle       ("display__text");
        if (textAppliance.classList.contains("display__text")) {
          textAppliance.classList.remove("display__text");
        } else if (textUstensil.classList.contains("display__text")) {
          textUstensil.classList.remove("display__text");
        }

        break;

        case 'listAppliances':
        listUstensils.classList.remove        ("display__list");
        listIngredients.classList.remove      ("display__list");
        toolsButton.classList.remove          ("toolsButtonTransition");
        ingredientsButton.classList.remove    ("toolsButtonTransition");
        redChevron.classList.remove           ("rotateChevron");
        blueChevron.classList.remove          ("rotateChevron");
        ingredientsInput.classList.remove     ("recipe__preparation");
        ustensilsInput.classList.remove       ("recipe__preparation");
        devicesInput.classList.toggle         ("recipe__preparation");
        devicesButton.classList.toggle        ("toolsButtonTransition");
        greenChevron.classList.toggle         ("rotateChevron");
        textAppliance.classList.toggle        ("display__text");
        if (textIngredient.classList.contains("display__text")) {
          textIngredient.classList.remove("display__text");
        }
        else if (textUstensil.classList.contains("display__text")) {
          textUstensil.classList.remove("display__text");
        }

        break;

        case 'listUstensils':
          listIngredients.classList.remove      ("display__list");
          listAppliances.classList.remove       ("display__list");
          devicesButton.classList.remove        ("toolsButtonTransition");
          ingredientsButton.classList.remove    ("toolsButtonTransition");
          greenChevron.classList.remove         ("rotateChevron");
          blueChevron.classList.remove          ("rotateChevron");
          ingredientsInput.classList.remove     ("recipe__preparation");
          devicesInput.classList.remove         ("recipe__preparation");
          ustensilsInput.classList.toggle       ("recipe__preparation");
          toolsButton.classList.toggle          ("toolsButtonTransition");
          redChevron.classList.toggle           ("rotateChevron");
          textUstensil.classList.toggle         ("display__text");
          if (textIngredient.classList.contains("display__text")) {
            textIngredient.classList.remove("display__text");
          }
          else if (textAppliance.classList.contains("display__text")) {
            textAppliance.classList.remove("display__text");
          }
        break;
    }
    document.querySelector(`.${type}`).classList.toggle("display__list");
  });
});


// Adding items in the list of ingredients, appliances and ustensils
const secondEmptyArray = [];
function displayIngredients() {
  const ingredients = document.querySelectorAll(".ingredient__name");
  ingredients.forEach((ingredient) => {
    secondEmptyArray.push(ingredient.textContent);
  });
  function removeDuplicates(secondEmptyArray) {
    const unique = [];
    secondEmptyArray.forEach((ingredientItem) => {
      secondEmptyArray.sort((a, b) => a.localeCompare(b));
      if (!unique.includes(ingredientItem)) {
       
        unique.push(ingredientItem);
        listIngredients.innerHTML += `<li> ${ingredientItem.replace(':', '')} </li>`;
      }
    });
    return unique;
  }
  removeDuplicates(secondEmptyArray);
}
setTimeout(displayIngredients, 200);

// Creating list of appliances items
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

// use an empty array to store the ustensils items
let arrayConcatedUstensils = [];
// Loop through the JSON Data File to extract only the utensil strings
displayInformations().then((data) => {
  for (let i = 0; i < data.recipes.length; i++) {
    ustensilsArray = data.recipes[i].ustensils;
    arrayConcatedUstensils = arrayConcatedUstensils.concat(ustensilsArray);
  }
  // We use lowercase in every item of the array in first time ...
  function lowerCaseTheItem(arrayConcatedUstensils) {
    const arrayLowercase = []
    arrayConcatedUstensils.forEach((ustensilsItems) => {
      const arrayUstensilLowerCase = ustensilsItems.toLowerCase();
      arrayLowercase.push(arrayUstensilLowerCase);
    });
    // ... and then we remove the duplicates, 
    // and we sort the array alphabetically
    // finally we display the items in the list 
    const nouveauTableau = [...new Set(arrayLowercase)];
    nouveauTableau.sort((a, b) => a.localeCompare(b));
    nouveauTableau.forEach((ustensilsItems) => {
    listUstensils.innerHTML += `<li> ${ustensilsItems.charAt(0).toUpperCase() + ustensilsItems.slice(1)} </li>`;
  })};
  lowerCaseTheItem(arrayConcatedUstensils);
});
