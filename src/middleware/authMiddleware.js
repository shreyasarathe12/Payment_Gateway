// src/middleware/authMiddleware.js
const basicAuth = require('express-basic-auth');

const authMiddleware = basicAuth({
    users: { 'admin': 'password' },
    challenge: true
});

module.exports = authMiddleware;
