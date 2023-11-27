export function doubleClickChanger(event) {
    //It changes double click action to full screen video container instead
    //of video so that subtitle popups be visible in fullscreen
    const videoContainer = document.getElementById("video-container");
    videoContainer.requestFullscreen();
}
export function closePopup() {
    //clicking anywhere but word or translation will hide popups
    const popup = document.getElementById("translation-popup");
    const customSub = document.getElementById("custom-sub");
    document.addEventListener('click', (event) => {
        if ((event.target !== popup) && !(customSub.contains(event.target))) {
            popup.style.visibility = "hidden";
        } 
    });
}
export function resizeVideoPlayer() {
    //automatically resizes player and custom sub
    var videoContainer = document.getElementById("video-container");
    var customSub = document.getElementById("custom-sub");
    var translationPopup = document.getElementById("translation-popup");

    const width = videoContainer.offsetWidth;
    const height = (9 / 16) * width; // 16:9 aspect ratio

    const video = document.getElementById('my-video');
    video.style.width = width + 'px';
    video.style.height = height + 'px'; 

    customSub.style.fontSize = width / 35 + 'px'; //resizes custom sub
    
}
export function positionCustomSub() {
    //positions popup relative to player 
    var video = document.getElementById("my-video");
    var rect = video.getBoundingClientRect();
    var customSub = document.getElementById("custom-sub");

    customSub.style.top = rect.height * (8/9) + 'px';
    customSub.style.left = rect.left + rect.width / 2 + 'px';
}
export function fullscreenToggleChanger(player) {
    //it changes players fs toggle so that it makes the container fs instead of just video element
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