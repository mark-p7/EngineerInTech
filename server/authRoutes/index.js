const express = require("express");
const UserModel = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { verifyAccessToken, deleteToken } = require("../common");

// Generate access token
function generateAccessToken(userId) {
    return jwt.sign(userId, process.env.JWT_AUTH_KEY, { expiresIn: "2d" });
}

// Validate email
function validateEmail(email) {
    const regex = /\S+@\S+\.\S+/;
    return regex.test(email);
}

// Register
async function register(req, res) {
    try {
        // Validate User input
        if (!(req.body.email && req.body.password)) throw Error("All inputs are required");

        // Validate User email
        if (!validateEmail(req.body.email)) throw new Error("Invalid email");

        // Generate salt
        const salt = await bcrypt.genSalt(10);

        // Setting user password
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        // Creates the User
        const user = await UserModel.create({ email: req.body.email, password: hashedPassword, skipList: [] });
        const token = generateAccessToken({ _id: user._id });
        user.tokens.push(token);
        await user.save();

        // Set header and send response
        res.status(201).json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Login
async function login(req, res) {
    try {
        // Find user
        const { email, password } = req.body;
        if (!(email && password)) throw Error("All inputs are required");
        const user = await UserModel.findOne({ email });
        if (!user) throw new Error("Incorrect Username or Password");
        if (!await bcrypt.compare(password, user.password)) throw new Error("Incorrect Username or Password");

        // Generate token
        const token = generateAccessToken({ _id: user._id });
        user.tokens.push(token);
        await user.save();

        // Send response
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Logout
async function logout(req, res) {
    try {
        // Check for user
        if (!req.body.token) throw Error("Token is required");
        const user = await UserModel.findOne({ tokens: req.body.token });

        // Verify token
        if (!verifyAccessToken(req.body.token, user._id)) throw Error("Invalid token");

        // Delete token from user
        deleteToken(user, req.body.token);

        // Send response
        res.status(200).json({ isLoggedOut: true });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

// Validate token and return user
async function tokenValidate(req, res) {
    try {
        // Check for user
        if (!req.body.token) throw Error("Token is required");
        const user = await UserModel.findOne({ tokens: req.body.token });
        if (!user) throw Error("Invalid token");

        // Verify token
        if (verifyAccessToken(req.body.token, user._id) == null) throw Error("Invalid token");

        // Send response
        res.status(200).json(user);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

// Add functions to router
const authRouter = express();
authRouter.post("/token/validate", tokenValidate);
authRouter.post("/logout", logout);
authRouter.post("/login", login);
authRouter.post("/register", register);

module.exports = authRouter;
