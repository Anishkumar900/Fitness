const OtpGenerate=()=>{
    return Math.floor(Math.random()*1000000);
}
const otp=OtpGenerate();
module.exports={otp}