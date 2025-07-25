require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const incomeRoutes = require('./routes/incomeRoutes');
const expenseRoutes = require('./routes/expenseRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');

const app = express();
app.use(express.urlencoded({ extended: true }));

app.use(cors({
    origin:process.env.CLIENT_URL || "*",
    methods:['GET','POST','PUT','DELETE'],
    allowedHeaders:['Content-Type', 'Authorization']
}))
app.use(express.json());

//databse connect
connectDB();

const PORT = process.env.PORT || 5000;

//routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/income', incomeRoutes);
app.use('/api/v1/expense', expenseRoutes);
app.use('/api/v1/dashboard', dashboardRoutes);

//server uploads folder
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.listen(PORT, ()=>{
    console.log(`server running on port : ${PORT}`);
})


