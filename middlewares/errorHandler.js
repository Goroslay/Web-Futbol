

const errorHandler = (err,req,res,next)=>{
    res.status(err.statusCode || 500).json({
        succes:false,
        message: err.message || 'Error interno del servidor'
    })
} 

export default errorHandler