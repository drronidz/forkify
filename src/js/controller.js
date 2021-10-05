const recipeContainer = document.querySelector('.recipe');

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////
const showRecipe = async function () {
  try {
    const response = await fetch(
        'https://forkify-api.herokuapp.com/api/v2/recipes/5ed6604591c37cdc054bc886')
    const data = await response.json()

    if(!response.ok) throw new Error(`${data.message} (${response.status})`)
    console.log(response, data)

    let {recipe} = data.data
    recipe = {
      id: recipe.id,
      title: recipe.title,
      publisher: recipe.publisher,
      sourceURL: recipe.source_url,
      imageURL: recipe.image_url,
      cookingTime: recipe.cooking_time,
      servings: recipe.servings,
      ingredients: recipe.ingredients
    }
    console.log('Recipe is :',recipe)
  }
  catch (error) {
    alert(error)
  }
}

showRecipe()


