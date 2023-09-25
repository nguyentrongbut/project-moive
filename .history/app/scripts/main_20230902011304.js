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

const searchInput = document.querySelector(".header__input");
const itemList = document.querySelectorAll(".header__hotSearch--link");

// Lắng nghe sự kiện khi người dùng nhập vào ô tìm kiếm
searchInput.addEventListener("input", function () {
    const searchValue = searchInput.value.toLowerCase(); // Lấy giá trị tìm kiếm và chuyển thành chữ thường

    // Lặp qua từng phần tử trong danh sách
    Array.from(itemList.children).forEach(item => {
        const itemName = item.textContent.toLowerCase(); // Lấy nội dung của phần tử và chuyển thành chữ thường
        if (itemName.includes(searchValue)) {
            // Nếu nội dung phần tử chứa từ khóa tìm kiếm, hiển thị nó
            item.style.display = "block";
        } else {
            // Ngược lại, ẩn nó đi
            item.style.display = "none";
        }
    });
});