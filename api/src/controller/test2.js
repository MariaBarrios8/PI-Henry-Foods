const { API_KEY } = process.env;
const axios = require("axios");
const { response } = require("express");
const { Recipe, Type } = require("../db");

const getApiInfo = async () => {
  try {
    const apiUrl = await axios.get(
      `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=10`
    );
    const { results } = apiUrl.data;

    if (results.length > 0) {
      let response = await results?.map((result) => {
        return {
          apiId: result.id,
          name: result.title,
          image: result.image,
          diets: result.diets?.map((e) => e),
          summary: result.summary,
          steps:
            steps.analyzedInstructions[0] &&
            result.analyzedInstructions[0].steps
              ? result.analyzedInstructions[0].steps
                  .map((item) => item.step)
                  .join(" \n")
              : "",
        };
      });
      return response;
    }
  } catch (error) {
    console.log(error);
    return [];
  }
};

const getDbInfo = async () => {
    try {
        const dataDB = await Recipe.findAll({
            include: {
                model: Type, 
                attributes: ['name'],
                through: {
                  attributes: []
                }
              }
        })
        let answere = await dataDB?.map(recipe => {
            return {
                id: recipe.id,
                name: recipe.name,
                summary: recipe.summary,
                healtScore: recipe.healtScore,
                image: recipe.image,
                steps: recipe.steps,
                diets: recipe.diets?.map(diet => diet.name),
            }
        });
        return response;
    } catch {
        console.log(error)
    }
}

const getAllRecipes = async () => {
    try {
        const apiInfo = await getApiInfo()
        const dbInfo = await getDbInfo()
        const infoTotal = apiInfo.concat(dbInfo)
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    getApiInfo,
    getDbInfo,
    getAllRecipes
}