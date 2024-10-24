document.addEventListener('DOMContentLoaded', () => {
    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    const checkoutForm = document.getElementById('checkout-form');
    const notification = document.getElementById('notification'); // Get notification element

    // Retrieve the cart from localStorage
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let total = 0;

    function renderCart() {
        cartItemsContainer.innerHTML = ''; // Clear previous items
        total = 0;

        if (cart.length === 0) {
            cartItemsContainer.innerHTML = '<p>Your cart is empty.</p>';
        } else {
            cart.forEach(item => {
                const itemTotal = item.cost * item.quantity;
                total += itemTotal;

                const cartItem = document.createElement('div');
                cartItem.className = 'cart-item';
                cartItem.innerHTML = `
                <div class="item">
                    <img src="${item.image}" alt="${item.name}">
                    <span class="item-name">${item.name} (₹${item.cost.toFixed(2)})</span>
                    <span class="quantity">Qty: ${item.quantity}</span>
                </div>
                <div class="amount">
                    <span>₹${itemTotal.toFixed(2)}</span>
                </div>`;
                cartItemsContainer.appendChild(cartItem);
            });
        }

        cartTotal.innerHTML = `Total: ₹${total.toFixed(2)}`;
    }

    function showNotification(message, type = 'success', callback) {
        notification.textContent = message;
        notification.className = `notification ${type} show`; // Add 'show' class and set type (success or error)

        // Automatically hide the notification after 3 seconds and execute the callback
        setTimeout(() => {
            notification.className = 'notification'; // Hide the notification
            if (callback) callback(); // Execute callback after hiding notification
        }, 3000);
    }

    checkoutForm.addEventListener('submit', (e) => {
        e.preventDefault(); // Prevent form submission

        // Validate address fields
        const address1 = document.getElementById('address-line-1').value;
        if (!address1.trim()) {
            showNotification('Please enter Address Line 1.', 'error');
            return;
        }

        // Show success message and then clear cart
        showNotification('Thank you for your purchase!', 'success', () => {
            cart = []; // Clear the cart after the notification is shown
            localStorage.setItem('cart', JSON.stringify(cart)); // Update localStorage
            renderCart(); // Rerender the cart (which will now be empty)
            checkoutForm.reset(); // Reset the form
        });
    });

    // Initial render when the checkout page loads
    renderCart();
});
