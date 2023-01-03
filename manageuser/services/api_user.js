const express = require("express");
const router = express.Router();
const { createUser, getAlluser, getUserByID, deleteUserByID, updateUser, filterByDepartment, filterPrivi, getUserfit} = require("../controllers/User_controller");

router.post("/user/create", async (req, res) => {
  await createUser(req, res);
});

router.get("/user/:limit/:offset", async (req, res) => {
  await getAlluser(req, res);
});

router.get("/user/:ID", async (req, res) => {
  let user = await getUserByID(req.params.ID);
  res.json({body: user});
});

router.delete("/user/delete/:ID", async (req, res) => {
  deleteUserByID(req.params.ID, res);
});

router.patch("/user/update/:ID", async (req, res) => {
  updateUser(req, res);
});

router.get("/user/department/:ID/:P/:limit/:search/:offset", async (req, res) => {
  filterByDepartment(req, res);
});

router.get("/user/filter/privi/:id", async (req, res) => {
  filterPrivi(req, res);
  /* res.json({id: req.params.id}) */
});

router.get("/user/getuser/fit/:id", async (req, res) => {
  getUserfit(req, res);
  /* res.json({id: req.params.id}) */
});

module.exports = router;