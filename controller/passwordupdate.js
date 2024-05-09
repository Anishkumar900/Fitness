const { RegistationData } = require("../models/sinup-models");

const passwordupdate = async (req, res) => {
    try {
        const userData = await RegistationData.findOne({ username: req.body.Form.username });

        if (!userData) {
            return res.status(400).json({
                code: 400,
                error: "Internal Server Error"
            });
        }
        userData.password = req.body.Form.password;
        userData.repassword = req.body.Form.repassword;

        await userData.save();
        return res.status(200).json({
            code: 200,
            message: "Password updated successfully"
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            code: 500,
            error: "Internal Server Error"
        });
    }
};

module.exports = { passwordupdate };
