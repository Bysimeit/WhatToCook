const CustomerRouter = require('./customer');
const UserRouter = require('./user');
const RecipeRouter = require('./recipe');
const FridgeRouter = require('./fridge');
const AllergyRouter = require('./allergy');
const FoodRouter = require('./food');
const CustomerAllergieRouter = require('./customerAllergy');
const RandomRecipeRouter = require("./randomrecipe");
const FavoriteRecipeRouter = require("./favoriteRecipe");
const CommentRouter = require("./comment");

const router = require("express").Router();

router.use("/customer", CustomerRouter);
router.use("/recipe", RecipeRouter);
router.use("/user", UserRouter);
router.use("/fridge", FridgeRouter);
router.use("/allergy", AllergyRouter);
router.use("/food", FoodRouter);
router.use("/customerAllergy", CustomerAllergieRouter);
router.use("/randomrecipe", RandomRecipeRouter);
router.use("/favorite", FavoriteRecipeRouter);
router.use("/comment", CommentRouter);

module.exports = router;