const thumbPage = document.querySelector(".page__thumb");
const videoPage = document.querySelector(".page__video--auto");
const audioPage = document.querySelector(".page__audio--open");
const mutedPage = document.querySelector(".page__audio--close");

videoPage.muted = true;
setTimeout(function() {
    thumbPage.classList.add('js-hidden');
    videoPage.classList.remove('js-hidden');
    videoPage.classList.add('js-showing');
    mutedPage.classList.remove('js-none');
    mutedPage.classList.add('js-show');
    videoPage.play();
}, 4000);
videoPage.addEventListener("ended", function() {
    thumbPage.classList.remove('js-hidden');
    videoPage.classList.remove('js-showing');
    thumbPage.classList.add('js-showing');
    videoPage.classList.add('js-hidden');
});

mutedPage.addEventListener("click", handleClick)