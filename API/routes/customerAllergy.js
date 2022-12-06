const AuthoMiddleware = require("../middleware/authorization");
const CustomerAllergyController = require("../controllers/customerAllergyCtrl");
const JWTMiddleWare = require("../middleware/identification");

const Router = require("express-promise-router");
const router = new Router;

router.get('/:id',JWTMiddleWare.identification, CustomerAllergyController.getAllCustomerAllergy);
router.post('/', JWTMiddleWare.identification, CustomerAllergyController.postNewCustomerAllergy);

module.exports = router