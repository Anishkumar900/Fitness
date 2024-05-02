const nodemailer = require("nodemailer");
require("dotenv").config();
const { EmailVericationData } = require("../models/sinup-models");

const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: "hit19ece.anishkumar@gmail.com",
        pass: "fywfqhihghcydnfu",
    },
    pool: true
});

const emailsinupresister = async (req, res) => {
    try {
        const body = req.body;
        const otp = OtpGenerate(); // Generate new OTP for each request

        if (await EmailVericationData.findOne({ username: body.username })) {
            const user = await EmailVericationData.findOne({ username: body.username });
            await EmailVericationData.findByIdAndDelete(user._id);
        } else {
            console.log("nahi hai");
        }

        const obj = new EmailVericationData();
        obj.username = body.username;
        obj.otp = otp;
        await obj.save();

        const info = await transporter.sendMail({
            from: {
                name: "OTP",
                address: "hit19ece.anishkumar@gmail.com"
            },
            to: body.username,
            subject: "Email Verification",
            html: `<b> Please do not share the OTP and verify within 5 minutes ( OTP :- ${otp} )</b>`
        });

        res.send({
            code: 200,
            message: "Email sent successfully. Please check your email for verification."
        })
    } catch (error) {
        console.log(error);
        res.status(404).send("Error registering user.");
    }
}

module.exports = { emailsinupresister };

const OtpGenerate = () => {
    return Math.floor(Math.random() * 1000000);
}
