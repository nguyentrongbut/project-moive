// call api hotSearch
const apiUrl =
    "https://api.themoviedb.org/3/movie/top_rated?api_key=a98fd8b296eaf9924a5460d5ae4c8040";

async function fetchDataAndRender() {
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        // Lọc ra các đối tượng có albumId là 1
        // Lấy trường title của đối tượng và đưa vào biến titles
        const titles = data.results.map((item) => item.title).slice(0, 9);

        const titleList = document.querySelector(".header__hotSearch");

        titles.forEach((title) => {
            // const li = document.createElement("a");
            // li.textContent = title;
            // li.href= "#!";
            // titleList.appendChild(li);
            const hotSearchlist = document.querySelector(".header__lists");
            const li = document.createElement("li");
            li.className = "header__hotSearch";
            const a = document.createElement("a");
            a.className = "header__hotSearch--link";
            a.textContent = title;
            a.href = "#!";
            li.appendChild(a);
            hotSearchlist.appendChild(li);
        });
    } catch (error) {
        console.error("Lỗi khi gọi API:", error);
    }
}
fetchDataAndRender();
// hide and display list search
const header = document.querySelector(".header");
const search = document.querySelector(".header__search");
const inputHeader = document.querySelector(".header__input");
const hotsSearch = document.querySelector(".header__lists");
const overlayHeader = document.querySelector(".header__search--overlay");
inputHeader.addEventListener("focus", (e) => {
    hotsSearch.classList.add("js-show");
    overlayHeader.classList.add("js-show");
});

document.addEventListener("click", (e) => {
    if (!search.contains(e.target) && !header.contains(e.target)) {
        hotsSearch.classList.remove("js-show");
        overlayHeader.classList.remove("js-show");
    }
});

// highlight search

window.addEventListener("load", function () {
    const input = document.querySelector(".header__input");
    const items = document.querySelectorAll(".header__hotSearch--link");
    input.addEventListener("input", handleHighlight);

    function capitalizeFirstLetter(string) {
        const words = string.split(" ");
        const capitalizedWords = words.map((word) => {
            if (word.length > 0) {
                return word.charAt(0).toUpperCase() + word.slice(1);
            } else {
                return word;
            }
        });
        const result = capitalizedWords.join(" ");
        return result;
    }

    function handleHighlight(e) {
        let filter = e.target.value.trim(); // Bỏ khoảng trắng đầu và cuối chuỗi
        filter = filter.toLowerCase(); // Chuyển thành chữ thường

        if (filter === "") {
            // Nếu không có bất kỳ filter nào, hiển thị tất cả các mục
            [...items].forEach((item) => {
                item.parentNode.style.display = "block";
                item.innerHTML = item.textContent; // Loại bỏ các span hiển thị
            });
            return;
        }

        // Duyệt qua các mục và kiểm tra filter
        [...items].forEach((item) => {
            const text = item.textContent.toLowerCase(); // Chuỗi của mục hiện tại

            // Kiểm tra xem text có chứa filter không
            if (text.includes(filter)) {
                // Highlight filter trong text
                const highlightedText = text.replace(
                    new RegExp(filter, "gi"), // Sử dụng biểu thức chính quy với "gi" để tìm tất cả các trường hợp của filter
                    (match) => `<span class="primary">${match}</span>`
                );

                // Viết hoa chữ cái đầu của mỗi từ
                const capitalizedText = capitalizeFirstLetter(highlightedText);

                // Cập nhật nội dung của item và hiển thị
                item.innerHTML = capitalizedText;
                item.parentNode.style.display = "block";
            } else {
                // Nếu không tìm thấy filter, ẩn item
                item.parentNode.style.display = "none";
            }
        });
    }
});
