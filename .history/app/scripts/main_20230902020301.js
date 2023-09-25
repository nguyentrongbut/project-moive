// call api hotSearch
// const apiUrl = "https://jsonplaceholder.typicode.com/photos";

// async function fetchDataAndRender() {
//     try {
//         const response = await fetch(apiUrl);
//         const data = await response.json();

//         // Lọc ra các đối tượng có albumId là 1
//         const filteredData = data.filter((item) => item.albumId === 1).slice(0,9);
//         // Lấy trường title của đối tượng và đưa vào biến titles
//         const titles = filteredData.map((item) => item.title);

//         const titleList = document.querySelector(".header__hotSearch");

//         titles.forEach((title) => {
//             // const li = document.createElement("a");
//             // li.textContent = title;
//             // li.href= "#!";
//             // titleList.appendChild(li);
//             const hotSearchlist = document.querySelector(".header__lists");
//             const li = document.createElement("li");
//             li.className = "header__hotSearch";
//             const a = document.createElement("a");
//             a.className = "header__hotSearch--link";
//             a.textContent = title;
//             a.href = "#!";
//             li.appendChild(a);
//             hotSearchlist.appendChild(li)
//         });
//     } catch (error) {
//         console.error("Lỗi khi gọi API:", error);
//     }
// }
// fetchDataAndRender();
const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhOThmZDhiMjk2ZWFmOTkyNGE1NDYwZDVhZTRjODA0MCIsInN1YiI6IjY0ZWMwMTczMDZmOTg0MDEwYzcwN2FiMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.vzsfxxlGG3AFU90R55mHqKqta5g1Rv8pXZYt62EowwE'
    }
  };
  
  fetch('https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1', options)
    .then(response => response.json())
    .then(response => console.log(response))
    .catch(err => console.error(err));

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


