const express = require('express');
const router = express.Router();
const{protect} = require('../middleware/authMiddleware');
const { 
    addExpense,
    getAllExpense,
    deleteExpense,
    downloadExpenseExel
 } = require('../controllers/expenseControllers');

router.post('/add', protect, addExpense)
router.get('/get', protect, getAllExpense)
router.delete('/:id', protect, deleteExpense)
router.get('/downloadexcel', protect, downloadExpenseExel)

module.exports = router;