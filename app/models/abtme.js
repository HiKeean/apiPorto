const db = require('./index'); // Mengimpor koneksi database dari index.js
const logger2 = require('../config/logger');


async function getAbt() {
    try {
        const [rows] = await db.promise().query('SELECT * FROM abtMe');
        logger2.info('hit abtMe Success');
        return rows; 
    } catch (error) {
        console.error('Error fetching profiles:', error);
        logger2.error(error);
        throw error;
    }
}
// Fungsi untuk mengambil semua data profil
module.exports = {
    getAbt,
};
