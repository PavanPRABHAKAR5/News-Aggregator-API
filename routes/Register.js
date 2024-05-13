const fs = require('fs')
const express = require('express');
const route = express.Router();
const bcrypt = require('bcrypt')


const validation = require("../helper/validation")
const User = require('../User.json')


route.use(express.json())

route.post('/', async (req,res)=>{
    try{
        let userCredientials = req.body;
        let userList = User;

        console.log(userList)
        if(validation(userCredientials).status == true){

        
            userCredientials.password = bcrypt.hashSync(req.body.password, 8);
            userList.Users.push(userCredientials)

            fs.writeFile('./User.json', JSON.stringify(userList), { encoding: 'utf8', flag: 'w' }, (err, data) => {
                if (err) {
                    return res.status(500).json({
                        Status: "Failed",
                        message: err.message
                    })
                } else {
                    res.status(200).json(userCredientials)
                }
            })
        } else {
            res.status(400).json({
                status: "Failed",
                message: validation(userCredientials).Message,

            })
        }

    }catch(err){
        res.status(400).json({
            Status: "Failed",
            message: err.message
        })
    }
})

module.exports = route;