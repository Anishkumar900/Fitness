const mongoose = require('mongoose');
const mongooseConnection = require('../moongooes-connection/moongooes-connection');

const emailsinupSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  otp: {
    type: Number,
  },
  isVerified: {
    type: Boolean,
    default: false
  }
});

const RegistationDoc = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  FirstName: {
    type: String,
    required: true
  },
  LastName: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  repassword: {
    type: String,
    required: true
  },
  PhoneNumber: {
    type: String,
    required: true
  },
  RememberMe: {
    type: Boolean,
    required: true
  }
})

const paymentschema=new mongoose.Schema({
    cardnumber:{
        type:String,
        // required:true
    },
    cvv:{
        type:String,
        // required:true
    },
    cardholdername:{
        type:String,
        // required:true
    },
    razorpay_payment_id:{
      type:String,
        required:true
    },
    razorpay_order_id:{
      type:String,
        required:true
    },
    razorpay_signature:{
      type:String,
        required:true
    },
    totalAmount:{
      type:String,
      required:true
    },
    firstName:{
      type:String,
      required:true
    },
    lastName:{
      type:String,
    },
    dob:{
      type:String,
      required:true
    },
    email:{
      type:String,
      required:true
    },
    mobileNumber:{
      type:String,
      required:true
    },
    preferredLocation:{
      type:String,
      required:true
    },
    bodyFirst:{
      type:String,
      // required:true
    },
    start:{
      type:String,
      required:true
    },
    duration:{
      type:String,
      required:true
    }
})

const EmailVericationData = mongooseConnection.model('EmailVericationData', emailsinupSchema);
const RegistationData = mongooseConnection.model('RegistationData', RegistationDoc);

const paymentdetailsSchema=mongooseConnection.model("paymentdetailsSchema",paymentschema)

module.exports = { EmailVericationData, RegistationData ,paymentdetailsSchema};
