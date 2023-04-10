const mongoose = require('mongoose');
const studentSchema = new mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    id: String,

    enrollmentno: String,
    name: String,
    accesstoken: String,

    branch: String,
    branchcode: Number,
    academicyear: Number,

    email: String,
    mobile: String,
    birthdate: String,
    gender: String,
    category: String,

    grade10: Number,
    grade12: Number,
    isdiploma: Boolean,
    graded2d: Number,

    totalbacklog: Number,
    finalcpi: Number,
    finalcgpa: Number,

    sem1backlog: Number,
    sem1cpi: Number,
    sem1spi: Number,

    sem2backlog: Number,
    sem2cpi: Number,
    sem2spi: Number,

    sem3backlog: Number,
    sem3cpi: Number,
    sem3spi: Number,

    sem4backlog: Number,
    sem4cpi: Number,
    sem4spi: Number,

    sem5backlog: Number,
    sem5cpi: Number,
    sem5spi: Number,
    sem5cgpa: Number,

    sem6backlog: Number,
    sem6cpi: Number,
    sem6spi: Number,
    sem6cgpa: Number,

    sem7backlog: Number,
    sem7cpi: Number,
    sem7spi: Number,
    sem7cgpa: Number,

    sem8backlog: Number,
    sem8cpi: Number,
    sem8spi: Number,
    sem8cgpa: Number,
    
    iscampusinterest: Boolean,
    isplacement: Boolean,
    placementType: String,
    placementcompany: String,
    placementinfo: String,
    package: Number,
    placementdate: String,
    placementMonth: Number,
    placementYear: Number,
    created_at: String,
    modified_at: String,

    iscampusinterest2: Array,
});

module.exports = mongoose.model('studentSchema', studentSchema, 'student_gec');