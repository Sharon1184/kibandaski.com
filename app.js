// Toggle sidebar on mobile
const mobile = document.querySelector('.menu-toggle');
const mobileLink = document.querySelector('.sidebar');

mobile.addEventListener("click", function () {
    mobile.classList.toggle("is-active");
    mobileLink.classList.toggle("active");
});

mobileLink.addEventListener("click", function () {
    const menuBars = document.querySelector(".is-active");
    if (window.innerWidth <= 768 && menuBars) {
        mobile.classList.toggle("is-active");
        mobileLink.classList.toggle("active");
    }
});

// Scroll step values
const step = 100;
const stepfilter = 60;
const scrolling = true;

// DOM elements for menu scroll
const backMenus = document.querySelector(".back-menus");
const nextMenus = document.querySelector(".next-menus");
const filterWrapper = document.querySelector(".filter-wrapper");

// Scroll left on click for Menu Categories
backMenus.addEventListener("click", function (e) {
    e.preventDefault();
    filterWrapper.scrollBy({
        left: -stepfilter,
        behavior: "smooth"
    });
});

nextMenus.addEventListener("click", function (e) {
    e.preventDefault();
    filterWrapper.scrollBy({
        left: stepfilter,
        behavior: "smooth"
    });
});

// Scroll for Recommendations
const backHighlight = document.querySelector(".back");
const nextHighlight = document.querySelector(".next");
const highlightWrapper = document.querySelector(".highlight-wrapper");

backHighlight.addEventListener("click", function (e) {
    e.preventDefault();
    highlightWrapper.scrollBy({
        left: -step,
        behavior: "smooth"
    });
});

nextHighlight.addEventListener("click", function (e) {
    e.preventDefault();
    highlightWrapper.scrollBy({
        left: step,
        behavior: "smooth"
    });
});
