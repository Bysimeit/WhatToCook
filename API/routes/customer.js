const CustomerController = require("../controllers/customerDB")

const Router = require("express-promise-router");
const router = new Router;

router.get('/', CustomerController.getAllCustomer);
router.post('/', CustomerController.postNewCustomer);
router.patch('/changePassWord', CustomerController.updatePassWordCustomer);
router.patch('/changeEmail', CustomerController.updateEmailCustomer);
router.delete('/', CustomerController.deleteCustomer);

module.exports = router