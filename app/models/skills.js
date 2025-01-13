const db = require('./index'); // Mengimpor koneksi database dari index.js


async function getAll() {
    try {
        const [rows] = await db.promise().query('SELECT * FROM skills');
        return rows; 
    } catch (error) {
        throw error;
    }
}

async function getProjectSkills(id)
{
    try {
        const [rows] = await db.promise().query('SELECT * FROM skillsProject WHERE idSkills = ?', [id]);
        return rows; 
    } catch (error) {
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
        // Jika ada hasil (rows) berarti id valid
        if (rows.length > 0) {
            return true;  // id valid
        } else {
            return false; // id tidak ditemukan
        }
    } catch (error) {
        return false;
    }
}

// Fungsi untuk mengambil semua data profil
module.exports = {
    getAll,
    insertProject,
    checkSkills
};
