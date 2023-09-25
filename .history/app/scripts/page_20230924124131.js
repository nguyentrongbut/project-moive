const thumbPage = document.querySelector(".page__thumb");
const videoPage = document.querySelector(".page__video--auto");
const audioPage = document.querySelector(".page__audio--open");
const mutedPage = document.querySelector(".page__audio--close");
const descPage = document.querySelector(".page__desc");
const btnMorePage = document.querySelector(".page__desc--btn");
const morePage = document.querySelector(".page__desc--morebtn");
const iconPage = document.querySelector(".page__desc--arrow i");
const computedStyle = window.getComputedStyle(descPage);
const displayValue = computedStyle.getPropertyValue("display");

setTimeout(function () {
    thumbPage.classList.add("js-hidden");
    videoPage.classList.remove("js-hidden");
    videoPage.classList.add("js-showing");
    mutedPage.style.display = "flex";
    videoPage.muted = true;
    videoPage.play();
}, 4000);
videoPage.addEventListener("ended", function () {
    thumbPage.classList.remove("js-hidden");
    videoPage.classList.remove("js-showing");
    thumbPage.classList.add("js-showing");
    videoPage.classList.add("js-hidden");
    audioPage.style.display = "none";
    mutedPage.style.display = "none";
});

mutedPage.addEventListener("click", handleClickMuted);
function handleClickMuted() {
    mutedPage.style.display = "none";
    audioPage.style.display = "flex";
    videoPage.muted = false;
}
audioPage.addEventListener("click", handleClickAudio);
function handleClickAudio() {
    audioPage.style.display = "none";
    mutedPage.style.display = "flex";
    videoPage.muted = true;
}

if (displayValue === "display: -webkit-box;") {
    morePage.textContent = "More";
    iconPage.classList.add("fa-angle-down");
}

// Khai báo một biến để theo dõi trạng thái nút "More"
let isExpanded = false;

btnMorePage.addEventListener("click", handleClickMore);

function handleClickMore() {
    if (isExpanded) {
        // Khi nút "More" đã được mở rộng, thực hiện hành động ẩn nội dung
        descPage.style.display = "-webkit-box";
        morePage.textContent = "More";
        iconPage.classList.add("fa-angle-down");
        isExpanded = false;
    } else {
        // Khi nút "More" chưa được mở rộng, thực hiện hành động hiển thị nội dung
        descPage.style.display = "inline-block";
        morePage.textContent = "Collapse";
        iconPage.classList.add("fa-angle-up");
        isExpanded = true;
    }
}