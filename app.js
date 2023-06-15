// Function to call the API asynchronously
let AllRecipes = [];
async function displayInformations() {
  const response = await fetch("recipes.json", Headers);

  if (!response.ok) {
    const message = `An error has occured: ${response.status}`;
    throw new Error(message);
  }
  const data = await response.json();
  return data;
}

// Tu as toujours ton AllRecipes qui contient toutes les recettes
const filteredRecipes = [];
// FilterdRecipes est un tableau qui va contenir une copie de AllRecipes
// Lorsque tu dois filtrer et du coup afficher sur le DOM, c'est sur FilteredRecipes que tu dois travailler

// Lorsque tu ajoutes un tag > Tu filtre et tu mets à jour filteredRecipes
// Tu peux donc à nouveau parcourir filteredRecipes pour afficher les tags mis à jour

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
                          <span>  ${
                            ingredient.unit ? ingredient.unit : ""
                          } </span>
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
        const IngredientsArray = [];
        for (const ingredient of oneRecipe.ingredients) {
          IngredientsArray.push(ingredient.ingredient);
        }
        if (
          oneRecipe.appliance === inputValue ||
          oneRecipe.ustensils.includes(inputValue) ||
          IngredientsArray.includes(inputValue)
        ) {
          updateIngredientsList(inputValue);
          updateAppliancesList(inputValue);
          updateUstensilsList(inputValue);
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
                          <span>  ${
                            ingredient.unit ? ingredient.unit : ""
                          } </span>
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
    }
  });
});

// ------------- Buttons ranges // Labels ----------------- //
const labels = document.querySelectorAll("label");
// texts of the ingredients, appliances and ustensils
// who dissapear when the user clicks on the button
const textIngredient = document.querySelector(".text__ingredient");
const textAppliance = document.querySelector(".text__appliance");
const textUstensil = document.querySelector(".text__ustensil");
// Lists of the ingredients, appliances and ustensils
// which will be displayed when the user clicks on the button
const listUstensils = document.querySelector(".listUstensils");
const listAppliances = document.querySelector(".listAppliances");
const listIngredients = document.querySelector(".listIngredients");

// Buttons of the ingredients, appliances and ustensils
// Which will display the list of ingredients, appliances and ustensils
const toolsButton = document.querySelector(".tools__button");
const devicesButton = document.querySelector(".devices__button");
const ingredientsButton = document.querySelector(".ingredient__button");
const buttons = document.querySelectorAll(".recipe__button");
//  Chevron of every button which will rotate when the user clicks on it
const redChevron = document.querySelector(".red__chevron");
const greenChevron = document.querySelector(".green__chevron");
const blueChevron = document.querySelector(".blue__chevron");

// inputs of the ingredients, appliances and ustensils
// who appear when the user clicks on the button
const ingredientsInput = document.querySelector(".ingredients__place");
const devicesInput = document.querySelector(".devices__place");
const ustensilsInput = document.querySelector(".ustensils__place");
// Using Foreach to add an event listener to each button
// When the user clicks on a button :
// The list of ingredients, appliances or ustensils will be displayed
// And the chevron will rotate
labels.forEach((label) => {
  label.addEventListener("click", () => {
    const type = label.getAttribute("data-type");
    switch (type) {
      case "listIngredients":
        listUstensils.classList.remove("display__list");
        listAppliances.classList.remove("display__list");
        toolsButton.classList.remove("toolsButtonTransition");
        redChevron.classList.remove("rotateChevron");
        devicesButton.classList.remove("toolsButtonTransition");
        greenChevron.classList.remove("rotateChevron");
        devicesInput.classList.remove("recipe__preparation");
        ustensilsInput.classList.remove("recipe__preparation");
        ingredientsInput.classList.toggle("recipe__preparation");
        ingredientsButton.classList.toggle("toolsButtonTransition");
        blueChevron.classList.toggle("rotateChevron");
        textIngredient.classList.toggle("display__text");
        if (textAppliance.classList.contains("display__text")) {
          textAppliance.classList.remove("display__text");
        } else if (textUstensil.classList.contains("display__text")) {
          textUstensil.classList.remove("display__text");
        }

        break;

      case "listAppliances":
        listUstensils.classList.remove("display__list");
        listIngredients.classList.remove("display__list");
        toolsButton.classList.remove("toolsButtonTransition");
        ingredientsButton.classList.remove("toolsButtonTransition");
        redChevron.classList.remove("rotateChevron");
        blueChevron.classList.remove("rotateChevron");
        ingredientsInput.classList.remove("recipe__preparation");
        ustensilsInput.classList.remove("recipe__preparation");
        devicesInput.classList.toggle("recipe__preparation");
        devicesButton.classList.toggle("toolsButtonTransition");
        greenChevron.classList.toggle("rotateChevron");
        textAppliance.classList.toggle("display__text");
        if (textIngredient.classList.contains("display__text")) {
          textIngredient.classList.remove("display__text");
        } else if (textUstensil.classList.contains("display__text")) {
          textUstensil.classList.remove("display__text");
        }

        break;

      case "listUstensils":
        listIngredients.classList.remove("display__list");
        listAppliances.classList.remove("display__list");
        devicesButton.classList.remove("toolsButtonTransition");
        ingredientsButton.classList.remove("toolsButtonTransition");
        greenChevron.classList.remove("rotateChevron");
        blueChevron.classList.remove("rotateChevron");
        ingredientsInput.classList.remove("recipe__preparation");
        devicesInput.classList.remove("recipe__preparation");
        ustensilsInput.classList.toggle("recipe__preparation");
        toolsButton.classList.toggle("toolsButtonTransition");
        redChevron.classList.toggle("rotateChevron");
        textUstensil.classList.toggle("display__text");
        if (textIngredient.classList.contains("display__text")) {
          textIngredient.classList.remove("display__text");
        } else if (textAppliance.classList.contains("display__text")) {
          textAppliance.classList.remove("display__text");
        }
        break;
    }
    document.querySelector(`.${type}`).classList.toggle("display__list");
  });
});

