let cart = [];

// =========================
// ADD TO CART
// =========================
function addToCart(name, price) {
    const existingItem = cart.find(item => item.name === name);

    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({
            name: name,
            price: price,
            quantity: 1
        });
    }

    updateCart();

    // Small confirmation
    alert(`${name} added to cart!`);
}


// =========================
// UPDATE CART
// =========================
function updateCart() {
    const cartItems = document.getElementById("cart-items");
    const cartCount = document.getElementById("cart-count");
    const subtotalElement = document.getElementById("cart-subtotal");
    const deliveryElement = document.getElementById("delivery-fee");
    const totalElement = document.getElementById("cart-total");

    let totalQuantity = 0;
    let subtotal = 0;

    cart.forEach(item => {
        totalQuantity += item.quantity;
        subtotal += item.price * item.quantity;
    });

    // Cart count
    cartCount.textContent = totalQuantity;

    // Empty cart
    if (cart.length === 0) {
        cartItems.innerHTML = `
            <div class="empty-cart">
                <div class="empty-cart-icon">🛒</div>
                <h3>Your cart is empty</h3>
                <p>Add some delicious food to get started!</p>
            </div>
        `;
    } else {
        cartItems.innerHTML = "";

        cart.forEach((item, index) => {
            const cartItem = document.createElement("div");

            cartItem.className = "cart-item";

            cartItem.innerHTML = `
                <div class="cart-item-info">
                    <h4>${item.name}</h4>
                    <p>$${item.price.toFixed(2)} each</p>
                </div>

                <div class="quantity-controls">
                    <button onclick="changeQuantity(${index}, -1)">−</button>

                    <span>${item.quantity}</span>

                    <button onclick="changeQuantity(${index}, 1)">+</button>
                </div>

                <div class="cart-item-price">
                    $${(item.price * item.quantity).toFixed(2)}
                </div>

                <button class="remove-btn" onclick="removeFromCart(${index})">
                    ×
                </button>
            `;

            cartItems.appendChild(cartItem);
        });
    }

    // Delivery fee
    const deliveryFee = cart.length > 0 ? 2.99 : 0;

    // Total
    const total = subtotal + deliveryFee;

    subtotalElement.textContent = `$${subtotal.toFixed(2)}`;
    deliveryElement.textContent = `$${deliveryFee.toFixed(2)}`;
    totalElement.textContent = `$${total.toFixed(2)}`;
}


// =========================
// CHANGE QUANTITY
// =========================
function changeQuantity(index, amount) {
    cart[index].quantity += amount;

    if (cart[index].quantity <= 0) {
        cart.splice(index, 1);
    }

    updateCart();
}


// =========================
// REMOVE ITEM
// =========================
function removeFromCart(index) {
    cart.splice(index, 1);
    updateCart();
}


// =========================
// OPEN CART
// =========================
function openCart() {
    document.getElementById("cart-modal").classList.add("show");
}


// =========================
// CLOSE CART
// =========================
function closeCart() {
    document.getElementById("cart-modal").classList.remove("show");
}


// =========================
// OPEN CHECKOUT
// =========================
function openCheckout() {
    if (cart.length === 0) {
        alert("Your cart is empty. Please add some food first.");
        return;
    }

    closeCart();

    document.getElementById("checkout-modal").classList.add("show");
}


// =========================
// CLOSE CHECKOUT
// =========================
function closeCheckout() {
    document.getElementById("checkout-modal").classList.remove("show");
}


// =========================
// PLACE ORDER
// =========================
function placeOrder(event) {
    event.preventDefault();

    if (cart.length === 0) {
        alert("Your cart is empty.");
        return;
    }

    // Generate order number
    const orderNumber =
        "TB" + Math.floor(100000 + Math.random() * 900000);

    document.getElementById("order-number").textContent = orderNumber;

    // Clear cart
    cart = [];

    updateCart();

    // Reset checkout form
    document.getElementById("checkout-form").reset();

    // Close checkout
    closeCheckout();

    // Show success modal
    document.getElementById("success-modal").classList.add("show");
}


// =========================
// CLOSE SUCCESS MODAL
// =========================
function closeSuccess() {
    document.getElementById("success-modal").classList.remove("show");
}


// =========================
// SEARCH FOOD
// =========================
function searchFood() {
    applyFilters();
}


// =========================
// FILTER FOOD
// =========================
let currentCategory = "all";

function filterFood(category, button) {
    currentCategory = category;

    // Remove active class from all category buttons
    const buttons = document.querySelectorAll(".category-btn");

    buttons.forEach(btn => {
        btn.classList.remove("active");
    });

    // Add active class to selected button
    if (button) {
        button.classList.add("active");
    }

    applyFilters();
}


// =========================
// APPLY SEARCH + CATEGORY
// =========================
function applyFilters() {
    const searchInput = document.getElementById("search-input");

    const searchText = searchInput
        ? searchInput.value.toLowerCase().trim()
        : "";

    const foodCards = document.querySelectorAll(".food-card");

    let visibleItems = 0;

    foodCards.forEach(card => {
        const nameElement = card.querySelector("h3");

        const name = nameElement
            ? nameElement.textContent.toLowerCase()
            : "";

        const category = card.dataset.category
            ? card.dataset.category.toLowerCase()
            : "";

        const matchesSearch = name.includes(searchText);

        const matchesCategory =
            currentCategory === "all" ||
            category === currentCategory.toLowerCase();

        if (matchesSearch && matchesCategory) {
            card.style.display = "block";
            visibleItems++;
        } else {
            card.style.display = "none";
        }
    });

    // Show no results message
    const noResults = document.getElementById("no-results");

    if (noResults) {
        if (visibleItems === 0) {
            noResults.style.display = "block";
        } else {
            noResults.style.display = "none";
        }
    }
}


// =========================
// CONTACT FORM
// =========================
function sendMessage(event) {
    event.preventDefault();

    alert("Your message has been sent successfully!");

    event.target.reset();
}


// =========================
// CLOSE MODALS BY CLICKING OUTSIDE
// =========================
window.addEventListener("click", function(event) {
    const cartModal = document.getElementById("cart-modal");
    const checkoutModal = document.getElementById("checkout-modal");
    const successModal = document.getElementById("success-modal");

    if (event.target === cartModal) {
        closeCart();
    }

    if (event.target === checkoutModal) {
        closeCheckout();
    }

    if (event.target === successModal) {
        closeSuccess();
    }
});


// =========================
// ESC KEY TO CLOSE MODALS
// =========================
document.addEventListener("keydown", function(event) {
    if (event.key === "Escape") {
        closeCart();
        closeCheckout();
        closeSuccess();
    }
});


// =========================
// INITIALIZE WEBSITE
// =========================
document.addEventListener("DOMContentLoaded", function() {
    updateCart();
});