function getActiveTrack(player) {
    //gets active text track
    var tracks = player.textTracks().tracks_;
    var activeTrack = null;
    
    //add event listener for keeping track of text tracks all the time
    for (var i in tracks) {
        if (tracks[i].mode === 'showing') {
            var activeTrack = tracks[i]; 
        };
    }
    return activeTrack;    
}

export function mouseClickForWord(element) {
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
export function createDivForText(element, text) {
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
            para.style.color = 'black';
            para.style.backgroundColor = 'white';
        };
        para.onmouseout = function () {
            para.style.color = '';
            para.style.backgroundColor = '';
        };
        para.onclick = function () {
            mouseClickForWord(para);
        };
        element.appendChild(para);
    });
}

export function popupTranslations(element, sourceLanguage, targetLanguage) {
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
export function subtitleHandler(player) {
    //writes current cue's text into custom sub
    var activeTrack = getActiveTrack(player);
    var customSub = document.getElementById("custom-sub");

    activeTrack.addEventListener("cuechange", function () {
        var activeCues = activeTrack.activeCues;
        var captionText = activeCues.cues_[0].text;
        customSub.textContent = "";
        createDivForText(customSub, captionText);
        customSub.style.display = "flex";
    });
}

function seekerEventHandler(player) {
    player.addEventListener("seeked", function() {
        console.log("seeked");
    });

}




export function addVideoAndSubtitleButtons() {
    const chooseVideoButton = document.getElementById("choose-video-button");
    const addSubtitleButton = document.getElementById("add-subtitle-button");

    const closeVideoSelectBtn = document.getElementById("close-video-select-btn");
    const closeSubtitleSelectBtn = document.getElementById("close-subtitle-select-btn");

    chooseVideoButton.addEventListener("click", function() {
        document.getElementById("video-select-popup").style.display = "block";
    });
    addSubtitleButton.addEventListener("click", function() {
        document.getElementById("subtitle-select-popup").style.display = "block";
    });

    closeVideoSelectBtn.addEventListener("click", function() {
        document.getElementById("video-select-popup").style.display = "none";
    })
    closeSubtitleSelectBtn.addEventListener("click", function() {
        document.getElementById("subtitle-select-popup").style.display = "none";
    })
}