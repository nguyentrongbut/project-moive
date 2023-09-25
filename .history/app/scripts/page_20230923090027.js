const thumbPage = document.querySelector(".page__thumb");
const videoPage = document.querySelector(".page__video--auto");
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
window.addEventListener("beforeunload", function (event) {
    // Thực hiện công việc bạn muốn khi tải lại trang
    // Ví dụ: Lưu dữ liệu, xác nhận rời khỏi trang, vv.
    
    // Chú ý: Sự kiện này có thể yêu cầu trình duyệt hiển thị một thông báo mặc định
    // để ngăn người dùng rời khỏi trang. Bạn có thể tạo một thông báo tùy chỉnh
    // bằng cách trả về một chuỗi.
    event.returnValue = "Bạn có chắc chắn muốn rời khỏi trang?";
});
