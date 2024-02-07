const router = require("express").Router();
const { login } = require("../../controllers/loginController");
const orgRoute = require("./orgRoutes");
const userRoute = require("./userRoutes");

router.post("/login", login);
router.use("/organization", orgRoute);
router.use("/user", userRoute);



module.exports = router;

