// Make express server
const express = require('express');
const app = express();
const port = 8888;
const mongoose = require("mongoose");
require("dotenv").config();
const authRouter = require("./authRoutes");
const readRouter = require("./readRoutes");
const modifyRouter = require("./modifyRoutes");
const cors = require("cors");

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/local";

mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

const db = mongoose.connection;

app.use(cors(
    {
        origin: "http://localhost:3000",
        credentials: true
    }
));

app.use(express.json());
app.use("/api", authRouter);
app.use("/api", readRouter);
app.use("/api", modifyRouter);

// Start server
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
