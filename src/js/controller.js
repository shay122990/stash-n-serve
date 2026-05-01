// controller.js = brain / coordinator;

import "core-js/stable"; // Polyfill modern JavaScript features for older browsers (e.g., Promises, Array methods)
import "regenerator-runtime"; // Polyfill support for async/await syntax in environments that don’t natively support it

import * as model from "./model.js";
import recipeView from "./views/recipeView.js";

const recipeContainer = document.querySelector(".recipe");

const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);
    console.log(id); // ex #5ed6604591c37cdc054bc886
    if (!id) return;

    recipeView.renderSpinner();

    //1 loading recipe
    await model.loadRecipe(id);

    const { recipe } = model.state;

    //2 rendering recipe

    recipeView.render(model.state.recipe);

    console.log(recipe);
  } catch (err) {
    recipeView.renderError();
  }
};

const init = function () {
  recipeView.addHandlerRender(controlRecipes);
};
init();
