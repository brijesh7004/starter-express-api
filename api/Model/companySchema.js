const mongoose = require('mongoose');
const companySchema = new mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    id:String,
    name:String,
    address:String,
    website:String,
    package:String,
    pkgMin:Number,
    pkgMax:Number,
    campusdate:String,
    grade10:Number,
    grade12:Number,
    graded2d:Number,
    cpi:Number,
    cgpa:Number,
    backlog:Number,
    created_at:String,
    modified_at:String,

    branchEC: Boolean,
    branchIT: Boolean,
    branchCE: Boolean,
    branchCivil: Boolean,
    branchMech: Boolean,
    branchProd: Boolean,
    branchICT: Boolean,
    branchEIE: Boolean,

    isCampusActive: Boolean,
});

module.exports = mongoose.model('companySchema', companySchema, 'company_data');