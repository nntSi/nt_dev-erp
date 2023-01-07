const express = require("express");
const router = express.Router();
const { claimWord } = require("../report_services/claim_report")

router.get("/claim/report/:svhcode/claim.docx", async (req, res) => {
  claimWord(req, res);
});

module.exports = router;