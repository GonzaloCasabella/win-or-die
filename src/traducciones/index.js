
import { ES_AR } from "./languages";

let translations = null;
let language = ES_AR;

export async function getTranslations(lang, callback) {
    localStorage.clear();
    language = lang;
    // if (language === ES_AR) {
    //     return callback ? callback() : false;
    // }

    const response = await fetch(`/assets/traducciones/${language.toUpperCase()}.json`)
    const data = await response.json();
    localStorage.setItem('translations', JSON.stringify(data.words));
    translations = data.words;
    if (callback) callback()
    return data.words;
}

export function getPhrase(key) {
    if (!translations) {
        const locals = localStorage.getItem('translations');
        translations = locals ? JSON.parse(locals) : null;
    }
    let phrase = key;

    const filterPhrase = translations.filter(translation => translation.key === key);

    if (translations && filterPhrase) {
        phrase = filterPhrase[0].translate;
    }
    return phrase;
}
