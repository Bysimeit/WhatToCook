const AuthoMiddleware = require("../middleware/authorization");
const CustomerController = require("../controllers/customerCtrl");
const JWTMiddleWare = require("../middleware/identification");

const Router = require("express-promise-router");
const router = new Router;

router.get('/',JWTMiddleWare.identification, AuthoMiddleware.mustBeAdmin ,CustomerController.getAllCustomer);
router.get('/:email',JWTMiddleWare.identification ,CustomerController.getCustomer);
router.post('/', CustomerController.postNewCustomer);
router.patch('/email',JWTMiddleWare.identification, CustomerController.updatePasswordEmailCustomer);
router.patch('/',JWTMiddleWare.identification, AuthoMiddleware.mustBeAdmin, CustomerController.updateCustomer);
router.delete('/',JWTMiddleWare.identification, CustomerController.deleteCustomer); //demander si ok pour la sécu


module.exports = router