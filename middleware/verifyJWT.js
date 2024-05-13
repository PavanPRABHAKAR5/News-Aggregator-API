const jwt = require('jsonwebtoken');

const User = require('../User.json');

const verifyToken = (req,res,next) =>{

    if(req.headers && req.headers.authorization){
        const token = req.headers.authorization.split('Bearer ')[1];
        jwt.verify(token, "secret_sign", (err,decode)=>{
            if(err){
                req.user = undefined;
                req.message = "Header verification failed";
                next();
            }else{
                let _email = User.Users.find((user)=>user.email == decode.email)

                if(_email){
                    req.user = _email
                    req.message = "Found the user successfully, Valid token"
                    next()
                }else{
                    req.user = undefined;
                    req.message = "Something went wrong";
                    next();
                }
            }
        })

    }else{
        req.user = undefined;
        req.message = "Authorization header not found";
        next();
    }

}

module.exports = verifyToken;