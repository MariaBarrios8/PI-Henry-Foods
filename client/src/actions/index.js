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

export function OrderRecipesByName(payload){
    return {
        type: 'ORDER_BY_NAME',
        payload,
    }
}