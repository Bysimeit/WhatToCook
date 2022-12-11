const AuthoMiddleware = require("../middleware/authorization");
const CustomerFoodController = require("../controllers/customerFoodCtrl");
const JWTMiddleWare = require("../middleware/identification");

const Router = require("express-promise-router");
const router = new Router;

router.get('/:id',JWTMiddleWare.identification, CustomerFoodController.getAllCustomerAllergy);
router.post('/', JWTMiddleWare.identification, CustomerFoodController.postNewCustomerAllergy);
router.delete('/', JWTMiddleWare.identification, CustomerFoodController.postNewCustomerAllergy);


module.exports = router