const express = require("express");
const router = express.Router();

router.use(require("./services/api_auth"));
router.use(require("./services/api_user"));
router.use(require("./services/api_getmenu"));
router.use(require("./services/api_access_mng"));

module.exports = router;