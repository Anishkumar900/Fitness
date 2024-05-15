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
                jwt.sign({verification},secretkey,{expiresIn:'50000h'},(err,token)=>{
                        if(token){
                            res.json({
                                token,
                                code:200,
                                message:"login successfull"
                            })
                        }
                        
                })

            } else {
                res.send({
                    code:400,
                    message:"Invilide user"
                })
            }
        } else {
            res.send({
                code:400,
                message:"Invilide user"
            })
        }
    } catch (error) {
        res.send({
            code:400,
            message:"Invilide user"
        })
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