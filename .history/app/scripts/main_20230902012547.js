// call api hotSearch
const apiUrl = "https://jsonplaceholder.typicode.com/photos";

async function fetchDataAndRender() {
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        // Lọc ra các đối tượng có albumId là 1
        const filteredData = data.filter((item) => item.albumId === 1).slice(0,9);
        // Lấy trường title của đối tượng và đưa vào biến titles
        const titles = filteredData.map((item) => item.title);

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
            hotSearchlist.appendChild(li)
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
})

window.addEventListener("load", function () {
    const input = document.querySelector(".header__input");
    const items = document.querySelectorAll(".header__hotSearch--link");
    
    input.addEventListener("input", handleHighlight);
    
    function handleHighlight(e) {
        let filter = e.target.value;
        filter = filter.trim().toLowerCase();

        // Tạo một mảng mới để lưu trữ các phần tử đã được sắp xếp
        const sortedItems = [];

        // Sắp xếp lại danh sách các phần tử dựa trên kết quả tìm kiếm
        items.forEach((item) => {
            const text = item.textContent.toLowerCase();

            if (text.includes(filter)) {
                const highlightedText = text.replace(filter, `<span class="primary">${filter}</span>`);
                item.innerHTML = highlightedText;
                sortedItems.unshift(item); // Đưa phần tử chứa từ khóa lên đầu danh sách
            } else {
                item.style.display = "none"; // Ẩn các phần tử không liên quan
            }
        });

        // Hiển thị lại danh sách các phần tử đã được sắp xếp
        const hotSearchContainer = document.querySelector(".header__hotSearch");
        hotSearchContainer.innerHTML = ""; // Xóa nội dung hiện tại của container

        sortedItems.forEach((item) => {
            hotSearchContainer.appendChild(item);
            item.style.display = "block";
        });
    }
});
