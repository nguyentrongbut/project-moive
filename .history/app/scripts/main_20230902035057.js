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
    const input = this.document.querySelector(".header__input");
    const items = this.document.querySelectorAll(".header_");
    input.addEventListener("input", handleHighlight);

    function handleHighlight(e) {
        let filter = e.target.value;
        filter = filter.toLowerCase();

        const keywords = filter.split(" "); // Tách chuỗi thành các từ

        [...items].forEach((item) => {
            const text = item.textContent;
            let shouldHighlight = true; // Xác định xem có nên tô sáng item hay không

            // Kiểm tra mỗi từ khóa
            keywords.forEach((keyword) => {
                if (!text.toLowerCase().includes(keyword)) {
                    shouldHighlight = false;
                }
            });

            if (shouldHighlight) {
                const highlightedText = text.replace(
                    new RegExp(keywords.join("|"), "gi"),
                    (match) => `<span class="primary">${match}</span>`
                );
                item.innerHTML = highlightedText;
            } else {
                item.innerHTML = text;
            }
        });
    }
});
