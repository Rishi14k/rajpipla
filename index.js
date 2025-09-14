const express = require('express');
const cors = require('cors');
const { default: mongoose } = require('mongoose');
require('dotenv').config();
const userRoutes = require('./routes/userRoutes')

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json())
app.use(cors())

mongoose.connect(process.env.MONGO_URL)
    .then(()=>{
        console.log("DB connnected")
    }).catch((err)=>{
        console.log("Error in DB connection",err)
    })



app.use('/api/user',userRoutes)

app.listen(PORT,()=>{
    console.log(`server ruuning on http://localhost:${PORT}`);
})