const mongoose = require("mongoose");

const connectDB = async()=>{
    const url = process.env.DATABASE_URL;
    const connect = await mongoose.connect(url);
    console.log("database connected");
}

module.exports = connectDB;