const fs = require('fs');
const { PassThrough } = require('stream');

// const mockUser = {
//     name: 'Clark Kent',
//     email: 'clark@superman.com',
//     password: 'Krypt()n8',
//     preferences:['movies', 'comics']
// };

function isValidEmail(email) {
    // Regular expression for validating an email address
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function validation(userCredientials){
    // console.log(userCredientials)
    if(userCredientials.hasOwnProperty("name") && (userCredientials.hasOwnProperty("email") &&  isValidEmail(userCredientials.email)) && 
    userCredientials.hasOwnProperty("password") && userCredientials.hasOwnProperty("preferences")){

        return {
            status : true,
            Message: "User Registered successfully"
        }

    }else{

        return {
            status : false,
            Message: "Validation failed",
            
        }

    }

}

module.exports = validation;