// // Khai báo hàm callback để xử lý dữ liệu
// const apiUrl =
//     "http://api.kyoku.id.vn/movies";
// function handleData(data) {
//     const titles = data.results.map((item) => item.title);

//     titles.forEach((title) => {
//         const hotSearchlist = document.querySelector(".header__lists--data");
//         const li = document.createElement("li");
//         li.className = "header__searchs";
//         const a = document.createElement("a");
//         a.className = "header__searchs--link";
//         a.textContent = title;
//         a.href = "#!";
//         li.appendChild(a);
//         hotSearchlist.appendChild(li);
//     });
// }

// // Tạo một thẻ script để gọi API bằng JSONP
// function fetchDataAndRender() {
//     const script = document.createElement('script');
//     script.src = `${apiUrl}?callback=handleData`;
//     document.body.appendChild(script);
// }

// // Gọi hàm fetchDataAndRender để tải dữ liệu
// fetchDataAndRender();

// call api hotSearch
const apiUrl =
    "https://api.themoviedb.org/3/movie/top_rated?api_key=a98fd8b296eaf9924a5460d5ae4c8040";

async function fetchDataAndRender() {
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        // Lấy trường title của đối tượng và đưa vào biến titles
        const titles = data.results.map((item) => item.title);

        titles.forEach((title) => {
            // const li = document.createElement("a");
            // li.textContent = title;
            // li.href= "#!";
            // titleList.appendChild(li);
            const hotSearchlist = document.querySelector(
                ".header__lists--data"
            );
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
        const titles = data.results.map((item) => item.title).slice(0, 9);

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

// debounceFn scroll
function debounceFn(func, wait, immediate) {
    let timeout;
    return function () {
        let context = this,
            args = arguments;
        let later = function () {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        let callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}
// hide and display list search
const header = document.querySelector(".header");
const search = document.querySelector(".header__search");
const inputHeader = document.querySelector(".header__input");
const hotsSearch = document.querySelector(".header__lists");
const searchList = document.querySelector(".header__lists--data");
const overlayHeader = document.querySelector(".header__overlay");
const btnDelete = document.querySelector(".header__search--delete");
const login = document.querySelector(".header__login");
const loginTemplate = `<div class="modal">
<div class="modalLogin">
    <p class="modalLogin__title">Log in</p>
    <form class="modalLogin__form" action="">
        <div class="modalLogin__wrapper">
            <div class="modalLogin__input--email">
                <input type="email" placeholder=" " required />
                <label for="email">Email</label>
            </div>
        </div>
        <span class="modalLogin__email--error"
            >Enter email address</span
        ><span class="modalLogin__email--error2"
            >Enter format error</span
        >
        <div class="modalLogin__wrapper">
            <div class="modalLogin__input--password">
                <input type="password" placeholder=" " />
                <label for="password">Password</label>
            </div>
        </div>
        <span class="modalLogin__password--error"
            >Enter password</span
        >
        <button class="modalLogin__btn">Login</button>
    </form>
    <div class="modalLogin__forgotPassword">Forgot password</div>
    <div class="modalLogin__desc">
        <p>Don't have an account yet?</p>
        <p class="modalLogin__SignUp">Sign Up</p>
    </div>
    <i class="fa fa-times modal-close"></i>
</div>
</div>`;
inputHeader.addEventListener("focus", (e) => {
    hotsSearch.classList.add("js-show");
    overlayHeader.classList.add("js-show");
});

document.addEventListener("click", (e) => {
    if (!search.contains(e.target) && !header.contains(e.target)) {
        hotsSearch.classList.remove("js-show");
        searchList.classList.remove("js-show");
        overlayHeader.classList.remove("js-show");
    }
});

window.addEventListener("load", function () {
    const input = document.querySelector(".header__input");
    const items = document.querySelectorAll(".header__searchs--link");
    const searchLi = document.querySelectorAll(".header__searchs");
    const hotsSearch = document.querySelector(".header__lists");
    const searchList = document.querySelector(".header__lists--data");
    const emailInput = document.querySelector(".modalLogin__input--email input")

    // HIGHLIGHT SEARCH AND NO SPACE
    input.addEventListener("input", function (e) {
        handleSearch(e);
        handleHighlight(e);
        searchListsMoive(e);
        hiddenLiNone(e);
        deleteString();
    });

    // default space
    input.addEventListener("keydown", (e) => {
        const filter = e.target.value;
        if (filter.length === 0 && e.key === " ") {
            e.preventDefault();
        }
    });

    function searchListsMoive(e) {
        filter = e.target.value;
        if (filter === "") {
            hotsSearch.classList.add("js-show");
            searchList.classList.remove("js-show");
            btnDelete.classList.remove("js-show");
        } else {
            hotsSearch.classList.remove("js-show");
            searchList.classList.add("js-show");
            btnDelete.classList.add("js-show");
        }
        input.addEventListener("focus", (e) => {
            if (filter !== "") {
                hotsSearch.classList.remove("js-show");
                searchList.classList.add("js-show");
                hiddenLiNone(e);
            }
            if (!btnDelete.classList.contains("js-show")) {
                hotsSearch.classList.add("js-show");
                searchList.classList.remove("js-show");
            }
        });
    }
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

    // search no space and don't highlight search
    function handleSearch(e) {
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

    // highlight
    function handleHighlight(e) {
        let filter = e.target.value;
        [...items].forEach((item) => {
            const text = item.textContent;
            if (text.includes(filter)) {
                const highlightedText = text.replace(
                    filter,
                    `<span class="primary">${filter}</span>`
                );
                item.innerHTML = highlightedText;
            }
        });
    }

    function hiddenLiNone(e) {
        const allHidden = Array.from(searchLi).every((item) => {
            return item.style.display === "none";
        });
        if (allHidden) {
            searchList.classList.remove("js-show");
            hotsSearch.classList.add("js-show");
        }
    }

    // click btn remove input when enter
    function deleteString() {
        btnDelete.addEventListener("click", (e) => {
            input.value = "";
            btnDelete.classList.remove("js-show");
            searchList.classList.remove("js-show");
            if (overlayHeader.classList.contains("js-show")) {
                hotsSearch.classList.add("js-show");
            }
        });
    }

    // HEADER COLOR CHANGE
    window.addEventListener(
        "scroll",
        debounceFn(function (e) {
            const scrollY = window.pageYOffset;
            if (scrollY >= 200) {
                // header && header.classList.add("is-fixed");
                header.style.backgroundColor = "rgb(10, 12, 15)";
            } else {
                // header && header.classList.remove("is-fixed");
                header.style.removeProperty("background-color");
            }
        }, 100)
    );

    // LOGIN
    login.addEventListener("click", function () {
        header.insertAdjacentHTML("afterend", loginTemplate);
    });
    document.body.addEventListener("click", function (e) {
        if (e.target.matches(".modal-close")) {
            const modal = e.target.parentNode.parentNode;
            modal.parentNode.removeChild(modal);
        }
    });
    emailInput.addEventListener("input", function(e) {
        email= e.target.value;
    })
});
