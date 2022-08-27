const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const router = Router();
const dietRoute = require('../routes/typesRoutes')
//const {getApiById} = require('../controller/test')
const recipeRoute = require('../routes/recipeRoute')
const {getById, postRecipe} = require('../controller/recipeController')


// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.get('/diets', dietRoute) 
router.get('/recipes', recipeRoute)
router.use('/recipes/:id', getById)
router.post('/recipes', recipeRoute)

module.exports = router;
