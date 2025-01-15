const db = require('./index'); // Mengimpor koneksi database dari index.js


async function getAll() {
    try {
        const [rows] = await db.query('SELECT * FROM profile');
        return rows; 
    } catch (error) {
        console.error('Error fetching profiles:', error);
        throw error;
    }
}

async function getProfileImages(){
    try {
        const img = await db.query('SELECT pictText FROM profile');
        return img; 
    } catch (error) {
        console.error('Error fetching profiles:', error);
        throw error;
    }
}

async function insertProfileImages(url, name){
    try {
        // Bangun query SQL secara manual dengan memasukkan nama kolom (name) dan nilai (url)
        const query = `
            UPDATE profile
            SET ${name} = ?
            WHERE id = 1
        `;

        // Eksekusi query dengan menggantikan '?' dengan nilai url
        const result = await db.execute(query, [url]);

        return result; 
    } catch (error) {
        console.error('Error fetching profiles:', error);
        throw new Error(error);
    }
}

// Fungsi untuk mengambil semua data profil
module.exports = {
    getAll,
    getProfileImages,
    insertProfileImages
};
