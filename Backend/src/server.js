import dotenv from "dotenv"
dotenv.config()
import connectDb from "./db.js"
import app from "./app.js"


const PORT = process.env.PORT || 3000;

// 1. Database connectin and Server setup
connectDb()
.then(()=>{
    app.listen(PORT, ()=>{
        console.log(`Server is running on PORT: ${PORT}`);
    })
})
.catch((error)=>{
    console.log(`Database connection failed: ${error}`);
})


