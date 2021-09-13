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
          },
        },
        Startseite: {

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