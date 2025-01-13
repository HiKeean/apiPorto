const db = require('./index'); // Mengimpor koneksi database dari index.js
// const logger2 = require('../config/logger');


async function getAll() {
    try {
        const [rows] = await db.promise().query('SELECT * FROM Text');
        // logger2.info('hit Text Success');
        return rows; 
    } catch (error) {
        console.error('Error fetching profiles:', error);
        // logger2.error(error);
        throw error;
    }
}
// Fungsi untuk mengambil semua data profil
module.exports = {
    getAll,
};
