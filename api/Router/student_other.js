const express = require('express');
const router = express.Router();
const studentSchema2 = require('../Model/studentSchema2');
const mongoose = require('mongoose');
const moment = require('moment');

router.get("/",(req, res, next) => {
    //query => ?offset=0&limit=10
    //body  => { "offset":0, "limit":10 }

    filterJson = {}
    if(req.body.name != null){ filterJson = { $text: { $search: req.body.name } }; }
    
    if(req.body.enrollmentno != null){ filterJson.enrollmentno = req.body.enrollmentno; }
    if(req.body.branch != null){ filterJson.branch = req.body.branch; }
    if(req.body.branchcode != null){ filterJson.branchcode = req.body.branchcode; }
    if(req.body.academicyear != null){ filterJson.academicyear = req.body.academicyear; }
    
    if(req.body.email != null){ filterJson.email = req.body.email; }
    if(req.body.mobile != null){ filterJson.mobile = req.body.mobile; }
    if(req.body.gender != null){ filterJson.gender = req.body.gender; }
    if(req.body.category != null){ filterJson.category = req.body.category; }

    if(req.body.grade10 != null){ filterJson.grade10 = { $gte: req.body.grade10}; }
    if(req.body.grade12 != null){ filterJson.grade12 = { $gte: req.body.grade12}; }
    if(req.body.graded2d != null){ filterJson.graded2d = { $gte: req.body.graded2d}; }
    if(req.body.isdiploma != null){ filterJson.isdiploma = req.body.isdiploma; }
    
    if(req.body.totalbacklog != null){ filterJson.totalbacklog = { $gte: req.body.totalbacklog}; }
    if(req.body.finalcpi != null){ filterJson.finalcpi = { $gte: req.body.finalcpi}; }
    if(req.body.finalcgpa != null){ filterJson.finalcgpa = { $gte: req.body.finalcgpa}; }

    if(req.body.sem5cgpa != null){ filterJson.sem5cgpa = { $gte: req.body.sem5cgpa}; }
    if(req.body.sem6cgpa != null){ filterJson.sem6cgpa = { $gte: req.body.sem6cgpa}; }
    if(req.body.sem7cgpa != null){ filterJson.sem7cgpa = { $gte: req.body.sem7cgpa}; }
    if(req.body.sem8cgpa != null){ filterJson.sem8cgpa = { $gte: req.body.sem8cgpa}; }
    
    if(req.body.isplacement != null){ filterJson.isplacement = req.body.isplacement; }
    if(req.body.iscampusinterest != null){ filterJson.iscampusinterest = req.body.iscampusinterest; }
    if(req.body.isPlacedInFare != null){ filterJson.isPlacedInFare = req.body.isPlacedInFare; }
    if(req.body.placementYear != null){ filterJson.placementYear = req.body.placementYear; }

    // console.log(filterJson);

    // studentSchema2.find({id:{$exists:true}}).sort({created_at:-1})
    studentSchema2.find(filterJson)//.sort({enrollmentno:-1})
    .skip(req.body.offset??0).limit(req.body.limit??100)
    .then((result) => {
        // console.log(result);
        res.status(200).json({
            response: result,
            status: 200
        })
    })
    .catch((err) => {
        // console.log(err);
        res.status(500).json({
            error: err,
            status: 500
        })
    });
});

router.get("/:id",(req, res, next) => {
    // studentSchema2.find({"title":req.params.title})
    studentSchema2.findById(req.params.id)
    .then((result) => {
        // console.log(result);
        res.status(200).json({
            response: result,
            status: 200
        })
    })
    .catch((err) => {
        // console.log(err);
        res.status(500).json({
            error: err,
            status: 500
        })
    });
});
router.get("/IsStudentExist/:enrollmentno",(req, res, next) => {
    // studentSchema2.find({"title":req.params.title})
    studentSchema2.find({enrollmentno: req.params.enrollmentno})
    .then((result) => {
        // console.log(result);
        res.status(200).json({            
            response: result.length==1?result[0]._id:0,
            student: result.length==1?result[0]:null,
            status: 200
        })
    })
    .catch((err) => {
        // console.log(err);
        res.status(500).json({
            error: err,
            status: 500
        })
    });
});



