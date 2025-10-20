const express = require('express');
const dotenv = require('dotenv');
dotenv.config()
const app = express();

const PORT = process.env.PORT || 6000

app.get('/', (req, res)=>{
    res.json('server working')
})

app.listen(PORT, ()=>{
    console.log(`server working on port:${PORT}`)
})