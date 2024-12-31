module.exports = (err,req,res,next)=>{ // error handling middleware fonksiyonu err parametresi alır. 1.sırada yer alır.
    res.status(err.statusCode).json({errorMessage:err}); // response body
}