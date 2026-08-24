const errorResponse = (err, req, res, next)=>{
    res
    .status(err.statusCode || 500)
    .json({
        success: false,
        message: err.message || "Something went wrong."
    });

    next();
}

export default errorResponse;