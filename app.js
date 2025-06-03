// app.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.8.1/firebase-app.js";
import { getFirestore, collection, getDocs, addDoc } from "https://www.gstatic.com/firebasejs/11.8.1/firebase-firestore.js";

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

// Load cart from localStorage
const cartWrapper = document.querySelector('.cart-wrapper');
const cartTotal = document.getElementById('cart-total');
const checkoutBtn = document.querySelector('.checkout-btn');

function renderCart() {
  const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
  cartWrapper.innerHTML = '';

  let total = 0;

  cartItems.forEach((item, index) => {
    const subtotal = item.price * item.quantity;
    total += subtotal;

    const cartItem = document.createElement('div');
    cartItem.classList.add('cart-item');
    cartItem.innerHTML = `
      <img src="${item.imageUrl}" alt="${item.name}" class="cart-img" />
      <div class="cart-details">
        <h4>${item.name}</h4>
        <p>Ksh. ${item.price}</p>
        <div class="cart-controls">
          <label>Qty:</label>
          <input type="number" min="1" value="${item.quantity}" class="cart-qty" data-index="${index}" />
          <button class="remove-btn" data-index="${index}">Remove</button>
        </div>
      </div>
      <div class="cart-subtotal">
        <strong>Ksh. ${subtotal}</strong>
      </div>
    `;

    cartWrapper.appendChild(cartItem);
  });

  cartTotal.textContent = `Ksh. ${total}`;
}

// Handle quantity change
cartWrapper.addEventListener('input', function (e) {
  if (e.target.classList.contains('cart-qty')) {
    const index = e.target.dataset.index;
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart[index].quantity = parseInt(e.target.value);
    localStorage.setItem('cart', JSON.stringify(cart));
    renderCart();
  }
});

// Handle remove button
cartWrapper.addEventListener('click', function (e) {
  if (e.target.classList.contains('remove-btn')) {
    const index = e.target.dataset.index;
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    renderCart();
  }
});

// Handle checkout
checkoutBtn.addEventListener('click', async () => {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  if (cart.length === 0) return alert('Your cart is empty');

  try {
    await addDoc(collection(db, 'orders'), {
      items: cart,
      createdAt: new Date().toISOString()
    });

    alert('Order placed successfully!');
    localStorage.removeItem('cart');
    renderCart();
  } catch (error) {
    alert('Failed to place order: ' + error);
  }
});

renderCart();
      
