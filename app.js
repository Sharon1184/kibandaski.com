// app.js

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

// Reference the container div for menu items

const menuWrapper = document.getElementById("menu-wrapper");

// Fetch and display food items from Firestore

async function loadFoods() {

const querySnapshot = await getDocs(collection(db, "foods"));

querySnapshot.forEach((doc) => {

const food = doc.data();



// Create food card HTML

const card = document.createElement("div");

card.classList.add("detail-card");

card.innerHTML = `
  <a href="food-detail.html?name=${encodeURIComponent(food.name)}" style="text-decoration: none; color: inherit;">
    <img class="detail-img" src="${food.imageUrl}" alt="${food.name}">
    <div class="detail-desc">
      <div class="detail-name">
        <h4>${food.name}</h4>
        <p class="detail-sub">${food.description}</p>
        <p class="price">ksh.${food.price}</p>
      </div>
      <ion-icon class="detail-favourite" name="bookmark-outline"></ion-icon>
    </div>
  </a>
`;


menuWrapper.appendChild(card);

});

}

loadFoods();

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
// Event delegation for clicks on food cards inside #menu-wrapper
document.getElementById('menu-wrapper').addEventListener('click', function(e) {
  // Find if the click was inside a .detail-card (or its child)
  const card = e.target.closest('.detail-card');
  if (!card) return;

  // Extract details from clicked card
  const img = card.querySelector('img.detail-img').src;
  const name = card.querySelector('h4').textContent;
  const description = card.querySelector('p.detail-sub').textContent;
  const price = card.querySelector('p.price').textContent;

  // Fill modal content
  document.getElementById('modal-img').src = img;
  document.getElementById('modal-img').alt = name;
  document.getElementById('modal-name').textContent = name;
  document.getElementById('modal-description').textContent = description;
  document.getElementById('modal-price').textContent = price;

  // Show modal
  document.getElementById('food-modal').style.display = 'flex';
});

// Close modal on clicking X button
document.getElementById('modal-close').addEventListener('click', function() {
  document.getElementById('food-modal').style.display = 'none';
});

// Close modal when clicking outside the modal-content
document.getElementById('food-modal').addEventListener('click', function(e) {
  if (e.target === this) {
    this.style.display = 'none';
  }
});
  
