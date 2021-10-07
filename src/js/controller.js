import * as model from './model.js'
import 'core-js/stable'
import 'regenerator-runtime/runtime'
import recipeView from "./views/recipeView.js";
import searchView from "./views/searchView.js";
import resultView from "./views/resultView.js";


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
    recipeView.renderError()
  }
}
const controlSearchResults = async function() {
  try {
    resultView.renderSpinner()

    // 1/ Get Search query
    const query = searchView.getQuery()
    if(!query) return

    // 2/ Load search results
    await model.loadSearchResults(query)

    // 3/ Render results
    resultView.render(model.getSearchResultsPage(3))
    // resultView.render(model.state.search.results)
  }
  catch (error) {
    console.log(error)
  }
}



const init = function () {
  recipeView.addHandlerRender(controlRecipe)
  searchView.addHandlerSearch(controlSearchResults)
}
init()


