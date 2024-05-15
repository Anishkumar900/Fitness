const { EmailVericationData } = require("../models/sinup-models")



const OtpVerify = async (req, res) => {
    // console.log(req.body);
    // res.send("hello");
    

    try {
        const { username, otp } = req.body;
        const user = await EmailVericationData.findOne({ username: username })
        if (user) {
            // console.log(user, "   ", otp);
            if (user.otp == otp) {
                user.isVerified = true
                await user.save()
                res.send({

                    code: 200,
                    message: "succes"
                })
                // console.log(1);
            }
            else {
                user.isVerified = false
                await user.save()
                res.send({
                    code: 400,
                    message: "In valide"
                })
                // console.log(2);
            }
        }
        else {
            user.isVerified = false
            await user.save()
            res.send({
                code: 400,
                message: "In valide"
            })
            // console.log(3);

        }

    }
    catch (err) {
        user.isVerified = false
        await user.save()
        res.send({
            code: 400,
            message: "In valide"
        })

    }

    // try{
    //     const {email,otp}=req.body
    //     const user=await EmailVericationData.findOne({email})  
    //     if(!user){
    //         return res.status(400).json({
    //             message:"User not found"
    //         })
    //     }
    //     if(user.otp!=otp){
    //         return res.status(400).json({
    //             message:"Invalid OTP"
    //         })
    //     }
    //     user.isVerified=true
    //     await user.save()
    //     return res.status(200).json({
    //         message:"User verified successfully"
    //     })
    // }catch(err){
    //     return res.status(500).json({
    //         message:err.message
    //     })
    // }

}

module.exports = { OtpVerify }