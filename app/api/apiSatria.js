const axios = require('axios');

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
            'https://api.satria-wisata.com/api/adminSA/uploadImg',
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


module.exports = {
    uploadPictures,
}