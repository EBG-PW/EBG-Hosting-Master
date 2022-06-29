const i18n = new I18n({
  fallback: 'en',
  languages: {
    de: {
      Footer: {
        AGB: "AGB",
        Datenschutz: "Datenschutz",
        Impressum: "Impressum"
      },
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
        Überschrift: "Kostenloses Premium EBG Hosting",
        Teil1: "Ein kostenloser Gameserver Hoster",
        Teil1Text: "Wir bieten kostenlose Spieleserver für dich und deine Freunde an die 24/7 laufen.<br>Wir haben Server in Deutschland, Österreich und den USA damit du immer die beste Latenz hast!",
        Teil2: "Wie bekommst du einen kostenlosen Server?",
        Teil2Text: "Um einen kostenlosen Gameserver zu erhalten musst du einfach einem der Admins erzählen was du vor hast und warum wir dir einen kostenlosen Server zur Verfügung stellen sollten.<br>Die hauptsächliche Zielgruppen sind:<br>- Local/online gaming communitys<br>- Lan-partys<br>- Non-profit Organisationen rund ums Gaming.<br>Mehr Informationen: <a href='https://vag.dev.ebg.pw/faq.html'>FAQ</a>",
        Teil3: "Wo finde ich einen EBG-Admin?",
        Teil3Text: "Du kannst uns kontaktieren auf, <a href='https://discord.gg/tqWEsUHgn8'>Discord</a> <a href='https://twitter.com/ebg_pw'>Twitter</a>, Telegram oder jedem anderen Weg den du magst.<br>E-Mail: contact@ebg.pw",
        Teil4: "Wichtige Links",
        Teil4Text: "- <a href='https://hosting.ebg.pw'>hosting.ebg.pw</a> | Registriere dich und erhalte kostenlose Punkte.<br>- <a href='https://game.ebg.pw'>game.ebg.pw</a> | Erstelle oder lösche Gameserver, du kannst die Resourcen selbst wählen.<br>- <a href='https://panel.ebg.pw'>panel.ebg.pw</a> | Verwalte deine Gameserver: Starte oder Stoppe den Server, lade Dateien hoch und mehr!"
      },
      FAQ: {
        Title1: "Allgemeine Fragen:",
        FI: "Was ist ein privater Hoster?",
        AI: "Ein privater Hoster, ist ein Hoster der nur für ausgewählte Personen einen Server hostet.",
        FII: "Ist das Hosten bei EBG.PW kostenlos?",
        AII: "Ja! Das Hosten bei Uns ist und bleibt komplett kostenlos für alle angebotenen Gameserver und Applikationen. Es gibt keine versteckten Kosten.",
        FIII: "Was für Hardware hat EBG.PW?",
        AIII: "Eine Liste der aktuellen Hardware für das Hosting findest du in unserem Discord im Kanal 'Gameserver-Status'.",
        FIIII: "Wie kann ich mich registrieren?",
        AIIII: "Dazu wird ein Token benötigt, frage einen EBG Admin ob du einen bekommst. Schreibe außerdem eine <i>grobe Zusammenfassung</i> was du genau vor und warum du dieses <i>kostenlose</i> Hosting benötigst. Der Admin endscheidet ob, und welche Resourcen, dir <i>kostenlose</i> zur verfügung gestellt werden.",
        FIIIII: "Wie komme ich an Credits?",
        AIIIII: "Du kannst kostenlos alle 7 Tage auf <a href='hosting.ebg.pw'><i>hosting.ebg.pw</i></a> deine wöchentlichen Credits abholen. Du bekommst die Credits auch automatisch bis zu 2 Wochen rückwirkend. Wenn du deine Maximalen Credits erreicht hast, verfallen alle weiteren Credits automatisch.",
        Title2: "Informationen über unsere Nodes und Server:",
        NodesText: "Es sind vielleicht nicht alle Nodes für dich verfügbar!<br>- Node 1: [AT/Linz] - Perfekt für Factorio oder Minecraft<br>- Node 2: [DE/Nürnberg] - Gut für Factorio, Minecraft, Starbound und Terraria<br>- Node 3: [DE/Nürnberg] - Gut für Factorio, Minecraft, Starbound und Terraria<br>- Node 4: [US/New York] - Durschnittliche leistung, ehr für kleinere Server<br>- Node 5: [AT/Linz] - Perfekt für Rust und ARK"
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
            MinPassword: "Das Passwort braucht mindestens 10 Zeichen",
            WrongPassword: "Der Nutzer existiert nicht oder das Passwort ist falsch"
          }
        }
      },
      Registrieren: {
        Form: {
          FormUserReg: "Registrierung:",
          Name: "Name",
          Email: "E-Mail",
          Passwort: "Passwort",
          RPasswort: "Passwort wiederholen",
          Submit: "Registrieren",
          LegalOne: "Ich akzeptiere die </div><a id='Footer_AGB' onclick='Show_Legal(`AGB`)'>AGB</a> und </div><a id='Footer_DAT' onclick='Show_Legal(`DAT`)'>Datenschutz Bestimmungen</a>!",
          Errors: {
            PasswordMissmatch: "Passwörter stimmen nicht überein, sind leer oder zu kurz! (Bitte mindestens 10 Zeichen)",
            MissingField: " Feld muss ausgefüllt sein!",
            WrongField: " Feld hat keinen gültigen Wert, bitte überprüfen!",
            MissingToken: "Dieser Host ist Privat! Eine Registrierung ist ohne Token nicht möglich. Bitte fragen Sie einen Admin.",
            InvalidToken: "Der Token ist ungültig oder abgelaufen. Bitte fragen Sie einen Admin.",
            ConfirmLegal: "Du musst die AGB und Datenschutzbestimmung akzeptieren.",
            UserTaken: "Diese Nutzer ID ist bereits vergeben."
          }
        }
      },
      Credits: {
        Headline: "Status von",
        Free: "Du bekommst Wöchentlich {{FreeWeek}} Credits kostenlos.",
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
          CommunicationError: "Der Nutzer konnte nicht abgerufen werden..."
        }
      },
      AdminControl: {
        APITokenError: {
          Error: "Die Tokens konnten nicht geladen werden..."
        },
        APITokenDelete: {
          NotEnothPermissions: "Du hast keine Rechte um einen Token zu löschen!"
        },
        Form: {
          FormCreateAPiToken: "API Token erstellen:",
          TokenField: "API Token wird hier erscheinen...",
          Permission: "Rechte",
          Submit: "Token Erstellen",
          Succsess: "Token erstellt und in die Zwischenablage kopiert",
          Errors: {
            MissingField: " Feld muss ausgefüllt sein!",
            WrongField: " Feld hat keinen gültigen Wert, bitte überprüfen!",
            NotEnothPermissions: "Du hast keine Rechte diesen Token zu erstellen"
          }
        },
        RegTokenForm: {
          FormCreateREGToken: "Reg Token erstellen:",
          TokenField: "REG Token wird hier erscheinen...",
          CreditAmount: "Credit Anzahl",
          Submit: "Token Erstellen",
          Succsess: "Token erstellt und in die Zwischenablage kopiert",
          Errors: {
            MissingField: " Feld muss ausgefüllt sein!",
            WrongField: " Feld hat keinen gültigen Wert, bitte überprüfen!",
            NumberTooHigh: " Das sind zu viele Credits pro Woche, limit {{Limit}}",
            NotEnothPermissions: "Du hast keine Rechte diesen Token zu erstellen"
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
    },
    en: {
      Footer: {
        AGB: "ToS",
        Datenschutz: "Privacy",
        Impressum: "Imprint"
      },
      Header: {
        Links: {
          Startseite: "Mainpage",
          FAQ: "FAQ",
          Kunden: "Customers",
          Ausloggen: "Logout",
          Einloggen: "Login",
          Registrieren: "Register",
          Credits: "Credits",
          AdminControl: "Admin Panel"
        },
      },
      Startseite: {
        Überschrift: "Free premium EBG Hosting",
        Teil1: "A free place to host your gameserver",
        Teil1Text: "We offer you free premium game servers that run 24/7 to play with your friends.<br>We have servers in Germany, Austria and the US so you always have low latancy!",
        Teil2: "How do you get a free game server?",
        Teil2Text: "To qualify for a free gameserver you don´t need much, just tell one of the admins what you want and why we should give it to you for free.<br>The main targets are:<br>- Local/online gaming communitys<br>- Lan-partys<br>- Non-profit establisments that have something to do with gaming.<br>More information: <a href='https://vag.dev.ebg.pw/faq.html'>FAQ</a>",
        Teil3: "Where do i find an EBG-Admin?",
        Teil3Text: "You can contact us by E-Mail, <a href='https://discord.gg/tqWEsUHgn8'>Discord</a> <a href='https://twitter.com/ebg_pw'>Twitter</a>, Telegram or any other way you like.<br>E-Mail: contact@ebg.pw",
        Teil4: "Important links",
        Teil4Text: "- <a href='https://hosting.ebg.pw'>hosting.ebg.pw</a> | Regestration and claming your free weekly coins<br>- <a href='https://game.ebg.pw'>game.ebg.pw</a> | Create and delete your gameservers, choose your own resources<br>- <a href='https://panel.ebg.pw'>panel.ebg.pw</a> | Manage your gameservers: Start or Stop, upload files, make backups and more"
      },
      FAQ: {
        Title1: "General questions:",
        FI: "What is a privat host?",
        AI: "A privat host, is a host that isn´t public for everbody.",
        FII: "Is the hosting on EBG.PW free",
        AII: "Yes! The hosting at EBG.PW is and will be free for the offerd gameservers and applications. There a re no hidden costs.",
        FIII: "What kind of hardware doss EBG.PW have?",
        AIII: "A list of the currently used hardware for hosting is always avaible at our discord in the chanel 'Gameserver-Status'.",
        FIIII: "How can i register?",
        AIIII: "You need a special token, to get that you have to ask an EBG Admin. Also write a <i> rough summary </i> what exactly you are planning and why you need this <i> free </i> hosting. The admin decides whether you get it or not and how many resources are made available to you for <i> free </i>.",
        FIIIII: "How do i get credits?",
        AIIIII: "You can claim your free coins once every 7 days at <a href='hosting.ebg.pw'><i>hosting.ebg.pw</i></a>, you get up to 2 weeks of creadits if you missed to pick them up last week. If you exeede your maximum amount of credits, the rest will expire automaticly.",
        Title2: "Information about Nodes and Servers:",
        NodesText: "Maybe not every node is avaible to you!<br>- Node 1: [AT/Linz] - Perfect for Minecraft or Factorio<br>- Node 2: [DE/Nuernberg] - Good for Factorio, Minecraft, Starbound and Terraria<br>- Node 3: [DE/Nuernberg] - Good for Factorio, Minecraft, Starbound and Terraria<br>- Node 4: [US/New York] - Above avrage performance, good for smaler servers<br>- Node 5: [AT/Linz] - Great for Rust and ARK"
      },
      Login: {
        Form: {
          FormUserLogin: "Login:",
          Email: "E-Mail",
          Passwort: "Password",
          Submit: "Login",
          Errors: {
            MissingField: " Field must be filled out!",
            WrongField: " Field has no valid value, please check!",
            MinPassword: "The password needs at least 10 characters",
            WrongPassword: "The user does not exist or the password is incorrect"
          }
        }
      },
      Registrieren: {
        Form: {
          FormUserReg: "Registration:",
          Name: "Name",
          Email: "E-Mail",
          Passwort: "Password",
          RPasswort: "Repete Password",
          Submit: "Registration",
          LegalOne: "I accept the </div><a id='Footer_AGB' onclick='Show_Legal(`AGB`)'>ToS</a> and </div><a id='Footer_DAT' onclick='Show_Legal(`DAT`)'>Privacy policy</a>!",
          Errors: {
            PasswordMissmatch: "Passwords do not match, are empty or too short! (Pleas use at least 10 characters)",
            MissingField: " Field must be filled out!",
            WrongField: " Field has no valid value, please check!",
            MissingToken: "This host is private! Registration is not possible without a token. Please ask an admin.",
            InvalidToken: "The token is invalid or has expired. Please ask an admin.",
            ConfirmLegal: "You have to accept the General Terms and Conditions and data protection regulations.",
            UserTaken: "The user ID has already been assigned."
          }
        }
      },
      Credits: {
        Headline: "Status of",
        Free: "You get {{FreeWeek}} free credits per week.",
        WeeklyCoins: "Weekly Credits",
        CoinsPopup: "You got {{AddedCoins}} Credits.",
        CoinsPopupErrors: {
          LessThanAWeek: "It's not been 7 days yet, wait until: {{TimeStamp}}",
          TooManyRequests: "Please wait 15 minutes.",
          Database: "Error: 500 (Contact an admin)"
        },
        Errors: {
          CommunicationError: "The credits could not be loaded ...",
          UserDoesNotExist: "No user could be found in the game panel!"
        }
      },
      Kunden: {
        Errors: {
          CommunicationError: "The users could not be retrieved ..."
        }
      },
      AdminControl: {
        APITokenError: {
          Error: "The tokens could not be loaded ..."
        },
        APITokenDelete: {
          NotEnothPermissions: "You have no permissions to delete a token!"
        },
        Form: {
          FormCreateAPiToken: "Create API token:",
          TokenField: "API Token will appear here ...",
          Permission: "Permissions",
          Submit: "Create Token",
          Succsess: "Token created and copied to the clipboard",
          Errors: {
            MissingField: " Field must be filled out!",
            WrongField: " Field has no valid value, please check!",
            NotEnothPermissions: "You have no permissions to create this token"
          },
        },
        RegTokenForm: {
          FormCreateREGToken: "Create REG Token:",
          TokenField: "REG Token will apper here...",
          CreditAmount: "Credit amount",
          Submit: "Create Token",
          Succsess: "Token created and copied to the clipboard",
          Errors: {
            MissingField: " Field must be filled out!",
            WrongField: " Field has no valid value, please check!",
            NumberTooHigh: "Thats too much coins per week, limit {{Limit}}",
            NotEnothPermissions: "You have no permissions to create this token"
          }
        }
      },
      Tabeles: {
        KundenListe: {
          email: "E-Mail",
          admin: "Admin",
          panelid: "Panel ID",
          coinsperweek: "Credits per Week",
          maxcoins: "Max Credits"
        },
        APITokenListe: {
          email: "E-Mail",
          permissions: "Permissions",
          token: "Token",
          button_deletAPIToken: "Delete"
        }
      }
    },
    it: {
      Footer: {
        AGB: "Condizioni",
        Datenschutz: "Protezione ",
        Impressum: "Impronta"
      },
      Header: {
        Links: {
          Startseite: "Pagina principale",
          FAQ: "FAQ",
          Kunden: "Customers",
          Ausloggen: "Esci",
          Einloggen: "Accesso",
          Registrieren: "Registrati",
          Credits: "Crediti",
          AdminControl: "Pannello Amministratore"
        },
      },
      Startseite: {

      },
      Login: {
        Form: {
          FormUserLogin: "Login:",
          Email: "E-Mail",
          Passwort: "Password",
          Submit: "Accesso",
          Errors: {
            MissingField: " Il campo deve essere compilato!",
            WrongField: " Il campo non contiene un valore valido, si prega di controllare!",
            MinPassword: "La password richiede almeno 10 caratteri",
            WrongPassword: "L'utente non esiste o la password è incorretta"
          }
        }
      },
      Registrieren: {
        Form: {
          FormUserReg: "Registrazione:",
          Name: "Cognome",
          Email: "E-Mail",
          Passwort: "Password",
          RPasswort: "Recupero password",
          Submit: "Registrazione",
          LegalOne: "Accetto il </div><a id='Footer_AGB' onclick='Show_Legal(`AGB`)'>Condizioni</a> and </div><a id='Footer_DAT' onclick='Show_Legal(`DAT`)'>Protezione</a>!",
          Errors: {
            PasswordMissmatch: "Le password non corrispondono o mancanti! (Le password devono essere almeno 10 caratteri)",
            MissingField: " Il campo deve essere compilato!",
            WrongField: " Il campo non contiene un valore valido, si prega di controllare!",
            MissingToken: "Questo host è privato! La registrazione non è possibile senza token. Si prega di chiedere a un amministratore.",
            InvalidToken: "Il token non è valido o è scaduto. Si prega di chiedere a un amministratore.",
            ConfirmLegal: "Devi accettare i Termini e Condizioni Generali e le norme sulla protezione dei dati.",
            UserTaken: "L'ID utente è già stato assegnato."
          }
        }
      },
      Credits: {
        Headline: "Lo stato di",
        Free: "Ricevi {{FreeWeek}} crediti a settimana gratis",
        WeeklyCoins: "Weekly Credits",
        CoinsPopup: "Hai {{AddedCoins}} Crediti.",
        CoinsPopupErrors: {
          LessThanAWeek: "Non sono ancora passati 7 giorni, aspettare fino a: {{TimeStamp}}",
          TooManyRequests: "Si prega di attendere 15 minuti.",
          Database: "Errore: 500 (Contattare un amministratore)"
        },
        Errors: {
          CommunicationError: "Impossibile caricare i crediti ...",
          UserDoesNotExist: "Nessun utente è stato trovato nel pannello di gioco!"
        }
      },
      Kunden: {
        Errors: {
          CommunicationError: "Impossibile recuperare gli utenti ..."
        }
      },
      AdminControl: {
        APITokenError: {
          Error: "Impossibile caricare i crediti ..."
        },
        APITokenDelete: {
          NotEnothPermissions: "Non hai i diritti per eliminare un token!"
        },
        Form: {
          FormCreateAPiToken: "Crea un token API:",
          TokenField: "Il token API apparirà qui ...",
          Permission: "Autorizzazioni",
          Submit: "Crea token",
          Succsess: "Token creato e copiato negli appunti",
          Errors: {
            MissingField: " Il campo deve essere compilato!",
            WrongField: " Il campo non contiene un valore valido, si prega di controllare!",
            NotEnothPermissions: "Non hai permessi per creare questo token"
          }
        },
        RegTokenForm: {
          FormCreateREGToken: "Crea un token REG:",
          TokenField: "Il token REG apparirà qui ...",
          CreditAmount: "Ammontare del credito",
          Submit: "Crea token",
          Succsess: "Token creato e copiato negli appunti",
          Errors: {
            MissingField: " Il campo deve essere compilato!",
            WrongField: " Il campo non contiene un valore valido, si prega di controllare!",
            NumberTooHigh: "Sono troppe monete a settimana, limite {{Limit}}",
            NotEnothPermissions: "Non hai permessi per creare questo token"
          }
        }
      },
      Tabeles: {
        KundenListe: {
          email: "E-Mail",
          admin: "Amministratore",
          panelid: "ID pannello",
          coinsperweek: "Crediti a settimana",
          maxcoins: "Crediti massimi"
        },
        APITokenListe: {
          email: "E-Mail",
          permissions: "Autorizzazioni",
          token: "Token",
          button_deletAPIToken: "Cancella"
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
    return '<img width="18" height="14" src="https://twemoji.maxcdn.com/v/13.1.0/72x72/1f1e9-1f1ea.png">'; // 🇩🇪
  }else if(lang_string === "en"){
    return '<img width="18" height="14" src="https://twemoji.maxcdn.com/v/13.1.0/72x72/1f1ec-1f1e7.png">'; // 🇬🇧
  }else if(lang_string === "ua"){
    return '<img width="18" height="14" src="https://twemoji.maxcdn.com/v/13.1.0/72x72/1f1fa-1f1e6.png">'; // 🇺🇦
  }else if(lang_string === "it"){
    return '<img width="18" height="14" src="https://twemoji.maxcdn.com/v/13.1.0/72x72/1f1ee-1f1f9.png">'; // 🇮🇹
  }else{
    return lang_string
  }
}

//Get Browser Language and store it in localstorage
function setLanguageKey(){
  if(!localStorage.getItem('Language')){
    let userLang = navigator.language.substring(0,2).toLocaleLowerCase() || navigator.userLanguage.substring(0,2).toLocaleLowerCase(); 
    localStorage.setItem('Language', userLang)
  }
}

//Gets triggerd by the language selector, will update the Language in Client and send API Request
function chanceLanguageEvent(){
  if (localStorage.getItem("token") !== null) {
    const getUrl = window.location;
    const baseUrl = getUrl.protocol + "//" + getUrl.host + "/";
    let posting = $.post(`${baseUrl}api/v1/kunden/setLang`,{
      Token: localStorage.getItem("token"),
      Lang: $("#countries").val()
    });

    posting.done(function(data) {
      localStorage.setItem('Language', $("#countries").val());
      location.reload();
    });

    posting.fail(function(error) {
      alert("Language Error")
    });
  }else{
    localStorage.setItem('Language', $("#countries").val());
    location.reload();
  }
}

//Set client language
setLanguageKey()

//Set Footer language selection to current language
$("#countries").val(localStorage.getItem('Language'))
