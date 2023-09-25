const thumbPage = document.querySelector(".page__thumb");
const videoPage = document.querySelector(".page__video--auto");

// Kiểm tra xem trang đã tải lại hay chưa
const isReloaded = localStorage.getItem('isReloaded');

if (isReloaded) {
    const isVideoPlaying = localStorage.getItem('isVideoPlaying');

    if (isVideoPlaying === 'true') {
        thumbPage.classList.add('js-hidden');
        videoPage.classList.remove('js-hidden');
        videoPage.classList.add('js-showing');
        videoPage.play();
    }
}

// Lưu trạng thái trang
localStorage.setItem('isReloaded', 'true');

videoPage.addEventListener("ended", function() {
    thumbPage.classList.remove('js-hidden');
    videoPage.classList.remove('js-showing');
    thumbPage.classList.add('js-showing');
    videoPage.classList.add('js-hidden');
});

// Lưu trạng thái video
videoPage.addEventListener("play", function() {
    localStorage.setItem('isVideoPlaying', 'true');
});

videoPage.addEventListener("pause", function() {
    localStorage.setItem('isVideoPlaying', 'false');
});
