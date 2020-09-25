//=========================Prevent Video from autoplay=========================
let bgVideo = document.getElementById("bgVideo");
//OR let byVideo = $("#bgVideo")[0];
//# is not neccessary when using document.getElementById

function setVidPlaybackSpeed() {
    bgVideo.playbackRate = 0;
}
//=========================Prevent Video from autoplay=========================

//=========================START OF Responsive Windows SECTION======================
//For screensize smaller than 1200px, load mobile video
window.addEventListener("resize", switchBGVideo);

function switchBGVideo() {
    var bgVideo = $("#bgVideo");
    var windowWidth = $(window).width();
    if (windowWidth < 1200) {
        bgVideo.attr("src", "videos/ElCapitan_Mo.mp4");
    }
    else {
        bgVideo.attr("src", "videos/ElCapitan_De.mp4");
    }
}
switchBGVideo();
//=========================END OF Responsive Windows SECTION========================

//=========================Allow Video to Play Only When Video Has Reached the Top========================
var shouldVideoStart = false;
var videoDistanceFromTop = $('#videoContainer').offset().top;

$(window).on('scroll', function () {
    var scrollFromTop = $(window).scrollTop();
    var currentVidDistanceFromTop = (videoDistanceFromTop - scrollFromTop);
    if (currentVidDistanceFromTop <= 0) {
        shouldVideoStart = true;
    }
    else {
        shouldVideoStart = false;
    }
});
//=========================Allow Video to Play Only When Video Has Reached the Top ========================

//init scroll magic controller
let controller = new ScrollMagic.Controller();

//creating video animation

//========================Input Your Customized Value Below =====================

let videoDuration = 8.5;
//how long is the video; i.e 14 means that video is 14 seconds long?
let videoFrameRate = 30;
//what is the video frame rate? i.e: 25fps/30fps
let yOffsetToVidTimeRate = 1000;
//how long do you want the scroll to be? The bigger the number, the longer the scroll
let acceleration = 0.2;
//how do you want the momentum to be? The smaller the number, the stronger the momentum. 
//======================Input Your Customized Value Above ========================

//======================Video Section ========================
let videoDurationInPx = videoDuration * yOffsetToVidTimeRate;
let windowHeight = window.innerHeight;
document.getElementById("contentContainer").style.height = videoDurationInPx + windowHeight;

let midVideoTime = 0;
let targetVideoTime = 0;

//build the video scene
let videoScene = new ScrollMagic.Scene({
    triggerHook: 0,
    triggerElement: "#videoSpacer",
    //must use a container to cover the video element
    offset: 0,
    duration: videoDurationInPx,
})
    .setPin("#videoContainer")
    .addTo(controller)
    //.addIndicators({ name: "--- Video Scene" });

videoScene.on("update", e => {
    if (shouldVideoStart == true) {
        midVideoTime = (e.scrollPos - videoDistanceFromTop) / yOffsetToVidTimeRate;
    }
    //update is a predifined event by scroll magic, e.scrollPos: the current scroll position of the container, e.scrollPos == the amount of px away from top 
});

setInterval(() => {
    targetVideoTime += (midVideoTime - targetVideoTime) * acceleration;
    //targetVideoTime = targetVideoTime + (midVideoTime - targetVideoTime)* acceleration
    bgVideo.currentTime = targetVideoTime;

    console.log("video current time =" + targetVideoTime);

    setVidPlaybackSpeed();

}, 1000 / videoFrameRate);

//======================Video Section ========================

//====================== START of Texts Section ========================

//------------------------OverlayText01---------------------
let overlayText01DisFromTop = 2 * yOffsetToVidTimeRate + windowHeight * 0.5;
//text01 shows up at 2 second
//videoCurrentTime *yOffsetToVideoTimeRate + TriggerHookRate (i.e 0.3) * windowHeight

document.getElementById("spacer0001").style.marginTop = overlayText01DisFromTop + "px";

let text01Scene = new ScrollMagic.Scene({
    triggerHook: 0.5,
    triggerElement: "#trigger1",
    duration: 800,
})
    .setPin("#pin1")
    .addTo(controller)
    //.addIndicators({ name: "--- text01 Scene" });

//------------------------OverlayText01---------------------

//------------------------OverlayText02---------------------
document.getElementById("spacer0102").style.marginTop = 4000 - (2 * yOffsetToVidTimeRate + 800) +"px"

let text02Scene = new ScrollMagic.Scene({
    triggerHook: 0.5,
    triggerElement: "#trigger2",
    duration: 800,
})
    .setPin("#pin2")
    .addTo(controller)
    //.addIndicators({ name: "--- text02 Scene" });
//------------------------OverlayText02---------------------

//------------------------OverlayText03---------------------
document.getElementById("spacer0203").style.marginTop = 6000 - (4000 + 800) + "px";

let text03Scene = new ScrollMagic.Scene({
    triggerHook: 0.5,
    triggerElement: "#trigger3",
    duration: 800,
})
    .setPin("#pin3")
    .addTo(controller)
    //.addIndicators({ name: "--- text03 Scene" });
//------------------------OverlayText03---------------------
//======================Texts Section END========================