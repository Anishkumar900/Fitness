

const registationValidatation = (req, res, next) => {
    // console.log(req.body);

    if (req.body.password.length < 8) {
        return res.json({
            code: 400,
            error: "Password must be at least 8 characters long"
        });
    }

    if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?& ]/.test(req.body.password)) {
        return res.json({
            code: 400,
            error: "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
        });
    }

    if (req.body.password !== req.body.repassword) {
        return res.json({
            code: 400,
            error: "Password and confirm password do not match"
        });
    }

    if (!req.body.PhoneNumber || req.body.PhoneNumber.length !== 10) {
        // console.log(typeof(req.body.phoneNumber))
        return res.json({
            code: 400,
            error: "Phone number must be 10 digits long"
        });
    }

    next(); 
    
}

module.exports = { registationValidatation };
