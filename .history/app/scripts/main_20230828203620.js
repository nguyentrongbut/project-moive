const apiUrl = "https://jsonplaceholder.typicode.com/photos";

async function fetchDataAndRender() {
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        // Lọc ra các đối tượng có albumId là 1
        const filteredData = data.filter((item) => item.albumId === 1);
        // Lấy trường title của đối tượng và đưa vào biến titles
        const titles = filteredData.map((item) => item.title);

        const titleList = document.querySelector(".header__hotSearch");

        titles.forEach((title) => {
            // const li = document.createElement("a");
            // li.textContent = title;
            // li.href= "#!";
            // titleList.appendChild(li);
            let templateHotsearch = "";
            templateHotsearch += `
            <li class="header__hotSearch">
                <a class="header__item--link" href="${item.href}">${item.title}</a>
            </li>
        `;
        });
    } catch (error) {
        console.error("Lỗi khi gọi API:", error);
    }
}

fetchDataAndRender();
