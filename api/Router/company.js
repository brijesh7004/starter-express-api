const express = require('express');
const router = express.Router();
const companySchema = require('../Model/companySchema');
const mongoose = require('mongoose');
const moment = require('moment');

router.get("/",(req, res, next) => {
    //query => ?offset=0&limit=10
    //body  => { "offset":0, "limit":10 }

    // companySchema.find({id:{$exists:true}}).sort({created_at:-1})
    companySchema.find().sort({created_at:-1})
    .skip(req.query.offset??0).limit(req.query.limit??100)
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
    // companySchema.find({"title":req.params.title})
    companySchema.findById(req.params.id)
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
    
    if((req.body.key ?? '000') == 'gec-placement-2023'){
        const notifyItem = new companySchema({
            _id: new mongoose.Types.ObjectId,
            name: req.body.name,
            address: req.body.address,
            website: req.body.website,
            package: req.body.package,
            pkgMin: req.body.pkgMin,
            pkgMax: req.body.pkgMax,
            campusdate: req.body.campusdate,
            grade10: req.body.grade10,
            grade12: req.body.grade12,
            graded2d: req.body.graded2d,
            cpi: req.body.cpi,
            cgpa: req.body.cgpa,
            backlog: req.body.backlog,
            created_at: moment().format('YYYY-MM-DD hh:mm:ss'),
            modified_at: moment().format('YYYY-MM-DD hh:mm:ss'),

            branchEC: req.body.branchEC,
            branchIT: req.body.branchIT,
            branchCE: req.body.branchCE,
            branchCivil: req.body.branchCivil,
            branchMech: req.body.branchMech,
            branchProd: req.body.branchProd,
            branchICT: req.body.branchICT,
            branchEIE: req.body.branchEIE,

            isCampusActive: req.body.isCampusActive,
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
    }
    else{
        res.status(500).json({
            error: 'Failed to Add Company',
            status: 500
        })
    }
});

router.put("/update/:id",(req, res, next) => {
    // console.log(req.body);

    if((req.body.key ?? '000') == 'gec-placement-2023'){
        companySchema.findOneAndUpdate({_id:req.params.id,},{
            $set:{
                name: req.body.name,
                address: req.body.address,
                website: req.body.website,
                package: req.body.package,
                pkgMin: req.body.pkgMin,
                pkgMax: req.body.pkgMax,
                campusdate: req.body.campusdate,
                grade10: req.body.grade10,
                grade12: req.body.grade12,
                graded2d: req.body.graded2d,
                cpi: req.body.cpi,
                cgpa: req.body.cgpa,
                backlog: req.body.backlog,
                modified_at: moment().format('YYYY-MM-DD hh:mm:ss'),

                branchEC: req.body.branchEC,
                branchIT: req.body.branchIT,
                branchCE: req.body.branchCE,
                branchCivil: req.body.branchCivil,
                branchMech: req.body.branchMech,
                branchProd: req.body.branchProd,
                branchICT: req.body.branchICT,
                branchEIE: req.body.branchEIE,

                isCampusActive: req.body.isCampusActive,
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
    }
    else{
        res.status(500).json({
            error: 'Failed to Update Company',
            status: 500
        })
    }
});
router.put("/clearid",(req, res, next) => {
    // console.log("Clear Item");

    companySchema.updateMany({},{$unset:{"id":1}})
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
    companySchema.findByIdAndRemove({_id: req.params.id})
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


router.get("/GetCompanyStatistics/:year",(req, res, next) => {
    companySchema.find()//.sort({enrollmentno:1})
    //.skip(req.body.offset??0).limit(req.body.limit??100)
    .then((result) => {
        // console.log(result)
        curYear = Number(req.params.year)

        index = 0
        finalResponse = []

        for(yr=curYear; yr>curYear-4; yr--){
            result1 = result.filter(x => (Date.parse(x.created_at) < Date.parse(yr + '-05-31') && Date.parse(x.created_at) > Date.parse(yr-1 + '-06-01'))) ?? []
            // console.log('Result = ' + result1);
            // console.log('Result = ' + result1.length);
            
            curResponse = { 'year': yr }

            if(result1.length == 0){
                curResponse.total = 0;
                curResponse.civil = 0; curResponse.ce = 0; curResponse.ec = 0; 
                curResponse.it = 0; curResponse.mech = 0; curResponse.prod = 0;         
                curResponse.ict = 0; curResponse.eie = 0;       
            }
            else{
                curResponse.total = result1.length
                curResponse.civil = (result1.filter(x => x.branchCivil ?? false) ?? []).length; 
                curResponse.ce = (result1.filter(x => x.branchCE ?? false) ?? []).length; 
                curResponse.ec = (result1.filter(x => x.branchEC ?? false) ?? []).length; 
                curResponse.it = (result1.filter(x => x.branchIT ?? false) ?? []).length; 
                curResponse.mech = (result1.filter(x => x.branchMech ?? false) ?? []).length; 
                curResponse.prod = (result1.filter(x => x.branchProd ?? false) ?? []).length; 
                curResponse.ict = (result1.filter(x => x.branchICT ?? false) ?? []).length; 
                curResponse.eie = (result1.filter(x => x.branchEIE ?? false) ?? []).length; 
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
            error: err + '.',
            status: 500
        })
    });
});


router.get("/GetActiveCampus/:isActive",(req, res, next) => {
    companySchema.find({isCampusActive: req.params.isActive==1}).sort({created_at:1})
    // .skip(req.query.offset??0).limit(req.query.limit??100)
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


module.exports = router;