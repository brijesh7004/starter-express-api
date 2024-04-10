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

    if(req.body.prefTech != null){ filterJson.prefTech = req.body.prefTech; }

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

    if(req.body.prefTech != null){ filterJson.prefTech = req.body.prefTech; }

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

        prefTech: req.body.prefTech,

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
router.post("/insertBulk",(req, res, next) => {  
    newList = [];  idx=0;       

    // console.log(req.body['data']);
    const list = JSON.parse(req.body['data'])
    totalLen = list.length; curLen = 0;
    list.map(function(p){
        studentSchema.find({enrollmentno: p.enrollmentno})
        .then((result) =>{
            curLen++;
            // console.log(result);
            if(result.length==0){
                newList[idx++] = p;
            }

            if(curLen==totalLen){
                if(newList.length > 0){
                    studentSchema.bulkWrite(newList.map(function(p) { 
                        return {             
                            insertOne :{
                                document: new studentSchema({
                                    _id: new mongoose.Types.ObjectId,
                                
                                    enrollmentno: p.enrollmentno,
                                    name: p.name,
                                    accesstoken: p.accesstoken,
                                    branch: p.branch,
                                    branchcode: p.branchcode,
                                    academicyear: p.academicyear,
                                    email: p.email,
                                    mobile: p.mobile,
                                    birthdate: p.birthdate,
                                    gender: p.gender,
                                    category: p.category,
                                    prefTech: p.prefTech,
                                    
                                    grade10: p.grade10,
                                    grade12: p.grade12,
                                    isdiploma: p.isdiploma,
                                    graded2d: p.graded2d,
                                    totalbacklog: p.totalbacklog,
                                    finalcpi: p.finalcpi,
                                    finalcgpa: p.finalcgpa,
                                    
                                    sem1backlog: p.sem1backlog,
                                    sem1cpi: p.sem1cpi,
                                    sem1spi: p.sem1spi,
                                    sem2backlog: p.sem2backlog,
                                    sem2cpi: p.sem2cpi,
                                    sem2spi: p.sem2spi,
                                    sem3backlog: p.sem3backlog,
                                    sem3cpi: p.sem3cpi,
                                    sem3spi: p.sem3spi,
                                    sem4backlog: p.sem4backlog,
                                    sem4cpi: p.sem4cpi,
                                    sem4spi: p.sem4spi,
                            
                                    sem5backlog: p.sem5backlog,
                                    sem5cpi: p.sem5cpi,
                                    sem5spi: p.sem5spi,
                                    sem5cgpa: p.sem5cgpa,
                                    sem6backlog: p.sem6backlog,
                                    sem6cpi: p.sem6cpi,
                                    sem6spi: p.sem6spi,
                                    sem6cgpa: p.sem6cgpa,
                                    sem7backlog: p.sem7backlog,
                                    sem7cpi: p.sem7cpi,
                                    sem7spi: p.sem7spi,
                                    sem7cgpa: p.sem7cgpa,
                                    sem8backlog: p.sem8backlog,
                                    sem8cpi: p.sem8cpi,
                                    sem8spi: p.sem8spi,
                                    sem8cgpa: p.sem8cgpa,
                            
                                    // iscampusinterest: p.iscampusinterest,
                                    // isplacement: p.isplacement,
                            
                                    created_at: moment().format('YYYY-MM-DD hh:mm:ss'),
                                    modified_at: moment().format('YYYY-MM-DD hh:mm:ss'),
                                })
                            }
                        }
                    }))
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
                        response: [],
                        status: 200
                    })
                }
            }
        })
        .catch((err) => {
            console.log(err);
        });
    })
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
            
            prefTech: req.body.prefTech,

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
router.put("/updateBulk",(req, res, next) => {
    // console.log(req.body['data']);
    const list = JSON.parse(req.body['data'])
    studentSchema.bulkWrite(list.map(function(p) { 
        return { 
            updateOne:{filter: {_id: p.id},
                update: {
                    $set:{
                        name: p.name,
                        accesstoken: p.accesstoken,
                        // branch: p.branch,
                        // branchcode: p.branchcode,
                        // academicyear: p.academicyear,
                        // isdiploma: p.isdiploma,
                        email: p.email,
                        mobile: p.mobile,
                        birthdate: p.birthdate,
                        gender: p.gender,
                        category: p.category,
                        prefTech: p.prefTech,
                        
                        grade10: p.grade10,
                        grade12: p.grade12,
                        graded2d: p.graded2d,
                        totalbacklog: p.totalbacklog,
                        finalcpi: p.finalcpi,
                        finalcgpa: p.finalcgpa,
                        
                        sem1backlog: p.sem1backlog,
                        sem1cpi: p.sem1cpi,
                        sem1spi: p.sem1spi,
                        sem2backlog: p.sem2backlog,
                        sem2cpi: p.sem2cpi,
                        sem2spi: p.sem2spi,
                        sem3backlog: p.sem3backlog,
                        sem3cpi: p.sem3cpi,
                        sem3spi: p.sem3spi,
                        sem4backlog: p.sem4backlog,
                        sem4cpi: p.sem4cpi,
                        sem4spi: p.sem4spi,
                
                        sem5backlog: p.sem5backlog,
                        sem5cpi: p.sem5cpi,
                        sem5spi: p.sem5spi,
                        sem5cgpa: p.sem5cgpa,
                        sem6backlog: p.sem6backlog,
                        sem6cpi: p.sem6cpi,
                        sem6spi: p.sem6spi,
                        sem6cgpa: p.sem6cgpa,
                        sem7backlog: p.sem7backlog,
                        sem7cpi: p.sem7cpi,
                        sem7spi: p.sem7spi,
                        sem7cgpa: p.sem7cgpa,
                        sem8backlog: p.sem8backlog,
                        sem8cpi: p.sem8cpi,
                        sem8spi: p.sem8spi,
                        sem8cgpa: p.sem8cgpa,
                
                        iscampusinterest: p.iscampusinterest,
                        isplacement: p.isplacement,
            
                        modified_at: moment().format('YYYY-MM-DD hh:mm:ss'),
                    }
                }
        }}
    }))
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
    .then((result) => {
        // console.log(result)
        curYear = Number(req.params.year)

        finalResponse = []; index = 0;
        for(yr=curYear; yr>curYear-4; yr--){
            numEC=0; numIT=0; numCE=0; numCivil=0; numMech=0; numProd=0; numICT=0; numEIE=0;
            
            for(cmps=1; cmps<=10; cmps++){
                result1 = result.filter(x => x.totalPlacement.length==cmps) ?? [];

                if(result1.length>0){
                    result1.forEach(student => {
                        for(cmps2=0; cmps2<cmps; cmps2++){
                            isSuccess = (Date.parse(student.totalPlacement[cmps2].placementYear + '-' + student.totalPlacement[cmps2].placementMonth.toString().padStart(2,'0') + '-01') < Date.parse(yr + '-05-31')
                                            && Date.parse(student.totalPlacement[cmps2].placementYear + '-' + student.totalPlacement[cmps2].placementMonth.toString().padStart(2,'0') + '-01') > Date.parse(yr-1 + '-06-01'));
                            
                            if(isSuccess){
                                if(student.branchcode==6){ numCivil++; }
                                if(student.branchcode==7){ numCE++; }
                                if(student.branchcode==11){ numEC++; }
                                if(student.branchcode==16){ numIT++; }
                                if(student.branchcode==19){ numMech++; }
                                if(student.branchcode==25){ numProd++; }
                                if(student.branchcode==32){ numICT++; }
                                if(student.branchcode==47){ numEIE++; }
                            }
                        }
                    });
                }
            }

            curResponse = { 'year': yr }
            curResponse.civil = numCivil; curResponse.ce = numCE; curResponse.ec = numEC; 
            curResponse.it = numIT; curResponse.mech = numMech; curResponse.prod = numProd;
            curResponse.ict = numICT; curResponse.eie = numEIE;
            curResponse.total = numCivil + numCE + numEC + numIT + numMech + numProd + numICT + numEIE;

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
            error: err + '.',
            status: 500
        })
    });
});
router.get("/GetPlacementList/:year",(req, res, next) => {
    studentSchema.find({isplacement: true}).sort({enrollmentno:1})
    .then((result) => {
        // console.log(result)
        curYear = Number(req.params.year)
        
        finalResponse = []; index = 0;
        for(cmps=1; cmps<=10; cmps++){
            result1 = result.filter(x => x.totalPlacement.length==cmps) ?? [];

            if(result1.length>0){
                result1.forEach(student => {
                    isSuccess = false;
                    for(cmps2=0; cmps2<cmps; cmps2++){
                        isSuccess |= (Date.parse(student.totalPlacement[cmps2].placementYear + '-' + student.totalPlacement[cmps2].placementMonth.toString().padStart(2,'0') + '-01') < Date.parse(curYear + '-05-31')
                                        && Date.parse(student.totalPlacement[cmps2].placementYear + '-' + student.totalPlacement[cmps2].placementMonth.toString().padStart(2,'0') + '-01') > Date.parse(curYear-1 + '-06-01'));
                    }
                    if(isSuccess){  finalResponse[index++] = student }
                });
            }
        }

        res.status(200).json({
            response: finalResponse,
            status: 200
        })
    })
    .catch((err) => {
        // console.log(err);
        res.status(500).json({
            error: err + '.',
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