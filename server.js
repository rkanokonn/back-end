const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv')
const hospitals = require('./routes/hospitals');
const cookieParser = require('cookie-parser')
const auth = require('./routes/auth')

dotenv.config({path:'./config/config.env'});

const app = express();

app.use(express.json());
app.use(cookieParser());


app.use(`/api/v1/hospitals` , hospitals);
app.use(`/api/v1/auth` , auth);

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

// ฟังก์ชันเพื่อเชื่อมต่อกับ MongoDB
const connectDB = async () => {
    try {
      await mongoose.connect(MONGO_URI);
      console.log('MongoDB Connected');
    } catch (error) {
      console.error('Error connecting to MongoDB:', error.message);
      process.exit(1);
    }
  };

  connectDB();

app.listen(PORT , console.log('Server running in :', process.env.NODE_ENV , ' mode on port :' , PORT))