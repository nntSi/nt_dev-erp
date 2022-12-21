const express = require("express");
const router = express.Router();
const {login} = require("../controllers/Auth_Controller")

router.post("/auth/login", async (req, res) => {
  let check = await login(req, res);
  /* res.json({num:check}); */
});

module.exports = router;