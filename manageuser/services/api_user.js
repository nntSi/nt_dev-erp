const express = require("express");
const router = express.Router();
const { createUser, getAlluser, getUserByID } = require("../controllers/User_controller");

router.post("/user/create", async (req, res) => {
  await createUser(req, res);
});

router.get("/user", async (req, res) => {
  await getAlluser(req, res);
});

router.get("/user/:ID", async (req, res) => {
  let user = await getUserByID(req.params.ID);
  res.json({data: user});
});

module.exports = router;