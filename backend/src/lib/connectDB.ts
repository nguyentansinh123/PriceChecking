import mongoose from "mongoose";

export const connectDB = async ()=>{
    try {
        mongoose.connection.on('connected', ()=>{
            console.log('Mongodb connected');
        })
        await mongoose.connect(process.env.MONGODB_URI as string)
    } catch (error) {
        console.error((error as Error).message)
        process.exit(1)
    }
}