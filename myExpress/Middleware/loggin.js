const logger = (req,res,next)=>{
    console.log("logger",Date.now());
    next();
};

module.exports = logger;