const axios = require("axios");
const { Type } = require("../db");
const { API_KEY } = process.env;

const getDiets = async () => {
  let dietsApi = await axios.get(
    `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=10`
  );

  let dataType = await dietsApi.data.results
    .map((e) => e.diets )
    .join()
    .split(",")
    .filter(e => e.length)


  /*let diets = [];

  dataType.map(el => {
    if(!diets.includes(el.trim()) && el) {
        diets.push(el.trim())
    }
  }) 
*/
  dataType.forEach(async (e) => {
    await Type.findOrCreate({
        where: { name: e },
    })
  })
  const typeDb = await Type.findAll()
};

/*async function getDiets (req, res) {
    try {
        const dietsApi = (await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=10`)).data.results
        const dataType = dietsApi.map(e => e.diets).join().split(',').filter(e => e.length);
        dataType.forEach(e => {
            Type.findOrCreate({
                where: {name: e }
            })
        })
        const typeDb = await Type.findAll()
        res.send(typeDb)
    } catch (error) {
        res.send(404).json({error})
    }
}
*/
module.exports = {
    getDiets
}
