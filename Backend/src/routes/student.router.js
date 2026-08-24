import express from "express";
import Student from "../models/Student.model.js";
import Teacher from "../models/Teacher.model.js"
import authMiddleware from "../middleware/auth.middleware.js";
import jwt from "jsonwebtoken"

const router = express.Router();

// Create student
router.post("/create", authMiddleware, async (req, res, next)=>{
    try {
        let {name, phone, phone2, subject, active, joinDate, email, password, photo, teacherId, paymentStyle, paymentCount} = req.body;

        const token = jwt.verify(req.cookies.token, process.env.JWT_SECRET);
        teacherId = token.teacherId;

        const student = await Student.create({name, phone, phone2, subject, active, joinDate, email, password, photo, teacherId, paymentStyle, paymentCount});
        
        res.status(201).json({
            success: true,
            message: "Student created successfully."
        });
    } 
    catch (error) {
        next(error);
    }
})

// Edit student
router.patch("/edit/:id", async (req, res, next)=>{
    try {
        const student = await Student.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true,
            }
        );

        if(!student){     
            const error = new Error("Student not found !!");
            error.statusCode = 404;
            return next(error);
        }

        res.success(student, "Student edited successfully.");
    } 
    catch (error) {
        next(error);
    }
})

// Increase the payment count by 1
router.patch("/incPayment/:id", async (req, res, next)=>{
    try {
        const student = await Student.findByIdAndUpdate(
            req.params.id,
            {$inc: {paymentCount: 1}},
            {
                new: true,
                runValidators: true
            }
        );

        if(!student){
            const error = new Error("Student not found !!");
            error.statusCode = 404;
            return next(error);
        };

        res.success(student, "Payment increased by 1 successfully.");
    } 
    catch (error) {
       next(error);
    }
})

// Decrease the payment by 1
router.patch("/decPayment/:id", authMiddleware, async (req, res)=>{
    try {
        const student = await Student.findByIdAndUpdate(
            req.params.id,
            {$inc: {paymentCount: -1}},
            {
                new: true, 
                runValidators: true
            }
        )

        if(!student){
            const error = new Error("Student not found !!");
            error.statusCode = 404;
            return next(error);
        }

        res.success(student, "Payment decreased by 1 successfully.");
    } 
    catch (error) {
        next(error)
    }
})

// Toggle active status of a student 
router.patch("//toggleActive/:id", authMiddleware, async (req, res, next)=>{
    try {
        const student = await Student.findById(req.params.id);

        if(!student){
            const error = new Error("Student not found !!");
            error.statusCode = 404;
            return next(error);
        }

        student.active = !student.active;

        await student.save();

        res.success(student, "Active status toggled successfully.");
    } 
    catch (error) {
        next(error);
    }
})

// Delete student by Id
router.delete("/delete/:id", authMiddleware, async (req, res, next)=>{
    try {
        const student = await Student.findByIdAndDelete(req.params.id);

        if(!student){
            const error = new Error("Student not found !!");
            error.statusCode = 404;
            return next(error);
        }

        res.success(student, "Student deleted successfully.");
    } 
    catch (error) {
        next(error);
    }
})

// Get all Teacher
router.get("/getAllActive", async (req, res, next)=>{
    try {
        const teacher = await Teacher.find({
            active: true,
        })

        res.success(teacher);
    } catch (error) {
        next(error);
    }
})

export default router;