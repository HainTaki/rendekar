
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
    
    // Example usage
const sourceText = 'Hello, how are you?';
const sourceLanguage = 'en'; // Source language code (e.g., 'en' for English)
const targetLanguage = 'fr'; // Target language code (e.g., 'es' for Spanish)

export function translation() {
    translateText(sourceText, sourceLanguage, targetLanguage)
    .then(translatedText => {
        console.log('Translated Text:', translatedText);
    })
    .catch(error => {
        console.error('Translation Error:', error);
    });
}

export function example1() {
    console.log("example text");
}