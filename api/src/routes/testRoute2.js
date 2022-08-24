const { API_KEY } = process.env;
const { Router } = require("express");
const { Recipe, Type } = require("../db");

const { getAllRecipes } = require("../controller/test");
const router = Router();

router.get("/", async (req, res) => {
  try {
    const {name} = req.query;
    let allRecipes = await getAllRecipes()

    if(name) {
        let recipeByName = await allRecipes.filter(e => e.name.toLowerCase().include(name.toString().toLocaleLowerCase()))

        if(recipeByName.length) {
            let recipes = recipeByName.map(e => {
                return {
                    image: e.image,
                    name: e.image,
                    dietType: e.dietType ? e.dietType : e.diets.map(e => e.name),
                    score: e.score,
                    id: e.id
                }
            })
            return res.status(200).send(recipes)
        }
        return res.status(404).send('Sorry, recipe not found')
    } else {
        let recipes = allRecipes.map(e => {
            return {
                image: e.image,
                name: e.name,
                dietType: e.dietType ? e.dietType : e.dietType.map(e => e.name),
                score: e.score,
                id: e.id
            }
        })
        res.status(200).send(recipes)
    }
  } catch {
    return res.status(400).send('invalid input')
  }
});

module.exports = router