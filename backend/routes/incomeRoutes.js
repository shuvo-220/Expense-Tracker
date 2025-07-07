const express = require('express');
const router = express.Router();
const{protect} = require('../middleware/authMiddleware');
const { 
    addIncome,
    getAllIncome,
    deleteIncome,
    downloadIncomeExel
 } = require('../controllers/incomeControllers');

router.post('/add', protect, addIncome)
router.get('/get', protect, getAllIncome)
router.delete('/:id', protect, deleteIncome)
router.get('/downloadexcel', protect, downloadIncomeExel)

module.exports = router;