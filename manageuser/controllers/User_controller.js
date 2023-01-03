const User = require("../models/User");
const { Op } = require("sequelize");
const Accessmng = require("../models/Accessmng");
const Department = require("../models/Department");

module.exports.createUser = async (req, res) => {
  const cUser = await User.create(req.body);
  return res.json({message: "Create user success", status: true});
}

module.exports.getAlluser = async (req, res) => {
  Accessmng.hasMany(User, {foreignKey: 'privi'});
  User.belongsTo(Accessmng, {foreignKey: 'privi'});
  Department.hasMany(Accessmng, {foreignKey: 'departmentID'});
  Accessmng.belongsTo(Department, {foreignKey: 'departmentID'});
  const allusr = await User.findAll({
    include:[{
      model: Accessmng,
      required: false,
      include: {
        model: Department,
        require: false,
      }
    }],
    order: [
      ['id', 'DESC']
    ],
    offset: Number(req.params.offset),
    limit: Number(req.params.limit),
  });
  const countNUmber = await User.count()
  res.json({body: allusr, count: countNUmber});
};

module.exports.getUserByID = async (ID) => {
  const one_usr = await User.findAll({
    attributes: ['title', 'fullname', 'lastname', 'nickname', 'mobile', 'privi', 'email', 'username', 'token', 'password', 'department'],
    where: {
      [Op.or] : [
        { id : ID },
        { token : ID }
      ]
    }
  });
  return one_usr[0];
};

module.exports.deleteUserByID = async (ID, res) => {
  await User.destroy({
    where:{
      id: ID
    }
  });
  return res.json({message: "Delete user success", status: true})
};

module.exports.updateUser = async (req, res) => {
  await User.update(req.body, {
    where: {
      id: req.params.ID
    }
  });
  return res.json({message: "Update user success", status: true})
};

// sort 
module.exports.filterByDepartment = async (req, res) => {
  Accessmng.hasMany(User, {foreignKey: 'privi'});
  User.belongsTo(Accessmng, {foreignKey: 'privi'});
  Department.hasMany(Accessmng, {foreignKey: 'departmentID'});
  Accessmng.belongsTo(Department, {foreignKey: 'departmentID'});
  console.log(req.params.P)
  const allusr = await User.findAll({
    where:{
      /* department: Number(req.params.ID) */
      [Op.or] : [
        { department: Number(req.params.ID) },
        { privi : Number(req.params.P) },
        { fullname: { [Op.substring]: req.params.search} },
        { lastname: { [Op.substring]: req.params.search} },
        { username: { [Op.substring]: req.params.search} }
      ]
    },
    include:[{
      model: Accessmng,
      required: false,
      include: {
        model: Department,
        require: false,
      }
    }],
    order: [
      ['id', 'DESC']
    ],
    offset: Number(req.params.offset),
    limit: Number(req.params.limit),
  });
  const countNUmber = await User.count({
    where:{
      /* department: Number(req.params.ID) */
      [Op.or] : [
        { department: Number(req.params.ID) },
        { privi : Number(req.params.P) },
        { fullname: { [Op.substring]: req.params.search} },
        { lastname: { [Op.substring]: req.params.search} },
        { username: { [Op.substring]: req.params.search} }
      ]
    },
  });
  res.json({body: allusr, count: countNUmber});
};

module.exports.filterPrivi = async (req, res) => {
  const filterPrivi = await User.findAll({
    attributes: ['title', 'fullname', 'lastname' ,'mobile', 'username', 'id'],
    where:{
      privi: Number(req.params.id)
    }
  });
  res.json({body: filterPrivi, status: true});
};

module.exports.getUserfit = async (req, res) => {
  const user = await User.findAll({
    attributes: ['title', 'fullname', 'lastname' ,'mobile', 'username', 'id'],
    where:{
      id: Number(req.params.id)
    }
  });
  res.json({body: user, status: true});
};