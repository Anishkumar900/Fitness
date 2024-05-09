const { RegistationData, EmailVericationData } = require('../models/sinup-models');

const getAllRegistationData = async (req, res) => {
    try {
        const data = await EmailVericationData.findOne({ username: req.body.username });

        if (!data) {
            return res.send({
                code: 400,
                message: "Already registered"
            });
        }

        const verification = await RegistationData.findOne({ username: req.body.username });

        if (verification || data.isVerified === false) {
            return res.send({
                code: 400,
                message: "Already registered"
            });
        } else {
            const obj = new RegistationData(req.body);
            await obj.save();
            return res.send({
                code: 200,
                message: "Registration successful"
            });
        }
    } catch (err) {
        console.log(err);
        return send({
            code: 500,
            message: "Internal Server Error"
        });
    }
};

module.exports = { getAllRegistationData };
