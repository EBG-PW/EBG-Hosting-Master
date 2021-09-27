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

const hartlimiter = rateLimit({
    windowMs: 60 * 1000 * 15,
    max: 6
});

const LoginCheck = Joi.object({
    Email: Joi.string().email().required(),
    Password: Joi.string().required()
});

const TokenCheck = Joi.object({
    Token: Joi.string().required()
});

const router = express.Router();

router.post("/login", hartlimiter, async (reg, res, next) => {
    try {
        const value = await LoginCheck.validateAsync(reg.body);
        DB.get.user.byMail(value.Email).then(function(User_response) {
            if(User_response.length <= 0){
                res.status(401);
                res.json({
                    Message: 'User dosn´t exist or Password is invalid'
                });
            }else{
                bcrypt.compare(value.Password, User_response[0].password).then(function(result) {
                    if(result){
                        let source = reg.headers['user-agent']
                        let UserAgent = useragent.parse(source)
                        let IP = reg.headers['x-forwarded-for'] || reg.socket.remoteAddress
                        let WebToken = randomstring.generate({
                            length: process.env.WebTokenLength, //DO NOT CHANCE!!!
                            charset: 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890!'
                        });
                        bcrypt.hash(IP, parseInt(process.env.SaltRounds)/2, function(err, ip_hash) { //Only half Saltrounds cuz of SPEEEED || Added in version 0.0.3 in a rush (Not well tested)
                            DB.write.webtoken.add(User_response[0].email, ip_hash, UserAgent.source, WebToken, User_response[0].admin, User_response[0].lang).then(function(result) {
                                res.status(200);
                                res.json({
                                    token: WebToken,
                                    email: User_response[0].email,
                                    admin: User_response[0].admin,
                                    lang: User_response[0].lang
                                });
                            }).catch(function(error){
                                console.log(error)
                                res.status(500);
                                res.json({
                                    message: "Kritischer Fehler!",
                                });
                            })
                        });
                    }else{
                        res.status(401);
                        res.json({
                          message: "Wrong E-Mail or Password",
                        });
                    }
                }).catch(function(error){
                    console.log(error)
                    res.status(500);
                    res.json({
                        message: "Kritischer Fehler!",
                    });
                })
            }
        });
    } catch (error) {
        next(error);
    }
});

router.post("/check", limiter, async (reg, res, next) => {
    try {
        const value = await TokenCheck.validateAsync(reg.body);
        let source = reg.headers['user-agent']
        let para = {
            Browser: useragent.parse(source),
            IP: reg.headers['x-forwarded-for'] || reg.socket.remoteAddress
        }
        TV.check(value.Token, para, false).then(function(Check) {
            if(Check.State){
                res.status(200);
                res.json({
                  TokenData: Check.Data
                });
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