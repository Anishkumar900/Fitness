const {RegistationData}=require("../models/sinup-models");


const passwordupdate=async(req,res)=>{

    // console.log(req.body.Form);
    // res.send({
    //     code:200,
    //     message:"hello"
    // })


    try {
        const userData = await RegistationData.findOne({ username: req.body.Form.username });

        if(!userData){
            res.json({
                code: 400,
                error: "Internal Server Error"
            });
        }
        userData.password = req.body.Form.password;
        userData.repassword = req.body.Form.repassword;

    
        await userData.save();
        res.json({
            code: 200,
            message: "Password updated successfully"
        });
    } catch (error) {
        console.error(error);
        res.json({
            code: 500,
            error: "Internal Server Error"
        });
    }

}
module.exports={passwordupdate}