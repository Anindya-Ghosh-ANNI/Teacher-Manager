const successResponse = (req, res, next)=>{
    res.success = (data, message="Success")=>{
        res.status(200).json({
            success: true,
            message,
            data
        })
    };

    next();
}

export default successResponse;