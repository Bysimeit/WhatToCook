const AuthoMiddleware = require("../middleware/authorization");
const RecipeController = require("../controllers/recipeCtrl");
const JWTMiddleWare = require("../middleware/identification");

const Router = require("express-promise-router");
const router = new Router;

const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({
    limits: {
        fileSize: 700000 // 700Ko
    },
    storage: storage
});

router.get('/', RecipeController.getListeRecipe); 
router.get('/:id', RecipeController.getDataRecipe);
router.post('/', JWTMiddleWare.identification, AuthoMiddleware.mustBeAdmin, upload.fields([
    {name: 'name', maxCount: 1},
    {name: 'time', maxCount: 1},
    {name: 'type', maxCount: 1},
    {name: 'steps', maxCount: 1},
    {name: 'foods', maxCount: 1},
    {name: 'picture', maxCount: 1}
]), RecipeController.postNewRecipe);
router.patch('/', JWTMiddleWare.identification, AuthoMiddleware.mustBeAdmin, upload.fields([
    {name: 'id', maxCount: 1},
    {name: 'name', maxCount: 1},
    {name: 'time', maxCount: 1},
    {name: 'type', maxCount: 1},
    {name: 'stepsText', maxCount: 1},
    {name: 'foodsText', maxCount: 1},
    {name: 'picture', maxCount: 1}
]),RecipeController.udpateRecipe);
router.delete('/', JWTMiddleWare.identification, AuthoMiddleware.mustBeAdmin, RecipeController.deleteRecipe);


module.exports = router;