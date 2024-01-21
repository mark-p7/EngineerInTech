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
const bodyParser = require("body-parser")

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/local";
app.use(bodyParser.json({limit: '50mb', extended: true}));
app.use(bodyParser.urlencoded({limit: "50mb", extended: true, parameterLimit:50000}));
app.use(bodyParser.text({ limit: '200mb' }));
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
