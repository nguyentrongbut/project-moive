const thumbPage = document.querySelector(".page__thumb");
const videoPage = document.querySelector(".page__video--auto");
const audioPage = document.querySelector(".page__audio--open");
const mutedPage = document.querySelector(".page__audio--close");
const descPage = document.querySelector(".page__desc");
const btnMorePage = document.querySelector(".page__desc--btn");
const morePage = document.querySelector(".page__desc--morebtn");
const iconPage = document.querySelector(".page__desc--arrow i");
const computedStyle = window.getComputedStyle(descPage);
const displayValue = computedStyle.getPropertyValue("display");

setTimeout(function () {
    thumbPage.classList.add("js-hidden");
    videoPage.classList.remove("js-hidden");
    videoPage.classList.add("js-showing");
    mutedPage.style.display = "flex";
    videoPage.muted = true;
    videoPage.play();
}, 4000);
videoPage.addEventListener("ended", function () {
    thumbPage.classList.remove("js-hidden");
    videoPage.classList.remove("js-showing");
    thumbPage.classList.add("js-showing");
    videoPage.classList.add("js-hidden");
    audioPage.style.display = "none";
    mutedPage.style.display = "none";
});

mutedPage.addEventListener("click", handleClickMuted);
function handleClickMuted() {
    mutedPage.style.display = "none";
    audioPage.style.display = "flex";
    videoPage.muted = false;
}
audioPage.addEventListener("click", handleClickAudio);
function handleClickAudio() {
    audioPage.style.display = "none";
    mutedPage.style.display = "flex";
    videoPage.muted = true;
}

btnMorePage.addEventListener("click", handleClickMore);
function handleClickMore() {
    if (displayValue.includes("-webkit-box")) {
        descPage.style.display = "inline";
    }
    if (!displayValue.includes("-webkit-box")) {
        descPage.style.display = "-webkit-box";
    }
}
