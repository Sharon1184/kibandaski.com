import { initializeApp } from "https://www.gstatic.com/firebasejs/11.8.1/firebase-app.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/11.8.1/firebase-firestore.js";

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyAHhmbgDA_D13LcnEWgtr5Unu7uihBpGPE",
  authDomain: "food-ae7ff.firebaseapp.com",
  projectId: "food-ae7ff",
  storageBucket: "food-ae7ff.appspot.com",
  messagingSenderId: "1058214228504",
  appId: "1:1058214228504:web:f1f059be00c9aeaf7cc96d"
};

// Initialize Firebase and Firestore
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const menuWrapper = document.getElementById("menu-wrapper");

// Fetch and group food items by restaurant
async function loadFoodsByRestaurant() {
  const querySnapshot = await getDocs(collection(db, "foods"));
  const restaurantMap = {};

  querySnapshot.forEach((doc) => {
    const food = doc.data();
    const restaurantName = food.restaurant || "Unknown Restaurant";

    if (!restaurantMap[restaurantName]) {
      restaurantMap[restaurantName] = [];
    }
    restaurantMap[restaurantName].push(food);
  });

  for (const [restaurant, foods] of Object.entries(restaurantMap)) {
    // Create and append restaurant title
    const title = document.createElement("h3");
    title.textContent = restaurant;
    title.classList.add("restaurant-title"); // You can style this in CSS
    menuWrapper.appendChild(title);

    // Create a container for the restaurant's foods
    const restaurantContainer = document.createElement("div");
    restaurantContainer.classList.add("restaurant-menu");

    // Add food cards
    foods.forEach((food) => {
      const card = document.createElement("div");
      card.classList.add("detail-card");
      card.innerHTML = `
        <img class="detail-img" src="${food.imageUrl}" alt="${food.name}">
        <div class="detail-desc">
          <div class="detail-name">
            <h4>${food.name}</h4>
            <p class="detail-sub">${food.description}</p>
            <p class="price">Ksh. ${food.price}</p>
          </div>
          <ion-icon class="detail-favourite" name="bookmark-outline"></ion-icon>
        </div>
      `;
      restaurantContainer.appendChild(card);
    });

    menuWrapper.appendChild(restaurantContainer);
  }
}

loadFoodsByRestaurant();

// Sidebar toggle on mobile
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

// Scroll for Menu Categories
const backMenus = document.querySelector(".back-menus");
const nextMenus = document.querySelector(".next-menus");
const filterWrapper = document.querySelector(".filter-wrapper");

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
