const AuthoMiddleware = require("../middleware/authorization");
const FridgeController = require("../controllers/fridgeCtrl")
const JWTMiddleWare = require("../middleware/identification");

const Router = require("express-promise-router");
const router = new Router;

router.get('/', JWTMiddleWare.identification, FridgeController.getAllFood); 
router.post('/', JWTMiddleWare.identification, FridgeController.postNewFoodCustomer);
router.delete('/', JWTMiddleWare.identification, FridgeController.deleteFood);

module.exports = router;