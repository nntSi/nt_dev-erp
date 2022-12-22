// import
const express = require("express");
const router = express.Router();
const { getAcsByID } = require("../controllers/AccessMng_Controller");
const {getMenuByMenuSelected, getAllMenu} = require("../controllers/Menu_Controller");

router.get("/getmenu/:usr_privi", async (req, res) => {
  // get access manage
  const Acs = await getAcsByID(req.params.usr_privi);
  // get menu privi
  const menu = await getMenuByMenuSelected(Acs.dataValues.menu_privi);
  res.json({menuget: menu});
});

router.get("/getmenu", async (req, res) => {
  getAllMenu(req, res);
});

module.exports = router;