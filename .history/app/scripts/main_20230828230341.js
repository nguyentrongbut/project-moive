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
            a.className = "header__item--link";
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
// click event search
const search = document.querySelector(".header__search");
const inputHeader = document.querySelector(".header__input");
const hotSearchs = document.querySelector(".header__lists");
const overlayHeader = document.querySelector(".header__search--overlay"); 
inputHeader.addEventListener("click", (e) => {
    hotSearchs.classList.toggle("js-show");
    overlayHeader.classList.toggle("js-show");
});

hotSearchs.addEventListener("click", (e) => {
    e.stopPropagation();
})
document.addEventListener("click", (e) => {
    if (!search.contains(e.target) && ) {
        hotSearchs.classList.remove("js-show");
        overlayHeader.classList.remove("js-show");
    }
})