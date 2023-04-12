const express = require('express');
const router = express.Router();
const campusSchema = require('../Model/campusSchema');
const studentSchema = require('../Model/studentSchema');
const mongoose = require('mongoose');
const moment = require('moment');

router.get("/",(req, res, next) => {
    //query => ?offset=0&limit=10
    //body  => { "offset":0, "limit":10 }

    filterJson = {}
    if(req.query.cname != null){ filterJson = { $text: { $search: req.query.cname } }; }
    
    if(req.query.enrollmentno != null){ filterJson.enrollmentno = req.query.enrollmentno; }
    if(req.query.branchcode != null){ filterJson.branchcode = req.query.branchcode; }
    if(req.query.placementType != null){ filterJson.placementType = req.query.placementType; }
    if(req.query.pYear != null){ filterJson.placementYear = req.query.pYear; }
    if(req.query.pMonth != null){ filterJson.placementMonth = req.query.pMonth; }
    if(req.query.pkgMax != null){ filterJson.package = { $lt: req.query.pkgMax}; }
    if(req.query.pkgMin != null){ filterJson.package = { $gte: req.query.pkgMin}; }

    // console.log(filterJson);

    // campusSchema.find({id:{$exists:true}}).sort({created_at:-1})
    campusSchema.find(filterJson).sort({enrollmentno:1})
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
router.post("/FilterStudent",(req, res, next) => {  
    filterJson = {}
    if(req.body.cname != null){ filterJson = { $text: { $search: req.body.cname } }; }
    
    if(req.body.enrollmentno != null){ filterJson.enrollmentno = req.body.enrollmentno; }
    if(req.body.branchcode != null){ filterJson.branchcode = req.body.branchcode; }
    if(req.body.placementType != null){ filterJson.placementType = req.body.placementType; }
    if(req.body.pYear != null){ filterJson.placementYear = req.body.pYear; }
    if(req.body.pMonth != null){ filterJson.placementMonth = req.body.pMonth; }
    if(req.body.pkgMax != null){ filterJson.package = { $lt: req.body.pkgMax}; }
    if(req.body.pkgMin != null){ filterJson.package = { $gte: req.body.pkgMin}; }

    // console.log(filterJson);
    campusSchema.find(filterJson).sort({enrollmentno:1})
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
    // campusSchema.find({"title":req.params.title})
    campusSchema.findById(req.params.id)
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
    // campusSchema.find({"title":req.params.title})
    // console.log(req.params.enrollmentno);
    campusSchema.find({enrollmentno: req.params.enrollmentno})
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
    const notifyItem = new campusSchema({
        _id: new mongoose.Types.ObjectId,
        id: req.body.id,

        enrollmentno: req.body.enrollmentno,
        branchcode: req.body.branchcode,
        placementType: req.body.placementType,
        placementcompany: req.body.placementcompany,
        placementinfo: req.body.placementinfo,
        package: req.body.package,
        placementdate: req.body.placementdate,
        placementMonth: req.body.placementMonth,
        placementYear: req.body.placementYear,
    });    

    notifyItem.save()
    .then((result) => {
        // console.log(result);
        campusSchema.find({ enrollmentno: req.body.enrollmentno })
        .then((result2) => { 
            totalCampus = result2 

            studentSchema.find({enrollmentno: req.body.enrollmentno})
            .then((result) => {
                   mongoId = result.length==1?result[0]._id:0; 

                   if(mongoId != 0){
                        studentSchema.findOneAndUpdate({_id:mongoId,},{
                            $set:{
                                isplacement: true,
                                totalPlacement: totalCampus,
                                modified_at: moment().format('YYYY-MM-DD hh:mm:ss'),
                            }
                        })
                        .then((result) => {
                            // console.log(result);
                            res.status(200).json({
                                response: totalCampus,
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
                    }
                    else if(totalCampus.length>0){
                        res.status(209).json({
                            error: "Campus Added but, Can not Update Student",
                            status: 500
                        })
                    }
                    else{
                        res.status(500).json({
                            error: "Failed to Add Campus",
                            status: 500
                        })
                    }
                })
            .catch((err) => {
                // console.log(err);
                res.status(500).json({
                    error: err,
                    status: 500
                })
            });
        
        })
        .catch((err) => {
            // console.log(err);
            res.status(500).json({
                error: err,
                status: 500
            })
        });
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
    campusSchema.findOneAndUpdate({_id:req.params.id,},{
        $set:{
            enrollmentno: req.body.enrollmentno,
            branchcode: req.body.branchcode,
            placementType: req.body.placementType,
            placementcompany: req.body.placementcompany,
            placementinfo: req.body.placementinfo,
            package: req.body.package,
            placementdate: req.body.placementdate,
            placementMonth: req.body.placementMonth,
            placementYear: req.body.placementYear,    
        }
    })
    .then((result) => {
        campusSchema.find({ enrollmentno: req.body.enrollmentno })
        .then((result2) => { 
            totalCampus = result2 

            studentSchema.find({enrollmentno: req.body.enrollmentno})
            .then((result) => {
                   mongoId = result.length==1?result[0]._id:0; 

                   if(mongoId != 0){
                        studentSchema.findOneAndUpdate({_id:mongoId,},{
                            $set:{
                                isplacement: true,
                                totalPlacement: totalCampus,
                                modified_at: moment().format('YYYY-MM-DD hh:mm:ss'),
                            }
                        })
                        .then((result) => {
                            // console.log(result);
                            res.status(200).json({
                                response: totalCampus,
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
                    }
                    else if(totalCampus.length>0){
                        res.status(209).json({
                            error: "Campus Added but, Can not Update Student",
                            status: 500
                        })
                    }
                    else{
                        res.status(500).json({
                            error: "Failed to Add Campus",
                            status: 500
                        })
                    }
                })
            .catch((err) => {
                // console.log(err);
                res.status(500).json({
                    error: err,
                    status: 500
                })
            });
        
        })
        .catch((err) => {
            // console.log(err);
            res.status(500).json({
                error: err,
                status: 500
            })
        });
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
    campusSchema.findByIdAndRemove({_id: req.params.id})
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




router.get("/GetPlacementStatistics/:year",(req, res, next) => {
    filterJson = {}
    filterJson.placementYear = { $lt: Number(req.params.year)+2};
    filterJson.placementYear = { $gte: Number(req.params.year)-3};

    campusSchema.find(filterJson).sort({enrollmentno:1})
    .then((result) => {
        curYear = Number(req.params.year)

        index = 0
        finalResponse = []

        for(yr=curYear; yr>curYear-4; yr--){
            result1 = result.filter(x => (Date.parse(x.placementYear + '-' + x.placementMonth.toString().padStart(2,'0') + '-01') < Date.parse(yr + '-05-31')
                                    && Date.parse(x.placementYear + '-' + x.placementMonth.toString().padStart(2,'0') + '-01') > Date.parse(yr-1 + '-06-01'))) ?? []
            // console.log('Result = ' + result1);
            // console.log('Result = ' + result1.length);
            
            curResponse = { 'year': yr }

            if(result1.length == 0){
                curResponse.civil = 0; curResponse.ce = 0; curResponse.ec = 0; 
                curResponse.it = 0; curResponse.mech = 0; curResponse.prod = 0;
                curResponse.ict = 0; curResponse.eie = 0;
                curResponse.total = 0;
            }
            else{
                curResponse.civil = (result1.filter(x => x.branchcode==6) ?? []).length; 
                curResponse.ce = (result1.filter(x => x.branchcode==7) ?? []).length; 
                curResponse.ec = (result1.filter(x => x.branchcode==11) ?? []).length; 
                curResponse.it = (result1.filter(x => x.branchcode==16) ?? []).length; 
                curResponse.mech = (result1.filter(x => x.branchcode==19) ?? []).length; 
                curResponse.prod = (result1.filter(x => x.branchcode==25) ?? []).length; 
                curResponse.ict = (result1.filter(x => x.branchcode==32) ?? []).length; 
                curResponse.eie = (result1.filter(x => x.branchcode==47) ?? []).length; 
                curResponse.total = result1.length
            }

            finalResponse[index++] = curResponse
        }

        res.status(200).json({
            response: finalResponse,
            status: 200
        })
    })
    .catch((err) => {
        // console.log(err);
        res.status(500).json({
            error: err + ' -0',
            status: 500
        })
    });
});
router.get("/GetPlacementList/:year",(req, res, next) => {
    filterJson = {}
    filterJson.placementYear = { $lt: Number(req.params.year)+2};
    filterJson.placementYear = { $gte: Number(req.params.year)};

    campusSchema.find(filterJson).sort({enrollmentno:1})
    //.skip(req.body.offset??0).limit(req.body.limit??100)
    .then((result) => {
        // console.log(result)
        curYear = Number(req.params.year)
        result1 = result.filter(x => (Date.parse(x.placementYear + '-' + x.placementMonth.toString().padStart(2,'0') + '-01') < Date.parse(curYear + '-05-31')
                                    && Date.parse(x.placementYear + '-' + x.placementMonth.toString().padStart(2,'0') + '-01') > Date.parse(curYear-1 + '-06-01'))) ?? []
        // console.log('Result = ' + result1);
        // console.log('Result = ' + result1.length);

        res.status(200).json({
            response: result1,
            status: 200
        })
    })
    .catch((err) => {
        // console.log(err);
        res.status(500).json({
            error: err + ' -0',
            status: 500
        })
    });
});

module.exports = router;