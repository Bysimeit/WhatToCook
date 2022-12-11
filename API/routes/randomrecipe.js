const AuthoMiddleware = require("../middleware/authorization");
const RecipeController = require("../controllers/recipeCtrl");
const JWTMiddleWare = require("../middleware/identification");

const Router = require("express-promise-router");
const router = new Router;

router.get('/', RecipeController.getRandomRecipe);

module.exports = router;