const AuthoMiddleware = require("../middleware/authorization");
const RecipeController = require("../controllers/recipeCtrl");
const JWTMiddleWare = require("../middleware/identification");

const Router = require("express-promise-router");
const router = new Router;

router.get('/', RecipeController.getListeRecipe); //ajouter la façon d'être connecté ou non 
router.get('/:id', RecipeController.getDataRecipe);
router.post('/', JWTMiddleWare.identification, AuthoMiddleware.mustBeAdmin, RecipeController.postNewRecipe);
router.patch('/', JWTMiddleWare.identification, AuthoMiddleware.mustBeAdmin, RecipeController.udpateRecipe);
router.delete('/', JWTMiddleWare.identification, AuthoMiddleware.mustBeAdmin, RecipeController.deleteRecipe);


module.exports = router;