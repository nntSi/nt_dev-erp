const { Op } = require("sequelize");
const Claim = require("../models/Claim");
const Subclaim = require("../models/Subclaim");
const Claimold = require("../models/Claimold");

module.exports.getAllClaim = async (req, res) => {
  try {
    const { count, rows } = await Claim.findAndCountAll({
      order: [
        ["date", "DESC"],
        ["time", "DESC"],
        ["id", "DESC"]
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
const SECCOND = "0";
const START = 1;

module.exports.createClaim = async (req, res) => {
  try {
    const count = await Claim.count({ where: { sts: 1 } });
    let code = FIRSTCODE + SECCOND + (START + count);
    const claim = await Claim.create({
      id: START + count,
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
    console.log(err)
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
        svh_code: req.body.svh_code,
      },
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
      customer_claim_mobile: req.body.customer_claim_mobile,
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
        svh_code: req.params.svhcode,
      },
    });
    if (allsub) {
      res.json({ status: true, message: "Get subclaim success", body: allsub });
    } else {
      res.json({ status: false, message: "Get subclaim unsuccess" });
    }
  } catch (err) {
    console.log(err);
    res.json({ status: false, message: "Get subclaim unsuccess :" + err });
  }
};

module.exports.getSubBySUBCODE = async (req, res) => {
  try {
    const sub = await Subclaim.findAll({
      order: [
        ["date", "DESC"],
        ["time", "DESC"],
      ],
      where: {
        code_sub: req.params.codesub,
      },
    });
    if (sub) {
      res.json({ status: true, message: "Get subclaim success", body: sub });
    } else {
      res.json({ status: false, message: "Get subclaim unsuccess" });
    }
  } catch (err) {
    console.log(err);
    res.json({ status: false, message: "Get subclaim unsuccess :" + err });
  }
};

module.exports.deleteSubClaim = async (req, res) => {
  try {
    const subDelete = await Subclaim.destroy({
      where: {
        code_sub: req.params.codesub,
      },
    });
    if (subDelete) {
      res.json({ status: true, message: "Delete this sub claim successful" });
    } else {
      res.json({ status: false, message: "Can't delete this sub claim" });
    }
  } catch (err) {
    console.log(err);
    res.json({ status: false, message: "Can't delete this sub claim:" + err });
  }
};

module.exports.updateSubClaimBySUBCODE = async (req, res) => {
  try {
    const upsub = await Subclaim.update(req.body, {
      where: {
        code_sub: req.params.subcode,
      },
    });
    if (upsub) {
      res.json({ message: "Update subclaim success", status: true });
    } else {
      res.json({ message: "Update data unsuccess 1", status: false });
    }
  } catch (err) {
    res.json({ message: "Update data unsuccess 2" + err, status: false });
  }
};

module.exports.createOldClaim = async (req, res) => {
  try{
    const [old_claim, created] = await Claimold.findOrCreate({
      where: { svh_code: req.body.svh_code },
      defaults: req.body
    });
    if(created){
      res.json({status: true, message: "Create old claim successful!!!", body: old_claim});
    }else{
      res.json({status: false, message: "รหัสเคลมนี้มีอยู่ในระบบแล้ว"});
    }
  }catch(err){
    res.json({status: false, message: "Create old claim error is : " + err});
  }
};

module.exports.updateLoopClaim = async (req, res) => {
  let dArray = req.body.data
  /* console.log(dArray.length) */
  for(let i = 0; i < dArray.length; i++){
    /* console.log(dArray[i].date); */
    await Claim.update({
      date: dArray[i].date,
      time: dArray[i].time,
      company: dArray[i].company,
      type: dArray[i].type,
      employee: dArray[i].employee,
      inspector_id: dArray[i].inspector_id,
      Inspector: dArray[i].Inspector,
      source_employee: dArray[i].source_employee,
      location: dArray[i].location,
      accident: dArray[i].accident,
      inspector_mobile: dArray[i].inspector_mobile,
      date_dry: dArray[i].date_dry,
      time_dry: dArray[i].time_dry,
      province: dArray[i].province,
      district: dArray[i].district,
      brand_car: dArray[i].brand_car,
      customer_claim_mobile: dArray[i].customer_claim_mobile	,
      customer_claim_name: dArray[i].customer_claim_name,
      license_plate: dArray[i].license_plate,
    }, {
      where: {
        svh_code: dArray[i].svh_code,
      },
    });
  }
  res.json({ status: true, message: "Update claim successful " });
}