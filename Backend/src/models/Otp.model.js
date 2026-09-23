import mongoose from "mongoose";

const OtpSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true
        },
        otp: {
            type: Number,
            required: true
        },
        expiresAt: {
            type: Date,
            required: true
        },
    }, 
    {timestamps: true}
)

const Otp = mongoose.model("Otp", OtpSchema);
export default Otp;