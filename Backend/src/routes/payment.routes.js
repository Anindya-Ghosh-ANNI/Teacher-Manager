import express from "express"
import Payment from "../models/Payment.model.js";

const router = express.Router();

router.post("/create/:studentId", async (req, res, next)=>{
    try {
        const studentId = req.params.studentId;
        const {paidAmount, paymentDate, paymentFrom, paymentMonths} = req.body;

        const payment = await Payment.create({studentId, paidAmount, paymentDate, paymentFrom, paymentMonths})

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

export default router;