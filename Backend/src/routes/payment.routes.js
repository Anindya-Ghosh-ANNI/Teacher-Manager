import express from "express"
import Payment from "../models/Payment.model.js";
import Student from "../models/Student.model.js";

const router = express.Router();


// Create new payment 
router.post("/create/:studentId", async (req, res, next)=>{
    try {
        const studentId = req.params.studentId;
        const { paymentFrom, paymentMonths} = req.body;

        const student = await Student.findById(studentId);
        if(!student){
            const error = new error("Invalid student id.");
            error.statusCode = 404;
            return next(error);
        }

        const payment = await Payment.create({studentId, paidAmount: student.feeAmount, paymentFrom, paymentMonths})

        res.status(201).json({
            success: true,
            message: "Backend :: New payment registered successfully.",
            payment
        })
    } 
    catch (error) {
        next(error);
    }
})

// Get all payments of a student
router.get("/get/:studentId", async (req, res, next)=>{
    try {
        const studentId = req.params.studentId;

        const payment = await Payment.find({studentId});

        if(!payment){
            const error = new Error("Invalid student id.");
            error.statusCode = 404;
            return next(error);
        }

        res.success(payment, "Payments fetched successfully.");
    } 
    catch (error) {
        next(error);
    }
})

export default router;