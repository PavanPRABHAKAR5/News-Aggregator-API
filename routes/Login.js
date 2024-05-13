const express = require('express');
const route = express.Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

route.use(express.json())

const user = require('../User.json')
const verifyToken = require('../middleware/verifyJWT')

route.post('/', (req,res)=>{
    let userCredientials = req.body;
    
    let userData = user.Users.findIndex((Users)=>Users.email == userCredientials.email);

    if(userData == -1){
        return res.status(401).json({
            message: "User not found"
        })
    }else{
        isPasswordValid = bcrypt.compareSync(userCredientials.password, user.Users[userData].password)
        if(!isPasswordValid){
            res.status(401).json({
                message: "Invalid Password"
            })
        }else{
            let token = jwt.sign({
                email:user.Users[userData].email,
            },"secret_sign",{
                expiresIn: 86400
            })

            res.status(200).json({
                User:{
                    email: user.Users[userData].email
                },
                message:"Login Successful",
                token: token
            })
        }
    }


})




module.exports = route;