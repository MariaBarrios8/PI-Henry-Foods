const { API_KEY } = process.env;
const axios = require("axios");
const { Recipe, Type } = require("../db");
const  {AP_KING} = process.env

//PROBLEMA  Maximum call stack size exceeded en getAllRecipes

const getApiInfo = async () => {
  try {
    const url = await axios.get(
      `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=15`
    ) //en realidad son 100

    const dataRecipes = await url.data.results.map((e) => {
      return {
        id: e.id,
        name: e.title,
        image: e.image,
        type: e.diets.map((e) => e).join(", "),
        healthScore: e.healthScore,
        dishTypes: e.dishTypes.join(", "),
        //steps: e.analyzedInstructions
      };
    });
    //console.log(dataRecipes, 'WAAAAAAAAAAAA')
    return dataRecipes;
  } catch (error) {
    console.error(error);
  }
};

const getDbInfo = async () => {
  return await Recipe.findAll({
    include: {
      model: Type, 
      attributes: ['name'],
      through: {
        attributes: []
      }
    }
  })
}

const getAllRecipes = async () => {
  const api = await getApiInfo()
  const dataB = await getDbInfo()

  return api.concat(dataB)
}

const getApiDetail = async (req, res) => {
  const {name} = req.query
  let foods = await getAllRecipes()
  if(name) {
    let recipeName = await foods.filter(e => e.name.toLowerCase().includes(name.toLowerCase()))
    recipeName.length
    ? res.status(200).send(recipeName)
    : res.status(404).send('Not Found')
  } else {
    res.status(200).send(foods)
  }
}

async function getById (req, res) {
  let {id} = req.params;

  try {
    if(id.includes('-')) {
      const recipeDb = await Recipe.findByPk(id, {
        include: {
          model: Type,
          attributes: ['name'],
          through: {
            attributes: []
          }
        }
      })
      return recipeDb 
      ? res.status(200).json(recipeDb)
      : res.status(400).send('Not Found')
    } else {
      let recipeApi

      try {
        const {data} = await axios.get(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}`)
        recipeApi = {
          name: data.title,
          id: data.id,
          summary: data.summary, //resumen de la receta 
          image: data.image,
          healtScore: data.healtScore,
          steps: data.analyzedInstructions[0] ? data.analyzedInstructions[0] : "Sin paso a paso",
          types: data.diets.map(e => e),
          dishTypes: data.dishTypes
        }
      } catch (error) {
        res.status(404) 
        console.log("AAAAAAAA")
      }
      return recipeApi 
      ? res.status(200).json(recipeApi)
      : res.status(404).send('Not Found')
    }
  } catch (error) {
    res.status(400)
    console.log("AAAAAAAA")
  }
}


async function postRecipe (req, res) {
  let {name, summary, healtScore, steps, types, image, dishTypes} = req.body

  try {
    let newRecipe = await Recipe.create({
      name, 
      summary,
      healtScore,
      steps,
      image,
      dishTypes 
    })
    await Promise.all(types.map(async e => {
      await newRecipe.addType([
        await Type.findOrCreate({
          where: {
            name: e
          }
        })[0].dataValues.id
      ])
    }))
    const relacionTables = await Recipe.findOne({
      where: {
        name: name
      },
      include: {
        model: Type,
        attributes: ["name"],
        through: {
          attributes: []
        }
      }
    })
    res.send("Recipe created successsfuly")
    return relacionTables
  } catch (e) {
    res.status(404).send("AAAAAAA ERROR")
  }
}



module.exports = {
  getApiInfo,
  getDbInfo,
  getAllRecipes,
  getApiDetail,
  getById,
  postRecipe
};
