const AuthoMiddleware = require("../middleware/authorization");
const RecipeController = require("../controllers/recipeCtrl")
const JWTMiddleWare = require("../middleware/identification");

const Router = require("express-promise-router");
const router = new Router;

router.get('/', CustomerController.getAllCustomer); //question : gérer le fait d'être ou non connecté
router.post('/',JWTMiddleWare.identification, AuthoMiddleware.mustBeAdmin, CustomerController.postNewCustomer);
router.patch('/',JWTMiddleWare.identification, AuthoMiddleware.mustBeAdmin, CustomerController.updatePassWordCustomer); 
router.delete('/',JWTMiddleWare.identification, AuthoMiddleware.mustBeAdmin ,CustomerController.deleteCustomer);


module.exports = router;