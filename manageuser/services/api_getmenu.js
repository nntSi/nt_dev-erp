// import
const express = require("express");
const router = express.Router();
const { getAcsByID } = require("../controllers/AccessMng_Controller");
const {getMenuByMenuSelected} = require("../controllers/Menu_Controller");

router.get("/getmenu/:usr_privi", async (req, res) => {
  // get access manage
  const Acs = await getAcsByID(req.params.usr_privi);
  // get menu privi
  const menu = await getMenuByMenuSelected(Acs.dataValues.menu_privi);
  res.json({menuget: menu});
});

module.exports = router;