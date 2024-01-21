const express = require("express");
const UserModel = require("../models/user");
const ChatModel = require("../models/chat");
const { verifyAccessToken, deleteToken } = require("../common");

async function modifyAccountDetails(req, res) {
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

        // Modify account details
        const { name, occupation, dob, gender, pronouns, skills, location, bio, profileImage } = req.body;
        if (name) user.name = name;
        if (occupation) user.occupation = occupation;
        if (dob) user.dateOfBirth = dob;
        if (gender) user.sex = gender;
        if (pronouns) user.pronouns = pronouns;
        if (skills) user.skillCanTeach = skills;
        if (location) user.location = location;
        if (bio) user.bio = bio;
        if (profileImage) user.profileImage = profileImage;

        await user.save();
        res.status(200).json({ isUpdated: true });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function swipeRight(req, res) {
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

        // Simulate what happens when a user swipes right

        // Get other user
        const { userId } = req.body;
        if (!userId) throw Error("All inputs are required");
        const otherUser = await UserModel.findOne({ _id: userId });
        if (!otherUser) throw new Error("Other User does not exist");

        // Check if other user is in current user's incoming interest list
        if (user.incomingInterestList.includes(otherUser._id)) {
            // If so, add other user to current user's match list
            user.matchList.push(otherUser._id);
            await user.save();

            // Add current user to other user's match list
            otherUser.matchList.push(user._id);
            await otherUser.save();

            // Remove other user from current user's incoming interest list
            user.incomingInterestList = user.incomingInterestList.filter(id => id !== otherUser._id);
            await user.save();

            // Remove current user from other user's incoming interest list
            otherUser.incomingInterestList = otherUser.incomingInterestList.filter(id => id !== user._id);
            await otherUser.save();

            // Add current user to other user's skip list
            user.skipList.push(otherUser._id);
            await user.save();

            // Create chat between both users
            await ChatModel.create({ userIds: [user._id, otherUser._id], messages: [] })

            res.status(200).json({ isMatched: true });
            return;
        }

        // If the other user is not in the current user's incoming interest list, add current user to other user's incoming interest list

        // Add current user to other user's incoming interest list
        otherUser.incomingInterestList.push(user._id);
        await otherUser.save();

        // Add other user to current user's skip list
        user.skipList.push(otherUser._id);
        await user.save();

        res.status(200).json({ isMatched: false });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Add functions to router
const modifyRouter = express();
modifyRouter.put("/modifyAccountDetails", modifyAccountDetails);
modifyRouter.put("/swipeRight", swipeRight);

module.exports = modifyRouter;