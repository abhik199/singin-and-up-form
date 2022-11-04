const mongoose = require('mongoose')
const xy = mongoose.Schema({
    name:{
        type: String, 
    },
    lastname:{
        type: String, 
    },
    email:{
        type: {}, 
        required: true, 
        index: { unique: true }
    },
    password:{
        type: {}, 
        required: true, 

    },
    confirm_password:{},
})
module.exports=mongoose.model("login_form",xy)