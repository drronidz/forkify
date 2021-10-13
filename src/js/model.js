import {API_URL, RESULT_PER_PAGE} from "./config.js";
import {getJSON, sendJSON} from "./helpers.js";
import recipeView from "./views/recipeView";
import {KEY} from "./config";

export const state = {
    recipe: {},
    search: {
        query: '',
        results: [],
        resultsPerPage: RESULT_PER_PAGE,
        page: 1
    },
    bookmarks: []
}
const createRecipeObject = function(data) {
    const {recipe} = data.data
    return {
        id: recipe.id,
        title: recipe.title,
        publisher: recipe.publisher,
        sourceURL: recipe.source_url,
        imageURL: recipe.image_url,
        cookingTime: recipe.cooking_time,
        servings: recipe.servings,
        ingredients: recipe.ingredients,
        // conditionally add properties to an object
        // if the key property exists in the recipe object then add it as a property
        ...(recipe.key && {key: recipe.key})
    }
}
export const loadRecipe = async function (id) {
    try {
        const data = await getJSON(`${API_URL}${id}`)
        state.recipe = createRecipeObject(data)

        if(state.bookmarks.some(bookmark => bookmark.id === id)) {
            state.recipe.bookmarked = true
        }
        else {
            state.recipe.bookmarked = false
        }
        console.log('Recipe from State:', state.recipe)

    } catch (error) {
        // Temporary Error handling
        console.log(`${error}`)
        throw error
    }
}
export const loadSearchResults = async function (query) {
    try {
        const data = await getJSON(`${API_URL}?search=${query}`)
        console.log(data)
        state.search.query = query
        state.search.results = data.data.recipes.map(recipe => {
            return {
                id: recipe.id,
                title: recipe.title,
                publisher: recipe.publisher,
                imageURL: recipe.image_url
            }
        })
        state.search.page = 1
    } catch (error) {
        console.log(`${error} !!!!!`)
        throw error
    }
}

export const getSearchResultsPage = function (page = state.search.page) {
    state.search.page = page
    const start = (page - 1) * state.search.resultsPerPage
    const end = page * state.search.resultsPerPage

    return state.search.results.slice(start, end)
}

export const updateServings = function (newServings) {
    state.recipe.ingredients.forEach(ingredient => {
        ingredient.quantity = (ingredient.quantity * newServings) / state.recipe.servings
        // newQuantity = oldQuantity * newServings / oldServings // 2 * 8 / 4 = 4
    })
    state.recipe.servings = newServings
    console.log(state.recipe.servings)
}

const persistBookMARK = function () {
    localStorage.setItem('bookmarks', JSON.stringify(state.bookmarks))
}

const initBookMARK = function () {
    const bookmarkStorage = localStorage.getItem('bookmarks')

    if(bookmarkStorage) {
        state.bookmarks = JSON.parse(bookmarkStorage)
    }
}

initBookMARK()

export const addBookMARK = function (recipe) {
    // Add bookmark
    state.bookmarks.push(recipe)

    // Mark current recipe as bookmark
    if(recipe.id === state.recipe.id) {
        state.recipe.bookmarked = true
    }
    persistBookMARK()
}

export const deleteBookMARK = function (id) {
    // Delete bookmark
    const index = state.bookmarks.findIndex(element => element.id === id)
    state.bookmarks.splice(index, 1)

    // Mark current recipe as Not bookmarked
    if (id === state.recipe.id) {
        state.recipe.bookmarked = false
    }
    persistBookMARK()
}

const clearBookMARK = function () {
    localStorage.clear('bookmarks')
}

// clearBookMARK()

export const uploadRecipe = async function (newRecipe) {
    try {
        const ingredients = Object
            .entries(newRecipe)
            .filter(entry =>
                entry[0].startsWith('ingredient')
                &&
                entry[1] !== ''
            )
            .map(ingredient => {
                const ingredientArray = ingredient[1]
                    .replaceAll(' ', '')
                    .split(',')
                if(ingredientArray.length !== 3)
                    throw new Error(
                        'Wrong ingredient format! please use the correct one'
                    )

                const [quantity, unit, description] = ingredientArray

                return {quantity:quantity ? +quantity : null, unit, description}
            })
        const recipe = {
            title: newRecipe.title,
            source_url: newRecipe.sourceUrl,
            image_url: newRecipe.image,
            publisher: newRecipe.publisher,
            cooking_time: +newRecipe.cookingTime,
            servings: +newRecipe.servings,
            ingredients
        }
        console.log(recipe)
        const data = await sendJSON(`${API_URL}?key=${KEY}`, recipe)
        state.recipe = createRecipeObject(data)
        addBookMARK(state.recipe)
    }
    catch (error) {
        throw error
    }

}

