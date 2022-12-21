const User = require("../models/User");
const { Op } = require("sequelize");

module.exports.createUser = async (req, res) => {
  console.log(req.body);
  const cUser = await User.create(req.body);
  return res.json({message: "Create user success"});
}

module.exports.getAlluser = async (req, res) => {
  const allusr = await User.findAll();
  return res.json({body: allusr})
}

module.exports.getUserByID = async (ID) => {
  const one_usr = await User.findAll({
    attributes: ['title', 'fullname', 'lastname', 'nickname', 'mobile', 'privi', 'email', 'username', 'token'],
    where: {
      [Op.or] : [
        { id : ID },
        { token : ID }
      ]
    }
  });
  return one_usr[0];
}