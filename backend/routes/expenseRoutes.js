const express = require('express');
const { auth } = require('../middleware/auth');
const { addExpense, getAllExpense, editExpense, deleteExpense, myExpense } = require('../controllers/expenseController');
const { recentTransition } = require('../controllers/recentTransition');
const router = express.Router();

router.post('/addexpense', auth,addExpense);
router.get('/allexpenses', auth, getAllExpense);
router.put('/edit/:id', auth, editExpense)
router.delete('/delete/:id', auth, deleteExpense)
router.get('/myexpense', auth, myExpense)
router.get('/recent', auth, recentTransition);

module.exports = router;