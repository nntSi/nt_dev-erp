const express = require("express");
const router = express.Router();
const {getCompany} = require("../controllers/Company_Controller");

router.get("/company", async (req, res) => {
  getCompany(req, res);
});

module.exports = router;