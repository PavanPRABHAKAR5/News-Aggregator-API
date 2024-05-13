const fs = require('fs');
const express = require('express');
const route = express.Router()

const verifyToken = require('../middleware/verifyJWT')
const User = require('../User.json');


route.get('/',verifyToken, async (req,res)=>{
    if(req.user){

        let preferencesPutData = User.Users.find((user)=> user.email == req.user.email )


        let user_categories = preferencesPutData.preferences
        const preferencesString = JSON.stringify(user_categories).slice(1, -1);

        var requestOptions = {
            method: 'GET'
        };
        
        var params = {
            api_token: 'fVIAU0LDuzDliPDmMjVEq5OrHGbKMJrpjFrF21LM',
            // categories: preferencesString,
            categories: "entertainment",
            // search: 'apple',
            limit: '50'
        };
        
        var esc = encodeURIComponent;
        var query = Object.keys(params)
            .map(function(k) {return esc(k) + '=' + esc(params[k]);})
            .join('&');
        
        
        const response = await fetch("https://api.thenewsapi.com/v1/news/all?" + query, requestOptions);
        // const result = await response.text();
        const result = await response.text();
        res.status(200).json({
            news: JSON.parse(result)
        })
    }else{
        res.status(401).json({
            message : req.message
        })
    }
})




module.exports = route;

