// controller.js = brain / coordinator;

// Polyfill modern JavaScript features for older browsers (e.g., Promises, Array methods)
import "core-js/stable";

// Polyfill support for async/await syntax in environments that don’t natively support it
import "regenerator-runtime";

import * as model from "./model.js";
import recipeView from "./views/recipeView.js";

const recipeContainer = document.querySelector(".recipe");

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

// NEW API URL (instead of the one shown in the video)
// https://forkify-api.jonas.io

///////////////////////////////////////

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
    console.log(err);
  }
};

// controlRecipes();

["hashchange", "load"].forEach((ev) =>
  window.addEventListener(ev, controlRecipes),
);
