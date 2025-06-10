
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

  // ✅ Initialize Firebase and Firestore
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);

  const menuWrapper = document.getElementById("menu-wrapper");
  let allFoods = [];

  // ✅ Load foods from Firestore
  async function loadFoods() {
    const querySnapshot = await getDocs(collection(db, "foods"));
    allFoods = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    displayFoods(allFoods);
  }

  // ✅ Display food cards
  function displayFoods(foods) {
    menuWrapper.innerHTML = "";
    foods.forEach(food => {
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
        showFoodDetail(food.id);
      });
      menuWrapper.appendChild(card);
    });
  }

  // ✅ Food detail section setup
  let detailSection = document.getElementById("food-detail");
  if (!detailSection) {
    detailSection = document.createElement("div");
    detailSection.id = "food-detail";
    detailSection.style.marginTop = "30px";
    document.body.appendChild(detailSection);
  }

  function showFoodDetail(foodId) {
    const food = allFoods.find(f => f.id === foodId);
    if (!food) return;

    detailSection.innerHTML = `
      <h2>${food.name}</h2>
      <img src="${food.imageUrl}" alt="${food.name}" style="max-width:300px; display:block; margin-bottom:10px;">
      <p>${food.description}</p>
      <p><strong>Price:</strong> Ksh. ${food.price}</p>
      <p><strong>Sold by:</strong> ${food.restaurant || "Unknown Vendor"}</p>
      <h3>You may also like</h3>
      <div id="recommendation-list" style="display:flex; gap:10px; overflow-x:auto;"></div>
    `;

    const recommendationListDiv = document.getElementById("recommendation-list");
    recommendationListDiv.innerHTML = "";
    const recommendations = allFoods.filter(f => f.id !== foodId).slice(0, 4);

    recommendations.forEach(rec => {
      const recCard = document.createElement("div");
      recCard.style.minWidth = "150px";
      recCard.style.cursor = "pointer";
      recCard.innerHTML = `
        <img src="${rec.imageUrl}" alt="${rec.name}" style="width:100%; height:auto; border-radius:5px;">
        <p style="text-align:center; margin:5px 0 0;">${rec.name}</p>
      `;
      recCard.addEventListener("click", () => showFoodDetail(rec.id));
      recommendationListDiv.appendChild(recCard);
    });

    detailSection.scrollIntoView({ behavior: "smooth" });
  }

  // ✅ Search functionality
  document.querySelector(".search-btn")?.addEventListener("click", () => {
    const term = document.getElementById("searchInput").value.toLowerCase();
    const filtered = allFoods.filter(food =>
      food.name.toLowerCase().includes(term)
    );
    displayFoods(filtered);
  });

  document.getElementById("searchInput")?.addEventListener("input", () => {
    const term = document.getElementById("searchInput").value.toLowerCase();
    const filtered = allFoods.filter(food =>
      food.name.toLowerCase().includes(term)
    );
    displayFoods(filtered);
  });

  // ✅ Load all foods on start
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

  // ✅ Scroll buttons for category and highlights
  const step = 100;
  const stepfilter = 60;

  const backMenus = document.querySelector(".back-menus");
  const nextMenus = document.querySelector(".next-menus");
  const filterWrapper = document.querySelector(".filter-wrapper");

  backMenus?.addEventListener("click", e => {
    e.preventDefault();
    filterWrapper.scrollBy({ left: -stepfilter, behavior: "smooth" });
  });

  nextMenus?.addEventListener("click", e => {
    e.preventDefault();
    filterWrapper.scrollBy({ left: stepfilter, behavior: "smooth" });
  });

  const backHighlight = document.querySelector(".back");
  const nextHighlight = document.querySelector(".next");
  const highlightWrapper = document.querySelector(".highlight-wrapper");

  backHighlight?.addEventListener("click", e => {
    e.preventDefault();
    highlightWrapper.scrollBy({ left: -step, behavior: "smooth" });
  });

  nextHighlight?.addEventListener("click", e => {
    e.preventDefault();
    highlightWrapper.scrollBy({ left: step, behavior: "smooth" });
  });

