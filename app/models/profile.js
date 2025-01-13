const db = require('./index'); // Mengimpor koneksi database dari index.js


async function getAll() {
    try {
        const [rows] = await db.promise().query('SELECT * FROM profile');
        return rows; 
    } catch (error) {
        console.error('Error fetching profiles:', error);
        throw error;
    }
}
// Fungsi untuk mengambil semua data profil
module.exports = {
    getAll,
};
