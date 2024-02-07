const {
  getUsers,
  createUser,
  getSingleUser,
  deleteUser,
} = require("../../controllers/userController");
const adminCheck = require("../../utils/adminCheck");
const router = require("express").Router();

router.use(adminCheck);

router.post("/create", createUser);
router.get("/", getUsers);
router.route("/:userId").get(getSingleUser).post(createUser).delete(deleteUser);

module.exports = router;

