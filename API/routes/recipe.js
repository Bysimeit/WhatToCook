const AuthoMiddleware = require("../middleware/authorization");
const RecipeController = require("../controllers/recipeCtrl")
const JWTMiddleWare = require("../middleware/identification");

const Router = require("express-promise-router");
const router = new Router;

router.get('/', RecipeController.getListeRecipe); //question : gérer le fait d'être ou non connecté
router.post('/', JWTMiddleWare.identification, AuthoMiddleware.mustBeAdmin, RecipeController.getListeRecipe);
router.patch('/', JWTMiddleWare.identification, AuthoMiddleware.mustBeAdmin, RecipeController.getListeRecipe); 
router.delete('/', JWTMiddleWare.identification, AuthoMiddleware.mustBeAdmin, RecipeController.getListeRecipe);


module.exports = router;