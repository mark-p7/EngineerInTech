const jwt = require("jsonwebtoken");

// Validate access token
function verifyAccessToken(token, userId) {
    try {
        // Verify the token using the same secret used to create it
        const decoded = jwt.verify(token, process.env.JWT_AUTH_KEY);
        return decoded._id != userId ? null : decoded._id;
    } catch (error) {
        return null;
    }
}

// Delete token from user
function deleteToken(user, token) {
    user.tokens = user.tokens.filter((t) => t !== token);
    user.save();
}

module.exports = { verifyAccessToken, deleteToken };