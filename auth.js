const jwt = require('jsonwebtoken');
const JWT_SECRETE = "abrakadabra";

function auth(req, res, next){
    const token = req.headers.token;
    try{
        const decodedData = jwt.verify(token, JWT_SECRETE);
        console.log(decodedData.id);
        req.userId = decodedData.id;

        next();
    }catch(e){
        res.status(403).json({
            message : "Invalid credentials"
        })
    }
}

module.exports = {
    auth, JWT_SECRETE
};  