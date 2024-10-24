document.addEventListener('DOMContentLoaded', () => {
    const items = [
        // beauty items
        {
            id: 6,
            categoryId: 2,
            categoryName: "Beauty",
            image: "https://i.ibb.co/9ndkYWp/beauty1.jpg",
            name: "Skinn by Titan For Men",
            quantity: "20ml",
            description: "Long Lasting Eau De Perfum for Men",
            cost: 591.00
        },
        {
            id: 7,
            categoryId: 2,
            categoryName: "Beauty",
            image: "https://i.ibb.co/TbsbcCT/beauty2.jpg",
            name: "Skinn BY Titan For Women",
            quantity: "50ml",
            description: "Sheer For Women, 50ml, Perfume",
            cost: 1515.00
        },
        {
            id: 8,
            categoryId: 2,
            categoryName: "Beauty",
            image: "https://i.ibb.co/3fbm2F6/beauty3.jpg",
            name: "Lakme 9 To 5 Compact",
            quantity: "9G",
            description: "Ivory Cream, Long Lasting, Matte",
            cost: 313.00
        },
        {
            id: 9,
            categoryId: 2,
            categoryName: "Beauty",
            image: "https://i.ibb.co/x6SFQdt/beauty4.jpg",
            name: "Bombay Shaving Company",
            quantity: "100ml",
            description: "Activated Charcoal Peel Off Mask",
            cost: 129.00
        },
        {
            id: 10,
            categoryId: 2,
            categoryName: "Beauty",
            image: "https://i.ibb.co/PcXbf3t/beauty5.jpg",
            name: "The Man Company Charcoal Kit",
            quantity: "6 Items",
            description: "Best Gift for Men",
            cost: 1347.00
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
