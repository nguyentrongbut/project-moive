const thumbPage = document.querySelector(".page__thumb");
const videoPage = document.querySelector(".page__video--auto");
setTimeout(function() {
    thumbPage.classList.add('js-hidden');
    videoPage.classList.add('js-showing');
    videoPage.play();
}, 6000);
videoPage.addEventListener("ended", function() {
    thumbPage.classList.add('js-hidden');
    videoPage.classList.add('js-showing');
    thumbPage.classList.add('js-showing');
    videoPage.style.display = 'none';
})