const thumbPage = document.querySelector(".page__thumb");
const videoPage = document.querySelector(".page__video--auto");
setTimeout(function() {
    thumbPage.classList.add('js-none');
    videoPage.style.display = 'no'
    videoPage.autoplay = true;
}, 6000);