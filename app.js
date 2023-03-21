const express = require("express");
const mongoose = require("mongoose");

const app = express();

const notRouter = require('./api/Router/notification');
const compRouter = require('./api/Router/company');
const studentRouter = require('./api/Router/student_gec');
const studentRouter2 = require('./api/Router/student_other');
const bodyparser = require('body-parser');

//mongodb+srv://kanudo3101:ManP0ddUNiCRK1X2@mongodbpractice.g1mvyof.mongodb.net/?retryWrites=true&w=majority
mongoose.connect("mongodb+srv://kanudo3101:ManP0ddUNiCRK1X2@mongodbpractice.g1mvyof.mongodb.net/placement_data");
mongoose.connection.on('error', (err)=> {console.log("Connection Failed : $err");})
mongoose.connection.on('connected', (connected)=> {console.log("Connected with database ....");})

app.use(bodyparser.urlencoded({extended: false}));
app.use(bodyparser.json());

app.use('/notification', notRouter);
app.use('/company', compRouter);
app.use('/studentGec', studentRouter);
app.use('/studentOther', studentRouter2);

// app.use((req, res, next) => {
//     res.status(200).json({
//         msg: 'my app is runnig',
//     });
// });

app.use((req, res, next) => {
    res.status(404).json({
        msg: 'url not found',
    });
});

module.exports = app;