import {API_URL} from "./config.js";
import {getJSON} from "./helpers.js";

export const state = {
    recipe: {}
}

export const loadRecipe = async function (id) {
    try {
        const data = await getJSON(`${API_URL}/${id}`)

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
        alert(error)
    }

}