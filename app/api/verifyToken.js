const axios = require('axios');

module.exports = {
    async verifyToken(req, res, next) {
        try {
            let tokenHeader = req.headers['x-access-token'];

            if (!tokenHeader || tokenHeader.split(' ')[0] !== 'Bearer') {
                return res.status(400).send({
                    auth: false,
                    message: "Error",
                    errors: "Incorrect token format or token not provided",
                });
            }

            let token = tokenHeader.split(' ')[1];
            if (!token || token.trim() === "") {
                return res.status(400).send({
                    auth: false,
                    message: "Error",
                    errors: "Token is empty",
                });
            }

            const response = await axios.post(
                'https://api.satria-wisata.com/api/auth/verify',
                {}, // Body kosong jika hanya header yang dibutuhkan
                {
                    headers: { Authorization: `Bearer ${token}` },
                    timeout: 5000, // Timeout opsional
                }
            );
            if (response.status === 200) {
                next();
                // return res.status(200).send({
                //     auth: true,
                //     message: "Request to token verification service sukses",
                // });
            } else {
                return res.status(401).send({
                    auth: false,
                    message: "Token verification failed",
                    errors: response.data?.errors || "Invalid token",
                });
            }
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
    },
};