// use an empty array to store the ingredients items
let arrayConcatedIngredients = [];
// Loop through the JSON Data File to extract only the ingredients strings
displayInformations().then((data) => {
  for (let i = 0; i < data.recipes.length; i++) {
    appliancesArray = data.recipes[i].ingredients.map(
      (item) => item.ingredient
    );
    arrayConcatedIngredients = arrayConcatedIngredients.concat(appliancesArray);
  }
  // We use lowercase in every item of the array in first time ...
  function lowerCaseTheItem(arrayConcatedIngredients) {
    const arrayLowercase = [];
    arrayConcatedIngredients.forEach((ingredientsItems) => {
      const arrayIngredientsLowerCase = ingredientsItems.toLowerCase();
      arrayLowercase.push(arrayIngredientsLowerCase);
    });
    // ... and then we remove the duplicates,
    // and we sort the array alphabetically
    // finally we display the items in the list
    const arraySorted = [...new Set(arrayLowercase)];
    arraySorted.sort((a, b) => a.localeCompare(b));
    arraySorted.forEach((ingredientsItems) => {
      listIngredients.innerHTML += `<li class = "ingredientItem"> ${
        ingredientsItems.charAt(0).toUpperCase() + ingredientsItems.slice(1)
      } </li>`;
    });
  }
  lowerCaseTheItem(arrayConcatedIngredients);
});

// use an empty array to store the appliances items
let arrayConcatedAppliances = [];
// Loop through the JSON Data File to extract only the appliances strings
displayInformations().then((data) => {
  for (let i = 0; i < data.recipes.length; i++) {
    appliancesArray = data.recipes[i].appliance;
    arrayConcatedAppliances = arrayConcatedAppliances.concat(appliancesArray);
  }
  // We use lowercase in every item of the array in first time ...
  function lowerCaseTheItem(arrayConcatedAppliances) {
    const arrayLowercase = [];
    arrayConcatedAppliances.forEach((appliancesItems) => {
      const arrayApplianceLowerCase = appliancesItems.toLowerCase();
      arrayLowercase.push(arrayApplianceLowerCase);
    });
    // ... and then we remove the duplicates,
    // and we sort the array alphabetically
    // finally we display the items in the list
    const arraySorted = [...new Set(arrayLowercase)];
    arraySorted.sort((a, b) => a.localeCompare(b));
    arraySorted.forEach((appliancesItems) => {
      listAppliances.innerHTML += `<li> ${
        appliancesItems.charAt(0).toUpperCase() + appliancesItems.slice(1)
      } </li>`;
    });
  }
  lowerCaseTheItem(arrayConcatedAppliances);
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
    const arrayLowercase = [];
    arrayConcatedUstensils.forEach((ustensilsItems) => {
      const arrayUstensilLowerCase = ustensilsItems.toLowerCase();
      arrayLowercase.push(arrayUstensilLowerCase);
    });
    // ... and then we remove the duplicates,
    // and we sort the array alphabetically
    // finally we display the items in the list
    const arraySorted = [...new Set(arrayLowercase)];
    arraySorted.sort((a, b) => a.localeCompare(b));
    arraySorted.forEach((ustensilsItems) => {
      listUstensils.innerHTML += `<li> ${
        ustensilsItems.charAt(0).toUpperCase() + ustensilsItems.slice(1)
      } </li>`;
    });
  }
  lowerCaseTheItem(arrayConcatedUstensils);
});

