// Make express server
const express = require('express');
const app = express();
const port = 8888;
const mongoose = require("mongoose");
require("dotenv").config();

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/local";

mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

const db = mongoose.connection;

// Start server
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
