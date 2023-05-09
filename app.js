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
  for (recipe of data.recipes) {
      // console.log(Object.values(recipe));
      const newArray = Object.values(recipe).slice(3, 8);
      newArray.splice(2, 1);
      newArray.splice(1, 1);
      emptyArray.push(recipe.appliance);
      emptyArray.push(recipe.ustensils);

      for (const ingredients of recipe.ingredients) {
          emptyArray.push(ingredients.ingredient);
        }
      }
        
        const newArrayWithoutDuplicates = [...new Set(emptyArray)];
        const LatestArrayVersion = newArrayWithoutDuplicates.flat(); 
        console.log(LatestArrayVersion);
        queryInput.addEventListener('keyup', (e) => {
          const inputValue = e.target.value;
          if(LatestArrayVersion.includes(inputValue)) {
            console.log('yes');
          } else {
            console.log('no');
          }}); 
  });


  