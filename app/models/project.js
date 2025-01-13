const db = require('./index'); 
const skillsModel = require('./skills.js');


async function getAll() {
    try {
        const [rows] = await db.query('SELECT * FROM project');
        return rows; 
    } catch (error) {
        throw new Error(error);
    }
}

async function getProjectSkills(id)
{
    try {
        const [rows] = await db.query('SELECT * FROM skillsProject WHERE idProject = ?', [id]);
        return rows; 
    } catch (error) {
        throw new Error(error)
    }
}

async function getProjectImages(id)
{
    try {
        const [rows] = await db.query('SELECT * FROM imgProject WHERE idProject = ?', [id]);
        return rows; 
    } catch (error) {
        throw new Error(error)
    }
}

async function getAllProject() {
    try {
        const projects = await getAll(); // Ambil semua project dari database
        const result = []; // Array untuk menyimpan data hasil akhir

        for (const project of projects) {
            const id = project.id;

            // Ambil data skills dan images untuk setiap project
            const ps = await getProjectSkills(id);
            const pi = await getProjectImages(id);

            // Ekstrak hanya idSkills dari skills
            const skills = ps.map(skill => skill.idSkills);

            // Ekstrak hanya url dari images
            const images = pi.map(image => image.url);

            // Gabungkan data ke dalam satu objek
            const projectData = {
                ...project, // Data project asli
                skills,     // Array idSkills
                images      // Array url
            };

            // Tambahkan ke array hasil
            result.push(projectData);
        }

        return result; // Kembalikan hasil sebagai array proyek lengkap
    } catch (error) {
        console.error('Error fetching all projects:', error);
        throw error;
    }
}


async function insertProject(req) {
    try {
        const { name, category, project_date, link, desc } = req.body;

        // Validasi input (opsional)
        if (!name || !category || !project_date || !desc) {
            throw new Error('All required fields must be provided!');
        }

        // Query untuk memasukkan data
        const query = `
            INSERT INTO project (name, category, project_date, link, \`desc\`, created_at)
            VALUES (?, ?, ?, ?, ?, CONVERT_TZ(NOW(), @@global.time_zone, 'Asia/Jakarta'))
        `;

        // Eksekusi query dengan parameter
        const [result] = await db.execute(query, [name, category, project_date, link, desc]);
        return result;
        // return false;
    } catch (error) {
        // Tangani error
        throw new Error(error)
    }
}

async function insertImgProject(req) {
    try {
        const { idProject, url } = req;

        if (!idProject || !url) {
            throw new Error('Both "id" and "url" are required');
        }

        // Konversi `url` menjadi array untuk mempermudah iterasi
        const urls = Object.values(url);

        if (!Array.isArray(urls) || urls.length === 0) {
            throw new Error('"url" must contain at least one image URL');
        }

        // Loop untuk memasukkan setiap URL ke dalam database
        for (const imageUrl of urls) {
            const query = `
                INSERT INTO imgProject (idProject, url, created_at)
                VALUES (?, ?, CONVERT_TZ(NOW(), @@global.time_zone, 'Asia/Jakarta'))
            `;
            await db.execute(query, [idProject, imageUrl]);
        }

        return true;
    } catch (error) {
        return false;
    }
}

async function insertSkillsProject(req) {
    try {
        const { idProject, idSkills } = req;

        if (!idProject || !idSkills) {
            throw new Error('Both "idProject" and "idSkills" are required');
        }

        // Konversi `url` menjadi array untuk mempermudah iterasi
        const skills = Object.values(idSkills);

        if (!Array.isArray(skills) || skills.length === 0) {
            throw new Error('"url" must contain at least one image URL');
        }

        // Loop untuk memasukkan setiap URL ke dalam database
        for (const skill of skills) {
            const sM = await skillsModel.checkSkills(skill);
            if(sM){
                const query = `
                    INSERT INTO skillsProject (idProject, idSkills, created_at)
                    VALUES (?, ?, CONVERT_TZ(NOW(), @@global.time_zone, 'Asia/Jakarta'))
                `;
                await db.execute(query, [idProject, skill]);
            }
        }

        return true;
    } catch (error) {
        throw new Error(error)
    }
}

module.exports = {
    getAll,
    insertProject,
    insertImgProject,
    insertSkillsProject,
    getAllProject
};
