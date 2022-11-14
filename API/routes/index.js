const CustomerRouter = require('./customer');

const router = require("express").Router();

router.use("/customer", CustomerRouter);

module.exports = router;