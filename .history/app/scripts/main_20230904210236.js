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
    // input nó sẽ lấy giá trị hiện tại mỗi khi chúng ta gõ
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
        let filter = e.target.value;
        filter = filter.toLowerCase().replace(/\b\s+/g, "");

        [...items].forEach((item) => {
            const text = item.textContent;
            const textLower = text.toLowerCase().replace(/\s+/g, "");
            const index = textLower.indexOf(filter);

            if (index >= 0) {
                const matchedText = text.substring(
                    index,
                    index + filter.length
                );
                const highlightedText = `<span class="primary">${matchedText}</span>`;
                let newText = text;
            if (filter.match(/\s+/g)) {
                newText = text.replace(matchedText, highlightedText);
            }
                

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
});
