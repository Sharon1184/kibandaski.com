import { initializeApp } from "https://www.gstatic.com/firebasejs/11.8.1/firebase-app.js";
import {
  getFirestore,
  collection,
  getDocs
} from "https://www.gstatic.com/firebasejs/11.8.1/firebase-firestore.js";

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyAHhmbgDA_D13LcnEWgtr5Unu7uihBpGPE",
  authDomain: "food-ae7ff.firebaseapp.com",
  projectId: "food-ae7ff",
  storageBucket: "food-ae7ff.appspot.com",
  messagingSenderId: "1058214228504",
  appId: "1:1058214228504:web:f1f059be00c9aeaf7cc96d"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const menuWrapper = document.getElementById("menu-wrapper");
const highlightSlider = document.getElementById("highlightSlider");
let allFoods = [];

// Load all foods
async function loadFoods() {
  const querySnapshot = await getDocs(collection(db, "foods"));
  allFoods = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  displayGroupedFoods(allFoods);
  displayRecommendations(allFoods);
  startAutoRotation(); // Optional: rotate recommendations every 10s
}

// Display Choose Order section
function displayGroupedFoods(foods) {
  const grouped = {};

  foods.forEach(food => {
    const name = food.name.toLowerCase();
    if (!grouped[name]) grouped[name] = [];
    grouped[name].push(food);
  });

  let uniqueFoods = Object.values(grouped).map(group =>
    group[Math.floor(Math.random() * group.length)]
  );

  // Shuffle
  for (let i = uniqueFoods.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [uniqueFoods[i], uniqueFoods[j]] = [uniqueFoods[j], uniqueFoods[i]];
  }

  menuWrapper.innerHTML = "";
  uniqueFoods.forEach(food => {
    const restaurant = food.restaurant || "Unknown Vendor";
    const card = document.createElement("div");
    card.classList.add("detail-card");
    card.innerHTML = `
      <img class="detail-img" src="${food.imageUrl}" alt="${food.name}">
      <div class="detail-desc">
        <div class="detail-name">
          <h4>${food.name}</h4>
          <p class="detail-sub">${food.description}</p>
        </div>
        <p class="price">Ksh. ${food.price}</p>
        <div class="rating">
          <i class="fas fa-star"></i>
          <i class="fas fa-star"></i>
          <i class="fas fa-star"></i>
          <i class="fas fa-star-half-alt"></i>
          <i class="far fa-star"></i>
          <span>4.5</span>
        </div>
        <div class="sold-by">Sold by <a href="restaurant.html?name=${encodeURIComponent(restaurant)}">${restaurant}</a></div>
        <ion-icon class="detail-favourite" name="bookmark-outline"></ion-icon>
      </div>
    `;
    card.style.cursor = "pointer";
    card.addEventListener("click", () => {
      window.location.href = `food-detail.html?id=${food.id}`;
    });
    menuWrapper.appendChild(card);
  });
        }

// Display Recommendations section
function displayRecommendations(foods) {
  const grouped = {};

  foods.forEach(food => {
    const name = food.name.toLowerCase();
    if (!grouped[name]) grouped[name] = [];
    grouped[name].push(food);
  });

  const uniqueFoods = Object.values(grouped).map(group =>
    group[Math.floor(Math.random() * group.length)]
  );

  // Shuffle
  for (let i = uniqueFoods.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [uniqueFoods[i], uniqueFoods[j]] = [uniqueFoods[j], uniqueFoods[i]];
  }

  const selected = uniqueFoods.slice(0, 4);

  highlightSlider.innerHTML = "";
  selected.forEach(food => {
    const card = document.createElement("div");
    card.classList.add("highlight-card");
    card.innerHTML = `
      <img class="highlight-img" src="${food.imageUrl}" alt="${food.name}">
      <div class="highlight-desc">
        <h4>${food.name}</h4>
        <p>Ksh.${food.price}</p>
      </div>
    `;
    card.style.cursor = "pointer";
    card.addEventListener("click", () => {
      window.location.href = `food-detail.html?id=${food.id}`;
    });
    highlightSlider.appendChild(card);
  });
}

// Auto-refresh Recommendations every 10 seconds
function startAutoRotation() {
  setInterval(() => {
    displayRecommendations(allFoods);
  }, 10000);
}

// Search
document.querySelector(".search-btn")?.addEventListener("click", () => {
  const term = document.getElementById("searchInput").value.toLowerCase();
  const filtered = allFoods.filter(food =>
    food.name.toLowerCase().includes(term)
  );
  displayGroupedFoods(filtered);
  displayRecommendations(filtered);
});

document.getElementById("searchInput")?.addEventListener("input", () => {
  const term = document.getElementById("searchInput").value.toLowerCase();
  const filtered = allFoods.filter(food =>
    food.name.toLowerCase().includes(term)
  );
  displayGroupedFoods(filtered);
  displayRecommendations(filtered);
});

// Load foods on page load
loadFoods();

// Mobile menu toggle
const mobile = document.querySelector(".menu-toggle");
const mobileLink = document.querySelector(".sidebar");

mobile?.addEventListener("click", () => {
  mobile.classList.toggle("is-active");
  mobileLink.classList.toggle("active");
});

mobileLink?.addEventListener("click", () => {
  const menuBars = document.querySelector(".is-active");
  if (window.innerWidth <= 768 && menuBars) {
    mobile.classList.toggle("is-active");
    mobileLink.classList.toggle("active");
  }
});

// Scroll controls
const step = 100;
const stepfilter = 60;

document.querySelector(".back-menus")?.addEventListener("click", e => {
  e.preventDefault();
  document.querySelector(".filter-wrapper")?.scrollBy({ left: -stepfilter, behavior: "smooth" });
});

document.querySelector(".next-menus")?.addEventListener("click", e => {
  e.preventDefault();
  document.querySelector(".filter-wrapper")?.scrollBy({ left: stepfilter, behavior: "smooth" });
});

document.querySelector(".back")?.addEventListener("click", e => {
  e.preventDefault();
  document.querySelector(".highlight-wrapper")?.scrollBy({ left: -step, behavior: "smooth" });
});

document.querySelector(".next")?.addEventListener("click", e => {
  e.preventDefault();
  document.querySelector(".highlight-wrapper")?.scrollBy({ left: step, behavior: "smooth" });
});
