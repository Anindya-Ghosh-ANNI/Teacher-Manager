import mongoose from "mongoose"

const connectDb = async ()=>{
    try {
        await mongoose.connect(`${process.env.MONGODB_URL}`, {
            dbName: process.env.DB_NAME
        });

        console.log(`${mongoose.connection.name} dataBase is connected successfully !!`)
    } 
    catch (error) {
        console.log(`ERROR::Backend::db.js::${error}`);
        throw error;
    }
}

export default connectDb;