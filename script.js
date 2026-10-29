/*
THE GRAND TABLE — DEMO WEBSITE

IMPORTANT:

1. Replace the WhatsApp number below with the restaurant's number.
2. Use the country code without + or spaces.
3. Replace the demo address and phone number.
   */

const RESTAURANT = {
name: "The Grand Table",

// EXAMPLE ONLY: replace with the restaurant's real WhatsApp number.
// India format: 91 followed by the 10-digit mobile number.
whatsapp: "919876543210",

// Replace these with real business details.
phoneDisplay: "Add restaurant phone number",
phoneLink: "",
address: "Add your restaurant address here",

// Replace with a real location or address before publishing.
mapQuery: ""
};

// MOBILE NAVIGATION
const menuToggle = document.getElementById("menuToggle");
const nav = document.getElementById("nav");

menuToggle.addEventListener("click", () => {
const isOpen = nav.classList.toggle("open");

menuToggle.setAttribute("aria-expanded", String(isOpen));
menuToggle.textContent = isOpen ? "×" : "☰";
});

document.querySelectorAll(".nav a").forEach(link => {
link.addEventListener("click", () => {
nav.classList.remove("open");
menuToggle.setAttribute("aria-expanded", "false");
menuToggle.textContent = "☰";
});
});

// MENU CATEGORY FILTERS
const filterButtons = document.querySelectorAll(".filter-btn");
const foodCards = document.querySelectorAll(".food-card");

filterButtons.forEach(button => {
button.addEventListener("click", () => {
const category = button.dataset.filter;

filterButtons.forEach(item => {
  item.classList.remove("active");
});

button.classList.add("active");

foodCards.forEach(card => {
  const matches =
    category === "all" ||
    card.dataset.category === category;

  card.classList.toggle("hidden", !matches);
});

});
});

// SMALL NOTIFICATION
const toast = document.getElementById("toast");
let toastTimer;

function showToast(message) {
toast.textContent = message;
toast.classList.add("show");

clearTimeout(toastTimer);

toastTimer = setTimeout(() => {
toast.classList.remove("show");
}, 3000);
}

// WHATSAPP LINK VALIDATION
function getWhatsAppUrl(message) {
const number = RESTAURANT.whatsapp.replace(/\D/g, "");

// Prevent accidental use of the example number.
if (
!number ||
number === "919876543210" ||
number.length < 10
) {
showToast("Demo mode: add the restaurant's real WhatsApp number in script.js.");
return null;
}

return "https://wa.me/${number}?text=${encodeURIComponent(message)}";
}

function openWhatsApp(message) {
const url = getWhatsAppUrl(message);

if (!url) return;

window.open(url, "_blank", "noopener,noreferrer");
}

// INDIVIDUAL FOOD ORDER BUTTONS
document.querySelectorAll(".order-btn").forEach(button => {
button.addEventListener("click", () => {
const item = button.dataset.item;
const price = button.dataset.price;

const message =
  `Hello ${RESTAURANT.name}! I'd like to enquire about:\n\n` +
  `Item: ${item}\n` +
  `Listed price: ₹${price}\n\n` +
  `Please confirm availability and the final price.`;

openWhatsApp(message);

});
});

// RESERVATION / GENERAL ENQUIRY BUTTON
const reservationButton = document.getElementById("reservationButton");

reservationButton.addEventListener("click", event => {
event.preventDefault();

const message =
"Hello ${RESTAURANT.name}! I'd like to enquire about a table. " +
"Please share the availability and reservation details.";

openWhatsApp(message);
});

// RESTAURANT ADDRESS AND PHONE
document.getElementById("restaurantAddress").textContent =
RESTAURANT.address;

document.getElementById("restaurantPhone").textContent =
RESTAURANT.phoneDisplay;

// MAP BUTTON
const mapButton = document.getElementById("mapButton");

if (RESTAURANT.mapQuery.trim()) {
mapButton.href =
"https://www.google.com/maps/search/?api=1&query=" +
encodeURIComponent(RESTAURANT.mapQuery);
} else {
mapButton.href = "#contact";

mapButton.addEventListener("click", event => {
event.preventDefault();
showToast("Add the restaurant's real address to script.js first.");
});
}

// FOOTER YEAR
document.getElementById("year").textContent =
new Date().getFullYear();
