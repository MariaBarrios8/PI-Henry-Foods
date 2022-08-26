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

export function getRecipeNames(payload) {
    return async function (dispatch) {
        try {
            let json = await axios.get("http://localhost:3001/recipes?=" + payload)
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

//export function filterByScore()