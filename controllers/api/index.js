//These routes are being exported for the app here.
const router = require('express').Router();
const userRoutes = require('./userroutes');

const showRoutes = require("./showroutes");
router.use('/user', userRoutes)
router.use("/shows", showRoutes)

module.exports = router;