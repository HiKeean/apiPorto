const axios = require('axios');
require('dotenv').config();
const responseRequest = require("../response/response");


async function uploadPictures(req, res) {
    let tokenHeader = req.token;
    const { images, name } = req.body;
    // Validasi input (opsional)
    if (!images || !name) {
        return res.status(422).json({
            success: false,
            message: "Failed to fetch texts",
            data: []
        });
    }

    const data = {
        name: 'portfolio',
        images: images
    }
    try{
        const response = await axios.post(
            `${process.env.URL_SATRIA}/adminSA/uploadImg`,
            {
                name: name,
                image: images
            }, // Body kosong jika hanya header yang dibutuhkan
            {
                headers: { Authorization: `Bearer ${tokenHeader}` },
                timeout: 10000, // Timeout opsional
            }
        );
        if (response.status === 200) {
            return response.data.data.image_name;
        } else {
            return res.status(422).send({
                success: false,
                message: "DB Fetch Error",
                errors: response.data
            });
        }
    } catch (error) {
        return res.status(401).send({
            success: false,
            message: error,
        });
    }
}

async function login(req, res){
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            throw new Error('Login Password Required');
        }
        const response = await axios.post(
            `${process.env.URL_SATRIA}/auth/login`,
            {
                RequestParameter : {
                    email : email,
                    password : password
                },
                SecretKey : process.env.SECRET_KEY_LOGIN,
                APPS : 3
            }, 
            {
                headers: {},
                timeout: 10000, // Timeout opsional
            }
        );
        if (response.status === 200) {
            const token = btoa(`Bearer ${response.data.token}`);
            const data = {
                token : token,
                expires_in: response.data.expires_in
            }
            return res.status(200).send(responseRequest.requestTrue(true, "Login Berhasil", data))
        } else {
            throw new Error("error fetch")
        }

    } catch (error) {
        console.log(error)
        return res.status(422).send({
            success: false,
            message: "DB Fetch Error",
            errors: error
        });
    }
}

async function logout(req, res){
    try {
        let tokenHeader = req.token;
        const response = await axios.post(
            `${process.env.URL_SATRIA}/auth/logout`,
            {
            },
            {
                headers: { Authorization: `Bearer ${tokenHeader}` },
                timeout: 10000, // Timeout opsional
            }
        );
        if (response.status === 200) {
            return res.status(200).send(responseRequest.requestTrue(true, "Logout Berhasil", {}))
        } else {
            return res.status(422).send({
                success: false,
                message: "DB Fetch Error",
                errors: response.data
            });
        }
        
    } catch (error) {
        return res.status(500).send(responseRequest.requestError(false, "Internal Server Error", error));
    }
}

module.exports = {
    uploadPictures,
    login,
    logout
}