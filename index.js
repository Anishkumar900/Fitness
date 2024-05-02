const express = require('express');
const app = express();
require("dotenv").config()
const port = process.env.PORT || 5000;
const { route } = require("./route/profile-route");
const bodyParser = require("body-parser");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const cors = require('cors');
app.use(cors());
const path = require('path');

app.use("/", route);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
