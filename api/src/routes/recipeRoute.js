const { API_KEY } = process.env;
const { Router } = require("express");
const { Recipe, Type } = require("../db");

const { getAllRecipes, getById } = require("../controller/recipeController");
const { getApiById, getDbById } = require("../controller/test");
const router = Router();

router.get("/recipes", async (req, res) => {
  ///recipes y el pedido por query
  const { name } = req.query;
  const totalRecipes = await getAllRecipes();

  if (name) {
    let recipeName = await totalRecipes.filter((e) =>
      e.name.toLowerCase().includes(name.toLocaleLowerCase())
    );

    recipeName.length
      ? res.status(200).send(recipeName) //si encontró coincidencia
      : res.status(404).send("Sorry! Recipe not found （（●´∧｀●））");
  } else {
    res.status(200).send(totalRecipes);
  }
});

router.get("/recipes/:id", async (req, res) => {});

module.exports = router;
