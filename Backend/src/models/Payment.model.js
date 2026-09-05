import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema(
    {
        studentId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Student", 
            required: true,
        },
        paidAmount: {
            type: Number,
            required: true,
        },
        paymentDate: {
            type: Date,
            default: Date.now(),
        },
        paymentFrom: {
            type: Date,
            required: true,
        },
        paymentMonths: {
            type: Number,
            required: true,
        }
    },
    {timestamps: true},
)

const Payment = mongoose.model("Payment", paymentSchema);
export default Payment;