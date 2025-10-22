const express = require('express');
const dotenv = require('dotenv');
dotenv.config()
require('./db/db');
const cors = require('cors');
const app = express();
const user = require('./routes/userRoute');
const income = require('./routes/incomeRoute');
const expense = require('./routes/expenseRoutes');

app.use(express.json())
app.use(cors({
    origin:'http://localhost:5173',
    credentials:true
}))

const PORT = process.env.PORT || 6000

app.get('/', (req, res)=>{
    res.json('server working')
})

app.use('/api/user', user);
app.use('/api/income', income);
app.use('/api/expense', expense)

app.listen(PORT, ()=>{
    console.log(`server working on port:${PORT}`)
})