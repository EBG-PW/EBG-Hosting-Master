const pg = require('pg');

const pool = new pg.Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
})

pool.query(`CREATE TABLE IF NOT EXISTS uuser (
    email text PRIMARY KEY,
    admin boolean DEFAULT False,
    password text,
    lang text,
    panelid bigint,
    coinsperweek bigint DEFAULT 0,
    lastcoins TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    weeklycoins TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    time TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP)`, (err, result) => {
    if (err) {console.log(err)}
});

pool.query(`CREATE TABLE IF NOT EXISTS webtoken (
    email text,
    ip text,
    browser text,
    token text PRIMARY KEY,
    admin boolean DEFAULT False,
    lang text,
    time TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP)`, (err, result) => {
    if (err) {console.log(err)}
});

pool.query(`CREATE TABLE IF NOT EXISTS regtoken (
  token text PRIMARY KEY,
  coinsperweek bigint DEFAULT 0,
  time TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP)`, (err, result) => {
  if (err) {console.log(err)}
});

pool.query(`CREATE TABLE IF NOT EXISTS apitoken (
  token text PRIMARY KEY,
  email text,
  permissions text,
  time TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP)`, (err, result) => {
  if (err) {console.log(err)}
});

/**
 * This function will return a user by email
 * @param {string} email
 * @returns {Object}
 */
 let GetGuestsByMail = function(email) {
    return new Promise(function(resolve, reject) {
      pool.query(`SELECT * FROM uuser WHERE email = '${email}'`, (err, result) => {
        if (err) {reject(err)}
        resolve(result.rows);
      });
    });
  }

/**
 * This function will return all users
 * @returns {Object}
 */
 let GetAllGuests = function() {
  return new Promise(function(resolve, reject) {
    pool.query(`SELECT email, admin, lang, panelid, coinsperweek FROM uuser`, (err, result) => {
      if (err) {reject(err)}
      resolve(result.rows);
    });
  });
}

/**
 * This function will check if a user is admin
 * @param {String} email
 * @returns {boolean}
 */
 let CheckIfAdminbyMail = function(email) {
    return new Promise(function(resolve, reject) {
      pool.query(`SELECT admin FROM uuser WHERE email = '${email}'`, (err, result) => {
        if (err) {reject(err)}
        if(result.rows.length === 1){
          if(result.rows[0].admin === true){
            resolve(true);
          }else{
            resolve(false);
          }
        }else{
          resolve(false);
        }
      });
    });
  }

/**
 * This function will set the cullom to current timestamp
 * @param {String} cullom
 * @returns {boolean}
 */
 let UpdateTimeStamp = function(cullom) {
  return new Promise(function(resolve, reject) {
    let newDate = new Date(Date.now());
    pool.query(`UPDATE uuser SET ${cullom} = $1`,[
      newDate
    ], (err, result) => {
      if (err) {reject(err)}
      resolve(result)
    });
  });
}

/**
 * This function will write new user to DB
 * @param {string} email
 * @param {string} password_hash
 * @param {string} coinsperweek
 * @param {string} lang
 * @returns {Promise}
 */
 let WriteNewUser = function(email, password, coinsperweek, lang) {
    return new Promise(function(resolve, reject) {
      pool.query('INSERT INTO uuser (email, password, coinsperweek, lang) VALUES ($1,$2,$3,$4)',[
        email, password, coinsperweek, lang
      ], (err, result) => {
        if (err) {reject(err)}
        resolve(result);
      });
    });
  }

/**
 * This function will add a bought product to webtokens
 * @param {string} email
 * @param {string} ip
 * @param {string} browser
 * @param {string} token
 * @param {boolean} admin
 * @param {string} lang
 * @returns {Promise}
 */
 let AddWebToken = function(email, ip, browser, token, admin, lang) {
    return new Promise(function(resolve, reject) {
      pool.query(`INSERT INTO webtoken(email, ip, browser, token, admin, lang) VALUES ($1,$2,$3,$4,$5,$6)`,[
        email, ip, browser, token, admin, lang
      ], (err, result) => {
        if (err) {reject(err)}
          resolve(result);
      });
    });
  }
  
  /**
   * This function is used to get a token from the DB
   * @param {String} token
   * @returns {Promise}
   */
   let GetWebToken = function(token) {
    return new Promise(function(resolve, reject) {
      pool.query(`SELECT * FROM webtoken WHERE token = '${token}'`, (err, result) => {
        if (err) {reject(err)}
          resolve(result);
      });
    });
  }
  
  /**
   * This function is used to delete a webtoken
   * @param {String} token
   * @returns {Promise}
   */
   let DelWebToken = function(token) {
    return new Promise(function(resolve, reject) {
      pool.query(`DELETE FROM webtoken WHERE token = '${token}'`, (err, result) => {
        if (err) {reject(err)}
          resolve(result);
      });
    });
  }

