const i18n = new I18n({
    fallback: 'de',
    languages: {
      de: {
        Header: {
          Links: {
            Startseite: "Startseite",
            FAQ: "FAQ",
            Kunden: "Kunden",
            Ausloggen: "Ausloggen",
            Einloggen: "Einloggen",
            Registrieren: "Registrieren",
            Credits: "Credits",
            AdminControl: "Admin Panel"
          },
        },
        Startseite: {

        },
        Login: {
          Form: {
            FormUserLogin: "Login:",
            Email: "E-Mail",
            Passwort: "Passwort",
            Submit: "Einloggen",
            Errors: {
              MissingField: " Feld muss ausgefüllt sein!",
              WrongField: " Feld hat keinen gültigen Wert, bitte überprüfen!",
              MinPassword: "Das Passwort braucht minderstens 10 Zeichen",
              WrongPassword: "Der Nutzer existiert nicht oder das Passwort ist falsch"
            }
          }
        },
        Registrieren: {
          Form: {
            FormUserReg: "Registrierung:",
            Email: "E-Mail",
            Passwort: "Passwort",
            RPasswort: "Passwort wiederholen",
            Submit: "Registrieren",
            Errors: {
              PasswordMissmatch: "Passwörter stimmen nicht überein oder sind leer!",
              MissingField: " Feld muss ausgefüllt sein!",
              WrongField: " Feld hat keinen gültigen Wert, bitte überprüfen!",
              MissingToken: "Dieser Host ist privat! Eine Regestrierung ist ohne Token nicht möglich. Bitte fragen Sie einen Admin.",
              InvalidToken: "Der Token ist ungültig oder abgelaufen. Bitte fragen Sie einen Admin.",
              ConfirmLegal: "Du musst die ABG und Datenschutzbestimmung akzeptierne.",
              UserTaken: "Die Nutzer ID ist bereits vergeben."
            }
          }
        },
        Credits: {
          Headline: "Status von",
          WeeklyCoins: "Wöchentliche Credits",
          CoinsPopup: "Du hast {{AddedCoins}} Credits bekommen.",
          CoinsPopupErrors: {
            LessThanAWeek: "Es sind noch keine 7 Tage vergangen, warte bis: {{TimeStamp}}",
            TooManyRequests: "Bitte warte 15 Minuten.",
            Database: "Fehler: 500 (Kontaktiere einen admin)"
          },
          Errors: {
            CommunicationError: "Die Credits konnten nicht geladen werden...",
            UserDoesNotExist: "Es konnte kein Nutzer im Gamepanel gefunden werden!"
          }
        },
        Kunden: {
          Errors: {
            CommunicationError: "Die Nutzer konnten nicht abgerufen werden..."
          }
        },
        AdminControl: {
          APITokenError: {
            Error: "Die Tokens konnten nicht geladen werden..."
          },
          Form: {
            FormCreateAPiToken: "API Token erstellen:",
            TokenField: "API Token wird hier erscheinen...",
            Permission: "Rechte",
            Submit: "Token Erstellen",
            Errors: {
              MissingField: " Feld muss ausgefüllt sein!",
              WrongField: " Feld hat keinen gültigen Wert, bitte überprüfen!",
              NotEnothPermissions: "Du hast keine Rechte dieses Token zu erstellen"
            }
          }
        },
        Tabeles: {
          KundenListe: {
            email: "E-Mail",
            admin: "Admin",
            panelid: "Panel ID",
            coinsperweek: "Credits pro Woche",
            maxcoins: "Max Credits"
          },
          APITokenListe: {
            email: "E-Mail",
            permissions: "Rechte",
            token: "Token",
            button_deletAPIToken: "Löschen"
          }
        }
      }
    }
});

/**
 * Will translate a key value to the language of the token
 * @param {string} Key Object Key to translate
 * @param {object} Variables
 * @returns {string} Transladed String
 */
function translate(Key, Variables){
  if(Variables){
    return i18n.translate(localStorage.getItem('Language'), Key, Variables);
  }else{
    return i18n.translate(localStorage.getItem('Language'), Key);
  }
}

function convertFlags(lang_string){
  if(lang_string === "de"){
    return "🇩🇪";
  }else if(lang_string === "en"){
    return "🇬🇧";
  }else if(lang_string === "ua"){
    return "🇺🇦";
  }else if(lang_string === "it"){
    return "🇮🇹";
  }else{
    return lang_string
  }
}

function setLanguageKey(){
  if(!localStorage.getItem('Language')){
    let userLang = navigator.language.substring(0,2).toLocaleLowerCase() || navigator.userLanguage.substring(0,2).toLocaleLowerCase(); 
    localStorage.setItem('Language', userLang)
  }
}

setLanguageKey()