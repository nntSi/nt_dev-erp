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
  const Acs = await Accessmng.findAll();
  return res.json({data: Acs});
};

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
  return res.json({message: "Delete success"});
}