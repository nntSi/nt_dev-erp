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
  deleteSubClaim,
  updateSubClaimBySUBCODE,
  createOldClaim,
  updateLoopClaim
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

router.delete("/claim/subclaim/delete/:codesub", async (req, res) => {
  deleteSubClaim(req, res);
});

router.patch("/claim/subclaim/patch/:subcode", async (req, res) => {
  updateSubClaimBySUBCODE(req, res);
});

router.post("/claim/oldclaim/create", async (req, res) => {
  createOldClaim(req, res);
});

router.patch("/claim/loop/updateclaim", async (req, res) => {
  updateLoopClaim(req, res);
});


module.exports = router;
