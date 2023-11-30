const { CustomAPIError } = require('../errors/customErrorHandler');

const errorHandler = (err,req,res,next) => {
    if(err instanceof CustomAPIError){
        return res.status(err.statusCode).json({ errorMessage : err.message })
    }
    return res.status(500).json({ error :'Something went wrong, please try again!!' })
}

module.exports = errorHandler;