// call api hotSearch
const apiUrl =
    "https://api.themoviedb.org/3/movie/top_rated?api_key=a98fd8b296eaf9924a5460d5ae4c8040";

async function fetchDataAndRender() {
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        // Lọc ra các đối tượng có albumId là 1
        // Lấy trường title của đối tượng và đưa vào biến titles
        const titles = data.results.map((item) => item.title);

        titles.forEach((title) => {
            // const li = document.createElement("a");
            // li.textContent = title;
            // li.href= "#!";
            // titleList.appendChild(li);
            const hotSearchlist = document.querySelector(".header__lists--data");
            const li = document.createElement("li");
            li.className = "header__searchs";
            const a = document.createElement("a");
            a.className = "header__searchs--link";
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

// call api hotSearch

async function fetchDataAndRenderH() {
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        // Lấy trường title của đối tượng và đưa vào biến titles
        const titles = data.results.map((item) => item.title).slice(0,9);

        titles.forEach((title) => {
            // const li = document.createElement("a");
            // li.textContent = title;
            // li.href= "#!";
            // titleList.appendChild(li);
            const hotSearch = document.querySelector(".header__lists");
            const li = document.createElement("li");
            li.className = "header__hotSearch";
            const a = document.createElement("a");
            a.className = "header__hotSearch--link";
            a.textContent = title;
            a.href = "#!";
            li.appendChild(a);
            hotSearch.appendChild(li);
        });
    } catch (error) {
        console.error("Lỗi khi gọi API:", error);
    }
}
fetchDataAndRenderH();

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

// highlight search and no space

window.addEventListener("load", function () {
    const input = document.querySelector(".header__input");
    const items = document.querySelectorAll(".header__searchs--link");
    input.addEventListener("input", function(e) {
        handleHighlight(e);
        handleSearch(e);
        searchListsMoive
    });

    function searchListsMoive (e) {
        filter = e.target.value;
        if (filter === "") {

        } else 
    }
    function capitalizeFirstLetter(string) {
        const words = string.split(" ");
        const capitalizedWords = words.map(word => {
            if (word.length > 0) {
                return word.charAt(0).toUpperCase() + word.slice(1);
            } else {
                return word;
            }
        });
        const result = capitalizedWords.join(" ");
        return result;
    }

// search no space and don't highlight search
    function handleHighlight(e) {
        let filter = e.target.value;
        filter = filter.toLowerCase().replace(/\s+/g, "");
        [...items].forEach((item) => {
            const text = item.textContent;
            const textLower = text.toLowerCase().replace(/\s+/g, "");
            const index = textLower.indexOf(filter);
            if (index >= 0) {
                let newText = text;
                const matchedText = text.substring(
                    index,
                    index + filter.length
                );
                
                // Sử dụng hàm capitalizeFirstLetter để viết hoa chữ cái đầu tiên
                const capitalizedText = capitalizeFirstLetter(newText);

                // Cập nhật nội dung của item và hiển thị
                item.innerHTML = capitalizedText;
                item.parentNode.style.display = "block";
            } else {
                item.parentNode.style.display = "none";
            }
        });
    }

// highlight search
    function handleSearch (e) {
        let filter = e.target.value;
                [...items].forEach((item) => {
                    const text = item.textContent;
                    if (text.includes(filter)) {
                        const highlightedText = text.replace(filter, `<span class="primary">${filter}</span>`);
                        item.innerHTML = highlightedText;
                    }
                });
            }
    }
);
