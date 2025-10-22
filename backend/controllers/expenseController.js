const Expense = require('../models/expenseModel');

exports.addExpense = async(req, res)=>{
    const{title, amount,category,date} = req.body;
    try {
        const expense = await Expense.create({
            title,amount,category,date
        })
        res.status(200).json(expense)
    } catch (error) {
        res.status(400).json(error.message)
    }
}

exports.getAllExpense = async(req, res)=>{
    try {
        const expenses = await Expense.find({})
        if(!expenses){
            res.status(500).json('no expense found');
        }
        res.status(200).json(expenses);
    } catch (error) {
        res.status(400).json(error.message);
    }
}

exports.editExpense = async(req, res)=>{
    try {
        const editExpense = await Expense.findByIdAndUpdate(req.params.id, req.body, {new:true})
        res.status(200).json(editExpense)
    } catch (error) {
        res.status(400).json(error.message);
    }
}

exports.deleteExpense = async(req, res)=>{
    try {
        const deleteExpense = await Expense.findByIdAndDelete(req.params.id)
        res.status(200).json('expense deleted successfully');
    } catch (error) {
        res.status(400)
    }
}