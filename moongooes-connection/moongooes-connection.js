const mongoose = require('mongoose');
require('dotenv').config()


// mongoose.connect("mongodb+srv://anish:1XpTyGNYYFxJApwm@cluster0.jgpwrdi.mongodb.net/feetness")
mongoose.connect(process.env.MONGO_URL)
    .then(() => {
        console.log("Database connected");
    })
    .catch((err) => {
        console.log(err);
    });

module.exports = mongoose;


