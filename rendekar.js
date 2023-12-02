import {translateText} from './translate_libre.js';
import {mouseClickForWord, createDivForText, popupTranslations, 
        subtitleHandler, addVideoAndSubtitleButtons} from './subtitles.js';
import {doubleClickChanger, closePopup, resizeVideoPlayer, 
        positionCustomSub, fullscreenToggleChanger} from './player_setup.js';

function addSubtitles(player, src, language, label) {
    const track = player.addRemoteTextTrack({
        kind: 'subtitles',
        label: label,
        language: language,
        src: src,
        manualCleanup: true
    });
    const tracks = player.textTracks().tracks_;
    console.log(tracks);
}

function fileListeners() {
    //Video by file listener
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
    //Subtitle by link listener
    const subLinkForm = document.getElementById("sub-link-form");
    subLinkForm.addEventListener()

}


function main() {
    
    const player = videojs('my-video', {
        fluid: true,
        autoplay: true,
        userActions: {
            doubleClick: doubleClickChanger
        },
        html5: {
            nativeTextTracks: false
        },
    });
    closePopup(); //click to hide popup
    resizeVideoPlayer(); //sets initial size
    positionCustomSub();  //sets initial position for popup
    window.addEventListener('resize', function () {//catches resize action
        resizeVideoPlayer();
        positionCustomSub();
    }); 
    window.addEventListener("fullscreenchange", function() {
        resizeVideoPlayer();
        positionCustomSub();
    });

    player.ready(function() { 
        fullscreenToggleChanger(player);//fs toggle changing
        //subtitleHandler(player);
        this.play();
        //addSubtitles(player, "samplex.vtt", "en", "english45");
        
    });
}

document.addEventListener("DOMContentLoaded", main);

