import * as model from './model.js'
import 'core-js/stable'
import 'regenerator-runtime/runtime'
import recipeView from "./views/recipeView.js";
import searchView from "./views/searchView.js";
import resultView from "./views/resultView.js";
import paginationView from "./views/paginationView.js";
import bookmarkView from  "./views/bookmarkView";
import addRecipeView from "./views/addRecipeView";
import {MODAL_CLOSE_DURATION} from "./config";


const controlRecipe = async function () {
  try {
    const id = window.location.hash.slice(1)

    // Loading a spinner
    if(!id) return
    recipeView.renderSpinner()

    // 0) Update results view to mark selected search result
    resultView.update(model.getSearchResultsPage())
    bookmarkView.update(model.state.bookmarks)

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

const controlServings = function (newServings) {

  // Update the recipe servings (in state)
  model.updateServings(newServings)

  // Update the recipe view
  // recipeView.render(model.state.recipe)
  recipeView.update(model.state.recipe)
}

const controlAddBookMark = function () {
  // 1) ADD/REMOVE a bookmark
  if (!model.state.recipe.bookmarked) {model.addBookMARK(model.state.recipe)}
  else { model.deleteBookMARK(model.state.recipe.id)}

  // 2) Update recipe view
  recipeView.update(model.state.recipe)

  // 3) Render bookmarks
  bookmarkView.render(model.state.bookmarks)
}

const controlInitializeBookMark = function () {
    bookmarkView.render(model.state.bookmarks)
}

const controlAddRecipe = async function (newRecipe) {
  try {
    // Show loading spinner
    addRecipeView.renderSpinner()

    // Upload the new recipe data
    await model.uploadRecipe(newRecipe)
    console.log(model.state.recipe)

    // Render recipe
    recipeView.render(model.state.recipe)

    // Success message
    addRecipeView.renderMessage()

    // Close form window
    setTimeout(function () {
      addRecipeView.toggleWindow()
    }, MODAL_CLOSE_DURATION)
  } catch (error) {
    console.log('***', error)
    addRecipeView.renderError(error.message)
  }
}

const init = function () {
  bookmarkView.addHandlerRender(controlInitializeBookMark)
  recipeView.addHandlerRender(controlRecipe)
  recipeView.addHandlerUpdateServings(controlServings)
  recipeView.addHandlerAddBookMark(controlAddBookMark)
  searchView.addHandlerSearch(controlSearchResults)
  paginationView.addHandlerClick(controlPagination)
  addRecipeView.addHandlerUpload(controlAddRecipe)
}
init()


