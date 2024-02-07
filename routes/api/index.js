const router = require("express").Router();
const { login } = require("../../controllers/loginController");
const orgRoute = require("./api/org-routes");
const userRoute = require("./api/user-routes");

router.post("/login", login);
router.use("/organization", orgRoute);
router.use("/user", userRoute);



module.exports = router;
