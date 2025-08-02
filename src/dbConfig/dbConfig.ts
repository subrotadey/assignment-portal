import mongoose from "mongoose";

export async function connect(){
    try{
        mongoose.connect(process.env.MONGO_URL!)

        const connection = mongoose.connection

        connection.on('connected', () => {
            console.log("MongoDB Connected");
        })
        connection.on('error', (err) => {
            console.log("MongoDB connection Error, Please Make sure DB is up and running" + err);
            process.exit()
        })
    }
    catch(error){
        console.log("Something Went wrong in connecting to DB");
        console.log(error);
    }
}