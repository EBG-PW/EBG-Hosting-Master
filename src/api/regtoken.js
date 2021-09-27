require('dotenv').config();
const express = require('express');
const rateLimit = require('express-rate-limit');
const useragent = require('express-useragent');
const Joi = require('joi');
const DB = require('../lib/postgres');
const TV = require('../lib/TokenVerification');
const randomstring = require('randomstring');
const bcrypt = require('bcrypt');

const PluginConfig = {
};

/* Plugin info */
const PluginName = 'EBG-Hosting-WebLogin';
const PluginRequirements = [];
const PluginVersion = '0.0.1';
const PluginAuthor = 'BolverBlitz';
const PluginDocs = '';

const limiter = rateLimit({
    windowMs: 60 * 1000,
    max: 30
});

const TokenCheck = Joi.object({
    Token: Joi.string().required()
});

const router = express.Router();

router.post("/newtoken", limiter, async (reg, res, next) => {
    try {
        const value = await TokenVerify.validateAsync(reg.query);
        let source = reg.headers['user-agent']
        let para = {
            Browser: useragent.parse(source),
            IP: reg.headers['x-forwarded-for'] || reg.socket.remoteAddress
        }
        TV.check(value.Token, para, true).then(function(Check) {  //API Token
            if(Check.State)
            let RegToken = randomstring.generate({
                length: 8, //DO NOT CHANCE!!!
                charset: 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890!'
            });
            //DB.write.regtoken.add(){}
        });
    } catch (error) {
        next(error);
    }
});

router.post("/logout", limiter, async (reg, res, next) => {
    try {
        const value = await TokenCheck.validateAsync(reg.body);
        let source = reg.headers['user-agent']
        let para = {
            Browser: useragent.parse(source),
            IP: reg.headers['x-forwarded-for'] || reg.socket.remoteAddress
        }
        TV.check(value.Token, para, false).then(function(Check) {
            if(Check.State){
                DB.del.webtoken.delete(value.Token).then(function(Check) {
                    res.status(200);
                    res.json({
                        Message: "Sucsess"
                    });
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