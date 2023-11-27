import {translateText} from './translate_libre.js';
import {getActiveTrack} from './subtitles.js';
import {doubleClickChanger, closePopup, resizeVideoPlayer, 
        positionCustomSub, fullscreenToggleChanger} from './player_setup.js';

function mouseOverForWord(element) {
    element.style.color = 'black';
    element.style.backgroundColor = 'white';
    
}
function mouseOutForWord(element) {
    element.style.color = '';
    element.style.backgroundColor = '';

}
function mouseClickForWord(element) {
    //popupTranslations(element, "en", "fr");
    const popup = document.getElementById("translation-popup");
    const rect = element.getBoundingClientRect();

    popup.innerHTML = "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
    popupTranslations(element, "en", "fr");

    requestAnimationFrame(() => {
        // Call your measurement function after the repaint
        const top = rect.top - popup.offsetHeight - 20;
        const left = rect.left - (element.offsetWidth - popup.offsetWidth) / 2;

        popup.style.top = `${top}px`;
        popup.style.left = `${left}px`;

    });
    popup.style.visibility = "visible";
}
function createDivForText(element, text) {
    //adds every word in a text to an element as childdivs
    var textArray = text.split(/\s+/);

    textArray.forEach(word => {
        var para = document.createElement("p");
        para.innerHTML = word;
        para.style.cssText = `
            padding: 3px;
            padding-top: 0px;
            padding-bottom: 0px;
            border-radius: 3px;
            display: block;
            margin: 0px;
        `;

        para.onmouseover = function () {
            mouseOverForWord(para);
        };
        para.onmouseout = function () {
            mouseOutForWord(para);
        };
        para.onclick = function () {
            mouseClickForWord(para);
        };
        element.appendChild(para);
    });
}
function popupTranslations(element, sourceLanguage, targetLanguage) {
    const text = element.innerHTML;
    const translationPopup = document.getElementById("translation-popup");
    
    translateText(text, sourceLanguage, targetLanguage)
        .then((result) => {
            translationPopup.innerHTML = result;
        })
        .catch((error) => {
            console.error('Error: ', error);
            console.log("errros");
        });
    
}
function subtitleHandler(player) {
    //writes current cue's text into custom sub
    var activeTrack = getActiveTrack(player);
    var customSub = document.getElementById("custom-sub");

    activeTrack.addEventListener("cuechange", function () {
        var activeCues = activeTrack.activeCues;
        var captionText = activeCues.cues_[0].text;
        customSub.textContent = "";
        createDivForText(customSub, captionText);
    });
}
function videoFromInput() {
    const videoInput = document.getElementById('video-file');
    const video = document.getElementById('my-video');

    videoInput.addEventListener('change', function(event) {
        const selectedFile = event.target.files[0];

        if (selectedFile) {
            const videoURL = URL.createObjectURL(selectedFile); 
            video.src = videoURL;
            console.log(videoURL);
            
        }

    });
}





function main() {
    
    const player = videojs('my-video', {
        fluid: true,
        autoplay: true,
        userActions: {
            doubleClick: doubleClickChanger
        }
    });
    closePopup(); //click to hide popup
    resizeVideoPlayer(); //sets initial size
    positionCustomSub();  //sets initial position for popup
    window.addEventListener('resize', function () {//catches resize action
        resizeVideoPlayer();
        positionCustomSub();
    }); 

    player.ready(function() { 
        fullscreenToggleChanger(player);//fs toggle changing
        subtitleHandler(player);
        this.play();
    });
}
document.addEventListener("DOMContentLoaded", main);

