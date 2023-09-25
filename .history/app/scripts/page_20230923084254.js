let isAutoPlayStarted = false;


// Kiểm tra xem video đã hoàn thành hay chưa
const isVideoEnded = videoPage.ended;

// Kiểm tra xem video có trong trạng thái tạm dừng không
const isVideoPaused = videoPage.paused;

if (isVideoEnded || (isVideoPaused && !isAutoPlayStarted)) {
    setTimeout(function() {
        thumbPage.classList.add('js-hidden');
        videoPage.classList.remove('js-hidden');
        videoPage.classList.add('js-showing');
        videoPage.play();
        isAutoPlayStarted = true; // Đánh dấu rằng video đã được tự động phát lại
    }, 6000);
}

videoPage.addEventListener("ended", function() {
    thumbPage.classList.remove('js-hidden');
    videoPage.classList.remove('js-showing');
    thumbPage.classList.add('js-showing');
    videoPage.classList.add('js-hidden');
});



