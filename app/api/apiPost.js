const text = require('../models/text');
const abtme = require('../models/abtme');
const profile = require('../models/profile');
const project = require('../models/project');

async function insertProject(req, res) {
    const { name, category, project_date, link, desc, url, idSkills } = req.body;
    // Validasi input (opsional)
    if (!name || !category || !project_date || !desc || !url || !idSkills) {
        return res.status(422).json({
            success: false,
            message: "Failed to fetch texts",
            error: error.message || error,
        });
    }
    try {
        const projekan = await project.insertProject(req);
        const img = {
            "idProject" : projekan.insertId,
            "url": req.body.url
        }
        const reqSkills = {
            "idProject" : projekan.insertId,
            "idSkills"  : req.body.idSkills
        }
        const images = await project.insertImgProject(img);
        const skills = await project.insertSkillsProject(reqSkills);

        return res.status(200).json({
            success: true,
            messages: "Project added successfully"  
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Failed to fetch texts",
            error: error.message || error,
        });
    }
}

module.exports = {
    insertProject
}