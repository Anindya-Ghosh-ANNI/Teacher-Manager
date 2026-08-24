import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser";
// Router Import
import teacherRouter from "./routes/teacher.route.js"  
import studentRouter from "./routes/student.router.js"
import paymentRouter from "./routes/payment.routes.js";

// Middlewares Import
import successResponse from "./middleware/success.middleware.js";  
import errorResponse from "./middleware/error.middleware.js";

const app = express();

// 2. Parser
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());

// 3. General Middlewares
app.use(cors({
    origin: "http://localhost:5173"
}))

app.use(successResponse);


// 4. Routes
app.get("/", function(req, res){
    res.send("Hello World !!");
})

app.use("/teacher", teacherRouter);  // This url is prefix of the teacherRouter url
app.use("/student", studentRouter);
app.use("/payment", paymentRouter);


// 5. Error middleware
app.use(errorResponse);

export default app;
