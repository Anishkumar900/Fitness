const mongoose = require('mongoose');
const mongooseConnection = require('../moongooes-connection/moongooes-connection');

const emailsinupSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    otp:{
        type:Number,
    },
    isVerified:{
        type:Boolean,
        default:false
    }
});

const RegistationDoc=new mongoose.Schema({
    username:{
        type: String,
        required: true
    },
    FirstName:{
        type: String,
        required: true
    },
    LastName: {
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    repassword:{
        type: String,
        required: true
    },
    PhoneNumber:{
        type: String,
        required: true
    },
    RememberMe:{
        type:  Boolean,
        required: true
    }
})

const EmailVericationData = mongooseConnection.model('EmailVericationData', emailsinupSchema);
const RegistationData = mongooseConnection.model('RegistationData', RegistationDoc);

module.exports = { EmailVericationData, RegistationData};

