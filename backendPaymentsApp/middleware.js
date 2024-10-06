const {JWT_SECRET} = require('./config')
const jwt = require('jsonwebtoken')

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if(authHeader == null || authHeader.split(' ')[1] != "Bearer"){
        res.status(403).json({
            msg : "Auth issue"
        });
    }

    const token = authHeader.split(' ')[1];
    
    try{
        const verifiedToken = jwt.verify(token, JWT_SECRET);
        req.userId = verifiedToken.userId;
        next();
    }
    catch(err){
        return res.status(403).json({
            msg : "Invalid JWT token"
        })
    }
    
}

module.exports = {
    authMiddleware
}
