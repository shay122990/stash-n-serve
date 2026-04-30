// model.js = data layer / API + state
// Provides support for async/await by converting them into generator-based code for older browsers that don’t natively understand async/await.
import { async } from "regenerator-runtime";

export const state = {
  recipe: {},
};

export const loadRecipe = async function (id) {
  try {
    const res = await fetch(
      `https://forkify-api.jonas.io/api/v2/recipes/${id}`,
      // 'https://forkify-api.jonas.io/api/v2/recipes/664c8f193e7aa067e94e8433',
    );

    const data = await res.json();

    if (!res.ok) throw new Error(`${data.message} (${res.status})`);
    console.log(res, data);

    const { recipe } = data.data;

    state.recipe = {
      id: recipe.id,
      title: recipe.title,
      publisher: recipe.publisher,
      sourceUrl: recipe.source_url,
      image: recipe.image_url,
      servings: recipe.servings,
      cookingTime: recipe.cooking_time,
      ingredients: recipe.ingredients,
    };

    console.log(state.recipe);
  } catch (err) {
    console.log(err);
  }
};
