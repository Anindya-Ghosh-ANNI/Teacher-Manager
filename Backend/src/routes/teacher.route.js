import express from "express";
import Teacher from "../models/Teacher.model.js";
import bcrypt from "bcrypt"
import authMiddleware from "../middleware/auth.middleware.js";
import jwt from "jsonwebtoken";
import Student from "../models/Student.model.js"

const router = express.Router()

// Verify email and password while registerinig user
router.get("/register/verifyEmail", async (req, res, next)=>{
    try {
        const email = req.query.email;

        const teacherEmail = await Teacher.findOne({email: email}); 

        if(teacherEmail){
            const error = new Error("Email id already exists !!");
            error.statusCode = 409;
            return next(error);
        }

        res.success(email, "Email is unique and can be registered.");
    } 
    catch (error) {
        next(error);
    } 
})

// Create new teacher or REGISTER with all data and login
router.post("/register", async (req, res, next)=>{
    try {
        // Extracting the data from frontend
        const {email, password, fullname, nickname, about, photo, gender, address, phone, totalSubjects, subjects, mode} = req.body;

        // Hashing the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Creating the teacher 
        const teacher = await Teacher.create({email, password: hashedPassword, fullname, nickname, about, photo, gender, address, phone, totalSubjects, subjects, mode});

        // Login the user
        const token = jwt.sign({teacherId: teacher._id}, process.env.JWT_SECRET);
        res.cookie("token", token);

        res.status(201).send({
            message: "Backend :: New Teacher created. And login successfull.",
            teacher
        });
    } 
    catch (error) {
        next(error);
    }
});

// Login teacher
router.post("/login", async (req, res, next)=>{
    try {
        const {email, password} = req.body;

        // Check for email
        const teacher = await Teacher.findOne({email});
        
        if(!teacher){
            const error = new Error("Email id not found !!");
            error.statusCode = 404;
            return next(error);
        }

        // Check for password
        const pass = await bcrypt.compare(password, teacher.password);

        if(!pass){
            const error = new Error("Incorrect Password !!");
            error.statusCode = 401;
            return next(error);
        }

        // Send jwt token
        const token = jwt.sign({teacherId: teacher._id}, process.env.JWT_SECRET);
        res.cookie("token", token);

        res.success(teacher, "Teacher logged-in successfully.");
    } 
    catch (error) {
        next(error);
    }
})

// Logout teacher
router.post("/logout", async (req, res, next)=>{
    try {
        res.clearCookie("token");
        res.clearCookie("teacherID");

        res.status(200).json("Teacher logged-out successfully.");
    } 
    catch (error) {
        next(error);
    }
})

// Edit teacher
router.patch("/edit/:id", authMiddleware, async (req, res, next)=>{
    try {
        const teacher = Teacher.findByIdAndUpdate(
            req.params.id,
            req.body(),
            {
                new: true,
                runValidators: true
            }
        );

        if(!teacher){       
            const error = new Error("Teacher not found !!");
            error.statusCode = 404;
            return next(error);
        }

        res.success(teacher, "Teacher edited successfully.");
    } 
    catch (error) {
        next(error);    
    }
})

// Toggle Active
router.patch("/toggleActive/:teacherId", authMiddleware, async(req, res, next)=>{
    try {
        const teacher = await Teacher.findById(req.params.teacherId);
        if(!teacher){
            const error = new Error("Teacher not found !!");
            error.statusCode = 404;
            return next(error);
        }

        teacher.active = !teacher.active;

        await teacher.save();
        res.success(teacher, "Toggled active status of teacher successfully.");
    } 
    catch (error) {
        next(error);
    }
})

// Delete Teacher
router.delete("/delete/:teacherId", authMiddleware, async (req, res, next)=>{
    try {        
        const teacher = await Teacher.findByIdAndDelete(req.params.teacherId);

        if(!teacher){
            const error = new Error("Invalid Teacher Id !!");
            error.statusCode = 404;
            return next(error);
        }

        res.success(teacher, "Teacher deleted successfully.");
    } 
    catch (error) {
        next(error);
    }
})

// Get Active Students by teacher
router.get("/find/active", authMiddleware, async (req, res, next)=>{
    try {
        const decoded = jwt.verify(req.cookies.token, process.env.JWT_SECRET);
        const teacherId = decoded.teacherId;
        const teacher = await Teacher.findById(teacherId);
        
        if(!teacher){
            const error = new Error("Invalid Teacher Id !!");
            error.statusCode = 404;
            return next(error);
        }
        
        const students = await Student.find({
            teacherId: teacherId,
            active: true,
        })
        
        res.success(students);
    } 
    catch (error) {
      next(error);  
    }
})

// Get deactive Students by teacher
router.get("/find/deactive/:teacherId", authMiddleware, async (req, res, next)=>{
    try {
        const teacher = await Teacher.findById(req.params.teacherId);
        if(!teacher){
            const error = new Error("Teacher not found !!");
            error.statusCode = 404;
            return next(error);
        }

        const students = Student.find({
            teacherId: req.params.teacherId,
            active: false
        })

        res.success(students);
    } 
    catch (error) {
        next(error);
    }
})

// Get logged teacher details from jwt
router.get("/getTeacher", authMiddleware, async (req, res)=>{
    try {
        const decoded = jwt.verify(req.cookies.token, process.env.JWT_SECRET);
        const teacherId = decoded.teacherId;

        const teacher = await Teacher.findById(teacherId);

        res.success(teacher, "Teacher fetched successfully.");
    } 
    catch (error) {
        next(error)
    }
})

// Get all Teachers
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