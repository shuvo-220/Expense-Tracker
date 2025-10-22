const mongoose = require('mongoose');

mongoose.connect(process.env.BD_URL).then(()=>{
    console.log('database connected')
}).catch((error)=>{
    console.log(error.message)
})