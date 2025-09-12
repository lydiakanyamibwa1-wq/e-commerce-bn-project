import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const Mongo_url = process.env.DB_ULR || "";

export const connectDB = async () =>{
    try {
        await mongoose.connect(Mongo_url);
        console.log("Mongo database connected successfuly")
    } catch(err) {
        console.log(err);
        process.exit(1);
    }
}

// export default connectDB;




