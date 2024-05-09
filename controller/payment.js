const Razorpay = require('razorpay');
const RAZORPAY_KEY_ID = "rzp_test_KFEvSBaf02veO3"
const RAZORPAY_SECRET = "ionmAa2DOV61fIZEuAT3jJGy"
const crypto = require('crypto');
const { paymentdetailsSchema } = require("../models/sinup-models")
const payment = (async (req, res) => {
    try {
        const razorpay = new Razorpay({
            key_id: RAZORPAY_KEY_ID,
            key_secret: RAZORPAY_SECRET
        });
        if (!req.body) {
            res.send({
                code: 400,
                message: "this is error"
            })
        }

        const order = await razorpay.orders.create(req.body.defaultOptions);
        if (!order) {
            res.send({
                code: 400,
                message: "this is error"
            })
        }
        res.send({
            code: 200,
            message: "this is success",
            order
        })

    }
    catch (err) {
        res.send({
            code: 500,
            message: "this is error"
        })
    }
})

const validate = ((req, res) => {
    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body.data;
        const text = `${razorpay_order_id}|${razorpay_payment_id}`;
        const expectedSignature = crypto.createHmac('sha256', RAZORPAY_SECRET).update(text).digest('hex');

        if (expectedSignature !== razorpay_signature) {
            return res.status(400).json({ code: 400, message: "Invalid signature" });
        }

        res.status(200).json({ code: 200, message: "Payment validated successfully" });
    } catch (err) {
        res.status(500).json({ code: 500, message: err.message });
    }
});


const paymentdetails =async (req, res) => {
    // console.log(req.body);
    // console.log(req.body.formData);
    // console.log(req.body.razorpay);
    try {
        const obj = new paymentdetailsSchema();
        obj.razorpay_payment_id = req.body.razorpay.razorpay_payment_id;
        obj.razorpay_order_id = req.body.razorpay.razorpay_order_id;
        obj.razorpay_signature = req.body.razorpay.razorpay_signature;
        obj.totalAmount = req.body.formData.totalAmount;
        obj.firstName = req.body.formData.firstName;
        obj.lastName = req.body.formData.lastName;
        obj.dob = req.body.formData.dob
        obj.email = req.body.formData.email
        obj.mobileNumber = req.body.formData.mobileNumber
        obj.preferredLocation = req.body.formData.preferredLocation
        obj.bodyFirst = req.body.formData.bodyFirst
        obj.start = req.body.formData.start
        obj.duration = req.body.formData.duration;
        await obj.save();
        res.status(200).json({ code: 200, message: "succes" })
    }
    catch (err) {
        res.status(500).json({ code: 500, message: "error" })
    }
}


module.exports = { validate, payment, paymentdetails }