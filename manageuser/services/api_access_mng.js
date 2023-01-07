const express = require("express");
const router = express.Router();
const {createAcs, getAllAcs, getAcsByID, updateByID, deleteByID, getSearch, getDepartment, createDepartment, deleteDepartmentByID, getDepartmentByID} = require("../controllers/AccessMng_Controller");

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
  res.json({data: acsID});
});

router.patch("/acs/patch/:ID", async (req, res) => {
  await updateByID(req, res); 
});

router.delete("/acs/delete/:ID", async (req, res) => {
  await deleteByID(req, res);
});

router.get("/acs/department", async (req, res) => {
  await getDepartment(req, res);
});

router.post("/acs/department/create", async (req, res) => {
  await createDepartment(req, res);
});

router.delete("/acs/department/delete/:ID", async (req, res) => {
  await deleteDepartmentByID(req, res);
});
router.get("/acs/department/:ID", async (req, res) => {
  await getDepartmentByID(req, res);
});
module.exports = router;