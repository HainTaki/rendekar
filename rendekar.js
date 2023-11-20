import {translateLibre} from './translate_libre.js';

function getActiveTrack(player) {
    //gets active text track
    var tracks = player.textTracks().tracks_;
    var activeTrack = null;

    for (var i in tracks) {
        if (tracks[i].mode === 'showing') {
            var activeTrack = tracks[i]; 
        };
    }
    return activeTrack;    
}
function doubleClickChanger(event) {
    const videoContainer = document.getElementById("video-container");
    videoContainer.requestFullscreen();
}
function fullscreenToggleChanger(player) {
    var videoContainer = document.getElementById("video-container");
    var originalComponent = videojs.getComponent('FullscreenToggle');
    var toggle = videojs.extend(originalComponent, {
        constructor: function () {
            videojs.getComponent('FullscreenToggle').apply(this, arguments);
            this.controlText('Custom Fullscreen');
        },
        handleClick: function () {
            if (videoContainer == document.fullscreenElement) {
                document.exitFullscreen();
            } else {
            videoContainer.requestFullscreen();
            }
        }
    });
    videojs.registerComponent('MyFullscreenToggle', toggle);

    player.controlBar.removeChild('FullscreenToggle');
    player.controlBar.addChild('MyFullscreenToggle');
}
function resizeVideoPlayer() {
    //automatically resizes player and custom sub
    var videoContainer = document.getElementById("video-container");
    var customSub = document.getElementById("custom-sub");

    const width = videoContainer.offsetWidth;
    const height = (9 / 16) * width; // 16:9 aspect ratio

    const video = document.getElementById('my-video');
    video.style.width = width + 'px';
    video.style.height = height + 'px'; 

    customSub.style.fontSize = width / 35 + 'px'; //resizes custom sub
}
function positionCustomSub() {
    //positions popup relative to player 
    var video = document.getElementById("my-video");
    var rect = video.getBoundingClientRect();
    var customSub = document.getElementById("custom-sub");

    customSub.style.top = rect.height * (7/8) +'px';
    customSub.style.left = rect.left + rect.width / 2 + 'px';
}
function subtitleHandler(player) {//writes current cue's text into custom sub
    var activeTrack = getActiveTrack(player);
    var customSub = document.getElementById("custom-sub");

    activeTrack.addEventListener("cuechange", function () {
        var activeCues = activeTrack.activeCues;
        var captionText = activeCues.cues_[0].text;
        customSub.textContent = "";
        createDivForText(customSub, captionText);
    });
}
function mouseOverForWord(element) {
    element.style.color = 'black';
    element.style.backgroundColor = 'white';
    //there will be popup translations here
}
function mouseOutForWord(element) {
    element.style.color = '';
    element.style.backgroundColor = '';
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
        element.appendChild(para);
    });
}
function popupTranslations() {
    
}


function main() {
    
    const player = videojs('my-video', {
        fluid: true,
        autoplay: true,
        tracks: [{
            id: 'vjs-sub',
            src: 'samplex.vtt',
            kind: 'subtitles',
            srclang: 'en',
            label: 'English',
            default: true,
        }],
        userActions: {
            doubleClick: doubleClickChanger
        }
    });

    resizeVideoPlayer(); //sets initial size
    positionCustomSub();  //sets initial position for popup
    window.addEventListener('resize', function () {//catches resize action
        resizeVideoPlayer();
        positionCustomSub();
    }); 

    player.ready(function() { 
        fullscreenToggleChanger(player);
        subtitleHandler(player);
        this.play();
    });
}

document.addEventListener("DOMContentLoaded", main);