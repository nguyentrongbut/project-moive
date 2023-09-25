const thumbPage = document.querySelector(".page__thumb");
const videoPage = document.querySelector(".page__video--auto");
const audioPage = document.querySelector(".page__audio--wrapper1");
setTimeout(function() {
    thumbPage.classList.add('js-hidden');
    videoPage.classList.remove('js-hidden');
    videoPage.classList.add('js-showing');
    audioPage.classList.remove('js-none');
    audioPage.classList.add('js-show');
    videoPage.play();
}, 4000);
videoPage.addEventListener("ended", function() {
    thumbPage.classList.remove('js-hidden');
    videoPage.classList.remove('js-showing');
    thumbPage.classList.add('js-showing');
    videoPage.classList.add('js-hidden');
});

