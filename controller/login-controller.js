const jwt = require("jsonwebtoken");
require("dotenv").config();
// const secretkey="secretkey";
const secretkey=process.env.SECRET_KEY
const {RegistationData}=require('../models/sinup-models')

const LoginVarication = async (req, res) => {
    try {
        const verification = await RegistationData.findOne({ username: req.body.username });
        // console.log(verification);
        if (verification) {
            if (verification.password === req.body.password) {
                jwt.sign({verification},secretkey,{expiresIn:'48h'},(err,token)=>{
                        if(token){
                            res.json({
                                token,
                                message:"login successfull"
                            })
                        }
                })
                // res.send("sahi hai");

            } else {
                res.send("galat password hai");
            }
        } else {
            res.send("email nahi mila");
        }
    } catch (error) {
        console.error(error);
        res.status(500).send("Server Error");
    }
};

const verificationProfile=(req,res)=>{
    // console.log(req.token);
    jwt.verify(req.token,secretkey,(err,authdata)=>{
        if(err){
            // res.send("Invelide Profile")
            res.json({
                code:400,
                message:"Invalid Profile"
            })
        }else{
            res.json({
                authdata,
                code:200,
                message:"profile verified"
            })
        }
    })
}



module.exports={LoginVarication,verificationProfile}