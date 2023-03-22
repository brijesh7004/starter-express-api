const express = require('express');
const router = express.Router();
const notifySchema = require('../Model/notifySchema');
const mongoose = require('mongoose');
const moment = require('moment');

// var {google} = require("googleapis");
// const key = require('../../firebase-admin-sdk-private-key.json');
// const SCOPES = ['https://www.googleapis.com/auth/firebase.messaging'];
// const jwtClient = new google.auth.JWT(key.client_email, null, key.private_key, SCOPES, null);
// jwtClient.authorize(function(err, tokens) {
//     if (err) { console.log('Error: ' + err); /*return;*/ }
//     console.log(tokens.access_token);
// });

router.get("/",(req, res, next) => {
    //query => ?offset=0&limit=10
    //body  => { "offset":0, "limit":10 }

    // notifySchema.find({id:{$exists:true}}).sort({created_at:-1})
    notifySchema.find().sort({created_at:-1})
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
    // notifySchema.find({"title":req.params.title})
    notifySchema.findById(req.params.id)
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
    dateTime = new Date();

    if((req.body.key ?? '000') == 'gec-placement-2023'){
        const notifyItem = new notifySchema({
            _id: new mongoose.Types.ObjectId,
            title: req.body.title,
            body: req.body.body,
            created_at: moment().format('YYYY-MM-DD hh:mm:ss'),
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
            error: 'Failed to Add Notification',
            status: 500
        })
    } 
});

router.put("/update/:id",(req, res, next) => {
    // console.log(req.body);

    if((req.body.key ?? '000') == 'gec-placement-2023'){
        notifySchema.findOneAndUpdate({_id:req.params.id,},{
            $set:{
                title: req.body.title,
                body: req.body.body,
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
    }else{
        res.status(500).json({
            error: 'Failed to Update Notification',
            status: 500
        })
    }
});
router.put("/clearid",(req, res, next) => {
    // console.log("Clear Item");

    notifySchema.updateMany({},{$unset:{"id":1}})
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
    notifySchema.findByIdAndRemove({_id: req.params.id})
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