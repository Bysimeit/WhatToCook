const AuthoMiddleware = require("../middleware/authorization");
const FoodController = require("../controllers/foodCtrl");
const JWTMiddleWare = require("../middleware/identification");

const Router = require("express-promise-router");
const router = new Router;

router.get('/',JWTMiddleWare.identification, AuthoMiddleware.mustBeAdmin, FoodController.getAllFood);
router.post('/', JWTMiddleWare.identification, AuthoMiddleware.mustBeAdmin, FoodController.postNewFood);
router.patch('/', JWTMiddleWare.identification, AuthoMiddleware.mustBeAdmin, FoodController.updateFood);
router.delete('/',JWTMiddleWare.identification, AuthoMiddleware.mustBeAdmin, FoodController.deleteFood);

module.exports = router