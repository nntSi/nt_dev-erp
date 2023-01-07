const { Op } = require("sequelize");
const Province = require("../models/Province");
const District = require("../models/District");

module.exports.getAllProvince = async (req, res) => {
  const province = await Province.findAll({attributes: ['id', 'province_name'],})
  res.json({body: province})
};

module.exports.getProvinceByID = async (req, res) => {
  const province = await Province.findAll({
    where:{
      id: req.params.id
    },
    attributes: ['id', 'province_name']
  });
  res.json({body: province});
};

module.exports.getAllDistrictByProvinceID = async (req, res) => {
  const district = await District.findAll({
    where: {
      province_id: req.params.pid
    },
    attributes: ['id', 'district_name']
  });
  res.json({body: district});
};

module.exports.getDistrictByID = async (req, res) => {
  const district = await District.findAll({
    where:{
      id: req.params.id
    },
    attributes: ['id', 'district_name']
  });
  res.json({body: district});
};