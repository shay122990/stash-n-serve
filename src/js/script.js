const form = document.querySelector(".search");
const searchInput = document.getElementById("input");
const resultsContainer = document.querySelector(".sidebar");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const inputValue = searchInput.value.toLowerCase().trim();
  console.log(inputValue);
  searchInput.value = "";
});

const displayRecipesList = function (recipes) {
  resultsContainer.innerHTML = "";

  const ul = document.createElement("ul");
  ul.classList.add("recipes-list");

  recipes.forEach((recipe) => {
    const li = document.createElement("li");
    li.classList.add("recipe-item");

    li.innerHTML = `
      <img src="${recipe.image}" alt="${recipe.name}" />
      <div class="recipe-info">
        <h3>${recipe.name}</h3>
        <span>${recipe.cuisine}</span>
      </div>
    `;

    ul.appendChild(li);
  });

  resultsContainer.appendChild(ul);
};

const getRecipes = async function () {
  try {
    const res = await fetch("https://dummyjson.com/recipes");
    const data = await res.json();
    displayRecipesList(data.recipes);
  } catch {
    console.log("error");
  }
};

getRecipes();

// todo:
// click on individual recipe -> show on content with more details
// create add recipe function
// create bookmark recipe function
//
