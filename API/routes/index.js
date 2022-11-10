const router = require("express").Router();
const CustomerRouter = require('./customer');

router.use("/users", CustomerRouter);

module.exports = router;