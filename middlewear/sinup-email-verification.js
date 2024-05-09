const EmailVerification = (req, res, next) => {
    try {
        const { username } = req.body;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (emailRegex.test(username)) {
            next();
        } else {
            res.status(404).json({ code: 404, message: "Invalid Email" });
        }
    } catch (err) {
        res.status(404).json({ code: 404, message: "Invalid Email" });
    }
}

module.exports = {
    EmailVerification
}
