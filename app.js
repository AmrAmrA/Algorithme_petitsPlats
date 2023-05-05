
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
  for (const recipe of data.recipes) {
    for (const ingredient of recipe.ingredients) {
      emptyArray.push(ingredient.ingredient);
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
  const queryValue = queryInput.value.toLowerCase();
  if (queryValue.length >= 3) {
    recipe_cards.forEach((recipe_card) => {
      if (recipe_card.textContent.includes(queryInput.value)) {
        recipe_card.textContent.toLowerCase();
        recipe_card.style.display = "block";
        console.log(recipe_card.textContent);
      } else {
        recipe_card.style.display = "none";
      }
    })
  }
  else {
    console.log("error");
    console.log(queryInput.value.length);

  }
}

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
let arrayCreated = [];
const querySection = document.querySelector(".buttons__selected");




function searchByIngredientsButton() {
  const ingredientsItems = document.querySelectorAll(".listIngredients li");
  ingredientsItems.forEach((ingredientItem) => {
    ingredientItem.addEventListener("click", () => {
        const ingredientSpan = ingredientItem;
        querySection.appendChild(ingredientSpan);
        ingredientSpan.classList.add("ingredients__selected__setup");
      });
    })};
  setTimeout(searchByIngredientsButton, 500);

  const recipe_cards = document.querySelectorAll(".recipe__card");
      function displayRecipes() {
        if (searchByIngredientsButton) {
          recipe_cards.forEach((recipe_card) => {
            if (recipe_card.textContent.toLocaleLowerCase()
            .includes(ingredientItem.outerText)) {
              recipe_card.style.display = "block";
            } else {
              recipe_card.style.display = "none";
            }

      })};
      }
      setTimeout(displayRecipes, 500);

      //              for(let i = 0; i < elements.length; i++) {
        // arrayCreated.push(elements[i].childNodes[1].innerText.toLocaleLowerCase());
      // }
      // let uniqueArray = [...new Set(arrayCreated)];
      // uniqueArray.sort();
      // console.log(uniqueArray);
      //        let elements = recipe_card.children[1].lastElementChild.children[0].children;
      // console.log(elements);



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
setTimeout(searchByAppliancesButton, 500);
 

// function searchBy
