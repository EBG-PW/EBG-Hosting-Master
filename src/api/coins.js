require('dotenv').config();
const express = require('express');
const rateLimit = require('express-rate-limit');
const useragent = require('express-useragent');
const request = require("request");
const Joi = require('joi');
const { ControlPanel } = require('controlpanel.gg');
const DB = require('../lib/postgres');
const TV = require('../lib/TokenVerification');

const PluginConfig = {
};

/* Temporary */
let getPanelIDByEmail = function(email) {
	return new Promise(function(resolve, reject) {
		let url = `https://api.ebg.pw/api/v1/Dashbord-GetUser?token=${process.env.EBGApiToken}&email=${email}`
		request(url, { json: true }, (err, res, body) => {
			if (err) { return console.log(err); }
			resolve(body.PanelID);
  
		});
	});
}

/* Plugin info */
const PluginName = 'EBG-Hosting-Coins';
const PluginRequirements = [];
const PluginVersion = '0.0.1';
const PluginAuthor = 'BolverBlitz';
const PluginDocs = '';

const panel = new ControlPanel({
    host: process.env.dashboardurl,
    authorization: process.env.dashboardtoken,
});

const limiter = rateLimit({
    windowMs: 60 * 1000,
    max: 15
});

const hardlimiter = rateLimit({
    windowMs: 60 * 1000 * 15,
    max: 1
});

const TokenVerify = Joi.object({
    Token: Joi.string().required()
});

const router = express.Router();

router.get("/", limiter, async (reg, res, next) => {
    try {
        const value = await TokenVerify.validateAsync(reg.query);
        let source = reg.headers['user-agent']
        let para = {
            Browser: useragent.parse(source),
            IP: reg.headers['x-forwarded-for'] || reg.socket.remoteAddress
        }
        TV.check(value.Token, para, false).then(function(Check) {
            if(Check){
                DB.get.webtoken.get(value.Token).then(function(WebToken) {
                    DB.get.user.byMail(WebToken.rows[0].email).then(function(UserData) {
                        getPanelIDByEmail(WebToken.rows[0].email).then(function(PanelUserID) {
                            panel.users.get(PanelUserID).then(function(DashbordUser) {
                                res.status(200);
                                res.json({
                                    name: DashbordUser.name,
                                    role: DashbordUser.role,
                                    credits: DashbordUser.credits,
                                    maxcoinscllowed: Number(process.env.MaxAllowedCoins) * Number(UserData[0].coinsperweek),
                                    serverLimit: DashbordUser.serverLimit,
                                    email: DashbordUser.email
                                });
                            }).catch(function(error){
                                console.log(error)
                                res.status(500);
                                res.json({
                                    message: "Databace error",
                                });
                            });
                        }).catch(function(error){
                            console.log(error)
                            res.status(500);
                            res.json({
                                message: "Databace error",
                            });
                        });
                    }).catch(function(error){
                        console.log(error)
                        res.status(500);
                        res.json({
                            message: "Databace error",
                        });
                    });
                }).catch(function(error){
                    console.log(error)
                    res.status(500);
                    res.json({
                        message: "Databace error",
                    });
                });
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
})

router.get("/weekly", hardlimiter, async (reg, res, next) => {
    try {
        const value = await TokenVerify.validateAsync(reg.query);
        let source = reg.headers['user-agent']
        let para = {
            Browser: useragent.parse(source),
            IP: reg.headers['x-forwarded-for'] || reg.socket.remoteAddress
        }
        TV.check(value.Token, para, false).then(function(Check) {
            if(Check){
                DB.get.webtoken.get(value.Token).then(function(WebToken) {
                    DB.get.user.byMail(WebToken.rows[0].email).then(function(UserData) {
                        let DBTime = new Date(UserData[0].weeklycoins).getTime()
                        if(new Date().getTime() - DBTime >= 604800000){
                            let TimeDiff = (new Date().getTime() - DBTime) / 604800000
                            let AddCoins = (TimeDiff * UserData[0].coinsperweek).toFixed(0)
                            if(AddCoins <= 50){
                                res.status(400);
                                res.json({
                                    Error: "Less than 50 Coins, try again later"
                                });
                            }else{
                                DB.write.user.SetCurrentTimestamp('weeklycoins').then(function(TimeStamp_response) {
                                    getPanelIDByEmail(WebToken.rows[0].email).then(function(PanelUserID) {
                                        panel.users.get(PanelUserID).then(function(DashbordUser) {
                                            let AddCoinsSecure = 0;
                                            let MaxCoinsAllowed = Number(process.env.MaxAllowedCoins) * Number(UserData[0].coinsperweek)
                                            if(Number(DashbordUser.data.credits) + Number(AddCoins) > Number(process.env.MaxAllowedCoins) * Number(UserData[0].coinsperweek)){
                                                AddCoinsSecure = (process.env.MaxAllowedCoins * UserData[0].coinsperweek) - DashbordUser.data.credits
                                            }
                                            DashbordUser.credits = DashbordUser.credits + AddCoinsSecure
                                            panel.users.update(PanelUserID, DashbordUser).then(function(Panel_User_Update) {
                                                res.status(200);
                                                res.json({
                                                    AddCoins, AddCoinsSecure, MaxCoinsAllowed
                                                });
                                            });
                                        });
                                    });
                                }).catch(function(error){
                                    console.log(error)
                                    res.status(500);
                                    res.json({
                                        message: "Databace error",
                                    });
                                });
                            }
                        }else{
                            let TryAgainTime = Number(DBTime) + 604800000
                            res.status(400);
                            res.json({
                                Error: "Less than a week", TryAgainTime
                            });
                        }
                    });
                });
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
})


module.exports = {
	router: router,
	PluginName: PluginName,
	PluginRequirements: PluginRequirements,
	PluginVersion: PluginVersion,
	PluginAuthor: PluginAuthor,
	PluginDocs: PluginDocs
};