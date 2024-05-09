const registationValidatation = (req, res, next) => {
    const { password, repassword, PhoneNumber } = req.body;

    
    if (password.length < 8) {
        return res.status(400).json({
            code: 400,
            error: "Password must be at least 8 characters long"
        });
    }

    const passwordRegex = /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?& ]/;
    if (!passwordRegex.test(password)) {
        return res.status(400).json({
            code: 400,
            error: "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
        });
    }

    if (password !== repassword) {
        return res.status(400).json({
            code: 400,
            error: "Password and confirm password do not match"
        });
    }

    if (!PhoneNumber || PhoneNumber.length !== 10) {
        return res.status(400).json({
            code: 400,
            error: "Phone number must be 10 digits long"
        });
    }

    next(); 
};

module.exports = { registationValidatation };
