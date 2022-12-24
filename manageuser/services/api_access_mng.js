const express = require("express");
const router = express.Router();
const {createAcs, getAllAcs, getAcsByID, updateByID, deleteByID, getSearch} = require("../controllers/AccessMng_Controller");

router.post("/acs/create", async (req, res) => {
  await createAcs(req, res);
});

router.get("/acs/getAllAcs", async (req, res) => {
  await getAllAcs(req, res);
});

router.get("/acs/get/:search", async (req, res) => {
  await getSearch(req, res);
});

router.get("/acs/getid/:ID", async (req, res) => {
  let acsID = await getAcsByID(req.params.ID);
  res.json({data: acsID})
});

router.patch("/acs/patch/:ID", async (req, res) => {
  await updateByID(req, res); 
});

router.delete("/acs/delete/:ID", async (req, res) => {
  await deleteByID(req, res);
});

module.exports = router;