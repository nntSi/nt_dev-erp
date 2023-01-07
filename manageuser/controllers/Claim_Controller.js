const { Op } = require("sequelize");
const Claim = require("../models/Claim");
const Subclaim = require("../models/Subclaim");

module.exports.getAllClaim = async (req, res) => {
  try {
    const { count, rows } = await Claim.findAndCountAll({
      order: [
        ["date", "DESC"],
        ["time", "DESC"],
      ],
      offset: Number(req.params.offset),
      limit: 10,
    });
    res.json({ body: { count, rows }, status: true });
  } catch (err) {
    res.json({ status: false, error: err });
  }
};

const FIRSTCODE = "SVH";
const SECCOND = "01";
const START = 473;

module.exports.createClaim = async (req, res) => {
  try {
    const count = await Claim.count({ where: { sts: 1 } });
    let code = FIRSTCODE + SECCOND + (START + count);
    const claim = await Claim.create({
      date: req.body.date,
      time: req.body.time,
      company: req.body.company,
      type: req.body.type,
      source_employee: req.body.source_employee,
      location: req.body.location,
      accident: req.body.accident,
      employee: req.body.employee,
      employee_id: req.body.employee_id,
      Inspector: req.body.Inspector,
      inspector_id: req.body.inspector_id,
      inspector_mobile: req.body.inspector_mobile,
      time_dry: req.body.time_dry,
      date_dry: req.body.date_dry,
      province: req.body.province,
      district: req.body.district,
      brand_car: req.body.brand_car,
      customer_cliam_mobile: req.body.customer_cliam_mobile,
      customer_claim_name: req.body.customer_claim_name,
      license_plate: req.body.license_plate,
      claim_code: req.body.claim_code,
      insurance_code: req.body.insurance_code,
      svh_code: code,
    });
    if (claim) {
      res.json({
        status: true,
        message: "Create claim success!!",
        svh_code: code,
      });
    } else {
      res.json({ status: false, message: "Create claim unsuccess!!" });
    }
  } catch (err) {
    res.json({ status: false, message: err });
  }
};

module.exports.getClaimBySVHCODE = async (req, res) => {
  const claim = await Claim.findAll({
    where: {
      svh_code: req.params.svhcode,
    },
  });
  res.json({ status: true, message: "Get claim success", body: claim });
};

module.exports.updateClaimBySVHCODE = async (req, res) => {
  await Claim.update(req.body, {
    where: {
      svh_code: req.params.svhcode,
    },
  });
  res.json({ status: true, message: "Update claim successful " });
};

