import * as model from './model.js'


import 'core-js/stable'
import 'regenerator-runtime/runtime'
import recipeView from "./views/recipeView";


const recipeContainer = document.querySelector('.recipe');



// https://forkify-api.herokuapp.com/v2


///////////////////////////////////////
const controlRecipe = async function () {
  try {
    const id = window.location.hash.slice(1)

    // Loading a spinner
    recipeView.renderSpinner()

    // 1) Loading recipe
    await model.loadRecipe(id)

    // 2) Rendering recipe
    recipeView.render(model.state.recipe)

  }
  catch (error) {
    console.log(error)
    recipeView.renderError()
  }
}

const init = function () {
  recipeView.addHandlerRender(controlRecipe)
}
init()


