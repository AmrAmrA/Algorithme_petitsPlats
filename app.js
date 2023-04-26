
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
        <div class = 'recipe__body   ${recipe.appliance.toLowerCase()}'> 
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
displayInformations().then((data) => {
  for (let i = 0; i < data.recipes.length; i++) {
    for (let j = 0; j < data.recipes[i].ingredients.length; j++) {
      emptyArray.push(data.recipes[i].ingredients[j].ingredient);
    }
  }
  // lowercase all the ingredients inside the array 
  const lowerCaseArray = emptyArray.map((ingredient) => ingredient.toLowerCase());
  const sortedArray = lowerCaseArray.sort();
  let uniqueArray = [...new Set(sortedArray)];
  const listIngredients = document.querySelector(".listIngredients");
  uniqueArray.forEach((ingredient) => {
    listIngredients.innerHTML += `<li> ${ingredient} </li>`;
  });
});

const listIngredients = document.querySelector(".listIngredients");
   

// Creating list of appliances items
const listAppliances = document.querySelector(".listAppliances");
const emptyAppliancesArray = [];
displayInformations().then((data) => {
  for (const recipe of data.recipes) {
    emptyAppliancesArray.push(recipe.appliance);
  }
  const lowercaseAppliancesArray = emptyAppliancesArray.map((appliance) => appliance.toLowerCase());
  const sortedAppliancesArray = lowercaseAppliancesArray.sort(
    function(a,b) {
      return a.localeCompare(b);
    }
  );
  let uniqueAppliancesArray = [...new Set(sortedAppliancesArray)];
  uniqueAppliancesArray.forEach((appliance) => {
    listAppliances.innerHTML += `<li> ${appliance} </li>`;
  })
});


// Creating list of ustensils items
const listUstensils = document.querySelector(".listUstensils");
const emptyUstensilsArray = [];
displayInformations().then((data) => {
  for (const recipe of data.recipes) {
    for (const ustensil of recipe.ustensils) {
      emptyUstensilsArray.push(ustensil)
    }
  }
  const lowercaseUstensilsArray = emptyUstensilsArray.map((ustensil) => ustensil.toLowerCase());
  const sortedUstensilsArray = lowercaseUstensilsArray.sort(
    function(a,b) {
      return a.localeCompare(b);
    }
  );
  let uniqueUstensilsArray = [...new Set(sortedUstensilsArray)];
  uniqueUstensilsArray.forEach((ustensil) => {
    listUstensils.innerHTML += `<li> ${ustensil} </li>`;
  })
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
        console.log(ingredientItem);
        recipe_cards.forEach((recipe_card) => {
          if (recipe_card.textContent.toLocaleLowerCase().includes(ingredientItem.outerText)) {
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
    appliancesItem.addEventListener("click", (e) => {
      e.preventDefault();
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
