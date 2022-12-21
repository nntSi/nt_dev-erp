// import
const { getUserByID } = require("../controllers/User_controller");
const { getAcsByID } = require("../controllers/AccessMng_Controller");
const { getMenuByMenuSelected } = require("../controllers/Menu_Controller");
const User = require("../models/User");

module.exports.login = async (req, res) => {
  // check have user
  const check = await User.count({
    where: {
      username: req.body.username,
      password: req.body.password
    },
  });
  if (check < 1) {
    return res.json({ message: "Login unsuccess!!!", isLogin: false });
  }
  const user = await User.findAll({
    attributes: ['title', 'fullname', 'lastname', 'nickname', 'mobile', 'privi', 'email', 'username', 'token'],
    where:{
      username: req.body.username,
      password: req.body.password 
    }
  });
  // get access manage
  const Acs = await getAcsByID(user[0].dataValues.privi);
  // get menu privi
  const menu = await getMenuByMenuSelected(Acs.dataValues.menu_privi);
  /* console.log(menu); */
  return res.json({userdata: user, menuget:menu, isLogin: true});
};
