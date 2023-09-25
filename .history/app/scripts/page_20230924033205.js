const thumbPage = document.querySelector(".page__thumb");
const videoPage = document.querySelector(".page__video--auto");
const audioPage = do

setTimeout(function() {
    thumbPage.classList.add('js-hidden');
    videoPage.classList.remove('js-hidden');
    videoPage.classList.add('js-showing');
    videoPage.play();
}, 4000);
videoPage.addEventListener("ended", function() {
    thumbPage.classList.remove('js-hidden');
    videoPage.classList.remove('js-showing');
    thumbPage.classList.add('js-showing');
    videoPage.classList.add('js-hidden');
});

