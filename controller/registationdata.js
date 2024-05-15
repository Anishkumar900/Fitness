const { RegistationData, EmailVericationData } = require('../models/sinup-models');
const nodemailer = require("nodemailer");
require("dotenv").config();

const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD,
    },
    pool: true
});

const getAllRegistationData = async (req, res) => {
    try {
        const data = await EmailVericationData.findOne({ username: req.body.username });

        if (!data) {
            return res.send({
                code: 400,
                message: "Already registered"
            });
        }

        const verification = await RegistationData.findOne({ username: req.body.username });

        if (verification || data.isVerified === false) {
            return res.send({
                code: 400,
                message: "Already registered"
            });
        } else {
            const obj = new RegistationData(req.body);
            await obj.save();

            const Headline = "Don't share with any person.";
            const paymentDetailsHTML = `
                <b>Account Details:</b><br>
                <b>User Name</b>: ${req.body.username} <br>
                <b>password </b>: ${req.body.password} <br>
                `;

            const info = await transporter.sendMail({
                from: {
                    name: Headline,
                    address: process.env.EMAIL
                },

                to: req.body.username,
                subject: "Acknowledge your User ID and Password",
                html: paymentDetailsHTML,
            });
            return res.send({
                code: 200,
                message: "Registration successful"
            });
        }
    } catch (err) {
        console.log(err);
        return send({
            code: 500,
            message: "Internal Server Error"
        });
    }
};

module.exports = { getAllRegistationData };
