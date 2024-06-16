import mongoose from "mongoose";
import dotenv from "dotenv"

dotenv.config();
const connectMongo = async()=>{
    const conn = await mongoose.connect(process.env.MongoUri);
    if (conn){
        console.log("MongoDB database Connected")
    }
}

export {connectMongo}