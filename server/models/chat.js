const mongoose = require("mongoose");

// Message list type is an array of objects with the following properties:
// - ownerID: the id of the user who sent the message
// - text: the text of the message
// - createdAt: the date the message was created

const Chat = new mongoose.Schema(
    {
        messageList: {
            type: [Object],
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
