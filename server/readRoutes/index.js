const express = require("express");
const UserModel = require("../models/user");
const ChatModel = require("../models/chat");
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

        const potentialNextUser = await UserModel.aggregate([
            { $match: { _id: { $nin: user.skipList } } },
            { $sample: { size: 1 } }
        ]).exec();

        // potentialNextUser will be an array with one element, or empty if no user is found.
        const nextUser = potentialNextUser.length > 0 ? potentialNextUser[0] : null;
        user.skipList.push(nextUser._id);
        await user.save();
        res.status(200).json({ nextUserId: nextUser._id, nextUserName: nextUser.name, nextUserOccupation: nextUser.occupation, nextUserDob: nextUser.dateOfBirth, nextUserProfileImage: nextUser.profileImage, nextUserSkills: nextUser.skillCanTeach, nextUserBio: nextUser.bio, nextUserGender: nextUser.sex, nextUserLocation: nextUser.location, nextUserPronouns: nextUser.pronouns });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function getAllChats(req, res) {
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

        const chats = await ChatModel.find({ userIds: user._id });
        const allChats = [];
        for (let i = 0; i < chats.length; i++) {
            const otherUserId = chats[i].userIds[0] != user._id ? chats[i].userIds[0] : chats[i].userIds[1];
            const otherUser = await UserModel.findOne({ _id: otherUserId });
            await chats[i].save();
            allChats.push({
                chatId: chats[i]._id,
                name: otherUser.name,
                profileImage: otherUser.profileImage,
                message: chats[i].messageList.length > 0 ? chats[i].messageList[chats[i].messageList.length - 1].message : "Say Hello",
                timestamp: chats[i].messageList.length > 0 ? chats[i].messageList[chats[i].messageList.length - 1].createdAt : "",
            });
        }

        res.status(200).json(allChats);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function getAllMessages(req, res) {
    try {
        // Get user
        if (!(req.body.token && req.body.chatId)) throw Error("All inputs are required");
        const user = await UserModel.findOne({ tokens: req.body.token });

        // Check if users exists
        if (!user) throw new Error("User does not exist");

        // Check if token is valid
        const validToken = verifyAccessToken(req.body.token, user._id);
        if (!validToken) {
            deleteToken(user, token)
            throw new Error("Invalid token");
        }
        const chat = await ChatModel.findOne({ _id: req.body.chatId });
        const messages = chat.messageList;
        res.status(200).json(messages);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Add functions to router
const readRouter = express();
readRouter.post("/profile", getProfile);
readRouter.post("/nextProfile", getNextProfile);
readRouter.post("/allChats", getAllChats);
readRouter.post("/allMessages", getAllMessages);

module.exports = readRouter;