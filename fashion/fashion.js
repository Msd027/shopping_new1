document.addEventListener('DOMContentLoaded', () => {
    let items = [
        // Fashion items
        {
            id: 1,
            idName: "hoodie",
            categoryId: 1,
            categoryName: "Fashion",
            image: "https://i.ibb.co/xjdHTmM/fashion1.jpg",
            name: "Lymio Hoodies",
            colour: "Black",
            description: "Sweatshirt for Men",
            cost: 599.00
        },
        {
            id: 2,
            idName: "hoodie",
            categoryId: 1,
            categoryName: "Fashion",
            image: "https://i.ibb.co/YXGXBdR/fashion2.jpg",
            name: "Womens Printed Hoodie",
            colour: "Maroon",
            description: "Sweatshirt for Women",
            cost: 299.00
        },
        {
            id: 3,
            idName: "pant",
            categoryId: 1,
            categoryName: "Fashion",
            image: "https://i.ibb.co/FWfT7Bb/fashion3.jpg",
            name: "The Pant Project",
            colour: "Grey",
            description: "Lycra Men Stretchable Formal Pants",
            cost: 1794.00
        },
        {
            id: 4,
            idName: "kurta",
            categoryId: 1,
            categoryName: "Fashion",
            image: "https://i.ibb.co/GtNgLzJ/fashion4.jpg",
            name: "FIORRA Kurta Set With Dupatta",
            colour: "Maroon",
            description: "Women's Poly Kurta Set with dupatta",
            cost: 829.00
        },
        {
            id: 5,
            idName: "kurta",
            categoryId: 1,
            categoryName: "Fashion",
            image: "https://i.ibb.co/HxkbxKt/fashion5.jpg",
            name: "Ethluxis Men's Silk Blend Kurta",
            colour: "Peach & White",
            description: "Men Silk Blend Kurta with Churidar Pajama and Ethnic Bundi Jacket Set",
            cost: 1899.00
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