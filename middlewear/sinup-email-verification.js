const EmailVerification = (req, res, next) => {
    try {
        const body=req.body;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const result= emailRegex.test(body.username);
        if(result){
            next();
        }
        else{
            res.send({
                code:404,
                message:"Invalid Email"
            })
        }
    }
    catch (err) {
        res.send({
            code:404,
            message:"Invalid Email"
        })
    }
}

module.exports = {
    EmailVerification
}