const mongoose = require('mongoose');
const admissionSchema = new mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,

    year:Number,
    total:Number,
    ec:Number,
    it:Number,
    ce:Number,
    civil:Number,
    mech:Number,
    prod:Number,
    ict:Number,
    eie:Number,
});

module.exports = mongoose.model('admissionSchema', admissionSchema, 'student_admission');