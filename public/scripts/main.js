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

const apiUrl = "https://api.themoviedb.org/3/movie/top_rated?api_key=a98fd8b296eaf9924a5460d5ae4c8040";
async function fetchDataAndRender() {
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    const titles = data.results.map(item => item.title);
    titles.forEach(title => {
      // Thêm vào danh sách header__lists--data
      const hotSearchlist = document.querySelector(".header__lists--data");
      const li = document.createElement("li");
      li.className = "header__searchs";
      const a = document.createElement("a");
      a.className = "header__searchs--link";
      a.textContent = title;
      a.href = "#!";
      li.appendChild(a);
      hotSearchlist.appendChild(li);

      // Thêm vào danh sách header__lists (nếu cần)
      if (titles.indexOf(title) < 9) {
        const hotSearch = document.querySelector(".header__lists");
        const li = document.createElement("li");
        li.className = "header__hotSearch";
        const a = document.createElement("a");
        a.className = "header__hotSearch--link";
        a.textContent = title;
        a.href = "#!";
        li.appendChild(a);
        hotSearch.appendChild(li);
      }
    });
  } catch (error) {
    console.error("Lỗi khi gọi API:", error);
  }
}
fetchDataAndRender();

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
                <input type="text" placeholder=" "/>
                <label for="text">Email</label>
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
inputHeader.addEventListener("focus", e => {
  hotsSearch.classList.add("js-show");
  overlayHeader.classList.add("js-show");
});
document.addEventListener("click", e => {
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
  const continueLogin = document.querySelector(".card__continue");
  // const headerActive = document.querySelectorAll(".header__item--link");
  // // ACTIVE LINK
  // [...headerActive].forEach(item => item.addEventListener("click", handleActiveClick));
  // function handleActiveClick (e) {
  //     [...headerActive].forEach(item => item.classList.remove("activeLink"));
  //     e.target.classList.add("activeLink");
  // }

  // HIGHLIGHT SEARCH AND NO SPACE
  input.addEventListener("input", function (e) {
    handleSearch(e);
    handleHighlight(e);
    searchListsMoive(e);
    hiddenLiNone(e);
    deleteString();
  });

  // default space
  input.addEventListener("keydown", e => {
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
    input.addEventListener("focus", e => {
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
  function handleSearch(e) {
    let filter = e.target.value;
    filter = filter.toLowerCase().replace(/\s+/g, "");
    [...items].forEach(item => {
      const text = item.textContent;
      const textLower = text.toLowerCase().replace(/\s+/g, "");
      const index = textLower.indexOf(filter);
      if (index >= 0) {
        let newText = text;
        const matchedText = text.substring(index, index + filter.length);

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
    [...items].forEach(item => {
      const text = item.textContent;
      if (text.includes(filter)) {
        const highlightedText = text.replace(filter, `<span class="primary">${filter}</span>`);
        item.innerHTML = highlightedText;
      }
    });
  }
  function hiddenLiNone(e) {
    const allHidden = Array.from(searchLi).every(item => {
      return item.style.display === "none";
    });
    if (allHidden) {
      searchList.classList.remove("js-show");
      hotsSearch.classList.add("js-show");
    }
  }

  // click btn remove input when enter
  function deleteString() {
    btnDelete.addEventListener("click", e => {
      input.value = "";
      btnDelete.classList.remove("js-show");
      searchList.classList.remove("js-show");
      if (overlayHeader.classList.contains("js-show")) {
        hotsSearch.classList.add("js-show");
      }
    });
  }

  // HEADER COLOR CHANGE
  window.addEventListener("scroll", debounceFn(function (e) {
    const scrollY = window.pageYOffset;
    if (scrollY >= 200) {
      // header && header.classList.add("is-fixed");
      header.style.backgroundColor = "rgb(10, 12, 15)";
    } else {
      // header && header.classList.remove("is-fixed");
      header.style.removeProperty("background-color");
    }
  }, 100));

  // LOGIN
  login.addEventListener("click", function () {
    header.insertAdjacentHTML("afterend", loginTemplate);
    document.body.classList.add("hidden-scroll");
    const formLogin = document.querySelector(".modalLogin__form");
    const emailInput = document.querySelector(".modalLogin__input--email input");
    const passwordInput = document.querySelector(".modalLogin__input--password input");
    const emailError = document.querySelector(".modalLogin__email--error");
    const emailError2 = document.querySelector(".modalLogin__email--error2");
    const passwordError = document.querySelector(".modalLogin__password--error");
    emailInput.addEventListener("input", function (e) {
      if (e.target.value) {
        emailError.classList.remove("js-show");
        emailError2.classList.remove("js-show");
      }
    });
    passwordInput.addEventListener("input", function (e) {
      if (e.target.value) {
        passwordError.classList.remove("js-show");
      }
    });
    emailInput.addEventListener("blur", function () {
      emailChecking();
      // const valuePassword = passwordInput.value;
      // if (!valuePassword) {
      //     passwordError.classList.add("js-show");
      // }
    });

    function emailChecking() {
      const value = emailInput.value;
      const regexEmail = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (!regexEmail.test(value.trim())) {
        emailError2.classList.add("js-show");
      } else {
        emailError2.classList.remove("js-show");
      }
      if (!value) {
        emailError.classList.add("js-show");
        emailError2.classList.remove("js-show");
      } else {
        emailError.classList.remove("js-show");
      }
    }
    function passwordChecking() {
      const valuePassword = passwordInput.value;
      if (!valuePassword) {
        passwordError.classList.add("js-show");
      }
    }
    formLogin.addEventListener("submit", function (e) {
      e.preventDefault();
      emailChecking();
      passwordChecking();
    });
  });
  document.body.addEventListener("click", function (e) {
    if (e.target.matches(".modal-close")) {
      const modal = e.target.parentNode.parentNode;
      modal.parentNode.removeChild(modal);
      document.body.classList.remove("hidden-scroll");
    }
  });

  //
  function moveToNextSlide() {
    let lists = document.querySelectorAll(".slider__item");
    document.querySelector(".slider").appendChild(lists[0]);
  }
  function moveToPreviousSlide() {
    let lists = document.querySelectorAll(".slider__item");
    document.querySelector(".slider").prepend(lists[lists.length - 1]);
  }

  // Thiết lập thời gian tự động chuyển slide (ví dụ: sau mỗi 5 giây)
  let interval = setInterval(moveToNextSlide, 6000);

  // Khi click vào nút 'Next', chuyển slide và đặt lại thời gian tự động
  document.querySelector(".slider__next").onclick = function () {
    moveToNextSlide();
    clearInterval(interval); // Đặt lại thời gian tự động
    interval = setInterval(moveToNextSlide, 6000); // Bắt đầu lại thời gian tự động
  };

  // Tương tự cho nút 'Previous'
  document.querySelector(".slider__prev").onclick = function () {
    moveToPreviousSlide();
    clearInterval(interval);
    interval = setInterval(moveToNextSlide, 6000);
  };
  const sliders = document.querySelectorAll(".movies__wrapper");
  const nextBtns = document.querySelectorAll(".movies__btn-next");
  const prevBtns = document.querySelectorAll(".movies__btn-prev");
  sliders.forEach((slider, i) => {
    const nextBtn = nextBtns[i];
    const prevBtn = prevBtns[i];
    let containerDimensions = slider.getBoundingClientRect();
    let containerWidth = containerDimensions.width;
    let contentWidth = slider.scrollWidth;

    // Tạo một biến để theo dõi trạng thái hiện tại của nút next và prev
    let isNextBtnHidden = false;
    let isPrevBtnHidden = false;

    // Kiểm tra và ẩn/hiện nút next và prev ban đầu
    updateButtonVisibility();
    slider.addEventListener("scroll", () => {
      let scrollLeft = slider.scrollLeft;

      // Kiểm tra và ẩn/hiện nút next và prev dựa trên vị trí cuộn
      updateButtonVisibility();
    });
    nextBtn.addEventListener("click", () => {
      slider.scrollLeft += containerWidth;
    });
    prevBtn.addEventListener("click", () => {
      slider.scrollLeft -= containerWidth;
    });

    // Hàm để cập nhật trạng thái ẩn/hiện của nút next và prev
    function updateButtonVisibility() {
      if (slider.scrollLeft === 0) {
        isPrevBtnHidden = true;
        prevBtn.style.display = "none";
      } else if (isPrevBtnHidden) {
        isPrevBtnHidden = false;
        prevBtn.style.display = "block";
      }
      if (slider.scrollLeft + containerWidth >= contentWidth) {
        isNextBtnHidden = true;
        nextBtn.style.display = "none";
      } else if (isNextBtnHidden) {
        isNextBtnHidden = false;
        nextBtn.style.display = "block";
      }
    }
  });
});