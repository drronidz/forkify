import {API_URL, RESULT_PER_PAGE} from "./config.js";
import {getJSON} from "./helpers.js";
import recipeView from "./views/recipeView";

export const state = {
    recipe: {},
    search: {
        query: '',
        results: [],
        resultsPerPage: RESULT_PER_PAGE,
        page: 1
    }
}

export const loadRecipe = async function (id) {
    try {
        const data = await getJSON(`${API_URL}${id}`)

        const {recipe} = data.data
        state.recipe = {
            id: recipe.id,
            title: recipe.title,
            publisher: recipe.publisher,
            sourceURL: recipe.source_url,
            imageURL: recipe.image_url,
            cookingTime: recipe.cooking_time,
            servings: recipe.servings,
            ingredients: recipe.ingredients
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