const AuthoMiddleware = require("../middleware/authorization");
const CommentRecipeController = require("../controllers/commentRecipe");
const JWTMiddleWare = require("../middleware/identification");

const Router = require("express-promise-router");
const router = new Router;

router.get('/',JWTMiddleWare.identification, AuthoMiddleware.mustBeAdmin, CommentRecipeController.getAllCommentCustomer);
router.get('/target',JWTMiddleWare.identification, CommentRecipeController.getCommentCustomer);
router.get('/:id', CommentRecipeController.getCommentRecipe);
router.post('/',JWTMiddleWare.identification, CommentRecipeController.postComment);
router.patch('/', JWTMiddleWare.identification, CommentRecipeController.updateComment);


module.exports = router