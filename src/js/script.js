import "core-js/stable";
import "regenerator-runtime";

const form = document.querySelector(".search");
const searchInput = document.querySelector(".search__field");
const resultsContainer = document.querySelector(".search-results");
const contentContainer = document.querySelector(".recipe");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const inputValue = searchInput.value.toLowerCase().trim();
  getRecipes(inputValue);
  searchInput.value = "";
});

const displayRecipesList = function (recipes) {
  resultsContainer.innerHTML = "";

  const ul = document.createElement("ul");
  ul.classList.add("results");

  recipes.forEach((recipe) => {
    const li = document.createElement("li");
    li.classList.add("preview");

    li.innerHTML = `
      <img src="${recipe.image}" alt="${recipe.title}" class="preview__img" />
        <div class="preview__data">
        <h3 class="preview__title">${recipe.title}</h3>
        <span class="preview__publisher">${recipe.publisher}</span>
      </div>
    `;

    ul.appendChild(li);
  });

  resultsContainer.appendChild(ul);
};

const displayRecipe = function (recipe) {
  contentContainer.innerHTML = "";

  const markup = `
    <figure class="recipe__fig">
      <img src="${recipe.image}" alt="${recipe.title}" class="recipe__img" />
      <h1 class="recipe__title">
        <span>${recipe.title}</span>
      </h1>
    </figure>
  `;

  contentContainer.insertAdjacentHTML("beforeend", markup);
};

const getRecipes = async function () {
  try {
    const res = await fetch(
      // 'https://forkify-api.jonas.io/api/v2/recipes/5ed6604591c37cdc054bc886',
      "https://forkify-api.jonas.io/api/v2/recipes/664c8f193e7aa067e94e8433",
    );

    const data = await res.json();

    if (!res.ok) throw new Error(`${data.message} (${res.status})`);
    console.log(res, data);

    let { recipe } = data.data;

    recipe = {
      id: recipe.id,
      title: recipe.title,
      publisher: recipe.publisher,
      sourceUrl: recipe.source_url,
      image: recipe.image_url,
      servings: recipe.servings,
      cookingTime: recipe.cooking_time,
      ingredients: recipe.ingredients,
    };
    displayRecipe(recipe);
    console.log(recipe);
  } catch (err) {
    console.log(err);
  }
};

getRecipes();

// getRecipes();

// todo:
// click on individual recipe -> show on content with more details
// create add recipe function
// create bookmark recipe function
//
