const { where, Op } = require("sequelize");
const Accessmng = require("../models/Accessmng");

module.exports.createAcs = async (req, res) => {
  const createAcs = await Accessmng.create({
    position_name: req.body.position_name,
    menu_privi: req.body.menu_privi,
    department: req.body.department
  });
  return res.json({message: "Create successful!!!"});
};

module.exports.getAllAcs = async (req, res) => {
  const Acs = await Accessmng.findAll(
    { limit: 5 }/* ,
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
  const Acs = await Accessmng.findAll(
    { where : {
      [Op.or] : [
        {id : { [Op.substring]: req.params.search }},
        {position_name : { [Op.substring]: req.params.search }},
        {department : { [Op.substring]: req.params.search }}
      ]
    }},
    { limit: 5 },
  )
  return res.json({body: Acs});
}

module.exports.getAcsByID = async (ID) => {
  const ascID = await Accessmng.findAll({
    where : {
      id: ID
    }
  });
  return ascID[0];
}

module.exports.updateByID = async (req, res) => {
  await Accessmng.update(req.body, {
    where: {
      id: req.params.ID
    }
  });
  return res.json({message: "Update success"});
}

module.exports.deleteByID = async (req, res) => {
  await Accessmng.destroy({
    where: {
      id: req.params.ID
    }
  });
  return res.json({message: "Delete success", status: true});
}