
const initialState = {
    recipes: [],
    allRecipes: [],
    diets: []
} 

function rootReducer (state = initialState, action){
    switch(action.type) {
        case 'GET_RECIPES':
            return {
                ...state, 
                recipes: action.payload,
                allRecipes: action.payload
            }
        case 'ORDER_BY_NAME':
            const recipesOrder = 
            action.payload === 'asc' 
            ? state.recipes.sort(function (a, b) {
                if (a.name > b.name) {
                    return 1;
                }
                if (b.name > a.name) {
                    return -1
                }
                return 0;
            })
          : state.recipes.sort(function (a, b) {
              if (a.name > b.name) {
                return -1;
              }
              if (a.name > b.name) {
                return -1;
              }
              if (b.name > a.name) {
                return 1;
              }
              return 0;
            });
        return {
            ...state,
            recipes: recipesOrder
        }
        case 'GET_RECIPE_NAMES': 
        return {
            ...state,
            recipes: action.payload
        }
        case 'ORDER_BY_SCORE':
            let scoreOrder = [...state.recipes];
            if (action.payload === 'high') {
                scoreOrder.sort((a, b) => {
                    return parseInt(a.healthScore) - parseInt(b.healthScore)
                })
            } 
            if (action.payload === 'low') {
                scoreOrder.sort((a, b) => {
                    return parseInt(b.healthScore) - parseInt(a.healthScore)
                })
            }
            return {
                ...state,
                recipes: scoreOrder
            }
        case 'GET_DIETS':
            return {
                ...state,
                diets: action.payload
            }
        case 'POST_RECIPE':
            return {
                ...state,
            }
        default:
        return state
    }
}

export default rootReducer