import jwt from "jsonwebtoken";


function authMiddleware(req, res, next){
    try {
        if(!req.cookies.token){
            const error = new Error("Please login first !!");
            error.statusCode = 401;
            return next(error);
        }

        jwt.verify(req.cookies.token, process.env.JWT_SECRET);

        next();
    } 
    catch (error) {
        next(error);
    }
}

export default authMiddleware;