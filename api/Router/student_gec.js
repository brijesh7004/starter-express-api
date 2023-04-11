const express = require('express');
const router = express.Router();
const studentSchema = require('../Model/studentSchema');
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
    if(req.body.totalPlacement != null){ filterJson.totalPlacement = req.body.totalPlacement; }
    // if(req.body.placementType != null){ filterJson.placementType = req.body.placementType; }
    // if(req.body.placementYear != null){ filterJson.placementYear = req.body.placementYear; }

    // console.log(filterJson);

    // studentSchema.find({id:{$exists:true}}).sort({created_at:-1})
    studentSchema.find(filterJson).sort({enrollmentno:1})
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
    // studentSchema.find({"title":req.params.title})
    studentSchema.findById(req.params.id)
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
    // studentSchema.find({"title":req.params.title})
    // console.log(req.params.enrollmentno);
    studentSchema.find({enrollmentno: req.params.enrollmentno})
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
router.get("/StudentLogin/:enrollmentno/:password",(req, res, next) => {
    // studentSchema.find({"title":req.params.title})
    studentSchema.find({"enrollmentno": req.params.enrollmentno})
    .then((result) => {
        // console.log(result);
        if(result.length==0){
            res.status(200).json({            
                response: false,
                status: 200
            })            
        }
        else{
            var isSuccess = ((result[0].accesstoken ?? "") == req.params.password) ||      
                        (((result[0].accesstoken ?? "") == "") && (req.params.enrollmentno == req.params.password));

            res.status(200).json({            
                response: isSuccess,
                student: isSuccess?result[0]:null,
                status: 200
            })
        }       
    })
    .catch((err) => {
        console.log(err);
        res.status(500).json({
            error: err,
            status: 500
        })
    });
});


