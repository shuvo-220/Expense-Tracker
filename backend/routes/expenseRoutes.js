const express = require('express');
const { auth } = require('../middleware/auth');
const { addExpense, getAllExpense, editExpense, deleteExpense } = require('../controllers/expenseController');
const router = express.Router();

router.post('/addexpense', auth,addExpense);
router.get('/allexpenses', auth, getAllExpense);
router.put('/edit/:id', auth, editExpense)
router.delete('/delete/:id', auth, deleteExpense)

module.exports = router;