router.post("/",(req, res, next) => {  
    const notifyItem = new studentSchema2({
        _id: new mongoose.Types.ObjectId,
        id: req.body.id,

        enrollmentno: req.body.enrollmentno,
        name: req.body.name,
        accesstoken: req.body.accesstoken,
        branch: req.body.branch,
        branchcode: req.body.branchcode,
        academicyear: req.body.academicyear,
        email: req.body.email,
        mobile: req.body.mobile,
        birthdate: req.body.birthdate,
        gender: req.body.gender,
        category: req.body.category,
        
        grade10: req.body.grade10,
        grade12: req.body.grade12,
        isdiploma: req.body.isdiploma,
        graded2d: req.body.graded2d,
        totalbacklog: req.body.totalbacklog,
        finalcpi: req.body.finalcpi,
        finalcgpa: req.body.finalcgpa,
        
        sem1backlog: req.body.sem1backlog,
        sem1cpi: req.body.sem1cpi,
        sem1spi: req.body.sem1spi,
        sem2backlog: req.body.sem2backlog,
        sem2cpi: req.body.sem2cpi,
        sem2spi: req.body.sem2spi,
        sem3backlog: req.body.sem3backlog,
        sem3cpi: req.body.sem3cpi,
        sem3spi: req.body.sem3spi,
        sem4backlog: req.body.sem4backlog,
        sem4cpi: req.body.sem4cpi,
        sem4spi: req.body.sem4spi,

        sem5backlog: req.body.sem5backlog,
        sem5cpi: req.body.sem5cpi,
        sem5spi: req.body.sem5spi,
        sem5cgpa: req.body.sem5cgpa,
        sem6backlog: req.body.sem6backlog,
        sem6cpi: req.body.sem6cpi,
        sem6spi: req.body.sem6spi,
        sem6cgpa: req.body.sem6cgpa,
        sem7backlog: req.body.sem7backlog,
        sem7cpi: req.body.sem7cpi,
        sem7spi: req.body.sem7spi,
        sem7cgpa: req.body.sem7cgpa,
        sem8backlog: req.body.sem8backlog,
        sem8cpi: req.body.sem8cpi,
        sem8spi: req.body.sem8spi,
        sem8cgpa: req.body.sem8cgpa,

        iscampusinterest: req.body.iscampusinterest,
        isplacement: req.body.isplacement,
        isPlacedInFare: req.body.isPlacedInFare,
        placementcompany: req.body.placementcompany,
        placementinfo: req.body.placementinfo,
        package: req.body.package,
        placementdate: req.body.placementdate,
        placementMonth: req.body.placementMonth,
        placementYear: req.body.placementYear,

        created_at: moment().format('YYYY-MM-DD hh:mm:ss'),
        modified_at: moment().format('YYYY-MM-DD hh:mm:ss'),
    });    

    notifyItem.save()
    .then((result) => {
        // console.log(result);
        res.status(200).json({
            response: result,
            status: 200
        })
    })
    .catch((err) => {
        // console.log(err);
        res.status(500).json({
            error: err,
            status: 500 
        })
    });
});


