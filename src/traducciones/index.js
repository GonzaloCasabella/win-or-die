// ES_US, IT

import { EN_US } from "./languages";

// const getTraducciones = async (language) => {
//     try {
//         const response = await fetch(`/assets/traducciones/${language.toUpperCase()}.json`)
//         const data = await response.json();
//         return data.words;
//     } catch (error) {
//         console.error(error)
//         console.log("hola")
//     }
// }
let translations = null;
let language = EN_US;

export async function getTranslations(lang, callback) {
    localStorage.clear();
    language = lang;
    // if (language === EN_US) {
    //     console.log(`FETCH TRANSLATIONS --- key = traduccion`);
    //     return;
    // }
    // return await
    //     fetch(`https://traduci-la-strapi.herokuapp.com/api/translations/${language}`)
    //         .then(response => response.json())
    //         .then(data => {
    //             localStorage.setItem('translations', JSON.stringify(data));
    //             translations = data;
    //             if (callback) callback()
    //         });

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

    if (translations && translations.key[key]) {

        // Filtrar la traduccion segun el indice de array, luuego checkuear el key.!
        phrase = translations[key];
    }

    return phrase;
}