/**
 * This function will add a bought product to regtoken
 * @param {string} token
 * @param {number} coinsperweek
 * @returns {Promise}
 */
 let AddRegToken = function(token, coinsperweek) {
  return new Promise(function(resolve, reject) {
    pool.query(`INSERT INTO regtoken(token, coinsperweek) VALUES ($1,$2)`,[
      token, coinsperweek
    ], (err, result) => {
      if (err) {reject(err)}
        resolve(result);
    });
  });
}

/**
 * This function is used to get a regtoken from the DB
 * @param {String} token
 * @returns {Promise}
 */
 let GetRegoken = function(token) {
  return new Promise(function(resolve, reject) {
    pool.query(`SELECT * FROM regtoken WHERE token = '${token}'`, (err, result) => {
      if (err) {reject(err)}
        resolve(result);
    });
  });
}

/**
 * This function is used to delete a regtoken
 * @param {String} token
 * @returns {Promise}
 */
 let DelRegToken = function(token) {
  return new Promise(function(resolve, reject) {
    pool.query(`DELETE FROM regtoken WHERE token = '${token}'`, (err, result) => {
      if (err) {reject(err)}
        resolve(result);
    });
  });
}

/**
 * This function will add an API key to apitoken table
 * @param {string} token
 * @param {string} email
 * @param {string} permissions
 * @returns {Promise}
 */
 let AddApiToken = function(token, email, permissions) {
  return new Promise(function(resolve, reject) {
    pool.query(`INSERT INTO apitoken(token, email, permissions) VALUES ($1,$2,$3)`,[
      token, email, permissions
    ], (err, result) => {
      if (err) {reject(err)}
        resolve(result);
    });
  });
}

/**
 * This function is used to get a apitoken from the DB
 * @param {String} token
 * @returns {Promise}
 */
 let GetApiToken = function(token) {
  return new Promise(function(resolve, reject) {
    pool.query(`SELECT * FROM apitoken WHERE token = '${token}'`, (err, result) => {
      if (err) {reject(err)}
        resolve(result);
    });
  });
}

/**
 * This function is used to get all apitokens from the DB
 * @returns {Promise}
 */
 let GetAllApiToken = function() {
  return new Promise(function(resolve, reject) {
    pool.query(`SELECT * FROM apitoken`, (err, result) => {
      if (err) {reject(err)}
        resolve(result);
    });
  });
}

/**
 * This function is used to delete a apitoken
 * @param {String} token
 * @returns {Promise}
 */
 let DelApiToken = function(token) {
  return new Promise(function(resolve, reject) {
    pool.query(`DELETE FROM apitoken WHERE token = '${token}'`, (err, result) => {
      if (err) {reject(err)}
        resolve(result);
    });
  });
}
  let get = {
      user: {
        all: GetAllGuests,
        byMail: GetGuestsByMail,
        isAdmin: CheckIfAdminbyMail
      },
      webtoken: {
        get: GetWebToken
      },
      regtoken: {
        get: GetRegoken
      },
      apitoken: {
        get: GetApiToken,
        all: GetAllApiToken
      }
  }

  let write = {
      user: {
        new: WriteNewUser,
        SetCurrentTimestamp: UpdateTimeStamp
      },
      webtoken: {
         add: AddWebToken
      },
      regtoken: {
        add: AddRegToken
      },
      apitoken: {
        add: AddApiToken
      }
  }

  let del = {
      webtoken: {
        delete: DelWebToken
      },
      regtoken: {
        delete: DelRegToken
      },
      apitoken: {
        delete: DelApiToken
      }
  }

  module.exports = {
    get,
    write,
    del
};