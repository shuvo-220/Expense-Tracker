const Income = require('../models/incomeModel');

exports.addIncome = async(req, res)=>{
    const{title, amount,category,date} = req.body;
    try {
        const income = await Income.create({
            title,amount,category,date
        })
        res.status(200).json(income)
    } catch (error) {
        res.status(400).json(error.message)
    }
}

exports.getAllIncome = async(req, res)=>{
    try {
        const incomes = await Income.find({})
        if(!incomes){
            res.status(500).json('no incomes found');
        }
        res.status(200).json(incomes);
    } catch (error) {
        res.status(400).json(error.message);
    }
}

exports.editIncome = async(req, res)=>{
    try {
        const editIncome = await Income.findByIdAndUpdate(req.params.id, req.body, {new:true})
        res.status(200).json(editIncome)
    } catch (error) {
        res.status(400).json(error.message);
    }
}

exports.deleteIncome = async(req, res)=>{
    try {
        const deleteIncome = await Income.findByIdAndDelete(req.params.id)
        res.status(200).json('income deleted successfully');
    } catch (error) {
        res.status(400)
    }
}