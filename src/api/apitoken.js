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
const PluginName = 'EBG-Hosting-APIToken';
const PluginRequirements = [];
const PluginVersion = '0.0.1';
const PluginAuthor = 'BolverBlitz';
const PluginDocs = '';

const limiter = rateLimit({
    windowMs: 60 * 1000,
    max: 30
});

const hardlimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 5
});

const TokenCheck = Joi.object({
    Token: Joi.string().required()
});

const NewToken = Joi.object({
    Token: Joi.string().required(),
    Permission: Joi.string().required()
});

const TokenDelete = Joi.object({
    Token: Joi.string().required(),
    TokenDelete: Joi.string().required()
});

const router = express.Router();

router.post("/newtoken", hardlimiter, async (reg, res, next) => {
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
                let ApiToken = randomstring.generate({
                    length: process.env.WebTokenLength, //DO NOT CHANCE!!!
                    charset: 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890!'
                });
                let Email = Check[0].Data.email || Check[1].Data.email
                DB.write.apitoken.add(ApiToken, Email, value.Permission).then(function(AddToken_Response) {
                    res.status(200);
                    res.json({
                        ApiToken
                    });
                }).catch(function(error){
                    res.status(500);
                    res.json({
                        Message: "Database Error"
                    });
                })
            }else{
                res.status(401);
                    res.json({
                        Error: "No Permissions"
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
                DB.get.apitoken.all().then(function(AllTokens_Response) {
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

router.post("/deltoken", limiter, async (reg, res, next) => {
    try {
        const value = await TokenDelete.validateAsync(reg.body);
        let source = reg.headers['user-agent']
        let para = {
            Browser: useragent.parse(source),
            IP: reg.headers['x-forwarded-for'] || reg.socket.remoteAddress
        }
        Promise.all([TV.check(value.Token, para, true), TV.APIcheck(value.Token, 'Admin')])
        .then(function(Check) {  //API Token
            if(Check[0].State || Check[1].State){
                DB.del.apitoken.delete(value.TokenDelete).then(function(Del_Token_Response) {
                    if(Del_Token_Response.rowCount === 1){
                        res.status(200);
                        res.json({
                            Message: "Sucsess"
                        });
                    }else{
                        res.status(500);
                        res.json({
                            Message: "No Token to delete"
                        });
                    }
                })
            }else{
                DB.del.webtoken.delete(value.Token).then(function(Check) {
                    res.status(401);
                    res.json({
                        Message: "Token invalid"
                    });
                })
            }
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