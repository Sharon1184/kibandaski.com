import { initializeApp } from "https://www.gstatic.com/firebasejs/11.8.1/firebase-app.js";
import {
  getFirestore,
  collection,
  getDocs
} from "https://www.gstatic.com/firebasejs/11.8.1/firebase-firestore.js";

// ✅ Firebase config
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
let allFoods = [];

// ✅ Load all foods and group them
async function loadFoods() {
  const querySnapshot = await getDocs(collection(db, "foods"));
  allFoods = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  displayGroupedFoods(allFoods);
}

// ✅ Display only one food per name
function displayGroupedFoods(foods) {
  const grouped = {};

  // Group all versions of the same food
  foods.forEach(food => {
    const name = food.name.toLowerCase();
    if (!grouped[name]) {
      grouped[name] = [];
    }
    grouped[name].push(food);
  });

  // Randomly pick one version per food group
  const uniqueFoods = Object.values(grouped).map(group =>
    group[Math.floor(Math.random() * group.length)]
  );

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
          <p class="price">Ksh. ${food.price}</p>
          <p class="sold-by">Sold by <a href="restaurant.html?name=${encodeURIComponent(restaurant)}">${restaurant}</a></p>
        </div>
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

// ✅ Search
document.querySelector(".search-btn")?.addEventListener("click", () => {
  const term = document.getElementById("searchInput").value.toLowerCase();
  const filtered = allFoods.filter(food =>
    food.name.toLowerCase().includes(term)
  );
  displayGroupedFoods(filtered);
});

document.getElementById("searchInput")?.addEventListener("input", () => {
  const term = document.getElementById("searchInput").value.toLowerCase();
  const filtered = allFoods.filter(food =>
    food.name.toLowerCase().includes(term)
  );
  displayGroupedFoods(filtered);
});

// ✅ Load on page
loadFoods();

// ✅ Mobile menu toggle
const mobile = document.querySelector(".menu-toggle");
const mobileLink = document.querySelector(".sidebar");

mobile?.addEventListener("click", function () {
  mobile.classList.toggle("is-active");
  mobileLink.classList.toggle("active");
});

mobileLink?.addEventListener("click", function () {
  const menuBars = document.querySelector(".is-active");
  if (window.innerWidth <= 768 && menuBars) {
    mobile.classList.toggle("is-active");
    mobileLink.classList.toggle("active");
  }
});

// ✅ Scroll controls
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
