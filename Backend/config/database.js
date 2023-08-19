const mongoose = require('mongoose');
require('dotenv').config();
 
exports.connect = () =>{
    mongoose.connect(process.env.MONGODB_URL,{
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }).then(()=>{
        console.log('Connected to database');
    })
    .catch((err)=>{
        console.log('Failed to connect to database', err);
        process.exit(1);
    })
}