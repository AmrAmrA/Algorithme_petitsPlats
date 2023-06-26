const dataArrayOriginal = [];
const dataArray = [];
const init = async () => {
  await displayInformations();

  await fillTheDom();

  await GatherAllItems();

  await checkInputValue();
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

async function fillTheDom() {
  const main = document.querySelector("main");
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

const emptyArray = [];
let LatestArrayVersion = [];

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
  checkInputValue(LatestArrayVersion);
  for (let i = 0; i < LatestArrayVersion.length; i++) {
    LatestArrayVersion[i] = LatestArrayVersion[i].toLowerCase();
  }
}

const queryInput = document.querySelector(".query__input");

async function checkInputValue() {
  const main = document.querySelector("main");
   queryInput.addEventListener("keyup", (e) => {
    main.innerHTML = "";
    const inputValue = e.target.value;
    if (LatestArrayVersion.includes(inputValue)) {
      for (const recipe of dataArray) {
        const article = document.createElement("article");
        article.classList.add("recipe__card");
        const flatUstensils = recipe.ustensils.flat();
        let IngredientsArray = [];
        for (const ingredient of recipe.ingredients) {
          IngredientsArray.push(ingredient.ingredient);
        }
        recipe.appliance = recipe.appliance.toLowerCase();
        recipe.ustensils = flatUstensils.map((ustensil) =>
          ustensil.toLowerCase()
        );
        IngredientsArray = IngredientsArray.map((ingredient) =>
          ingredient.toLowerCase()
        );

        if (
          recipe.appliance === inputValue ||
          recipe.ustensils.includes(inputValue) ||
          IngredientsArray.includes(inputValue)
        ) {
          // updateIngredientsList(inputValue);
          // updateAppliancesList(inputValue);
          // updateUstensilsList(inputValue);
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
      }
    }
  });
}
