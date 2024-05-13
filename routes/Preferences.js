const fs = require('fs')
const express = require('express');
const route = express.Router();

const tokenVerify = require('../middleware/verifyJWT')
const User = require('../User.json')

route.get('/', tokenVerify, (req,res)=>{
if(req.user){
    try{
        let userMail = req.user
        let preferencesData = User.Users.find((user)=> user.email == userMail.email )
        res.status(200).json({
            preferences: preferencesData.preferences
        })
    }catch(err){
        res.status(401).json({
            Status: "Failed",
            message: err.message
        })
    }
}else{
    res.status(401).json({
        message : req.message
    })
}
})



route.put('/', tokenVerify, (req,res)=>{
if(req.user){
    let preferencesBody = req.body
    if(preferencesBody.hasOwnProperty("preferences")){
        let userMail = req.user
        let preferencesPutData = User.Users.findIndex((user)=> user.email == userMail.email )
        // preferencesPutData.preferences = req.body.preferences

        User.Users[preferencesPutData].preferences = req.body.preferences

        // console.log(preferencesPutData)
        fs.writeFile('./User.json', JSON.stringify(User), { encoding: 'utf8', flag: 'w' }, (err, data) => {
            if (err) {
                return res.status(500).json({
                    Status: "Failed",
                    message: err.message
                })
            } else {
                // res.status(200).json({
                //     preferences: preferencesBody.preferences
                // })
                res.status(200).json(preferencesPutData.preferences)
            }
        })
        

    }else{

        res.status(400).json({
            status: "Failed",
            message: "Validation failed",

        })

    }

}else{
    res.status(401).json({
        message : req.message
    })
}
})


module.exports = route