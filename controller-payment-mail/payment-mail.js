const { paymentdetailsSchema } = require("../models/sinup-models");
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



const EmailacknowlogeForPayment = async (req, res) => {
    try {
        const data = await paymentdetailsSchema.findOne({ razorpay_payment_id: req.body.razorpay_payment_id });
        console.log(data.date);
        if (!data) {
            res.status(200).send({ code: 400, message: "invalid" });
        }
        const date = new Date(data.date);
        const formattedDate = date.toLocaleDateString();
        const formattedTime = date.toLocaleTimeString();
        const Headline = `Thank you for your recent payment. We have received your payment for ${data.totalAmount}.`
        const paymentDetailsHTML = `
                <b>Payment Details:</b><br>
                Payment Amount: ${data.totalAmount} <br>
                Transaction ID: ${data.razorpay_payment_id} <br>
                Date: ${formattedDate} <br> 
                Time: ${formattedTime} <br>
                `;


        const info = await transporter.sendMail({
            from: {
                name: Headline,
                address: process.env.EMAIL
            },

            to: data.email,
            subject: "Payment Successful",
            html: paymentDetailsHTML
        });
        res.status(200).json({
            code: 200,
            message: "Email sent successfully. Please check your email for verification."
        });

    } catch (error) {
        console.error("Error:", error);
        res.status(500).send({ code: 500, message: "Internal Server Error" });
    }

}


module.exports = { EmailacknowlogeForPayment };
