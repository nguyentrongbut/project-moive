const thumbPage = document.querySelector(".page__thumb");
const videoPage = document.querySelector(".page__video--auto");
setTimeout(function() {
    thumbPage.classList;
    videoPage.style.display = 'block';
    videoPage.play();
}, 6000);
videoPage.addEventListener("ended", function() {
    thumbPage.style.display = 'block';
    videoPage.style.display = 'none';
})