require('dotenv').config();
const express = require('express');
const app = express();
const http = require("http").createServer(app);
const port = process.env.PORT || 80;
const path = require("path");
const morgan = require("morgan");
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

mongoose.connection
    .on('open', () => {
        console.log('Mongoose connection open');
    })
    .on('error', (err) => {
        console.log(`Connection error: ${err.message}`);
    });


app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");

require("./server/routes.js")(app);


http.listen(port, () => {
    console.log(`The server is running on port ${port}.`);
});

