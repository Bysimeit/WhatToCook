const AuthoMiddleware = require("../middleware/authorization");
const FavoriteRecipeController = require("../controllers/favoriteRecipeCtrl");
const JWTMiddleWare = require("../middleware/identification");

const Router = require("express-promise-router");
const router = new Router;

router.get('/:id',JWTMiddleWare.identification, FavoriteRecipeController.getFavoriteRecipe);
router.patch('/', JWTMiddleWare.identification, FavoriteRecipeController.updateFavoriteRecipe);


module.exports = router