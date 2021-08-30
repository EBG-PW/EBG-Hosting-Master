/**
 * Will create the header based on active and persmissions
 * @param {string} active Current HTML
 * @returns {Promise}
 * User: Startseite | Shopping | Strom  
 * Admin: Gäste | Bestellungen
 */
function createHeaderLinks(active) {
    var HeaderHTML = "";
        
        if(active.toLowerCase() === "FAQ".toLowerCase()){
            HeaderHTML += `<li><a href="FAQ.html" class="active">${translate('Header.Links.FAQ')}</a></li>`
        }else{
            HeaderHTML += `<li><a href="FAQ.html">${translate('Header.Links.FAQ')}</a></li>`
        }
        
        if(localStorage.getItem('Admin') === true || localStorage.getItem('Admin') === "true"){
            //IF Admin add :D
            if(active.toLowerCase() === "Kunden".toLowerCase()){
                HeaderHTML += `<li><a href="Kunden.html" class="active">${translate('Header.Links.Kunden')}</a></li>`
            }else{
                HeaderHTML += `<li><a href="Kunden.html">${translate('Header.Links.Kunden')}</a></li>`
            }
        }

        HeaderHTML += `<li><p id="logout" onclick="logout()">${translate('Header.Links.Ausloggen')}</p></li>`

    $("#LinksList").html(HeaderHTML);
}

/**
 * Will create the wlcome message on top left side
 * @returns {Promise}
 */
 function createHeaderMessage() {
     let SofwareName = "Hosting-Manager" //Chance this if your event has a diffrent Name
     let HeaderHTML = `${SofwareName}: ${translate('Header.Willkommen')} ${localStorage.getItem('Username')}`;

    $("#HeaderWelcome").text(HeaderHTML);
}

/**
 * Will create the web title
 * @returns {Promise}
 */
 function createSiteTitle() {
    let SofwareName = "LAN-Manager" //Chance this if your event has a diffrent Name
    let HeaderHTML = `${SofwareName}: ${localStorage.getItem('Username')}`;

   $("#SideTile").text(HeaderHTML);
}

/**
 * This function will convert cents to Euro ISO 
 * @param {string} value
 * @returns {string}
 */
 function CentToEuro(value){
    var euro = value / 100;
    return euro.toLocaleString("de-De", {style:"currency", currency:"EUR"});
}