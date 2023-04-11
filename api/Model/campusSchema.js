const mongoose = require('mongoose');
const campusSchema = new mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,

    enrollmentno: String,
    branchcode: Number,
    placementType: String,
    placementcompany: String,
    placementinfo: String,
    package: Number,
    placementdate: String,
    placementMonth: Number,
    placementYear: Number,
});

module.exports = mongoose.model('campusSchema', campusSchema, 'campus');