const AuthoMiddleware = require("../middleware/authorization");
const AdminController = require("../controllers/adminCtrl")
const JWTMiddleWare = require("../middleware/identification");

const Router = require("express-promise-router");
const router = new Router;



module.exports = router;