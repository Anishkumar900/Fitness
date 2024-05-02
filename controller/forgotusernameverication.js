

const { RegistationData } = require("../models/sinup-models.js");

const ForgotPasswordUsernameVerifaction = (req, res) => {
    try {
        RegistationData.findOne({ username: req.body.username })
            .then((data) => {
                if (data) {
                    res.send({
                        code: 200,
                        message: 'success'
                    });
                } else {
                    res.send({
                        code: 400,
                        message: 'error'
                    });
                }
            })
            .catch((err) => {
                console.error(err);
                res.send({
                    code: 400,
                    message: 'error'
                });
            });
    } catch (err) {
        console.error(err);
        res.send({
            code: 400,
            message: 'error'
        });
    }
};

module.exports = { ForgotPasswordUsernameVerifaction };
