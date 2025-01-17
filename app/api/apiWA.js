const text = require('../models/text');
const abtme = require('../models/abtme');
const profile = require('../models/profile');
const project = require('../models/project');
const apiSatria = require('./apiSatria');

async function getPP(req, res){
    const profiles = await profile.getProfileImages();
    return res.status(200).json({
        success: true,
        data: profiles[0][0],  
    });
}

async function getText(req, res) {
    try {
        const texts = await text.getAll();
        const jsonTexts = JSON.stringify(texts); 
        // const img = await profile.getProfileImages();

        const data = {
            texts,
        }
        return res.status(200).json({
            success: true,
            data: data,  
        });
    } catch (error) {
        console.error("Error fetching texts:", error);
        return res.status(error.response?.status || 500).json({
            success: false,
            message: "Failed to fetch texts",
            error: error.message || error,
        });
    }
}

async function changeById(req, res){
    try {
        const { id, name } = req.body;
        if(!id || !name){
            throw new Error(error);
        }

        const response = await text.changeById(id, name);
        return res.status(200).json({
            success: true,
            message: "Succesfully change",
            data: {},  
        });
        
    } catch (error) {
        console.error("Error fetching texts:", error);
        return res.status(error.response?.status || 500).json({
            success: false,
            message: "Failed to fetch texts",
            error: error.message || error,
        });
    }
}

async function deleteById(req, res){
    try {
        const { id } = req.body;
        if(!id){
            throw new Error(error);
        }

        const response = await text.deleteById(id);
        return res.status(200).json({
            success: true,
            message: "Succesfully deleted",
            data: {},  
        });
        
    } catch (error) {
        console.error("Error fetching texts:", error);
        return res.status(error.response?.status || 500).json({
            success: false,
            message: "Failed to fetch texts",
            error: error.message || error,
        });
    }
}
async function addText(req, res){
    try {
        const { name } = req.body;
        if(!name){
            throw new Error(error);
        }

        const response = await text.addNew(name);
        return res.status(200).json({
            success: true,
            message: "Succesfully added",
            data: {},  
        });
        
    } catch (error) {
        console.error("Error fetching texts:", error);
        return res.status(error.response?.status || 500).json({
            success: false,
            message: "Failed to fetch texts",
            error: error.message || error,
        });
    }
}

module.exports = {
    getPP,
    getText,
    changeById,
    deleteById,
    addText
}