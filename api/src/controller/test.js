const { API_KEY } = process.env;
const axios = require("axios");
const { Recipe, Type } = require("../db");

const getApiInfo = async () => {
  const apiUrl = await axios.get(
    `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=10`
  ); //en realidad son 100

  const dataRecipes = await url.data.results.map((e) => {
    return {
      id: e.id,
      name: e.title,
      image: e.image,
      dietType: e.diets,
      healtScore: e.healtScore,
      steps: receta.analyzedInstructions[0]?.steps.map((pasos) => {
        return {
          number: pasos.number,
          step: pasos.step,
        };
      }),
    };
  });
  console.log('fase 1')
  return dataRecipes;
};

const getDbInfo = async () => {
  return await Recipe.findAll({
    include: {
      model: Type,
      attributes: ["name"],
      through: {
        attributes: [],
      },
    },
  });
};

const getApiById = async(id) => {
  let recipeApi
  try {
  const {data} = await axios.get(`https://api.spoonacular.com/recipes/${id}/information?${API_KEY}`)
  recipeApi = {
    name: data.title,
    id: data.id,
    summary: data.summary, //resumen de la receta 
    image: data.image,
    healtScore: data.healtScore,
    steps: data.analyzedInstructions.length ? data.analyzedInstructions[0].steps.map(e => e.steps) : "Sin paso a paso",
    types: data.diets.map(e => e),
    dishTypes: data.dishTypes
  }
} catch (error) {
  console.log(error, 'BERGA')
}
return recipeApi
}

const getDbById = async(id) => {
  return await Recipe.findByPk(id, {
    include: {
      model: Type,
      attributes: ['name'],
      through: {
        attributes: [],
      }
    }
  })
}

const getAllRecipes = async () => {
    const apiInfo = await getApiInfo()
    const dbData = await getDbInfo()
    const allRecepies = apiInfo.concat(dbData)

    return allRecepies
}

module.exports = {
    getApiInfo,
    getDbInfo,
    getAllRecipes,
    getDbById,
    getApiById
}


