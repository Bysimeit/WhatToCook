const AuthoMiddleware = require("../middleware/authorization");
const UserController = require("../controllers/userCtrl")
const JWTMiddleWare = require("../middleware/identification");

const Router = require("express-promise-router");
const router = new Router;

router.post('/', UserController.login);


module.exports = router;