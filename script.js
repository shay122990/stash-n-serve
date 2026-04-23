const form = document.querySelector(".search");
const searchInput = document.getElementById("input");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const inputValue = searchInput.value.toLowerCase().trim();
  console.log(inputValue);
});

const getRecipes = async function () {
  try {
    const res = await fetch("https://dummyjson.com/recipes");
    const data = await res.json();
    console.log(data.recipes);
  } catch {
    console.log("error");
  }
};

getRecipes();
