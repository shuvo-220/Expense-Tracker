const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema({
    title:{type:String, required:true},
    amount:{type:Number, required:true},
    category:{type:String, required:true},
    date:{type:Date, default:Date.now()},
    user:{type:mongoose.Schema.ObjectId, ref:'user'}
});

module.exports = mongoose.model('expense', expenseSchema);