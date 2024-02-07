const router = require("express").Router();
const { login } = require("../../controllers/loginController");
const orgRoute = require("./org-routes");
const userRoute = require("./user-routes");

router.post("/login", login);
router.use("/organization", orgRoute);
router.use("/user", userRoute);



module.exports = router;
