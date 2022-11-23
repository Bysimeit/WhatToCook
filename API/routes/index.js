const CustomerRouter = require('./customer');
const UserRouter = require('./user');
const RecipeRouter = require('./recipe');
const AdminRouter = require('./admin');

const router = require("express").Router();

router.use("/customer", CustomerRouter);
router.use("/recipe", RecipeRouter);
router.use("/user", UserRouter);
router.use("/admin", AdminRouter);

module.exports = router;