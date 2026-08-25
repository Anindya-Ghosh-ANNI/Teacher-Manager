import mongoose from "mongoose";

const studentSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        gender: {    // *******
            type: String,
            enum: ["male", "female", "other"],
            default: "male",
        },
        phone: {
            type: Number,
            required: true,
            match: /^[0-9]{10}$/
        },
        phone2: {
            type: Number,   
            required: false,
        },
        subject: {
            type: String,
            required: true,
        },
        batch: {
            type: String,
        },
        active: {
            type: Boolean,
            default: true,
        },
        joinDate: {
            type: Date,
            default: Date.now   
        },
        email: {
            type: String,
            lowercase: true,
            trim: true,
        },
        password: {
            type: String,
        },
        verified: {
            type: Boolean,
            default: false,
        },
        photo: {
            type: String
        },
        paymentStyle: {
            type: String,
            enum: ["advance", "arrears"],
            default: "arrears",
        },
        feeAmount: {
            type: Number,
            default: 500,
        },
        teacherId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Teacher",
            required: true,
        },
    },
    {timestamps: true}
)

const Student = mongoose.model("Student", studentSchema);
export default Student;