router.post("/FilterStudent",(req, res, next) => {  
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
    if(req.body.totalPlacement != null){ filterJson.totalPlacement = req.body.totalPlacement; }
    // if(req.body.placementType != null){ filterJson.placementType = req.body.placementType; }
    // if(req.body.placementYear != null){ filterJson.placementYear = req.body.placementYear; }

    studentSchema.find(filterJson).sort({enrollmentno:1})
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

router.post("/",(req, res, next) => {  
    const notifyItem = new studentSchema({
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
        // placementType: req.body.placementType,
        // placementcompany: req.body.placementcompany,
        // placementinfo: req.body.placementinfo,
        // package: req.body.package,
        // placementdate: req.body.placementdate,
        // placementMonth: req.body.placementMonth,
        // placementYear: req.body.placementYear,

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

    studentSchema.findOneAndUpdate({_id:req.params.id,},{
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
            // placementType: req.body.placementType,
            // placementcompany: req.body.placementcompany,
            // placementinfo: req.body.placementinfo,
            // package: req.body.package,
            // placementdate: req.body.placementdate,
            // placementMonth: req.body.placementMonth,
            // placementYear: req.body.placementYear,   

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

    studentSchema.updateMany({_id:req.params.id},{$set:{"iscampusinterest":true}})
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

    studentSchema.updateMany({},{$set:{"iscampusinterest":false}})
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

    studentSchema.updateMany({},{$unset:{"id":1,}})
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
    studentSchema.findByIdAndRemove({_id: req.params.id})
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
    studentSchema.find({isplacement: true}).sort({enrollmentno:1})
    //.skip(req.body.offset??0).limit(req.body.limit??100)
    .then((result) => {
        // console.log(result)
        curYear = Number(req.params.year)

        index = 0
        finalResponse = []

        for(yr=curYear; yr>curYear-4; yr--){
            result1 = result.filter(x => (Date.parse(x.totalPlacement[0].placementYear + '-' + x.totalPlacement[0].placementMonth.toString().padStart(2,'0') + '-01') < Date.parse(yr + '-05-31')
                                    && Date.parse(x.totalPlacement[0].placementYear + '-' + x.totalPlacement[0].placementMonth.toString().padStart(2,'0') + '-01') > Date.parse(yr-1 + '-06-01'))) ?? []
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
                curResponse.civil = 0; curResponse.ce = 0; curResponse.ec = 0; 
                curResponse.it = 0; curResponse.mech = 0; curResponse.prod = 0;
                curResponse.ict = 0; curResponse.eie = 0;

                (result1.filter(x => x.branchcode==6) ?? []).forEach(element => {
                    curResponse.civil = curResponse.civil + element.totalPlacement.length;
                });

                (result1.filter(x => x.branchcode==7) ?? []).forEach(element => {
                    curResponse.ce = curResponse.ce + element.totalPlacement.length;
                });

                (result1.filter(x => x.branchcode==11) ?? []).forEach(element => {
                    curResponse.ec = curResponse.ec + element.totalPlacement.length;
                });

                (result1.filter(x => x.branchcode==16) ?? []).forEach(element => {
                    curResponse.it = curResponse.it + element.totalPlacement.length;
                });

                (result1.filter(x => x.branchcode==19) ?? []).forEach(element => {
                    curResponse.mech = curResponse.mech + element.totalPlacement.length;
                });

                (result1.filter(x => x.branchcode==25) ?? []).forEach(element => {
                    curResponse.prod = curResponse.prod + element.totalPlacement.length;
                });

                (result1.filter(x => x.branchcode==32) ?? []).forEach(element => {
                    curResponse.ict = curResponse.ict + element.totalPlacement.length;
                });

                (result1.filter(x => x.branchcode==47) ?? []).forEach(element => {
                    curResponse.eie = curResponse.eie + element.totalPlacement.length;
                });

                // curResponse.civil = (result1.filter(x => x.branchcode==6) ?? []).length; 
                // curResponse.ce = (result1.filter(x => x.branchcode==7) ?? []).length; 
                // curResponse.ec = (result1.filter(x => x.branchcode==11) ?? []).length; 
                // curResponse.it = (result1.filter(x => x.branchcode==16) ?? []).length; 
                // curResponse.mech = (result1.filter(x => x.branchcode==19) ?? []).length; 
                // curResponse.prod = (result1.filter(x => x.branchcode==25) ?? []).length; 
                // curResponse.ict = (result1.filter(x => x.branchcode==32) ?? []).length; 
                // curResponse.eie = (result1.filter(x => x.branchcode==47) ?? []).length; 

                curResponse.total = curResponse.civil + curResponse.ce + curResponse.ec + curResponse.it
                                + curResponse.mech + curResponse.prod + curResponse.ict + curResponse.eie;
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
    studentSchema.find({isplacement: true}).sort({enrollmentno:1})
    //.skip(req.body.offset??0).limit(req.body.limit??100)
    .then((result) => {
        // console.log(result)
        curYear = Number(req.params.year)
        result1 = result.filter(x => (Date.parse(x.totalPlacement[0].placementYear + '-' + x.totalPlacement[0].placementMonth.toString().padStart(2,'0') + '-01') < Date.parse(curYear + '-05-31')
                                    && Date.parse(x.totalPlacement[0].placementYear + '-' + x.totalPlacement[0].placementMonth.toString().padStart(2,'0') + '-01') > Date.parse(curYear-1 + '-06-01'))) ?? []
        // console.log('Result = ' + result1);
        // console.log('Result = ' + result1.length);

        // finalResult = []; itemCount=0;
        // result1.forEach(element =>{  
        //     if(element.totalPlacement.length>1){
        //         startCount = itemCount;
        //         for(idx=0; idx<element.totalPlacement.length; idx++){
        //             finalResult[itemCount++] = element;
        //         }    
                
        //         count2 = 0;
        //         for(idx=0; idx<element.totalPlacement.length; idx++){
        //             finalResult[startCount].totalPlacement = finalResult[startCount].totalPlacement[count2];
        //             startCount++; count2++;
        //         }    
        //     }
        //     else{
        //         element.totalPlacement = element.totalPlacement[0];
        //         finalResult[itemCount++] = element;
        //     }
        // })

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


router.put("/setMultiCompanyResponse/:sid/:cid/",(req, res, next) => {
    studentSchema.findById(req.params.sid)
    .then((result) => {
        // console.log(result);
        // console.log(result.iscampusinterest2);

        isCompanyExist = result.iscampusinterest2.filter(x => x==req.params.cid) ?? []
        // console.log(isCompanyExist);

        if(isCompanyExist.length == 0){
            studentSchema.updateMany(
                {_id:req.params.sid},
                { $push: {"iscampusinterest2":req.params.cid } }
            )
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
        }
        else{
            res.status(200).json({
                response: "Campus Already Applied",
                status: 201
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
});
router.put("/clearMultiCompanyResponse/:cid",(req, res, next) => {
    studentSchema.updateMany({},{$pull:{"iscampusinterest2":req.params.cid }})
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
router.get("/findMultiCompanyResponse/:cid/:limit/:offset",(req, res, next) => {
    studentSchema.find({iscampusinterest2: req.params.cid}).sort({enrollmentno:1})
    .skip(req.params.offset??0).limit(req.params.limit??10)
    .then((result) => {
        console.log(result);
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


module.exports = router;