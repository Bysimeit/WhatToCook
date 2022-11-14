const CustomerController = require("../controllers/customerDB")

const Router = require("express-promise-router");
const router = new Router;

router.get('/', CustomerController.getAllCustomer);
router.post('/',);
router.patch('/',);
router.delete('/',);

module.exports = router