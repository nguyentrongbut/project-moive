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
const searchInput = document.getElementById("searchInput");
const suggestionList = document.getElementById("suggestionList");

searchInput.addEventListener("input", function () {
    const searchTerm = searchInput.value.trim();

    // Gửi yêu cầu tìm kiếm đến máy chủ, ví dụ sử dụng fetch hoặc XMLHttpRequest
    // Sau khi nhận được kết quả, hiển thị danh sách gợi ý

    // Ví dụ sử dụng fetch:
    fetch(`https://api.example.com/search?q=${searchTerm}`)
        .then((response) => response.json())
        .then((data) => {
            // Xóa danh sách gợi ý hiện tại
            suggestionList.innerHTML = "";

            // Hiển thị kết quả tương tự trong danh sách gợi ý
            data.results.forEach((result) => {
                const listItem = document.createElement("li");
                listItem.textContent = result.title;

                // Tạo sự kiện khi một gợi ý được chọn
                listItem.addEventListener("click", function () {
                    searchInput.value = result.title;
                    suggestionList.innerHTML = ""; // Ẩn danh sách gợi ý
                });

                suggestionList.appendChild(listItem);
            });
        })
        .catch((error) => {
            console.error("Lỗi khi tìm kiếm:", error);
        });
});
