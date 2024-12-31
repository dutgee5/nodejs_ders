module.exports= (req,res,next)=>{ //middleware fonksiyonu
    console.log(`${new Date().toUTCString()} - ${req.method} - ${req.hostname}`); // request bilgilerini konsola yazdırır.
    next(); // bir sonraki middleware'e geçiş yapar.
}