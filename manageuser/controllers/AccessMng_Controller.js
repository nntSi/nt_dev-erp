const { Op } = require("sequelize");
const Accessmng = require("../models/Accessmng");
const Department = require("../models/Department");

module.exports.createAcs = async (req, res) => {
  const createAcs = await Accessmng.create({
    position_name: req.body.position_name,
    menu_privi: req.body.menu_privi,
    department: req.body.department,
    departmentID: req.body.departmentID
  });
  return res.json({message: "Create successful!!!"});
};

module.exports.getAllAcs = async (req, res) => {
  /* Accessmng.hasMany(Department); */
  Department.hasMany(Accessmng, {foreignKey: 'departmentID'});
  Accessmng.belongsTo(Department, {foreignKey: 'departmentID'})
  const Acs = await Accessmng.findAll(
  { 
    include:[{
      model: Department,
      require: false,
    }],
    limit: 10
  
  }/* ,
    { where : {
      [Op.or] : [
        {id : { [Op.substring]: req.params.search }},
        {position_name : { [Op.substring]: req.params.search }},
        {department : { [Op.substring]: req.params.search }}
      ]
    }} */
  );
  return res.json({body: Acs});
};

module.exports.getSearch = async (req, res) => {
  Department.hasMany(Accessmng, {foreignKey: 'departmentID'});
  Accessmng.belongsTo(Department, {foreignKey: 'departmentID'})
  const Acs = await Accessmng.findAll({ 
    where : {
      [Op.or] : [
        {id : { [Op.substring]: req.params.search }},
        {position_name : { [Op.substring]: req.params.search }},
        /* {department : { [Op.substring]: req.params.search }} */
      ]
    },
    include:[{
      model: Department,
      require: false,
    }],
  },
    { limit: 5 },
  )
  /* console.log(Acs) */
  return res.json({body: Acs});
};

module.exports.getAcsByID = async (ID) => {
  const ascID = await Accessmng.findAll({
    where : {
      id: ID
    }
  });
  return ascID[0];
};

module.exports.updateByID = async (req, res) => {
  await Accessmng.update(req.body, {
    where: {
      id: req.params.ID
    }
  });
  return res.json({message: "Update success"});
};

module.exports.deleteByID = async (req, res) => {
  await Accessmng.destroy({
    where: {
      id: req.params.ID
    }
  });
  return res.json({message: "Delete success", status: true});
};

module.exports.getDepartment = async (req, res) => {
  const dp = await Department.findAll()
  return res.json({message: "Get department success!!", body: dp});
};

module.exports.createDepartment = async (req, res) => {
  try{
    await Department.create({
      department_name: req.body.department_name
    });
    return res.json({message: "Create departmnent success!!!", status: true});
  }catch(err){
    return res.json({message: "Create departmnent unsuccess!!! " + err, status: false});
  }
};

module.exports.deleteDepartmentByID = async (req, res) => {
  try{
    await Department.destroy({
      where: {
        id: req.params.ID
      }
    });
    return res.json({message:"Delete department success!!!"})
  }catch(err){
    return res.json({message:"Delete department unsuccess!!! " + err})
  }
};

module.exports.getDepartmentByID = async (req, res) => {
  try{
    const dp = await Department.findAll({
      where:{
        id: req.params.ID
      }
    });
    return res.json({message:"Get department success!!!", body:dp})
  }catch(err){
    return res.json({message:"Get department success!!! " + err})
  }
};

// filter
module.exports.filterByDepartment = async (req, res) => {
  
}
