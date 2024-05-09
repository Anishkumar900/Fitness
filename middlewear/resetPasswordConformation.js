const validpassword = async (req, res, next) => {
    const { password, repassword } = req.body.Form;

    if (password.length < 8) {
        return res.send({
            code: 400,
            error: "Password must be at least 8 characters long"
        });
    }

    const passwordRegex = /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?& ]/;
    if (!passwordRegex.test(password)) {
        return res.send({
            code: 400,
            error: "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
        });
    }

    if (password !== repassword) {
        return res.send({
            code: 400,
            error: "Password and confirm password do not match"
        });
    }

    next();
};

module.exports = {
    validpassword
};
