const request = require("request");

const RegisterNewUser = function(name, password, email) {
	return new Promise(function(resolve, reject) {
        const options = {
            uri: process.env.dashboardurl + '/api/users',
            method: 'POST',
            headers: {
              'User-Agent': 'EBGHostingBackend',
              'Authorization': 'Bearer ' + process.env.dashboardtoken,
              'Content-Type': 'application/json',
              'Accept': 'application/json'
            },
            json: { "name": name, "email": email, "password": password}
          };

          request(options, function (error, response, body) {
            if (response.statusCode !== 201) { reject(response.statusCode) }
            resolve(body)
          });
    });
}

const IncreseUserCreds = function(amount, id) {
	return new Promise(function(resolve, reject) {
        const options = {
            uri: `${process.env.dashboardurl}/api/users/${id}/increment`,
            method: 'PATCH',
            headers: {
              'User-Agent': 'EBGHostingBackend',
              'Authorization': 'Bearer ' + process.env.dashboardtoken,
              'Content-Type': 'application/json',
              'Accept': 'application/json'
            },
            json: { "credits": amount}
          };

          request(options, function (error, response, body) {
            if (response.statusCode !== 200) { reject(response.statusCode) }
            resolve(body)
          });
    });
}

module.exports = {
    RegisterNewUser: RegisterNewUser,
    IncreseUserCreds: IncreseUserCreds
}