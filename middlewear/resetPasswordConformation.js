const validpassword =async (req, res, next) => {
    // console.log(req.body.Form);

    if ( req.body.Form.password < 8) {
        // console.log("Password length:", req.body.password ? req.body.password.length : "undefined");
        return res.json({
            code: 400,
            error: "Password must be at least 8 characters long"
        });
    }


    if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?& ]/.test(req.body.Form.password)) {
        return res.json({
            code: 400,
            error: "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
        });
    }

    if (req.body.Form.password !== req.body.Form.repassword) {
        return res.json({
            code: 400,
            error: "Password and confirm password do not match"
        });
    }

    
    next();
};

module.exports = {
    validpassword
};
