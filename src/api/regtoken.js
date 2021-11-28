require('dotenv').config();
const express = require('express');
const rateLimit = require('express-rate-limit');
const useragent = require('express-useragent');
const Joi = require('joi');
const DB = require('../lib/postgres');
const TV = require('../lib/TokenVerification');
const randomstring = require('randomstring');

const PluginConfig = {
};

/* Plugin info */
const PluginName = 'EBG-Hosting-RegToken';
const PluginRequirements = [];
const PluginVersion = '0.0.1';
const PluginAuthor = 'BolverBlitz';
const PluginDocs = '';

const limiter = rateLimit({
    windowMs: 60 * 1000,
    max: 30
});

const NewToken = Joi.object({
    Token: Joi.string().required(),
    CoinsPerWeek: Joi.number().max(5000).min(0).required()
});

const TokenCheck = Joi.object({
    Token: Joi.string().required()
});

const CalHardwareCheck = Joi.object({
    CPU: Joi.number().required().max(16),
    MEM: Joi.number().required().max(32),
    DISK: Joi.number().required().max(512),
    Backup: Joi.number().required().max(12),
});

const router = express.Router();

router.post("/newtoken", limiter, async (reg, res, next) => {
    try {
        const value = await NewToken.validateAsync(reg.body);
        let source = reg.headers['user-agent']
        let para = {
            Browser: useragent.parse(source),
            IP: reg.headers['x-forwarded-for'] || reg.socket.remoteAddress
        }
        Promise.all([TV.check(value.Token, para, true), TV.APIcheck(value.Token, 'Admin')])
        .then(function(Check) {  //API Token
            if(Check[0].State || Check[1].State){
                let RegToken = randomstring.generate({
                    length: 8, //DO NOT CHANCE!!!
                    charset: 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890!'
                });
                //Limit max coins per week
                //Check for negative coins per week otherwise owl will fuck everything up realy hard
                //Better, never allow Owl to get Admin Token in the first place
                let CreatorEmail;
                if(Check[0].State){
                    CreatorEmail = Check[0].Data.email
                }else{
                    CreatorEmail = Check[1].Data.email
                }
            
                DB.write.regtoken.add(RegToken, value.CoinsPerWeek, CreatorEmail).then(function(RegToken_Response) {
                    let DBTime = new Date().getTime()+parseInt(process.env.RegTokenDurationH)*60*60*1000
                    res.status(200);
                    res.json({
                        Status: true,
                        RegToken: RegToken,
                        CoinsPerWeek: value.CoinsPerWeek,
                        ValidUntil: DBTime
                    });
                }).catch(function(error){
                    res.status(500);
                    res.json({
                        Message: "Database Error"
                    });
                });
            }
        });
    } catch (error) {
        next(error);
    }
});

router.get("/getall", limiter, async (reg, res, next) => {
    try {
        const value = await TokenCheck.validateAsync(reg.query);
        let source = reg.headers['user-agent']
        let para = {
            Browser: useragent.parse(source),
            IP: reg.headers['x-forwarded-for'] || reg.socket.remoteAddress
        }
        Promise.all([TV.check(value.Token, para, true), TV.APIcheck(value.Token, 'Admin')])
        .then(function(Check) {  //API Token
            if(Check[0].State || Check[1].State){
                DB.get.regtoken.all().then(function(AllTokens_Response) {
                    res.status(200);
                    res.json({
                        Tokens: AllTokens_Response.rows
                    });
            }).catch(function(error){
                res.status(500);
                res.json({
                    Message: "Database Error"
                });
            });
            }else{
                res.status(400);
                res.json({
                    Message: "No Permissions"
                });
            }
        }).catch(function(error){
            res.status(500);
            res.json({
                Message: "Database Error"
            });
        });
    } catch (error) {
        next(error);
    }
});

/* Help to calculate costs*/
//Price list
router.get("/getprices", limiter, async (reg, res, next) => {
    try {
        res.status(200);
            res.json({
                CPU: process.env.CPUCost,
                MEM: process.env.MEMCost,
                DISK: process.env.DISKCost,
                Backup: process.env.BackupCost
            });
    } catch (error) {
        next(error);
    }
});

//Price calculator
router.get("/calprices", limiter, async (reg, res, next) => {
    try {
        const value = await CalHardwareCheck.validateAsync(reg.query)
        const [CPUP, MEMP, DISKP, BackupsP] = [Number(process.env.CPUCost), Number(process.env.MEMCost), Number(process.env.DISKCost), Number(process.env.BackupCost)]
        console.log(CPUP, MEMP, DISKP, BackupsP)
        let Price = ((value.CPU * CPUP) + (value.CPU * MEMP) + (value.DISK * DISKP) + ((value.DISK * DISKP) / BackupsP)*value.Backup ) / 4
        res.json({
            CPU: value.CPU,
            MEM: value.MEM,
            DISK: value.DISK,
            Backup: value.Backup,
            Price: Price
        });
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