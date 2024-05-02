const verifyToken =(req,res,next)=>{
    const token = req.headers.authorization;
    if(!token){
        return res.status(401).json({
            message:"Access Denied"
        })
    }
    if(token){
        const bearer=token.split(" ");
        const bearerToken=bearer[1];
        req.token=bearerToken;
        next();
    }
    else{
        res.send("Token is not valid");
    }
    
}

// const token = req.headers.authorization.split(" ")[1];

module.exports={verifyToken}