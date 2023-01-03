const Company = require("../models/Company");

module.exports.getCompany = async (req, res) => {
  const companyAll = await Company.findAll();
  res.json({body:companyAll, status: true});
}