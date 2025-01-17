const axios = require('axios');
require('dotenv').config();


module.exports = {
    async verifyToken(req, res, next) {
        try {
            const tokenBase64 = req.headers['x-access-token'];
    
            if (!tokenBase64) {
                return res.status(400).send({
                    auth: false,
                    message: "Error",
                    errors: "Token not provided in the header",
                });
            }
    
            // Decode Base64 to UTF-8
            let tokenHeader;
            try {
                tokenHeader = Buffer.from(tokenBase64, 'base64').toString('utf-8');
            } catch (decodeError) {
                return res.status(400).send({
                    auth: false,
                    message: "Error",
                    errors: "Failed to decode token, invalid Base64 format",
                });
            }
    
            // Validate Bearer format
            if (!tokenHeader || tokenHeader.split(' ')[0] !== 'Bearer') {
                return res.status(400).send({
                    auth: false,
                    message: "Error",
                    errors: "Incorrect token format or token not provided",
                });
            }
    
            const token = tokenHeader.split(' ')[1];
            if (!token || token.trim() === "") {
                return res.status(400).send({
                    auth: false,
                    message: "Error",
                    errors: "Token is empty",
                });
            }
    
            // Decode JWT payload
            const payloadBase64 = token.split('.')[1]; // Bagian tengah adalah payload
            const decodedPayload = Buffer.from(payloadBase64, 'base64').toString('utf-8');
            const payload = JSON.parse(decodedPayload);
    
            const userId = payload.sub; // Ambil nilai 'sub' dari payload
            if (!userId) {
                return res.status(401).send({
                    auth: false,
                    message: "Invalid token, 'sub' not found",
                });
            }
    
            req.userId = userId; // Simpan userId ke request
            console.log(userId);
            req.token = token; // Simpan token ke request
            next();
        } catch (error) {
            console.error("Error during token verification:", error.message);
    
            const isTimeout = error.code === 'ECONNABORTED';
            const statusCode = error.response?.status || 500;
    
            return res.status(statusCode).send({
                auth: false,
                message: isTimeout ? "Request to token verification service timed out" : "Error verifying token",
                errors: error.response?.data || error.message,
            });
        }
    }
    
};
