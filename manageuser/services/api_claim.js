const express = require("express");
const router = express.Router();
const {
  getAllClaim,
  createClaim,
  getClaimBySVHCODE,
  updateClaimBySVHCODE,
  filterClaim,
  createSubClaim,
  getSubBySVHCODE,
  getSubBySUBCODE,
} = require("../controllers/Claim_Controller");

router.get("/claim/:offset", async (req, res) => {
  await getAllClaim(req, res);
});

router.post("/claim/create", async (req, res) => {
  await createClaim(req, res);
});

router.get("/claim/svhcode/:svhcode", async (req, res) => {
  await getClaimBySVHCODE(req, res);
});

router.patch("/claim/patch/:svhcode", async (req, res) => {
  await updateClaimBySVHCODE(req, res);
});

router.post("/claim/filter/:offset", async (req, res) => {
  filterClaim(req, res);
});

router.post("/claim/subcreate", async (req, res) => {
  createSubClaim(req, res);
});

router.get("/claim/subclaim/svhcode/:svhcode", async (req, res) => {
  getSubBySVHCODE(req, res);
});

router.get("/claim/subclaim/subcode/:codesub", async (req, res) => {
  getSubBySUBCODE(req, res);
});

module.exports = router;