// Searching in the input field of every label

// For Devices(or appliances) labels
devicesInput.addEventListener("input", (e) => {
  const devicesInputValue = e.target.value.toLowerCase();
  const appliancesLI = document.querySelectorAll(".listAppliances li");
  appliancesLI.forEach((item) => {
    if (item.textContent.toLowerCase().includes(devicesInputValue)) {
      item.style.display = "block";
    } else {
      item.style.display = "none";
    }
  });
});
// For Ingredients labels
ingredientsInput.addEventListener("input", (e) => {
  const ingredientsInputValue = e.target.value.toLowerCase();
  const ingredientsLI = document.querySelectorAll(".listIngredients li");
  ingredientsLI.forEach((item) => {
    if (item.textContent.toLowerCase().includes(ingredientsInputValue)) {
      item.style.display = "block";
    } else {
      item.style.display = "none";
    }
  });
});
// For Ustensils labels
ustensilsInput.addEventListener("input", (e) => {
  const ustensilsInputValue = e.target.value.toLowerCase();
  const ustensilsLI = document.querySelectorAll(".listUstensils li");
  ustensilsLI.forEach((item) => {
    if (item.textContent.toLowerCase().includes(ustensilsInputValue)) {
      item.style.display = "block";
    } else {
      item.style.display = "none";
    }
  });
});

const querySection = document.querySelector(".query__section");
const badgeSelected = document.querySelector(".badge__selected");
const badgeSelectedIngredients = document.querySelector(
  ".ingredients__selected__setup"
);
const ingredienText = document.querySelector(".ingredients__span");
// Select with the click the item in the list

function searchByIngredientsButton() {
  const ingredientsItems = document.querySelectorAll(".listIngredients li");
  // When we click on the item it creates a badge with the item name
  // at the same time the item becomes unclickable
  ingredientsItems.forEach((ingredientItem) => {
    ingredientItem.addEventListener("click", () => {
      ingredientItem.style.pointerEvents = "none";
      ingredientItem.classList.add("hide");

      // Update ingredientsItems List
      updateIngredientsList(ingredientItem.outerText); // Argument
      const ingredientSpan = ingredientItem;
      // Creation of the badge
      badgeSelected.innerHTML += `<div class="badge__selected__setup">
            <span class="ingredients__span">${ingredientSpan.textContent}</span>
            <i class="fa-regular fa-circle-xmark close__item"></i>
            </div>
            `;
      const closeItems = document.querySelectorAll(".close__item");
      const allSelectedItems = document.querySelectorAll(".selected__item");
      closeItems.forEach((closeItem) => {
        closeItem.addEventListener("click", () => {
          closeItem.parentNode.style.display = "none";
          ingredientItem.style.pointerEvents = "auto";
        });
      });
    });
  });
}
setTimeout(searchByIngredientsButton, 500);

const nestedIngredientsArray = [];
const IngredientsWithoutDuplicates = [];

function updateIngredientsList(ingredient) {
  // We erase the space at the beginning and at the end of the string
  // and we convert the string into a string
  // to make sure that the string is strictly equal to arrays items
  const ingredientStringified = ingredient.trim().toString();
  // we loopp through the JSON Data File and the nested arrays

  // A l'ajout d'un tag
  // Search in filteredRecipes > Tu mets à jour filteredRecipes

  // A la suppression d'un tag
  // Tu fais la recherches dans ton tableau original et tu mets à jour filteredRecipes
  // Tu vérifie dans nestedIngredientsArray ce qui est présent et tu effectues une nouvelles recherches

  displayInformations().then((data) => {
    for (recipe of data.recipes) {
      nestedIngredientsArray.push(
        recipe.ingredients.map((ingredient) => ingredient.ingredient)
      );
    }
    // we delete the duplicates and we sort the array alphabetically
    // finally we display the items in the HTML list
    for (let i = 0; i < nestedIngredientsArray.length; i++) {
      if (nestedIngredientsArray[i].includes(ingredientStringified)) {
        IngredientsWithoutDuplicates.push(nestedIngredientsArray[i]);
        const arrayFlattened = IngredientsWithoutDuplicates.flat();
        const newArray = [...new Set(arrayFlattened)].sort();
        listIngredients.innerHTML = "";
        for (let i = 0; i < newArray.length; i++) {
          listIngredients.innerHTML += `<li class = "ingredientItem"> ${newArray[i]} </li>`;
        }
      }
    }
  });
  updateAppliancesList(ingredient); // Argument
  updateUstensilsList(ingredient); // Argument
  updateDOM(ingredient); // Argument
}

