const { func } = require("joi");

/**
 * Will send a logout request to destroy the current token
 * @returns {Promise}
 */
 function logout() {
    const getUrl = window.location;
    const baseUrl = getUrl.protocol + "//" + getUrl.host + "/";
    if (localStorage.getItem("token") !== null) {
        var posting = $.post(`${baseUrl}api/v1/login/logout`,{
          Token: localStorage.getItem("token")
        });
        posting.done(function(result) {
            clearLocalStorrage()
            setTimeout(function(){ window.location.replace(`${baseUrl}`); }, 150);
        })
        posting.fail(function(err) {
          if(err.status === 401){
            console.log(err)
          }else if(err.status === 500){
            console.log(err)
          }
        });
    }
}

/**
 * Will forward user to the requested Dokument.
*/
function Show_Legal(Document) {
  const getUrl = window.location;
  const baseUrl = getUrl.protocol + "//" + getUrl.host + "/";
  window.location.replace(`${baseUrl}api/v1/legal?ReturnURL=${baseUrl}&Language=${localStorage.getItem("Language")}&Document=${Document}`);
  
}

/**
 * Will send the WeeklyCoins Request and triggers overlay functions
*/
function WeeklyCoins() {
  const overlay = document.getElementById("overlay");
  const popup = document.getElementById("popup");

  const getUrl = window.location;
	const baseUrl = getUrl.protocol + "//" + getUrl.host + "/";

	var posting = $.get(`${baseUrl}api/v1/coins/weekly`,{
		Token: localStorage.getItem("token")
	});

	posting.done(function(data) {
		$("#overlay_content").html(`<center><div>${translate('Credits.CoinsPopup', {AddedCoins: data.AddCoinsSecure.toFixed(0)})}</div><button style="bottom: 0; position: relative;" onclick="ExitOverlay(true)">Okay</button></center>`)
					
	});

	posting.fail(function(error) {
    if(error.status == 400){
      console.log(error)
      $("#overlay_content").html(`<center><div>${translate('Credits.CoinsPopupErrors.LessThanAWeek', {TimeStamp: new Date(error.responseJSON.TryAgainTime).toLocaleDateString('de-DE')})}</div><button style="bottom: 0; position: relative;" onclick="ExitOverlay(false)">Okay</button></center>`)
    }

    if(error.status == 429){
      $("#overlay_content").html(`<center><div>${translate('Credits.CoinsPopupErrors.TooManyRequests')}</div><button style="bottom: 0; position: relative;" onclick="ExitOverlay(false)">Okay</button></center>`)
    }

    if(error.status == 500){
      $("#overlay_content").html(`<center><div>${translate('Credits.CoinsPopupErrors.Database')}</div><button style="bottom: 0; position: relative;" onclick="ExitOverlay(false)">Okay</button></center>`)
    }
	});
       
  overlay.style.display = "block";
  popup.style.display = "block";
}

/**
 * Will reset overlay and exit it
 * @param {boolean} reload
*/
function ExitOverlay(reload) {
  document.getElementById("overlay").style.display = "none";
  document.getElementById("popup").style.display = "none";
  if(reload) {
    location.reload(); 
  }
}