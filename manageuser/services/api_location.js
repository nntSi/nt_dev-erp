const express = require("express");
const router = express.Router();
const {getAllProvince, getAllDistrictByProvinceID, getDistrictByID, getProvinceByID} = require("../controllers/Location_Controller");

router.get("/location/province", async (req, res) => {
  getAllProvince(req, res);
});

router.get("/location/province/:id", async (req, res) => {
  getProvinceByID(req, res);
});

router.get("/location/district/province/:pid", async (req, res) => {
  getAllDistrictByProvinceID(req, res);
});

router.get("/location/district/:id", async (req, res) => {
  getDistrictByID(req, res);
});

module.exports = router;