router.put("/update/:id",(req, res, next) => {
    // console.log(req.body);

    studentSchema2.findOneAndUpdate({_id:req.params.id,},{
        $set:{
            name: req.body.name,
            accesstoken: req.body.accesstoken,
            // branch: req.body.branch,
            // branchcode: req.body.branchcode,
            // academicyear: req.body.academicyear,
            email: req.body.email,
            mobile: req.body.mobile,
            birthdate: req.body.birthdate,
            gender: req.body.gender,
            category: req.body.category,
            
            grade10: req.body.grade10,
            grade12: req.body.grade12,
            isdiploma: req.body.isdiploma,
            graded2d: req.body.graded2d,
            totalbacklog: req.body.totalbacklog,
            finalcpi: req.body.finalcpi,
            finalcgpa: req.body.finalcgpa,
            
            sem1backlog: req.body.sem1backlog,
            sem1cpi: req.body.sem1cpi,
            sem1spi: req.body.sem1spi,
            sem2backlog: req.body.sem2backlog,
            sem2cpi: req.body.sem2cpi,
            sem2spi: req.body.sem2spi,
            sem3backlog: req.body.sem3backlog,
            sem3cpi: req.body.sem3cpi,
            sem3spi: req.body.sem3spi,
            sem4backlog: req.body.sem4backlog,
            sem4cpi: req.body.sem4cpi,
            sem4spi: req.body.sem4spi,
    
            sem5backlog: req.body.sem5backlog,
            sem5cpi: req.body.sem5cpi,
            sem5spi: req.body.sem5spi,
            sem5cgpa: req.body.sem5cgpa,
            sem6backlog: req.body.sem6backlog,
            sem6cpi: req.body.sem6cpi,
            sem6spi: req.body.sem6spi,
            sem6cgpa: req.body.sem6cgpa,
            sem7backlog: req.body.sem7backlog,
            sem7cpi: req.body.sem7cpi,
            sem7spi: req.body.sem7spi,
            sem7cgpa: req.body.sem7cgpa,
            sem8backlog: req.body.sem8backlog,
            sem8cpi: req.body.sem8cpi,
            sem8spi: req.body.sem8spi,
            sem8cgpa: req.body.sem8cgpa,
    
            iscampusinterest: req.body.iscampusinterest,
            isplacement: req.body.isplacement,
            isPlacedInFare: req.body.isPlacedInFare,
            placementcompany: req.body.placementcompany,
            placementinfo: req.body.placementinfo,
            package: req.body.package,
            placementdate: req.body.placementdate,
            placementMonth: req.body.placementMonth,
            placementYear: req.body.placementYear,   

            modified_at: moment().format('YYYY-MM-DD hh:mm:ss'),
        }
    })
    .then((result) => {
        // console.log(result);
        res.status(200).json({
            response: result,
            status: 200
        })
    })
    .catch((err) => {
        // console.log(err);
        res.status(500).json({
            error: err,
            status: 500
        })
    });
});
router.put("/setCompanyResponse/:id",(req, res, next) => {
    // console.log("Clear Item");

    studentSchema2.updateMany({_id:req.params.id},{$set:{"iscampusinterest":true}})
    .then((result) => {
        // console.log(result);
        res.status(200).json({
            response: result,
            status: 200
        })
    })
    .catch((err) => {
        // console.log(err);
        res.status(500).json({
            error: err,
            status: 500
        })
    });
});
router.put("/clearCompanyResponse",(req, res, next) => {
    // console.log("Clear Item");

    studentSchema2.updateMany({},{$set:{"iscampusinterest":false}})
    .then((result) => {
        // console.log(result);
        res.status(200).json({
            response: result,
            status: 200
        })
    })
    .catch((err) => {
        // console.log(err);
        res.status(500).json({
            error: err,
            status: 500
        })
    });
});
router.put("/clearid",(req, res, next) => {
    // console.log("Clear Item");

    studentSchema2.updateMany({},{$unset:{"id":1}})
    .then((result) => {
        // console.log(result);
        res.status(200).json({
            response: result,
            status: 200
        })
    })
    .catch((err) => {
        // console.log(err);
        res.status(500).json({
            error: err,
            status: 500
        })
    });
});

router.delete("/:id",(req, res, next) => {
    studentSchema2.findByIdAndRemove({_id: req.params.id})
    .then((result) => {
        // console.log(result);
        res.status(200).json({
            msg: "Item Deleted",
            response: result,
            status: 200
        })
    })
    .catch((err) => {
        // console.log(err);
        res.status(500).json({
            error: err,
            status: 500
        })
    });
});


module.exports = router;