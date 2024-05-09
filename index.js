const express = require('express');
const app = express();
const port = process.env.PORT || 8011;
const { route } = require("./route/profile-route");
const bodyParser = require("body-parser");
const cors = require('cors');
const path = require('path');
// const crypto=require('crypto');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use("/", route);


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});


