const router = require("express").Router();
const orgRoute = require("./org-routes");

router.use("/organization", orgRoute);

router.use((req, res) => {
  return res.send({
    message: "The route does not exist",
  });
});

module.exports = router;
