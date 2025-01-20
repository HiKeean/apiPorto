const text = require('../models/text');
const abtme = require('../models/abtme');
const profile = require('../models/profile');
const project = require('../models/project');
const apiSatria = require('./apiSatria');
require('dotenv').config();


async function insertProject(req, res) {
    const { name, category, project_date, link, desc, url, idSkills, text } = req.body;
    // Validasi input (opsional)
    if (!name || !category || !project_date || !desc || !url || !idSkills) {
        return res.status(422).json({
            success: false,
            message: "Failed to fetch texts",
            data: [],
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

async function insertProfilePicture(req, res)
{
    try {
        url = await apiSatria.uploadPictures(req, res);
        console.log(url);
    } catch (error) {
        
    }
    const urls = `${process.env.URL_PICTURE}/public/assets/images/punyahiz/portfolio/${url}`;
    const { id } = req.body;
    let name = '';
    if (!id) {
        return res.status(422).json({
            success : false,
            message : "Missing Credential",
            data    : []
        });
    }
    if(id == 1){
        name = 'pictText'
    }else{
        name='pict'
    }
    try {
        const result = await profile.insertProfileImages(urls, name);
        return res.status(200).json({
            success: true,
            messages: "Project added successfully" ,
            data: {
                pictText: urls
            } 
        });
    } catch (error) {
        return res.status(500).json({
            success : false,
            message : "Server Internal Error",
            error   : error
        });
    }
    

}

module.exports = {
    insertProject,
    insertProfilePicture
    
}