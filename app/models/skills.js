const db = require('./index'); // Mengimpor koneksi database dari index.js
const prj = require('./project');

async function getAll() {
    try {
        const [rows] = await db.query('SELECT * FROM skills');
        return rows; 
    } catch (error) {
        throw error;
    }
}

async function getAllprojctSkills() {
    try {
        const skills = await getAll(); // Ambil semua skill dari database
        const result = []; // Array untuk menyimpan data hasil akhir

        for (const skill of skills) {
            const id = skill.id;

            // Dapatkan daftar projectSkills terkait dengan skill
            const projectSkills = await getProjectSkills(id);

            // Ambil nama proyek untuk setiap projectSkill
            const projects = await Promise.all(
                projectSkills.map(async (projectSkill) => {
                    const projectName = await prj.getProjectNames(projectSkill.idProject);
                    return { idProject: projectSkill.idProject, name: projectName };
                })
            );

            // Tambahkan ke hasil
            result.push({
                skill: skill.name,
                projects,
            });
        }

        return result; // Kembalikan hasil sebagai array proyek lengkap
    } catch (error) {
        console.error('Error fetching all projects:', error);
        throw error;
    }
}

async function getDetailedSkills() {
    try {
        const skills = await getAll(); // Ambil semua skills dari database
        const result = []; // Array untuk menyimpan data hasil akhir

        for (const skill of skills) {
            const idSkill = skill.id;

            // Ambil semua skillsProject terkait dengan idSkill
            const skillsProjects = await getProjectSkills(idSkill);

            // Jika ada skillsProject terkait, ambil detail proyek
            const projects = await Promise.all(
                skillsProjects.map(async (sp) => {
                    const [project] = await db.query(
                        'SELECT id, name FROM project WHERE id = ?', 
                        [sp.idProject]
                    );
                    return project[0] || null; // Return data proyek atau null jika tidak ditemukan
                })
            );

            // Filter untuk menghapus data null (jika proyek tidak ditemukan)
            const filteredProjects = projects.filter(project => project !== null);

            // Gabungkan data skill dengan proyek terkait
            result.push({
                name        : skill.name,
                competence  : skill.competence,
                icon        : skill.symbol,
                projects    : filteredProjects

            });
        }

        return result; // Kembalikan hasil akhir
    } catch (error) {
        console.error('Error fetching detailed skills:', error);
        throw error;
    }
}


async function getProjectSkills(id)
{
    try {
        const [rows] = await db.query('SELECT * FROM skillsProject WHERE idSkills = ?', [id]);
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
        const [rows] = await db.query('SELECT * FROM skills WHERE id = ?', [id]);
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
    checkSkills,
    getAllprojctSkills,
    getDetailedSkills
};
