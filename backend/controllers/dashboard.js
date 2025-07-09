const Expense = require('../models/Expense');
const Income = require('../models/Income');
const { isValidObjectId, Types } = require('mongoose');


exports.dashboard = async(req, res)=>{
    try {
        const userId = req.user.id;
        const userObjectId = new Types.ObjectId(String(userId));
        //fetch total income and expense
        const totalIncome = await Income.aggregate([
            {$match : {userId:userObjectId}},
            {$group : {_id:null, total:{$sum:'$amount'}}}
        ]);
        console.log('totalIncome', {totalIncome, userId:isValidObjectId(userId)})

        const totalExpense = await Expense.aggregate([
            {$match : {userId:userObjectId}},
            {$group : {_id:null, total:{$sum:'$amount'}}}
        ]);

        //get income transection for last 60 days
        const last60DaysIncomeTransections = await Income.find({
            userId,
            date:{$gte:new Date(Date.now() - 60 * 24 * 60 * 60 * 1000)}
        }).sort({date:-1});

        //get totlalIncome for last 60 days
        const incomeLast60Days = last60DaysIncomeTransections.reduce((sum, transection)=>
        sum + transection.amount, 0);

        //get expense transection for last 60 days
        const last30DaysexpenseTransections = await Expense.find({
            userId,
            date:{$gte: new Date(Date.now() - 30 * 24 * 60 *60 * 1000)}
        }).sort({date:-1});

        //get total expense for last 30 days
        const expenseLast30Days = last30DaysexpenseTransections.reduce((sum, transection)=>
            sum + transection.amount, 0);

        //last 5 transection for (income + expense)
        const lastTransection = [
            ...(await Income.find({userId})).sort({date:-1}).limit(5).map((txn)=>({
                ...txn.toObject(),
                type:'income'
            })),
            ...(await Expense.find({userId})).sort({date:-1}).limit(5).map((txn)=>({
                ...txn.toObject(),
                type:'expense'
            }))
        ].sort((a,b)=>b.date - a.date);

        //final response
        res.json({
            totalBalance:(totalIncome[0]?.total || 0) - (totalExpense[0]?.total || 0),
            totalIncome : totalIncome[0]?.total || 0,
            totalExpense : totalExpense[0]?.total || 0,
            last30DaysExpense:{
                total:expenseLast30Days,
                transection:last30DaysexpenseTransections
            },
            last60DaysIncome:{
                total:incomeLast60Days,
                transection:last60DaysIncomeTransections
            },
            recentTransection:lastTransection
        })
    } catch (error) {
        res.status(500).json({message:'server error'});
        console.log(error.message)
    }
}