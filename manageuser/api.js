const express = require("express");
const router = express.Router();

router.use(require("./services/api_auth"));
router.use(require("./services/api_user"));
router.use(require("./services/api_getmenu"));
router.use(require("./services/api_access_mng"));
router.use(require("./services/api_company"));
router.use(require("./services/api_claim"));
router.use(require("./services/api_location"));
router.use(require("./services/api_claim_report"));

module.exports = router;