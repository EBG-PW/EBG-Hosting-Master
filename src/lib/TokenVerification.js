require('dotenv').config();
const DB = require('../lib/postgres');
const bcrypt = require('bcrypt');

/**
 * Will check if a Token is valid, also verifyes admin Permissions
 * @param {String} Token Token String
 * @param {object} Para Browser & IP
 * @param {?String} Permissions Is Admin needed? true|false
 * @returns {Promise}
 */
let check = function(Token, Para, Permissions){
    return new Promise(function(resolve, reject) {
        DB.get.webtoken.get(Token).then(function(Token_response) {
            if(typeof Token_response.rows[0] === "undefined"){
                resolve({State: false})
            }else{
                let DBTime = new Date(Token_response.rows[0].time).getTime()+parseInt(process.env.WebTokenDurationH)*60*60*1000
                if(DBTime > new Date().getTime()){
                    //Check if Token isn´t too old
                    bcrypt.compare(Para.IP, Token_response.rows[0].ip).then(function(result) {
                    if(Para.Browser.source === Token_response.rows[0].browser){
                        //Check if Browser and IPHash are the same
                        if(Permissions === Token_response.rows[0].admin || Token_response.rows[0].admin === true){
                            //Check if Permissions are the same.
                            Token_response.rows[0].validfor = DBTime-new Date().getTime()
                            resolve({State: true, Data: Token_response.rows[0]})
                        }else{
                            resolve({State: false})
                        }
                    }else{
                        resolve({State: false})
                    }
                    });
                }else{
                    resolve({State: false})
                }
            }
        }).catch(function(error){
            reject(error)
        })
    });
}
/**
 * Will verify a API Token and its permissions
 * @param {String} Token 
 * @param {String} Permissions 
 * @returns 
 */
let APIcheck = function(Token, Permissions){
    return new Promise(function(resolve, reject) {
        DB.get.apitoken.get(Token).then(function(Token_response) {
            if(typeof Token_response.rows[0] === "undefined"){
                resolve({State: false})
            }else{
                if(Permissions === Token_response.rows[0].permissions){
                    //Check if Permissions are the same.
                    resolve({State: true, Data: Token_response.rows[0]})
                }else{
                    resolve({State: false})
                }
            }
        }).catch(function(error){
            reject(error)
        })
    });
}

module.exports = {
    check, APIcheck
};