const {Router} = require("express")
const {getDiets} = require("../controller/typesController")
const { Type } = require("../db")

const router = Router()


router.get('/diets', async (req, res) => {
    const recipeType = await getDiets()

    const allTypes = await Type.findAll()
    const filteredTypes = await allTypes.map(e => e.name)
    res.status(200).send(filteredTypes)
})

/*
router.get("/", async (req, res) => {
    try {
        getDiets.forEach((diet) => {
            if(diet !== undefined) {
                Type.findCreateFind({
                    where: {name: diet},
                })
            }
        })
        const allDiets = await Type.findAll();
        res.send(allDiets)
    } catch (error) {
        res.status(400).send("not found")
    }
})
*/

module.exports = router