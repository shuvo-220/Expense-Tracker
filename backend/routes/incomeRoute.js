const express = require('express');
const { addIncome, getAllIncome, editIncome, deleteIncome } = require('../controllers/incomeControllers');
const { auth } = require('../middleware/auth');
const router = express.Router();

router.post('/addincome', auth,addIncome);
router.get('/allincomes', auth, getAllIncome);
router.put('/edit/:id', auth, editIncome)
router.delete('/delete/:id', auth, deleteIncome)

module.exports = router;