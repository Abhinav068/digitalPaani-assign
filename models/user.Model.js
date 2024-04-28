const { model, Schema } = require('mongoose');

const UserModel = model('user', Schema({
    
    "firstName": {
        type: String,
        required: true
    },
    "lastName": {
        type: String,
        required: true
    },
    "email": {
        type: String,
        required: true
    },
    "password":{
        type: String,
        required:true
    }
   
}))

module.exports = { UserModel };