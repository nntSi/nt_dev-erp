const express = require("express");
const router = express.Router();
const { claimWord, subClaimWord } = require("../report_services/claim_report")

router.get("/claim/report/:svhcode/claim.docx", async (req, res) => {
  claimWord(req, res);
});
router.get("/claim/report/subclaim/:codesub/subclaim.docx", async (req, res) => {
  subClaimWord(req, res);
});

module.exports = router;