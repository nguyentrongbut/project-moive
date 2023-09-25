const thumbPage = document.querySelector(".page__thumb");
const videoPage = document.querySelector(".page__video--auto");
const audioPage = document.querySelector(".page__audio--open");
const mutedPage = document.querySelector(".page__audio--close");

setTimeout(function() {
    thumbPage.classList.add('js-hidden');
    videoPage.classList.remove('js-hidden');
    videoPage.classList.add('js-showing');
    mutedPage.classList.remove('js-none');
    mutedPage.classList.add('js-show');
    videoPage.muted = true;
    videoPage.play();
}, 4000);
videoPage.addEventListener("ended", function() {
    thumbPage.classList.remove('js-hidden');
    videoPage.classList.remove('js-showing');
    thumbPage.classList.add('js-showing');
    videoPage.classList.add('js-hidden');
    audioPage.classList.
});

mutedPage.addEventListener("click", handleClickMuted);
function handleClickMuted() {
    mutedPage.classList.remove('js-show');
    mutedPage.classList.add('js-none');
    audioPage.classList.remove('js-none');
    audioPage.classList.add('js-show');
    videoPage.muted = false;
}
audioPage.addEventListener("click", handleClickAudio);
function handleClickAudio() {
    audioPage.classList.remove('js-show');
    audioPage.classList.add('js-none');
    mutedPage.classList.remove('js-none');
    mutedPage.classList.add('js-show');
    videoPage.muted = true;
}