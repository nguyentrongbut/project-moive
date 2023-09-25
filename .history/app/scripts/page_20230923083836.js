const thumbPage = document.querySelector(".page__thumb");
const videoPage = document.querySelector(".page__video--auto");

// Kiểm tra xem video đã hoàn thành hay chưa
const isVideoEnded = videoPage.ended;

// Kiểm tra xem video có trong trạng thái tạm dừng không
const isVideoPaused = videoPage.paused;

if (isVideoEnded || isVideoPaused) {
    setTimeout(function() {
        thumbPage.classList.add('js-hidden');
        videoPage.classList.remove('js-hidden');
        videoPage.classList.add('js-showing');
        videoPage.play();
    }, 6000);
}

videoPage.addEventListener("ended", function() {
    thumbPage.classList.remove('js-hidden');
    videoPage.classList.remove('js-showing');
    thumbPage.classList.add('js-showing');
    videoPage.classList.add('js-hidden');
});
