let main = document.querySelector("main");

async function displayInformations() {
  const response = await fetch("recipes.json");
  if (!response.ok) {
    const message = `An error has occured: ${response.status}`;
    throw new Error(message);
  }
  const data = await response.json();
  return data;
}

displayInformations().then((data) => {
  console.log(data.recipes);
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
const emptyArray = [];
const newlist = document.querySelector(".newList");



function displayIngredients() {
    const ingredients = document.querySelectorAll(".ingredient__name");
    ingredients.forEach((ingredient) => {
        emptyArray.push(ingredient.textContent);
        function removeDuplicates(emptyArray) {
           const uniqueArray = [];
              emptyArray.forEach((ingredientItem) => {
                if (!uniqueArray.includes(ingredientItem)) {
                    uniqueArray.push(ingredientItem);
                    console.log(uniqueArray);
                    newlist.innerHTML = `
                    <li> ${uniqueArray} </li>
                    `;
                }
            })
        }
        console.log(removeDuplicates(emptyArray));

    // const newItem = document.createElement("li");
    // newItem.textContent = ingredient.textContent;
  });
}
setTimeout(displayIngredients, 200);
