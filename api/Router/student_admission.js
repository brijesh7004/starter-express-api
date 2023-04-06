const express = require('express');
const router = express.Router();
const admissionSchema = require('../Model/admissionSchema');
const mongoose = require('mongoose');
const moment = require('moment');

router.get("/",(req, res, next) => {
    //query => ?offset=0&limit=10
    //body  => { "offset":0, "limit":10 }

    filterJson = {}
    if(req.query.year != null){ filterJson.year = req.query.year }

    admissionSchema.find(filterJson).sort({created_at:-1})
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
    // admissionSchema.find({"title":req.params.title})
    admissionSchema.findById(req.params.id)
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
        const notifyItem = new admissionSchema({
            _id: new mongoose.Types.ObjectId,
            year: req.body.year,
            total: req.body.total,
            ec: req.body.ec,
            it: req.body.it,
            ce: req.body.ce,
            civil: req.body.civil,
            mech: req.body.mech,
            prod: req.body.prod,
            ict: req.body.ict,
            eie: req.body.eie,
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
            error: 'Failed to Add Student Admission',
            status: 500
        })
    }
});

router.put("/update/:id",(req, res, next) => {
    // console.log(req.body);

    if((req.body.key ?? '000') == 'gec-placement-2023'){
        admissionSchema.findOneAndUpdate({_id:req.params.id,},{
            $set:{
                year: req.body.year,
                total: req.body.total,
                ec: req.body.ec,
                it: req.body.it,
                ce: req.body.ce,
                civil: req.body.civil,
                mech: req.body.mech,
                prod: req.body.prod,
                ict: req.body.ict,
                eie: req.body.eie,
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
            error: 'Failed to Update Student Admission',
            status: 500
        })
    }
});
router.put("/clearid",(req, res, next) => {
    // console.log("Clear Item");

    admissionSchema.updateMany({},{$unset:{"id":1}})
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
    admissionSchema.findByIdAndRemove({_id: req.params.id})
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


router.get("/GetAdmissionStatistics/:year",(req, res, next) => {
    admissionSchema.find()//.sort({enrollmentno:1})
    //.skip(req.body.offset??0).limit(req.body.limit??100)
    .then((result) => {
        // console.log(result)
        curYear = Number(req.params.year)

        index = 0
        finalResponse = []

        for(yr=curYear; yr>curYear-4; yr--){
            result1 = result.filter(x => x.year==yr) ?? []
                       
            curResponse = { 'year': yr }
            if(result1.length == 0){
                curResponse.total = 420;
                curResponse.civil = 60; curResponse.ce = 60; curResponse.ec = 60; 
                curResponse.it = 60; curResponse.mech = 120; curResponse.prod = 60;
                curResponse.ict = 30; curResponse.eie = 30;
            }
            else{
                curResponse.total = result1[0].total;
                curResponse.civil = result1[0].civil; curResponse.ce = result1[0].ce; 
                curResponse.ec = result1[0].ec; curResponse.it = result1[0].it; 
                curResponse.mech = result1[0].mech; curResponse.prod = result1[0].prod;
                curResponse.ict = result1[0].ict; curResponse.eie = result1[0].eie;
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


module.exports = router;