function updateAppliancesList(ingredientSelected) {
  // we prepare an empty array to push the appliances
  // that correspond to the ingredient selected
  const arrayAppliances = [];
  // We erase the space at the beginning and at the end of the string
  // and we convert the string into a string
  // to make sure that the string is strictly equal to arrays items
  const ingredientStringified = ingredientSelected.trim().toString();

  // we loopp through the JSON Data File
  // to check if the ingredient selected is present in the recipes
  displayInformations().then((data) => {
    for (recipe of data.recipes) {
      const ArrayMapped = recipe.ingredients.map(
        (ingredient) => ingredient.ingredient
      );
      // if the ingredient selected is present in the recipes
      // we push the appliance in the empty array
      if (ArrayMapped.includes(ingredientStringified)) {
        arrayAppliances.push(recipe.appliance);
      }
      // we delete the appliances dupplicates and we sort the array alphabetically
      const appliancesWithoutDuplicates = [...new Set(arrayAppliances)].sort();
      displayAppliances(appliancesWithoutDuplicates);
    }
  });
}

// we display the appliances in the HTML list
function displayAppliances(appliancesWithoutDuplicates) {
  listAppliances.innerHTML = "";
  for (let i = 0; i < appliancesWithoutDuplicates.length; i++) {
    listAppliances.innerHTML += `<li class = "applianceItem"> ${appliancesWithoutDuplicates[i]} </li>`;
  }
}

function updateUstensilsList(ingredientSelected) {
  // we prepare an empty array to push the ustensils
  // that correspond to the ingredient selected
  const arrayUstensils = [];
  // We erase the space at the beginning and at the end of the string
  // and we convert the string into a string
  // to make sure that the string is strictly equal to arrays items
  const ingredientStringified = ingredientSelected.trim().toString();

  // we loopp through the JSON Data File
  // to check if the ingredient selected is present in the recipes
  displayInformations().then((data) => {
    for (recipe of data.recipes) {
      const ArrayMapped = recipe.ingredients.map(
        (ingredient) => ingredient.ingredient
      );
      // if the ingredient selected is present in the recipes
      // we push the ustensil in the empty array
      if (ArrayMapped.includes(ingredientStringified)) {
        arrayUstensils.push(recipe.ustensils);
      }
      // we sort the array alphabetically and flat the nested arrays
      const ustensilsflattered = arrayUstensils.sort().flat();

      // we delete the ustensils dupplicates
      const ustensilsWithoutDuplicates = [...new Set(ustensilsflattered)];
      displayUstensils(ustensilsWithoutDuplicates);
    }
  });
}

// we display the ustensils in the HTML list
function displayUstensils(ustensilsWithoutDuplicates) {
  listUstensils.innerHTML = "";
  for (let i = 0; i < ustensilsWithoutDuplicates.length; i++) {
    listUstensils.innerHTML += `<li class = "ustensilItem"> ${ustensilsWithoutDuplicates[i]} </li>`;
  }
}

function updateDOM(ingredientSelected) {
  // we prepare an empty array to push the recipes
  // that correspond to the ingredient selected
  const arrayRecipes = [];
  // We erase the space at the beginning and at the end of the string
  // and we convert the string into a string
  // to make sure that the string is strictly equal to arrays items
  const ingredientStringified = ingredientSelected.trim().toString();

  // we loopp through the JSON Data File
  // to check if the ingredient selected is present in the recipes
  displayInformations().then((data) => {
    for (recipe of data.recipes) {
      const ArrayMapped = recipe.ingredients.map(
        (ingredient) => ingredient.ingredient
      );
      // if the ingredient selected is present in the recipes
      // we push the recipe in the empty array
      if (ArrayMapped.includes(ingredientStringified)) {
        arrayRecipes.push(recipe);
      }
      // we delete the recipes dupplicates
      const recipesWithoutDuplicates = [...new Set(arrayRecipes)];
      displayRecipes(recipesWithoutDuplicates);
    }
  });
}

// we display the recipes in the HTML list
function displayRecipes(recipesWithoutDuplicates) {
  const main = document.querySelector("main");
  main.innerHTML = "";
  for (let i = 0; i < recipesWithoutDuplicates.length; i++) {
    const article = document.createElement("article");
    article.classList.add("recipe__card");
    article.innerHTML += `
    <div class = 'fake__image' > </div>
    <div class = 'recipe__body'> 

    <div class = 'recipe__header'>
    <h1 class = "recipe__title"> ${recipesWithoutDuplicates[i].name} </h1>
    <span class = "recipe__time"> <i class="fa-regular fa-clock recipe__clock"></i> ${
      recipesWithoutDuplicates[i].time
    } min </span>
</div>
<div class = "recipe__preparation">
<ul>
${recipesWithoutDuplicates[i].ingredients
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
${recipesWithoutDuplicates[i].description}
</p>
</div>
</div>
    `;
    main.appendChild(article);
  }
}
