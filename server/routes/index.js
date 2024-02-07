const router = require("express").Router();
const apiRoute = require('./api');

router.use("/api", apiRoute);

router.use((req, res) => {
  return res.send({
    message: "The route does not exist",
  });
});

module.exports = router;

