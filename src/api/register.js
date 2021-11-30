require('dotenv').config();
const express = require('express');
const rateLimit = require('express-rate-limit');
const Joi = require('joi');
const DB = require('../lib/postgres');
const bcrypt = require('bcrypt');
const ControlPanelAPI = require('../lib/controlpanel_api')

const PluginConfig = {
};

/* Plugin info */
const PluginName = 'EBG-Hosting-WebReg';
const PluginRequirements = [];
const PluginVersion = '0.0.1';
const PluginAuthor = 'BolverBlitz';
const PluginDocs = '';

const limiter = rateLimit({
    windowMs: 60 * 1000 * 15,
    max: 5
});

const NewUserReg = Joi.object({
    Name: Joi.string().required().min(4).max(20),
    Email: Joi.string().email().required().max(32),
    Password: Joi.string().required().min(10).max(50),
    RegToken: Joi.string().required(),
    Lang: Joi.string().required().max(2),
    LegalAccepted: Joi.boolean().required()
});

const router = express.Router();

router.post("/register", limiter, async (reg, res, next) => {
    try {
        const value = await NewUserReg.validateAsync(reg.body);
        DB.get.regtoken.get(value.RegToken).then(function(RegToken_response) {
            if(RegToken_response.rows.length <= 0){
                res.status(401);
                res.json({
                    Message: 'RegToken not found or too old'
                });
            }else{
                if(value.LegalAccepted){
                    let DBTime = new Date(RegToken_response.rows[0].time).getTime()+parseInt(process.env.RegTokenDurationH)*60*60*1000
                    if(DBTime > new Date().getTime()){
                        bcrypt.hash(value.Password, parseInt(process.env.SaltRounds), function(err, hash) {
                            Promise.all([DB.del.regtoken.delete(value.RegToken), DB.write.user.new(value.Email, hash, RegToken_response.rows[0].coinsperweek, value.Lang)])
                            .then(function(Del_And_NewUser_Response) {
                                ControlPanelAPI.RegisterNewUser(value.Name, value.Password, value.Email).then(function(NewUser) {
                                    ControlPanelAPI.IncreseUserCreds(RegToken_response.rows[0].coinsperweek, NewUser.id).then(function(UserCreds) {
                                        res.status(200);
                                        res.json({
                                            Message: 'Succsess'
                                        });
                                    }).catch(function(error){
                                        console.log(error)
                                        res.status(500);
                                        res.json({
                                          message: "User Increese Creds Error",
                                        });
                                    });
                                }).catch(function(error){
                                    console.log(error)
                                    res.status(500);
                                    res.json({
                                      message: "User Create Error",
                                    });
                                });
                            }).catch(function(error){
                                console.log(error)
                                if(error.detail.includes('Key')){
                                    res.status(423)
                                    res.json({
                                        message: "This user already exists",
                                    });
                                }else{
                                    res.status(500);
                                    res.json({
                                        message: "Databace error",
                                    });
                                }
                            });
                        });
                    }else{
                        DB.del.regtoken.delete(value.RegToken) //Clean unused tokens
                        .then(function(DeleteResponse) {
                            res.status(401);
                            res.json({
                                Message: 'RegToken not found or too old'
                            });
                        });
                    }
                }else{
                    res.status(400);
                    res.json({
                    message: "You must accept AGB and Datenschutz",
                    });
                }
            }
        }).catch(function(error){
            console.log(error)
            res.status(500);
            res.json({
              message: "Databace error",
            });
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