import mongoose from "mongoose";

const teacherSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true
        },
        password: {
            type: String,
            required: true
        },
        verified: {
            type: Boolean,
            default: false,
        },
        fullname: {
            type: String,
            required: true
        },
        nickname: {
            type: String,
        },
        about: {
            type: String,
        },
        photo: {
            type: String,
        },
        gender: {    //   *****
            type: String,
            enum: ["male", "female", "other"],
            default: "male",
        },
        address: {
            type: String,
        },
        phone: {
            type: String,
            required: true,
            unique: true,
            match: /^[0-9]{10}$/
        }, 
        totalSubjects: {
            type: Number,
            default: 1,
            min: 1
        },
        subjects: {
            type: [String],
            required: true
        },
        mode: {
            type: String,
            required: true,
            enum: ["online", "offline", "hybrid"],
            default: "offline",
        },
        totalStudents: {
            type: Number,
            default: 0,
        },
        active: {
            type: Boolean,
            default: true,
        }
    }, 
    {timestamps: true}
)

const Teacher = mongoose.model("Teacher", teacherSchema);
export default Teacher;