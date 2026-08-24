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
            type: Number,
            default: Date.now(),
        },
        paidMonth: {
            type: Number,
            min: 1,
            max: 12,
            required: true,
        }
    },
    {timestamps: true},
)

const Student = mongoose.model("Student", paymentSchema);
export default Student;