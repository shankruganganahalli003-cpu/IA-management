const jwt = require("jsonwebtoken");


const isauth =  (req,res,next) => {
    
    const token = req.cookies.token;

    if(!token){
        return res.status(401).json({message:"no token"});
    }

    const decoded =  jwt.verify(token, "secret")

    req.userId = decoded.id

    next();

}

module.exports = isauth;