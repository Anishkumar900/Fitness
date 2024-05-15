const nodemailer = require("nodemailer");
require("dotenv").config();
const { EmailVericationData,RegistationData } = require("../models/sinup-models");

const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD,
    },
    pool: true
});

const emailsinupresister = async (req, res) => {
    try {
        const body = req.body;
        const otp = OtpGenerate(); 
        

        const data=await RegistationData.findOne({username: body.username});
        if (data) {
            return res.send({ code: 400, message: "User already exists" });
        }

        const existingUser = await EmailVericationData.findOne({ username: body.username });
        if (existingUser) {
            await EmailVericationData.findByIdAndDelete(existingUser._id);
        }
        
        const obj = new EmailVericationData({
            username: body.username,
            otp: otp
        });
        await obj.save();

        const info = await transporter.sendMail({
            from: {
                name: "OTP",
                address: process.env.EMAIL
            },
            to: body.username,
            subject: "Email Verification",
            html: `<b> Please do not share the OTP and verify within 5 minutes ( OTP :- ${otp} )</b>`
        });

        res.status(200).json({
            code: 200,
            message: "Email sent successfully. Please check your email for verification."
        });
    } catch (error) {
        console.log(error);
        res.status(404).send("Error registering user.");
    }
};

const OtpGenerate = () => {
    return Math.floor(Math.random() * 1000000);
};

module.exports = { emailsinupresister };

