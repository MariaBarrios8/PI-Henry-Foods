const { API_KEY } = process.env;
const {Router} = require("express")
const {Recipe, Type} = require("../db")

const { getAllRecipes } = require ('../controller/test2'); 
const router = Router();

router.get("/", async (req, res) => {
    let totalRecipes = await getAllRecipes()
    console.log('la wea')

    const {name} = req.query
    if (name) {
        let recipeSeacrh = await totalRecipes.filter((obj) => obj.name.toLowerCase().includes(name.toLocaleLowerCase()));
        recipeSeacrh.length ? res.status(200).send(recipeSeacrh)
        : console.log('acá se rompe')
        res.status(404).send("404 RECIPE NOT FOUND :(")
    } else {
        res.status(200).send(totalRecipes)
    }
})

module.exports = router