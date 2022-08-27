import axios from 'axios'

export function getRecipes(){
    return async function(dispatch){
        var json = await axios.get('http://localhost:3001/recipes')
        //conexion del back al front y no sé como sentirme
        
        return dispatch({
            type: 'GET_RECIPES',
            payload: json.data
        })
    }
}

export function getRecipeNames(name) {
    return async function (dispatch) {
        try {
            var json = await axios.get(`http://localhost:3001/recipes?name=${name}`)
            return dispatch ({
                type: 'GET_RECIPE_NAMES',
                payload: json.data
            })
        } catch (error) {
            console.log(error)
        }
    }
}

export function orderRecipesByName(payload){
    return {
        type: 'ORDER_BY_NAME',
        payload,
    }
}

export function orderByScore(payload){
    return {
        type: 'ORDER_BY_SCORE',
        payload,
    }
}

export function getDiets(payload) {
    return async function (dispatch) {
        var info = await axios.get("http://localhost:3001/diets")

        return dispatch({type: 'GET_DIETS', payload: info.data})
    }
}

export function postRecipe(payload) {
    return async function (dispatch) {
        const response = await axios.post('http://localhost:3001/recipes', payload)
        console.log(response)
        return response
    }
}