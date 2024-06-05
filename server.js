const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv')
const hospitals = require('./routes/hospitals');
const cookieParser = require('cookie-parser')
const auth = require('./routes/auth')
const connectDB = require('./config/db')

dotenv.config({path:'./config/config.env'});

connectDB();

const app = express();

app.use(express.json());
app.use(cookieParser());


app.use(`/api/v1/hospitals` , hospitals);
app.use(`/api/v1/auth` , auth);

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT , console.log('Server running in :', process.env.NODE_ENV , ' mode on port :' , PORT))

process.on('unhandleRejection' , (err,promise)=>{
  console.log(`Error : ${err.message}`);
  server.close(()=>process.exit(1))
});