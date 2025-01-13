const text = require('../models/text');
const abtme = require('../models/abtme');
const profile = require('../models/profile');
const project = require('../models/project');
// const logger2 = require('../config/logger');

module.exports = {
    async getProfile() {
        try {
            const profiles = await profile.findAll();
            return profiles;
        } catch (error) {
            console.error("Error fetching profiles:", error);
            throw error;
        }
    },
    async getText(req, res) {
        try {
            const texts = await text.getAll();
            const jsonTexts = JSON.stringify(texts); 
            // logger2.info(jsonTexts);  
            return res.status(200).json({
                success: true,
                data: JSON.parse(jsonTexts),  
            });
        } catch (error) {
            console.error("Error fetching texts:", error);
            return res.status(500).json({
                success: false,
                message: "Failed to fetch texts",
                error: error.message || error,
            });
        }
    },
    
    async getPI(req, res){
        try {
            const abtMe = await abtme.getAbt();
            const profiles = await profile.getAll();
            const pi = {
                "name" : profiles[0].name,
                "phone" : profiles[0].phone,
                "address": profiles[0].address,
                "email": profiles[0].email,
                "degree" : profiles[0].degree,
                "pekerjaan": profiles[0].pekerjaan
            }
            const data = {
                "abtMe" : abtMe,
                "pi"    : pi
            };
            return res.status(200).json({
                success: true,
                data: data  
            });
        } catch (error) {
            console.error("Error fetching profiles:", error);
            throw error;
        }
    },

    async getAllProject(req,res){
        try {
            const projects = await project.getAllProject();
            const jsonTexts = JSON.stringify(projects); 
            return res.status(200).json({
                success: true,
                data: JSON.parse(jsonTexts),  
            });
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: "Failed to fetch texts",
                error: error.message || error,
            });
        }
    }
};
