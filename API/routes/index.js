const CustomerRouter = require('./customer');
const UserRouter = require('./user');
const RecipeRouter = require('./recipe');
const FridgeRouter = require('./fridge');
const AllergyRouter = require('./allergy');
const FoodRouter = require('./food');
const CustomerAllergieRouter = require('./customerAllergy');

const router = require("express").Router();

router.use("/customer", CustomerRouter);
router.use("/recipe", RecipeRouter);
router.use("/user", UserRouter);
router.use("/fridge", FridgeRouter);
router.use("/allergy", AllergyRouter);
router.use("/food", FoodRouter);
router.use("/customerAllergy", CustomerAllergieRouter);

module.exports = router;