module.exports.filterClaim = async (req, res) => {
  if (
    req.body.dateSelected == "" &&
    req.body.companySelected == "" &&
    req.body.search != ""
  ) {
    const { count, rows } = await Claim.findAndCountAll({
      where: {
        [Op.or]: [
          { svh_code: { [Op.substring]: req.body.search } },
          { date: { [Op.substring]: req.body.search } },
          { company: { [Op.substring]: req.body.search } },
          { claim_code: { [Op.substring]: req.body.search } },
          { insurance_code: { [Op.substring]: req.body.search } },
          { employee: { [Op.substring]: req.body.search } },
        ],
      },
      order: [
        ["date", "DESC"],
        ["time", "DESC"],
      ],
      offset: Number(req.params.offset),
      limit: 10,
    });
    res.json({ body: { count, rows }, status: true });
  }
  if (
    req.body.dateSelected != "" &&
    req.body.companySelected == "" &&
    req.body.search != ""
  ) {
    const { count, rows } = await Claim.findAndCountAll({
      where: {
        [Op.or]: [
          { svh_code: { [Op.substring]: req.body.search } },
          { date: { [Op.substring]: req.body.date } },
          { company: { [Op.substring]: req.body.search } },
          { claim_code: { [Op.substring]: req.body.search } },
          { insurance_code: { [Op.substring]: req.body.search } },
          { employee: { [Op.substring]: req.body.search } },
        ],
        date: req.body.date,
      },
      order: [
        ["date", "DESC"],
        ["time", "DESC"],
      ],
      offset: Number(req.params.offset),
      limit: 10,
    });
    res.json({ body: { count, rows }, status: true });
  }
  if (
    req.body.dateSelected != "" &&
    req.body.companySelected != "" &&
    req.body.search != ""
  ) {
    const { count, rows } = await Claim.findAndCountAll({
      where: {
        [Op.or]: [
          { svh_code: { [Op.substring]: req.body.search } },
          { date: { [Op.substring]: req.body.date } },
          { company: { [Op.substring]: req.body.search } },
          { claim_code: { [Op.substring]: req.body.search } },
          { insurance_code: { [Op.substring]: req.body.search } },
          { employee: { [Op.substring]: req.body.search } },
        ],
        date: req.body.dateSelected,
        company: req.body.companySelected,
      },
      order: [
        ["date", "DESC"],
        ["time", "DESC"],
      ],
      offset: Number(req.params.offset),
      limit: 10,
    });
    res.json({ body: { count, rows }, status: true });
  }
  if (
    req.body.dateSelected != "" &&
    req.body.companySelected == "" &&
    req.body.search == ""
  ) {
    const { count, rows } = await Claim.findAndCountAll({
      where: {
        date: req.body.dateSelected,
      },
      order: [
        ["date", "DESC"],
        ["time", "DESC"],
      ],
      offset: Number(req.params.offset),
      limit: 10,
    });
    res.json({ body: { count, rows }, status: true });
  }
  if (
    req.body.dateSelected == "" &&
    req.body.companySelected != "" &&
    req.body.search == ""
  ) {
    const { count, rows } = await Claim.findAndCountAll({
      where: {
        company: req.body.companySelected,
      },
      order: [
        ["date", "DESC"],
        ["time", "DESC"],
      ],
      offset: Number(req.params.offset),
      limit: 10,
    });
    res.json({ body: { count, rows }, status: true });
  }
  if (
    req.body.dateSelected != "" &&
    req.body.companySelected != "" &&
    req.body.search == ""
  ) {
    const { count, rows } = await Claim.findAndCountAll({
      where: {
        company: req.body.companySelected,
        date: req.body.dateSelected,
      },
      order: [
        ["date", "DESC"],
        ["time", "DESC"],
      ],
      offset: Number(req.params.offset),
      limit: 10,
    });
    res.json({ body: { count, rows }, status: true });
  }
  if (
    req.body.dateSelected == "" &&
    req.body.companySelected != "" &&
    req.body.search != ""
  ) {
    const { count, rows } = await Claim.findAndCountAll({
      where: {
        [Op.or]: [
          { svh_code: { [Op.substring]: req.body.search } },
          { date: { [Op.substring]: req.body.date } },
          { company: { [Op.substring]: req.body.search } },
          { claim_code: { [Op.substring]: req.body.search } },
          { insurance_code: { [Op.substring]: req.body.search } },
          { employee: { [Op.substring]: req.body.search } },
        ],
        company: req.body.companySelected,
      },
      order: [
        ["date", "DESC"],
        ["time", "DESC"],
      ],
      offset: Number(req.params.offset),
      limit: 10,
    });
    res.json({ body: { count, rows }, status: true });
  }
  if (
    req.body.dateSelected == "" &&
    req.body.companySelected == "" &&
    req.body.search == ""
  ) {
    const { count, rows } = await Claim.findAndCountAll({
      order: [
        ["date", "DESC"],
        ["time", "DESC"],
      ],
      offset: Number(req.params.offset),
      limit: 10,
    });
    res.json({ body: { count, rows }, status: true });
  }
};

module.exports.createSubClaim = async (req, res) => {
  try {
    const count = await Subclaim.count({
      where: {
        sts: 1,
        svh_code: req.body.svh_code
      }
    });
    /* console.log(count); */
    let code = req.body.svh_code + "-" + (count + 1);
    /* console.log(code); */
    const Sclaim = await Subclaim.create({
      date: req.body.date,
      time: req.body.time,
      company: req.body.company,
      type: req.body.type,
      source_employee: req.body.source_employee,
      location: req.body.location,
      accident: req.body.accident,
      employee: req.body.employee,
      employee_id: req.body.employee_id,
      inspector: req.body.Inspector,
      inspector_id: req.body.inspector_id,
      inspector_mobile: req.body.inspector_mobile,
      time_dry: req.body.time_dry,
      date_dry: req.body.date_dry,
      province: req.body.province,
      district: req.body.district,
      brand_car: req.body.brand_car,
      customer_cliam_mobile: req.body.customer_cliam_mobile,
      customer_claim_name: req.body.customer_claim_name,
      license_plate: req.body.license_plate,
      claim_code: req.body.claim_code,
      insurance_code: req.body.insurance_code,
      svh_code: req.body.svh_code,
      code_sub: code,
    });
    if (Sclaim) {
      res.json({
        status: true,
        message: "Create claim success!!",
        code_sub: code,
      });
    } else {
      res.json({ status: false, message: "Create claim unsuccess!!" });
    }
  } catch (err) {
    console.log(err);
    res.json({ status: false, message: err });
  }
};

module.exports.getSubBySVHCODE = async (req, res) => {
  try {
    const allsub = await Subclaim.findAll({
      where: {
        svh_code: req.params.svhcode
      }
    });
    if(allsub){
      res.json({status: true, message: "Get subclaim success", body: allsub});
    }else{
      res.json({status: false, message: "Get subclaim unsuccess"});
    }
  } catch (err) {
    console.log(err);
    res.json({status: false, message: "Get subclaim unsuccess :" + err});
  }
};

module.exports.getSubBySUBCODE = async (req, res) => {
  try {
    const sub = await Subclaim.findAll({
      where: {
        code_sub: req.params.codesub
      }
    });
    if(sub){
      res.json({status: true, message: "Get subclaim success", body: sub});
    }else{
      res.json({status: false, message: "Get subclaim unsuccess"});
    }
  }catch(err){
    console.log(err);
    res.json({status: false, message: "Get subclaim unsuccess :" + err});
  }
}