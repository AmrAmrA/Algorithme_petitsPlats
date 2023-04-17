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
        <div class = 'fake__image'> </div>
        <div class = 'recipe__body'> 
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
                     <span class = "ingredient__name">  ${
                       ingredient.ingredient
                     } : </span>   
                    <span> ${
                      ingredient.quantity ? ingredient.quantity : ""
                    } </span> 
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
const newlist = document.querySelector(".newList");
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
             
        newlist.innerHTML += `<li> ${ingredientItem} </li>`;
      }
    });
    return unique;
  }
        removeDuplicates(emptyArray);
}
setTimeout(displayIngredients, 200);




let arrayConcated = [];
displayInformations().then((data) => {
    for (let i = 0; i < data.recipes.length; i++) {
        ustensilsArray = data.recipes[i].ustensils
        ustensilsArray.sort(); 
        arrayConcated = arrayConcated.concat(ustensilsArray);
        console.log(arrayConcated);
  }});