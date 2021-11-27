/**
 * This will check the current saved Token (if exists) if its valid
 * @returns {Promise}
 */
 function CheckTokenValidity(){
    return new Promise(function(resolve, reject) {
      const getUrl = window.location;
      const baseUrl = getUrl.protocol + "//" + getUrl.host + "/";
      if (localStorage.getItem("token") !== null) {
        //Token was found, now validate it and if valid forward to /public
        var posting = $.post(`${baseUrl}api/v1/login/check`,{
          Token: localStorage.getItem("token")
        });
        posting.done(function(result) {
          resolve(result.TokenData)
        })
        posting.fail(function(err) {
          if(err.status === 401){
            clearLocalStorrage()
            const getUrl = window.location;
      			const baseUrl = getUrl.protocol + "//" + getUrl.host + "/";
						window.location.replace(`${baseUrl}index.html`);
          }
        });
      }else{
        clearLocalStorrage()
      }
    });
  }
  
  /**
   * This will wirte all Token data to localstorrage to be used in all funktions
   * @param {object} TokenData Token Object
   */
  function writeTokenDataToLocalStorrage(TokenData){
    localStorage.setItem('token', TokenData.token);
    localStorage.setItem('email', TokenData.email);
    localStorage.setItem('admin', TokenData.admin);
    localStorage.setItem('Language', TokenData.lang);
  }

/**
 * This will delete all localStorrage keys that are set on login
 */
  function clearLocalStorrage() {
    localStorage.removeItem('token');
    localStorage.removeItem('email');
    localStorage.removeItem('admin');
  }