const AuthoMiddleware = require("../middleware/authorization");
const AllergyController = require("../controllers/allergyCtrl");
const JWTMiddleWare = require("../middleware/identification");

const Router = require("express-promise-router");
const router = new Router;

router.get('/',JWTMiddleWare.identification, AllergyController.getAllAllergy);
router.post('/', JWTMiddleWare.identification, AuthoMiddleware.mustBeAdmin, AllergyController.postNewAllergy);
router.patch('/', JWTMiddleWare.identification, AuthoMiddleware.mustBeAdmin, AllergyController.updateAllergy);
router.delete('/',JWTMiddleWare.identification, AuthoMiddleware.mustBeAdmin, AllergyController.deleteAllergy);

module.exports = router