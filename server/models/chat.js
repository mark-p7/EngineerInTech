const mongoose = require("mongoose");

const Chat = new mongoose.Schema(
    {
        messageList: {
            type: [String],
            default: [],
        },
        userIds: {
            type: [String],
            default: [],
            required: true,
        },
    },
    { minimize: false }
);

module.exports = mongoose.model("Chats", Chat);
