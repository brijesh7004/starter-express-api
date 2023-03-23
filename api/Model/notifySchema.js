const mongoose = require('mongoose');
const notifySchema = new mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    id:String,
    title:String,
    body:String,
    image:String,
    created_at:String,
});

module.exports = mongoose.model('notifySchema', notifySchema, 'notification');