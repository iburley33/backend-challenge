const router = require("express").Router();
const {
  getOrgs,
  createOrg,
  matchAllQueries,
  matchAnyQueries,
  getSingleOrg,
  updateOrg,
  deleteOrg,
} = require("../../controllers/organizationController");
const adminCheck = require("../../utils/adminCheck");

router.use(adminCheck);

router.post("/create", createOrg);
router.get("/", getOrgs);
router.get("/:orgId/matchAll", matchAllQueries);
router.get("/:orgId/matchAny", matchAnyQueries);
router.route("/:orgId/").get(getSingleOrg).put(updateOrg).delete(deleteOrg);

module.exports = router;