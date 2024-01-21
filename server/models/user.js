const mongoose = require("mongoose");

const User = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            min: 6,
            max: 255,
        },
        password: {
            type: String,
            required: true,
            trim: true,
            min: 8,
            max: 16,
        },
        name: {
            type: String,
            default: "Anonymous",
            min: 3,
            max: 30,
        },
        occupation: {
            type: String,
            default: "",
        },
        dateOfBirth: {
            type: Date,
            default: Date.now,
        },
        sex: {
            type: String,
            default: "",
        },
        location: {
            type: String,
            default: "",
        },
        profileImage: {
            type: String,
            default: "",
        },
        skillCanTeach: {
            type: String,
            default: "",
        },
        bio: {
            type: String,
            default: "",
        },
        incomingInterestList: {
            type: [String],
            default: [],
        },
        skipList: {
            type: [String],
            default: [],
        },
        matchList: {
            type: [String],
            default: [],
        },
        chats: {
            type: [String],
            default: [],
        },
        tokens: {
            type: [String],
            default: [],
        }
    },
    { minimize: false }
);

module.exports = mongoose.model("Users", User);
