const express = require("express");
const UserModel = require("../models/user");
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
        const profile = { name: otherUser.name, profileImage: otherUser.profileImage, skillCanTeach: otherUser.skillCanTeach, bio: otherUser.bio, dob: otherUser.dateOfBirth, sex: otherUser.sex, location: otherUser.location };
        res.status(200).json(profile);
        
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Add functions to router
const modifyRouter = express();
modifyRouter.get("/profile", getProfile);

module.exports = modifyRouter;