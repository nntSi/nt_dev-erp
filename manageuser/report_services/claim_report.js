const PizZip = require("pizzip");
const Docxtemplater = require("docxtemplater");
const fs = require("fs");
const path = require("path");
const { Op, QueryTypes } = require("sequelize");
const Sequelize = require('sequelize');
const sequelize = require('../database');

// Load the docx file as binary content
const content = fs.readFileSync(
    path.resolve(__dirname, "./docx/claim.docx"),
    "binary"
);

module.exports.claimWord = async (req, res) => {
    const [results, metadata] = await sequelize
    .query("SELECT * FROM Claims LEFT JOIN Provinces ON Claims.province=Provinces.id WHERE svh_code = ?", {
      replacements: [req.params.svhcode],
      type: QueryTypes.SELECT
    });
    const [results2, metadata2] = await sequelize
    .query("SELECT * FROM Claims LEFT JOIN Districts ON Claims.district=Districts.id WHERE svh_code = ?", {
      replacements: [req.params.svhcode],
      type: QueryTypes.SELECT
    });
    /* console.log(results.name); */
    const month_th = ["มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน", "พฤษภาคม", "มิถุนายน", "กรกฎาคม", "สิงหาคม", "กันยายน", "ตุลาคม", "พฤศจิกายน", "ธันวาคม"];
    const dateArray = results.date.split("-");

    const zip = new PizZip(content);
    const doc = new Docxtemplater(zip, {
        paragraphLoop: true,
        linebreaks: true,
    });
    doc.render({
        /* svhcode: "sfgsss" */
        svh_code: results.svh_code,
        employee: results.employee,
        inspector: results.Inspector,
        inspector_mobile: results.inspector_mobile,
        company: results.company,
        type: results.type,
        location: results.location,
        date: parseInt(dateArray[2]),
        month: month_th[parseInt(dateArray[1]) - 1],
        year: dateArray[0],
        district: results2.district_name,
        province: results.province_name,
        source_employee: results.source_employee,
        customer_claim_name: results.customer_claim_name,
        customer_claim_mobile: results.customer_claim_mobile,
        license_plate: results.license_plate,
        brand_car: results.brand_car,
        time: results.time,
        date_dry: results.date_dry,
        time_dry: results.time_dry
    });
    buf = doc.getZip().generate({
        type: "nodebuffer",
        compression: "DEFLATE",
    });
    /* console.log(buf); */
    res.writeHead(200, {
        "Content-Type": "application/docx",
        "Content-Disposition": "attachment"
    }).end(buf)
    /* return fs.writeFileSync(path.resolve(__dirname, req.params.svhcode + "originx.docx"), buf); */
}