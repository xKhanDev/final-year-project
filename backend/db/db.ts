import mongoose from "mongoose";

const connectDB = async():Promise<void>=>{
    try{
        await mongoose.connect(`${process.env.MONGO_DB_URL}`); 
        console.log("Database connected");
    }catch(err){
        console.log(err);
    }
}

export default connectDB