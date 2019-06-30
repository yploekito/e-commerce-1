module.exports = function(err, req, res, next) {
    console.log(err);
    if (err.code === 404) {
        res.status(404).json({
            error:err,
        message: 'Resource not found',
        });
    } else if( err.code === 400){
        res.status(400).json({
            error:err,
        message: err.message
        })
    }else if(err.name === 'ValidationError'){
        res.status(400).json({error:err,
            message:'validation error'
        })
    }else if(err.code === 401){
        res.status(401).json({error:err,
            message: 'Unauthorized Access'
        })
    }else {
        res.status(500).json({
        message: 'Internal server error',
        });
    }
}