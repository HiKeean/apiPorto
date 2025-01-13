const db = require('./index'); // Mengimpor koneksi database dari index.js
// const logger2 = require('../config/logger');


async function getAll() {
    try {
        const [rows] = await db.promise().query('SELECT * FROM skills');
        // logger2.info('hit skills Success');
        return rows; 
    } catch (error) {
        // logger2.error(`getAll() skill.js ${error}`);
        throw error;
    }
}

async function getProjectSkills(id)
{
    try {
        const [rows] = await db.promise().query('SELECT * FROM skillsProject WHERE idSkills = ?', [id]);
        // logger2.info('hit getProjectSkills Success');
        return rows; 
    } catch (error) {
        // logger2.error(`getProjectSkills() skill.js ${error}`);
        throw error;
    }
}

async function insertProject(req) {
    try {
        const { name, competence, symbol } = req.body;

        // Validasi input (opsional)
        if (!name || !competence || !symbol) {
            throw new Error('All required fields must be provided!');
        }

        // Query untuk memasukkan data
        const query = `
            INSERT INTO skills (name, competence, symbol)
            VALUES (?, ?, ?)
        `;

        // Eksekusi query dengan parameter
        const [result] = await db.execute(query, [name, competence, symbol]);

        // Return hasil
        return true;
    } catch (error) {
        // Tangani error
        return error;
    }
}

async function checkSkills(id) {
    try {
        // Query untuk mengecek apakah id ada di tabel skills
        const [rows] = await db.promise().query('SELECT * FROM skills WHERE id = ?', [id]);
        // logger2.info(`connect to checkSkills ${id}`);
        // Jika ada hasil (rows) berarti id valid
        if (rows.length > 0) {
            // logger2.info(`checkSkills ${id} found `)
            return true;  // id valid
        } else {
            // logger2.info(`checkSkills ${id} not found`);
            return false; // id tidak ditemukan
        }
    } catch (error) {
        // logger2.error(`checkSkills ${error}`);
        return false;
    }
}

// Fungsi untuk mengambil semua data profil
module.exports = {
    getAll,
    insertProject,
    checkSkills
};
