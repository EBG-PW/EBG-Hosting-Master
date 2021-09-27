require('dotenv').config();
const express = require('express');
const rateLimit = require('express-rate-limit');
const fs = require("fs");
const Joi = require('joi');

const AGB_DE = fs.readFileSync(`./legal/AGB_de.txt`, "utf-8");
const DAT_DE = fs.readFileSync(`./legal/Datenschutz_de.txt`, "utf-8");
const IMP_DE = fs.readFileSync(`./legal/Impressum_de.txt`, "utf-8");

const PluginConfig = {
};

/* Plugin info */
const PluginName = 'EBG-legal';
const PluginRequirements = [];
const PluginVersion = '0.0.1';
const PluginAuthor = 'BolverBlitz';
const PluginDocs = '';

const limiter = rateLimit({
    windowMs: 60 * 1000,
    max: 30
});

const Legal = Joi.object({
    Language: Joi.string().required().max(2),
    Document: Joi.string().required().max(3),
    ReturnURL: Joi.string().uri().allow('')
});

const router = express.Router();

router.get('/', limiter, async (reg, res, next) => {
	try {
		const value = await Legal.validateAsync(reg.query);

        if(value.Language.toLowerCase() === 'de'){
            if(value.Document.toLowerCase() === 'agb'){
                res.status(200);
                if(value.ReturnURL){
                    res.send(`<a href=${value.ReturnURL}><-- Zurück</a><br>${AGB_DE.replace(/Impressum.html/g, `${value.ReturnURL}api/v1/legal?ReturnURL=${value.ReturnURL}&Language=${value.Language}&Document=IMP`)}`);
                }else{
                    res.send(`${AGB_DE}`);
                }
            }else if(value.Document.toLowerCase() === 'imp'){
                res.status(200);
                if(value.ReturnURL){
                    res.send(`<a href=${value.ReturnURL}><-- Zurück</a><br>${IMP_DE}`);
                }else{
                    res.send(`${IMP_DE}`);
                }
            }else if(value.Document.toLowerCase() === 'dat'){
                res.status(200);
                if(value.ReturnURL){
                    res.send(`<a href=${value.ReturnURL}><-- Zurück</a><br>${DAT_DE}`);
                }else{
                    res.send(`${DAT_DE}`);
                }
            }else{
                res.status(400);
                res.json({
                    Error: "Not Found"
                });
            }
        }else{

        }
        
    } catch (error) {
    	next(error);
  	}
});

module.exports = {
	router: router,
	PluginName: PluginName,
	PluginRequirements: PluginRequirements,
	PluginVersion: PluginVersion,
	PluginAuthor: PluginAuthor,
	PluginDocs: PluginDocs
};