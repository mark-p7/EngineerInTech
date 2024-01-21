const express = require("express");
const UserModel = require("../models/user");
const ChatModel = require("../models/chat");
const MessageModel = require("../models/message");
const { verifyAccessToken, deleteToken } = require("../common");

async function getProfile(req, res) {
    try {
        // Get both users
        const { token, userId } = req.body;
        if (!token || !userId) throw Error("All inputs are required");
        const user = await UserModel.findOne({ tokens: token });
        const otherUser = await UserModel.findOne({ _id: userId });

        // Check if users exists
        if (!user) throw new Error("User does not exist");
        if (!otherUser) throw new Error("Other User does not exist");

        // Check if token is valid
        const validToken = verifyAccessToken(token, user._id);
        if (!validToken) {
            deleteToken(user, token)
            throw new Error("Invalid token");
        }

        // Send response
        const profile = {
            name: otherUser.name,
            occupation: otherUser.occupation,
            dob: otherUser.dateOfBirth,
            profileImage: otherUser.profileImage,
            skills: otherUser.skillCanTeach,
            bio: otherUser.bio,
            gender: otherUser.sex,
            location: otherUser.location,
            pronouns: otherUser.pronouns
        };
        res.status(200).json(profile);

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function getNextProfile(req, res) {
    try {
        // Get user
        if (!req.body.token) throw Error("All inputs are required");
        const user = await UserModel.findOne({ tokens: req.body.token });

        // Check if users exists
        if (!user) throw new Error("User does not exist");

        // Check if token is valid
        const validToken = verifyAccessToken(req.body.token, user._id);
        if (!validToken) {
            deleteToken(user, token)
            throw new Error("Invalid token");
        }

        // if there is an incoming interest, then there is a 5% chance that the next user will be the user that sent the interest
        if (user.incomingInterestList.length > 0 && (Math.random() * 100 < 5)) {
            const nextUserId = user.incomingInterestList.unshift();
            user.skipList.push(nextUserId);
            await user.save();
            res.status(200).json({ nextUserId });
            return;
        }

        const potentialNextUsers = await UserModel.find({ _id: { $nin: user.skipList } });
        const nextUser = potentialNextUsers[Math.floor(Math.random() * potentialNextUsers.length)];
        user.skipList.push(nextUser._id);
        await user.save();
        res.status(200).json({ nextUserId: nextUser._id });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Add functions to router
const readRouter = express();
readRouter.post("/profile", getProfile);
readRouter.post("/nextProfile", getNextProfile);

module.exports = readRouter;