const AuthoMiddleware = require("../middleware/authorization");
const CommentRecipeController = require("../controllers/commentRecipe");
const JWTMiddleWare = require("../middleware/identification");

const Router = require("express-promise-router");
const router = new Router;

router.get('/',JWTMiddleWare.identification, AuthoMiddleware.mustBeAdmin, CommentRecipeController.getAllCommentCustomer);
router.get('/:id', CommentRecipeController.getCommentRecipe);
router.patch('/', JWTMiddleWare.identification, CommentRecipeController.updateComment);


module.exports = router