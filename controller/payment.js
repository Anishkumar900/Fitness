const Razorpay = require('razorpay');
const crypto = require('crypto');
const { paymentdetailsSchema,RegistationData } = require("../models/sinup-models");
require("dotenv").config();
const express = require("express");


const payment = async (req, res) => {
    try {
        const instance = new Razorpay({
            key_id: process.env.RAZORPAY_KEY_ID,
            key_secret: process.env.RAZORPAY_SECRET
        });

        if (!req.body || !req.body.defaultOptions) {
            return res.status(400).json({ code: 400, message: "Bad request" });
        }

        const { amount, currency, receipt } = req.body.defaultOptions;
        // console.log(amount);

        const options = {
            amount: Number(amount),
            currency: currency,
            receipt: receipt
        };
        

        const order = await instance.orders.create(options);

        if (!order) {
            return res.status(400).json({ code: 400, message: "Failed to create order" });
        }

        return res.status(200).json({ code: 200, message: "Order created successfully", order });
    } catch (err) {
        console.error("Error:", err);
        return res.status(500).json({ code: 500, message: "Internal server error" });
    }
};









const validatePayment = async (req, res) => {
    try {
        // console.log("Validating payment...");
        // console.log(req.body);
        
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

       
        const text = `${razorpay_order_id}|${razorpay_payment_id}`;

      
        const expectedSignature = crypto.createHmac('sha256', process.env.RAZORPAY_SECRET)
                                        .update(text)
                                        .digest('hex');

       
        if (expectedSignature !== razorpay_signature) {
            return res.status(400).json({ code: 400, message: "Invalid signature" });
        }

       
        return res.status(200).json({ code: 200, message: "Payment validated successfully" });
    } catch (err) {
        console.error("Error validating payment:", err);
        return res.status(500).json({ code: 500, message: err.message });
    }
};



const paymentdetails = async (req, res) => {
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


const emailVerificationForPayment = async (req, res) => {
    try {
        const data = await RegistationData.findOne({ username: req.body.email });
        
        if(data === null){
            res.status(200).json({ code: 400, message: "invalid user" });
        } else {
            res.status(200).json({ code: 200, message: "success" });
        }
    } catch (err) {
        res.status(200).json({ code: 500, message: "server error" });
    }
}



module.exports = { validatePayment, payment, paymentdetails ,emailVerificationForPayment}