const Income = require('../models/incomeModel');
const Expense = require('../models/expenseModel');


exports.recentTransition = async (req, res) => {
    try {
        const incomes = await Income.find({ user: req.user._id });
        const expenses = await Expense.find({ user: req.user._id });

        const allTransitions = [
            ...incomes.map(income => ({ ...income._doc, type: 'income' })),
            ...expenses.map(expense => ({ ...expense._doc, type: 'expense' }))
        ]

        allTransitions.sort((a, b) => new Date(b.date) - new Date(a.date));

        const recent = allTransitions.slice(0,5)

        res.status(200).json(recent)

    } catch (error) {
        res.status(400).json(error.message)
    }
}