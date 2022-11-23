const AuthoMiddleware = require("../middleware/authorization");
const CustomerController = require("../controllers/customerCtrl");
const JWTMiddleWare = require("../middleware/identification");

const Router = require("express-promise-router");
const router = new Router;

router.get('/',JWTMiddleWare.identification, AuthoMiddleware.mustBeAdmin, CustomerController.getAllCustomer);
router.post('/', CustomerController.postNewCustomer);
router.patch('/changePassWordAdmin', CustomerController.updatePassWordCustomer); //simplifier en une route les patch
router.patch('/changeEmail', CustomerController.updateEmailCustomer);
router.delete('/',JWTMiddleWare.identification, AuthoMiddleware.mustBeAdmin ,CustomerController.deleteCustomer);


module.exports = router