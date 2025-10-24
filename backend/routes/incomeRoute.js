const express = require('express');
const { addIncome, getAllIncome, editIncome, deleteIncome, myIncome } = require('../controllers/incomeControllers');
const { auth } = require('../middleware/auth');
const router = express.Router();

router.post('/addincome', auth,addIncome);
router.get('/allincomes', auth, getAllIncome);
router.put('/edit/:id', auth, editIncome)
router.delete('/delete/:id', auth, deleteIncome)
router.get('/myincome', auth, myIncome);

module.exports = router;