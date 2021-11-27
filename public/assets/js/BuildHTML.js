/**
 * Will create the header based on active and persmissions
 * @param {string} active Current HTML
 * @returns {Promise}
 * User: Startseite | Shopping | Strom  
 * Admin: Gäste | Bestellungen
 */
function createHeaderLinks(active) {
    var HeaderHTML = "";
        
        if(active.toLowerCase() === "INDEX".toLowerCase()){
            HeaderHTML += `<li><a href="index.html" class="active">${translate('Header.Links.Startseite')}</a></li>`
        }else{
            HeaderHTML += `<li><a href="index.html">${translate('Header.Links.Startseite')}</a></li>`
        }

        if(active.toLowerCase() === "FAQ".toLowerCase()){
            HeaderHTML += `<li><a href="faq.html" class="active">${translate('Header.Links.FAQ')}</a></li>`
        }else{
            HeaderHTML += `<li><a href="faq.html">${translate('Header.Links.FAQ')}</a></li>`
        }

        if(localStorage.getItem('token')){
            //IF user is loged in
            if(active.toLowerCase() === "credits".toLowerCase()){
                HeaderHTML += `<li><a href="credits.html" class="active">${translate('Header.Links.Credits')}</a></li>`
            }else{
                HeaderHTML += `<li><a href="credits.html">${translate('Header.Links.Credits')}</a></li>`
            }
        }
        
        if(localStorage.getItem('admin') === true || localStorage.getItem('admin') === "true"){
            //IF Admin add :D
            if(active.toLowerCase() === "Kunden".toLowerCase()){
                HeaderHTML += `<li><a  href="kunden.html" class="active">${translate('Header.Links.Kunden')}</a></li>`
            }else{
                HeaderHTML += `<li><a style="color: #00aa00;" href="kunden.html">${translate('Header.Links.Kunden')}</a></li>`
            }

            if(active.toLowerCase() === "admincontrol".toLowerCase()){
                HeaderHTML += `<li><a  href="admincontrol.html" class="active">${translate('Header.Links.AdminControl')}</a></li>`
            }else{
                HeaderHTML += `<li><a style="color: #00aa00;" href="admincontrol.html">${translate('Header.Links.AdminControl')}</a></li>`
            }
        }
        
        if(active.toLocaleLowerCase() === "Registrieren".toLocaleLowerCase()){
            HeaderHTML += `<li><p><a href="registrieren.html" class="active">${translate('Header.Links.Registrieren')}</a></p></li>`
        }else{
            if(localStorage.getItem('token')){
                HeaderHTML += `<li><p id="logout" onclick="logout()">${translate('Header.Links.Ausloggen')}</p></li>`
            }else{
                if(active.toLowerCase() === "login".toLowerCase()){
                    HeaderHTML += `<li><p><a href="login.html" class="active">${translate('Header.Links.Einloggen')}</a></p></li>`
                }else{
                    HeaderHTML += `<li><p><a href="login.html">${translate('Header.Links.Einloggen')}</a></p></li>`
                }
            }
        }

    $("#LinksList").html(HeaderHTML);
}

/**
 * Will create the wlcome message on top left side
 * @returns {Promise}
 */
 function createHeaderMessage() {
     let SofwareName = "EBG Hosting-Manager" //Chance this if your event has a diffrent Name
     let HeaderHTML = `${SofwareName}`;

    $("#HeaderWelcome").text(HeaderHTML);
}

/**
 * Will create the web title
 * @returns {string}
 */
 function createSiteTitle() {
    let SofwareName = "EBG-Hosting" //Chance this if your event has a diffrent Name
    let HeaderHTML = `${SofwareName}`;

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

function translateFooter() {
    $("#Footer_AGB").text(translate("Footer.AGB"));
    $("#Footer_DAT").text(translate("Footer.Datenschutz"));
    $("#Footer_IMP").text(translate("Footer.Impressum"));
}