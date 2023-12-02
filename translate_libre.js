export async function translateText(text, sourceLanguage, targetLanguage) {
    const apiUrl = 'https://libretranslate.de/translate';
    
    try {
        const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            q: text,
            source: sourceLanguage,
            target: targetLanguage
        })
        });
    
        const data = await response.json();
        if (data && data.translatedText) {
            return data.translatedText;
        } else {
        return 'Translation not available';
        }
    } catch (error) {
        console.error('Error translating text:', error);
        return 'Translation error';
    }
} 

export async function getTranslatedText(text, sourceLanguage, targetLanguage) {
    try {
        const translatedText = await translateText(text, sourceLanguage, targetLanguage);
        console.log(translatedText);
    } catch (error) {
        console.error('Error: ', error);
        throw error;
    }
}

export function translateLibre(text, sourceLanguage, targetLanguage) {
    getTranslatedText(text, sourceLanguage, targetLanguage)
        .then((result) => {
            return result;
        })
        .catch((error) => {
            console.error('Error: ', error);
        });

}

//reverso api
//use 3 4 different apis and turn around them,
//make popup div into subtitle div

//do popup translation positioning and styling later