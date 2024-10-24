document.addEventListener('DOMContentLoaded', () => {
    let items = [
        // electronics
        {
            id: 11,
            categoryId: 3,
            categoryName: "Electronics",
            image: "https://i.ibb.co/YjgzBK1/ele1.jpg",
            name: "truke Buds F1 Ultra Earbuds",
            colour: "black",
            description: "60H Playtime, Crystal-Clear Calls, Fast Charging, Bluetooth 5.3, Noise Cancellation, Gaming Mode",
            cost: 799.00
        },
        {
            id: 12,
            categoryId: 3,
            categoryName: "Electronics",
            image: "https://i.ibb.co/9v8QycF/ele2.jpg",
            name: "TROXXON Multifunctional Cable",
            colour: "Multi-Colour",
            description: "Multi-Type Charging Line Convertor USB Type C Adapter Tool Contains Sim Card Slot Tray Eject Pin",
            cost: 199.00
        },
        {
            id: 13,
            categoryId: 3,
            categoryName: "Electronics",
            image: "https://i.ibb.co/C62FCxc/ele3.jpg",
            name: "Ambrane Ultra Fast Type C Charging Cable",
            colour: "Black",
            description: "65W VOOC Technology, 480Mbps Data Sync, Braided, 1.2 M",
            cost: 179.00
        },
        {
            id: 14,
            categoryId: 3,
            categoryName: "Electronics",
            image: "https://i.ibb.co/tZF3Bjq/ele4.jpg",
            name: "ZEBRONICS THUNDER Bluetooth",
            colour: "Black",
            description: "60H Backup, Gaming Mode, Dual Pairing, ENC, AUX, Micro SD, Voice assistant, Comfortable Earcups",
            cost: 799.00
        },
        {
            id: 15,
            categoryId: 3,
            categoryName: "Electronics",
            image: "https://i.ibb.co/4Rctcbh/ele5.jpg",
            name: "Universal Travel Adapter",
            colour: "Black",
            description: "Travel Adapter and Wall Charger with USB Ports with Multi Type Power Outlet USB 2.1A,100-250 Voltage",
            cost: 555.00
        }
    ];

    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const bigBox = document.querySelector('.big-box');
    const itemCountElement = document.querySelector('.item-count');
    const notification = document.getElementById('notification');

    function displayResults(items) {
        bigBox.innerHTML = ''; // Clear previous results

        if (items.length === 0) {
            bigBox.innerHTML = '<p>No items found matching your criteria.</p>';
            return;
        }

        items.forEach(item => {
            const box = document.createElement('div');
            box.className = 'box1';
            box.innerHTML = `
                <div class="image-box">
                    <img src="${item.image}" alt="${item.name}">
                </div>
                <div class="text-box">
                    <h2 class="heading">${item.name}</h2>
                    <p class="offer">${item.description}</p>
                    <p>${item.quantity}</p>
                    <p>₹${item.cost.toFixed(2)}</p>
                </div>
                <div class="add-to-cart-box">
                    <div class="quantity-box">
                        <button class="minus" data-id="${item.id}">-</button>
                        <input type="text" class="quantity" data-id="${item.id}" value="1" min="1" />
                        <button class="plus" data-id="${item.id}">+</button>
                    </div>
                    <button class="add-to-cart" data-id="${item.id}">Add to Cart</button>
                </div>
            `;
            bigBox.appendChild(box);
        });
    }

    function showNotification(message) {
        notification.textContent = message;
        notification.classList.add('show');

        // Hide the notification after 3 seconds
        setTimeout(() => {
            notification.classList.remove('show');
        }, 3000);
    }

    function addToCart(event) {
        const itemId = parseInt(event.target.getAttribute('data-id'));
        const item = items.find(item => item.id === itemId);
        const quantityInput = document.querySelector(`.quantity[data-id="${itemId}"]`);
        const quantity = parseInt(quantityInput.value) || 1;

        if (item) {
            const cartItemIndex = cart.findIndex(cartItem => cartItem.id === itemId);

            if (cartItemIndex > -1) {
                cart[cartItemIndex].quantity += quantity;
                showNotification(`${item.name} quantity updated to ${cart[cartItemIndex].quantity}`);
            } else {
                cart.push({ ...item, quantity: quantity });
                showNotification(`${item.name} (${quantity} item${quantity > 1 ? 's' : ''}) added to cart!`);
            }

            localStorage.setItem('cart', JSON.stringify(cart));
            updateCartCount();
        } else {
            showNotification('Item not found. Please check again.');
        }
    }

    function incrementQuantity(event) {
        const itemId = parseInt(event.target.getAttribute('data-id'));
        const quantityInput = document.querySelector(`.quantity[data-id="${itemId}"]`);
        let currentQuantity = parseInt(quantityInput.value);
        quantityInput.value = currentQuantity + 1;
    }

    function decrementQuantity(event) {
        const itemId = parseInt(event.target.getAttribute('data-id'));
        const quantityInput = document.querySelector(`.quantity[data-id="${itemId}"]`);
        let currentQuantity = parseInt(quantityInput.value);
        if (currentQuantity > 1) {
            quantityInput.value = currentQuantity - 1;
        }
    }

    function updateCartCount() {
        const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
        itemCountElement.textContent = totalItems;
    }

    function handleCartActions(event) {
        const target = event.target;
        const itemId = parseInt(target.getAttribute('data-id'));
        const quantityInput = document.querySelector(`.quantity[data-id="${itemId}"]`);
        const cartItemIndex = cart.findIndex(item => item.id === itemId);

        if (target.classList.contains('plus')) {
            cart[cartItemIndex].quantity += 1;
        } else if (target.classList.contains('minus')) {
            if (cart[cartItemIndex].quantity > 1) {
                cart[cartItemIndex].quantity -= 1;
            } else {
                cart.splice(cartItemIndex, 1); // Remove the item if quantity is 0
            }
        }

        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartCount();
    }

    // Attach event listeners using event delegation
    bigBox.addEventListener('click', (event) => {
        if (event.target.classList.contains('add-to-cart')) {
            addToCart(event);
        } else if (event.target.classList.contains('plus')) {
            incrementQuantity(event);
        } else if (event.target.classList.contains('minus')) {
            decrementQuantity(event);
        }
    });

    // Initial display
    displayResults(items);
    updateCartCount(); // Update cart count on initial load
});
