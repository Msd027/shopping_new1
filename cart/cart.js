document.addEventListener('DOMContentLoaded', () => {
    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');

    // Retrieve the cart from localStorage
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    function saveCart() {
        localStorage.setItem('cart', JSON.stringify(cart));
        console.log('Cart saved to localStorage:', cart);
    }

    function renderCart() {
        cartItemsContainer.innerHTML = ''; // Clear previous items
        let total = 0;

        if (cart.length === 0) {
            cartItemsContainer.innerHTML = '<p>Your cart is empty.</p>';
        } else {
            cart.forEach((item, index) => {
                const itemTotal = item.cost * item.quantity;
                total += itemTotal;

                const cartItem = document.createElement('div');
                cartItem.className = 'cart-item';
                cartItem.innerHTML = `
                <div class="item">
                    <img src="${item.image}" alt="${item.name}">
                    <span class="item-name">${item.name} (₹${item.cost.toFixed(2)})</span>
                    <div class="quantity-controls">
                        <button class="minus" data-index="${index}" aria-label="Decrease quantity">-</button>
                        <span class="quantity">${item.quantity}</span>
                        <button class="plus" data-index="${index}" aria-label="Increase quantity">+</button>
                    </div>
                </div>
                <div class="amount">
                    <span>₹${itemTotal.toFixed(2)}</span>
                    <button class="remove" data-index="${index}" aria-label="Remove item">
                        <i class="fas fa-trash-alt"></i>
                    </button>
                </div>`;
                cartItemsContainer.appendChild(cartItem);
            });
        }

        cartTotal.innerHTML = `Total: ₹${total.toFixed(2)}`;
        saveCart(); // Save the cart to localStorage after rendering
    }

    // Event delegation for cart buttons
    cartItemsContainer.addEventListener('click', (e) => {
        const target = e.target;
        const index = target.getAttribute('data-index');

        // Handle plus button
        if (target.classList.contains('plus')) {
            cart[index].quantity += 1; // Increment quantity
            renderCart(); // Re-render the cart
        }

        // Handle minus button
        if (target.classList.contains('minus')) {
            if (cart[index].quantity > 1) {
                cart[index].quantity -= 1; // Decrement quantity
            } else {
                cart.splice(index, 1); // Remove item if quantity is 1
            }
            renderCart(); // Re-render the cart
        }

        // Handle remove button
        const removeButton = target.closest('.remove');
        if (removeButton) {
            const removeIndex = removeButton.getAttribute('data-index');
            cart.splice(removeIndex, 1); // Remove the item from the cart
            renderCart(); // Re-render the cart
        }

        // Log the current state of the cart after each operation
        console.log('Current cart state:', cart);
    });

    // Initial render when the cart page loads
    renderCart();
});
