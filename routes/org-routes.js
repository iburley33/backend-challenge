const router = require("express").Router();

const {
  getOrgs,
  createOrg,
  matchAllQueries,
  matchAnyQueries,
  getSingleOrg,
  updateOrg,
  deleteOrg,
} = require("../controllers/organizationController");

router.route("/").get(getOrgs).post(createOrg);
router.route("/:orgId/").get(getSingleOrg).put(updateOrg).delete(deleteOrg);
router.get("/:orgId/matchAll", matchAllQueries);
router.get("/:orgId/matchAny", matchAnyQueries);


module.exports = router;
