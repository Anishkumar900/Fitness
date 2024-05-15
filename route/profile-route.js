const express = require('express');
const route = express.Router();
const { emailsinupresister } = require("../controller/sinup-controller");
const { EmailVerification } = require("../middlewear/sinup-email-verification");
const { OtpVerify } = require("../controller/otp-controller");
const { getAllRegistationData } = require("../controller/registationdata");
const { LoginVarication, verificationProfile } = require("../controller/login-controller");
const { verifyToken } = require("../middlewear/token-verivaction");
const { registationValidatation } = require("../middlewear/regatation-middlewear");
const { ForgotPasswordUsernameVerifaction } = require("../controller/forgotusernameverication");
const { validpassword } = require("../middlewear/resetPasswordConformation");
const { passwordupdate } = require("../controller/passwordupdate");

const {validatePayment,payment,paymentdetails,emailVerificationForPayment}=require("../controller/payment")
const {EmailacknowlogeForPayment}=require("../controller-payment-mail/payment-mail");


route.post("/sinup", EmailVerification, emailsinupresister);
route.post("/otp-vif", OtpVerify);
route.post("/registration", registationValidatation, getAllRegistationData);
route.post("/login", LoginVarication);
route.post("/profile", verifyToken, verificationProfile);
route.post("/forgotpasswordUserverifaction", ForgotPasswordUsernameVerifaction);
route.post("/resetpassword", validpassword, passwordupdate);
route.post("/api/payment",payment)
route.post("/api/payment/validate",validatePayment)
route.post("/api/payment/validate/storedata",paymentdetails)
route.post("/api/joinclasses/emailverifaction",emailVerificationForPayment);
route.post("/api/payment/validate/acknowloge/mail",EmailacknowlogeForPayment)

module.exports = { route };
