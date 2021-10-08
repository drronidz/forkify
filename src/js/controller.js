import * as model from './model.js'
import 'core-js/stable'
import 'regenerator-runtime/runtime'
import recipeView from "./views/recipeView.js";
import searchView from "./views/searchView.js";
import resultView from "./views/resultView.js";
import paginationView from "./views/paginationView.js";


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

    // 1) Get Search query
    const query = searchView.getQuery()
    if(!query) return

    // 2) Load search results
    await model.loadSearchResults(query)

    // 3) Render results
    resultView.render(model.getSearchResultsPage(1))
    // resultView.render(model.state.search.results)

    // 4) Render Initial pagination buttons
    paginationView.render(model.state.search)
  }
  catch (error) {
    console.log(error)
  }
}

const controlPagination = function (goToPage) {
  console.log('Pagination controller', goToPage)

  // 1) Render results
  resultView.render(model.getSearchResultsPage(goToPage))

  // 2) Render Initial pagination buttons
  paginationView.render(model.state.search)
}

const init = function () {
  recipeView.addHandlerRender(controlRecipe)
  searchView.addHandlerSearch(controlSearchResults)
  paginationView.addHandlerClick(controlPagination)
}
init()


