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
const http = require("http");
const server = http.createServer(app);
const socket = require("socket.io");

// Connect to database
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/local";
mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
const db = mongoose.connection;

// Set limit for body parser
app.use(bodyParser.json({limit: '50mb', extended: true}));
app.use(bodyParser.urlencoded({limit: "50mb", extended: true, parameterLimit:50000}));
app.use(bodyParser.text({ limit: '200mb' }));

// Import models
const UserModel = require("./models/user");
const ChatModel = require("./models/chat");

const io = socket(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }
});

// Setup socket
io.on("connection", (socket) => {

    socket.on("join room", (chatId) => {
        socket.join(chatId)
    });

    socket.on("leave room", (chatId) => {
        socket.leave(chatId)
    });

    socket.on("send message", async (data) => {
        const user = await UserModel.findOne({ _id: data.ownerId });
        if (!user) return
        const chat = await ChatModel.findOne({ _id: data.chatId });
        if (!chat) return
        chat.messageList.push({ message: data.message, ownerId: data.ownerId, ownerName: data.ownerName, createdAt: data.createdAt });
        await chat.save();
        io.to(data.chatId).emit("message", { message: data.message, ownerId: data.ownerId, ownerName: data.ownerName, chatId: data.chatId, createdAt: data.createdAt });
    });

    socket.on("disconnect", () => {
        socket.disconnect();
    });
})

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
server.listen(port, () => console.log(`Example app listening on port ${port}!`));
