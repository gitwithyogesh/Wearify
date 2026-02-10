// ========================================
// Product Data - Loaded from API
// ========================================
let products = [];

// ========================================
// State Management
// ========================================
let cart = JSON.parse(localStorage.getItem('wearify-cart')) || [];
let currentFilter = 'all';

// ========================================
// DOM Elements
// ========================================
const navbar = document.getElementById('navbar');
const navMenu = document.getElementById('navMenu');
const mobileToggle = document.getElementById('mobileToggle');
const cartBtn = document.getElementById('cartBtn');
const cartCount = document.getElementById('cartCount');
const cartModal = document.getElementById('cartModal');
const closeCart = document.getElementById('closeCart');
const cartItems = document.getElementById('cartItems');
const totalAmount = document.getElementById('totalAmount');
const productsGrid = document.getElementById('productsGrid');
const filterTabs = document.querySelectorAll('.filter-tab');
const newsletterForm = document.getElementById('newsletterForm');
const navLinks = document.querySelectorAll('.nav-link');

// ========================================
// Initialize
// ========================================
document.addEventListener('DOMContentLoaded', async () => {
    // Detect if we're on a category page
    const pageCategory = document.body.dataset.category;
    if (pageCategory) {
        currentFilter = pageCategory;
    }

    // Load products from API
    await loadProductsFromAPI();

    renderProducts();
    updateCartUI();
    initEventListeners();
    initScrollEffects();
});

// ========================================
// Load Products from API
// ========================================
async function loadProductsFromAPI() {
    try {
        const response = await fetch('/api/products');
        if (response.ok) {
            const apiProducts = await response.json();

            // Map API products to frontend format
            products = apiProducts.map(p => ({
                id: p.id,
                name: p.name,
                category: p.category.toLowerCase(), // MENS -> mens
                price: p.price,
                image: p.imageUrl || '',
                badge: p.stock > 50 ? 'In Stock' : p.stock > 20 ? 'Limited' : 'Low Stock',
                description: p.description,
                brand: p.brand,
                stock: p.stock
            }));

            console.log(`✅ Loaded ${products.length} products from API`);
        } else {
            console.error('Failed to load products from API');
            products = getFallbackProducts();
        }
    } catch (error) {
        console.error('Error loading products:', error);
        products = getFallbackProducts();
    }
}

// Fallback products if API fails
function getFallbackProducts() {
    return [
        {
            id: 1,
            name: "Classic Denim Jacket",
            category: "mens",
            price: 399.99,
            image: "https://images-static.nykaa.com/media/catalog/product/f/3/f30a4aeIB-DJ-04-3_NavyBlue_2.jpg?tr=w-500",
            badge: "Sale"
        },
        {
            id: 2,
            name: "Elegant Evening Dress",
            category: "womens",
            price: 1499.99,
            image: "https://www.newyorkdress.com/cdn/shop/products/Ladivine-J871_silver_2_1200x.jpg",
            badge: "New"
        }
    ];
}


// ========================================
// Event Listeners
// ========================================
function initEventListeners() {
    // Mobile menu toggle
    mobileToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });

    // Cart modal
    cartBtn.addEventListener('click', () => {
        cartModal.classList.add('active');
    });

    closeCart.addEventListener('click', () => {
        cartModal.classList.remove('active');
    });

    // Close cart when clicking outside
    cartModal.addEventListener('click', (e) => {
        if (e.target === cartModal) {
            cartModal.classList.remove('active');
        }
    });

    // Filter tabs
    filterTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            filterTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            currentFilter = tab.dataset.filter;
            renderProducts();
        });
    });

    // Category cards
    const categoryCards = document.querySelectorAll('.category-card');
    categoryCards.forEach(card => {
        card.addEventListener('click', () => {
            const category = card.dataset.category;
            currentFilter = category;

            // Update filter tab
            filterTabs.forEach(tab => {
                tab.classList.remove('active');
                if (tab.dataset.filter === category) {
                    tab.classList.add('active');
                }
            });

            // Scroll to products
            document.getElementById('products').scrollIntoView({ behavior: 'smooth' });

            // Render filtered products
            renderProducts();
        });
    });

    // Newsletter form
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = newsletterForm.querySelector('input').value;
        showNotification('Thank you for subscribing! 🎉');
        newsletterForm.reset();
    });

    // Smooth scroll for nav links (only for hash anchors)
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const target = link.getAttribute('href');

            // Only prevent default and smooth scroll for hash anchors
            if (target.startsWith('#')) {
                e.preventDefault();
                const element = document.querySelector(target);
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                }

                // Update active link
                navLinks.forEach(l => l.classList.remove('active'));
                link.classList.add('active');
            }

            // Close mobile menu
            navMenu.classList.remove('active');
        });
    });
}

// ========================================
// Scroll Effects
// ========================================
function initScrollEffects() {
    window.addEventListener('scroll', () => {
        // Navbar scroll effect
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Update active nav link based on scroll position
        const sections = document.querySelectorAll('section[id]');
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= sectionTop - 100) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

// ========================================
// Product Rendering
// ========================================
function renderProducts() {
    const filteredProducts = currentFilter === 'all'
        ? products
        : products.filter(p => p.category === currentFilter);

    productsGrid.innerHTML = filteredProducts.map(product => `
        <div class="product-card" data-aos="fade-up">
            <div class="product-image">
            <img src="${product.image}" alt="${product.name}">
                <div style="width: 100%; height: 100%; background: linear-gradient(135deg, ${getProductGradient(product.category)}); display: flex; align-items: center; justify-content: center; color: white; font-size: 3rem;">
                    ${getProductIcon(product.category)}
                </div>
                ${product.badge ? `<span class="product-badge">${product.badge}</span>` : ''}
            </div>
            <div class="product-info">
                <div class="product-category">${product.category}</div>
                <h3 class="product-name">${product.name}</h3>
                <div class="product-price">
                    <span class="price-current">₹${product.price}</span>
                    ${product.originalPrice ? `<span class="price-original">₹${product.originalPrice}</span>` : ''}
                </div>
                <div class="product-actions">
                    <button class="add-to-cart-btn" onclick="addToCart(${product.id})">
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

// Helper functions for product visuals
function getProductGradient(category) {
    const gradients = {
        mens: '#667eea 0%, #764ba2 100%',
        womens: '#f093fb 0%, #f5576c 100%',
        accessories: '#4facfe 0%, #00f2fe 100%',
        shoes: '#43e97b 0%, #38f9d7 100%'
    };
    return gradients[category] || '#667eea 0%, #764ba2 100%';
}

function getProductIcon(category) {
    const icons = {
        mens: '👔',
        womens: '👗',
        accessories: '👜',
        shoes: '👟'
    };
    return icons[category] || '🛍️';
}

// ========================================
// Cart Functionality
// ========================================
function addToCart(productId) {
    // Check if user is logged in
    const user = localStorage.getItem('wearify-user');
    if (!user) {
        showNotification('🔒 Please login to add items to cart');
        setTimeout(() => {
            window.location.href = `/login?return=${encodeURIComponent(window.location.pathname)}`;
        }, 1500);
        return;
    }

    const product = products.find(p => p.id === productId);
    if (!product) return;

    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }

    saveCart();
    updateCartUI();
    showNotification(`${product.name} added to cart! 🛒`);

    // Add animation
    cartBtn.style.transform = 'scale(1.2)';
    setTimeout(() => {
        cartBtn.style.transform = 'scale(1)';
    }, 300);
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    saveCart();
    updateCartUI();
}

function updateQuantity(productId, change) {
    const item = cart.find(item => item.id === productId);
    if (!item) return;

    item.quantity += change;

    if (item.quantity <= 0) {
        removeFromCart(productId);
    } else {
        saveCart();
        updateCartUI();
    }
}

function saveCart() {
    localStorage.setItem('wearify-cart', JSON.stringify(cart));
}

function updateCartUI() {
    // Update cart count
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;
    cartCount.style.display = totalItems > 0 ? 'flex' : 'none';

    // Update cart items
    if (cart.length === 0) {
        cartItems.innerHTML = `
            <div class="empty-cart">
                <p style="font-size: 3rem; margin-bottom: 1rem;">🛒</p>
                <p>Your cart is empty</p>
                <p style="font-size: 0.875rem; margin-top: 0.5rem;">Add some items to get started!</p>
            </div>
        `;
        totalAmount.textContent = '₹0.00';
    } else {
        cartItems.innerHTML = cart.map(item => `
            <div class="cart-item">
                <div class="cart-item-image" style="background: linear-gradient(135deg, ${getProductGradient(item.category)}); display: flex; align-items: center; justify-content: center; font-size: 2rem;">
                    ${getProductIcon(item.category)}
                </div>
                <div class="cart-item-info">
                    <div class="cart-item-name">${item.name}</div>
                    <div class="cart-item-price">₹${item.price}</div>
                    <div class="cart-item-quantity">
                        <button class="quantity-btn" onclick="updateQuantity(${item.id}, -1)">-</button>
                        <span>${item.quantity}</span>
                        <button class="quantity-btn" onclick="updateQuantity(${item.id}, 1)">+</button>
                        <button class="quantity-btn" onclick="removeFromCart(${item.id})" style="margin-left: auto; color: #ef4444;">×</button>
                    </div>
                </div>
            </div>
        `).join('');

        const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        totalAmount.textContent = `₹${total.toFixed(2)}`;
    }
}

// ========================================
// Notifications
// ========================================
function showNotification(message) {
    // Create notification element
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 1rem;
        box-shadow: 0 10px 25px rgba(0,0,0,0.2);
        z-index: 10000;
        font-weight: 600;
        animation: slideIn 0.3s ease;
    `;
    notification.textContent = message;

    // Add animation keyframes
    if (!document.getElementById('notification-styles')) {
        const style = document.createElement('style');
        style.id = 'notification-styles';
        style.textContent = `
            @keyframes slideIn {
                from { transform: translateX(400px); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
            @keyframes slideOut {
                from { transform: translateX(0); opacity: 1; }
                to { transform: translateX(400px); opacity: 0; }
            }
        `;
        document.head.appendChild(style);
    }

    document.body.appendChild(notification);

    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// ========================================
// Search Functionality
// ========================================
const searchBtn = document.getElementById('searchBtn');
const searchModal = document.getElementById('searchModal');
const closeSearch = document.getElementById('closeSearch');
const searchInput = document.getElementById('searchInput');
const searchResults = document.getElementById('searchResults');

// Open search modal
searchBtn.addEventListener('click', () => {
    searchModal.classList.add('active');
    searchInput.focus();
});

// Close search modal
closeSearch.addEventListener('click', () => {
    searchModal.classList.remove('active');
    searchInput.value = '';
    searchResults.innerHTML = '<p class="search-hint">Start typing to search products...</p>';
});

// Close on outside click
searchModal.addEventListener('click', (e) => {
    if (e.target === searchModal) {
        searchModal.classList.remove('active');
        searchInput.value = '';
        searchResults.innerHTML = '<p class="search-hint">Start typing to search products...</p>';
    }
});

// Close on Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && searchModal.classList.contains('active')) {
        searchModal.classList.remove('active');
        searchInput.value = '';
        searchResults.innerHTML = '<p class="search-hint">Start typing to search products...</p>';
    }
});

// Real-time search
searchInput.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase().trim();

    if (query === '') {
        searchResults.innerHTML = '<p class="search-hint">Start typing to search products...</p>';
        return;
    }

    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query)
    );

    if (filteredProducts.length === 0) {
        searchResults.innerHTML = `
            <div class="no-results">
                <div class="no-results-icon">🔍</div>
                <p>No products found for "${query}"</p>
                <p style="font-size: 0.875rem; margin-top: 0.5rem;">Try searching with different keywords</p>
            </div>
        `;
        return;
    }

    searchResults.innerHTML = filteredProducts.map(product => `
        <div class="search-result-item" onclick="addToCartFromSearch(${product.id})">
            <div class="search-result-image" style="background: linear-gradient(135deg, ${getProductGradient(product.category)}); display: flex; align-items: center; justify-content: center; font-size: 2rem; color: white;">
                ${getProductIcon(product.category)}
            </div>
            <div class="search-result-info">
                <div class="search-result-category">${product.category}</div>
                <div class="search-result-name">${product.name}</div>
                <div class="search-result-price">
                    <span class="price-current">₹${product.price}</span>
                    ${product.originalPrice ? `<span class="price-original">₹${product.originalPrice}</span>` : ''}
                </div>
            </div>
        </div>
    `).join('');
});

// Add to cart from search
function addToCartFromSearch(productId) {
    addToCart(productId);
    searchModal.classList.remove('active');
    searchInput.value = '';
    searchResults.innerHTML = '<p class="search-hint">Start typing to search products...</p>';
}

// ========================================
// Review System
// ========================================
function initReviewSystem() {
    const openReviewBtn = document.getElementById('openReviewBtn');
    const reviewModal = document.getElementById('reviewModal');
    const closeReview = document.getElementById('closeReview');
    const reviewForm = document.getElementById('reviewForm');
    const starRating = document.getElementById('starRating');
    const stars = starRating?.querySelectorAll('.star');
    const reviewRatingInput = document.getElementById('reviewRating');

    if (!openReviewBtn || !reviewModal) return;

    // Open review modal
    openReviewBtn.addEventListener('click', () => {
        reviewModal.classList.add('active');
        updateStarDisplay(5); // Default to 5 stars
    });

    // Close review modal
    closeReview.addEventListener('click', () => {
        reviewModal.classList.remove('active');
    });

    // Close when clicking outside
    reviewModal.addEventListener('click', (e) => {
        if (e.target === reviewModal) {
            reviewModal.classList.remove('active');
        }
    });

    // Star rating interaction
    if (stars) {
        let selectedRating = 5;

        stars.forEach(star => {
            star.addEventListener('click', () => {
                selectedRating = parseInt(star.dataset.rating);
                reviewRatingInput.value = selectedRating;
                updateStarDisplay(selectedRating);
            });

            star.addEventListener('mouseenter', () => {
                const rating = parseInt(star.dataset.rating);
                updateStarDisplay(rating);
            });
        });

        starRating.addEventListener('mouseleave', () => {
            updateStarDisplay(selectedRating);
        });

        function updateStarDisplay(rating) {
            stars.forEach((star, index) => {
                if (index < rating) {
                    star.style.color = '#f59e0b';
                } else {
                    star.style.color = '#d1d5db';
                }
            });
        }
    }

    // Handle form submission
    if (reviewForm) {
        reviewForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const name = document.getElementById('reviewName').value;
            const rating = document.getElementById('reviewRating').value;
            const text = document.getElementById('reviewText').value;

            // Save review to localStorage
            const review = {
                name: name,
                rating: parseInt(rating),
                text: text,
                date: new Date().toISOString(),
                verified: true
            };

            let reviews = JSON.parse(localStorage.getItem('wearify-customerReviews') || '[]');
            reviews.unshift(review); // Add to beginning
            localStorage.setItem('wearify-customerReviews', JSON.stringify(reviews));

            // Show success notification
            showNotification('Thank you for your review! It has been submitted successfully. 🎉');

            // Reset form and close modal
            reviewForm.reset();
            reviewRatingInput.value = 5;
            updateStarDisplay(5);
            reviewModal.classList.remove('active');
        });
    }
}

// Load and display user reviews on about page
function loadUserReviews() {
    const reviewsContainer = document.getElementById('userReviews');
    if (!reviewsContainer) return;

    const reviews = JSON.parse(localStorage.getItem('wearify-customerReviews') || '[]');

    if (reviews.length === 0) return;

    reviews.forEach(review => {
        const initial = review.name.charAt(0).toUpperCase();
        const stars = '★'.repeat(review.rating) + '☆'.repeat(5 - review.rating);

        // Generate random gradient background
        const gradients = [
            'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
            'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
            'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
            'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
            'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)'
        ];
        const randomGradient = gradients[Math.floor(Math.random() * gradients.length)];

        const reviewCard = document.createElement('div');
        reviewCard.style.cssText = 'background: white; border-radius: 16px; padding: 2rem; box-shadow: 0 4px 20px rgba(0,0,0,0.1); transition: transform 0.3s ease;';

        reviewCard.innerHTML = `
            <div style="display: flex; align-items: center; gap: 1rem; margin-bottom: 1.5rem;">
                <div style="width: 60px; height: 60px; border-radius: 50%; background: ${randomGradient}; display: flex;  align-items: center; justify-content: center; color: white; font-size: 1.5rem; font-weight: 700;">${initial}</div>
                <div>
                    <h4 style="margin: 0; font-size: 1.125rem; color: var(--neutral-900);">${review.name}</h4>
                    <div style="color: #f59e0b; font-size: 1rem;">${stars}</div>
                </div>
            </div>
            <p style="color: var(--neutral-700); line-height: 1.6; font-style: italic;">"${review.text}"</p>
            <div style="color: var(--neutral-500); font-size: 0.875rem; margin-top: 1rem;">Verified Purchase</div>
        `;

        reviewsContainer.appendChild(reviewCard);
    });
}

// Initialize review system on page load (add to existing DOMContentLoaded)
const originalInit = document.addEventListener;
if (typeof initReviewSystem === 'function') {
    document.addEventListener('DOMContentLoaded', () => {
        initReviewSystem();
        loadUserReviews();
    });
}

// ========================================
// Checkout Page Functionality
// ========================================
function initCheckoutPage() {
    const checkoutItems = document.getElementById('checkoutItems');
    const checkoutSubtotal = document.getElementById('checkoutSubtotal');
    const checkoutTax = document.getElementById('checkoutTax');
    const checkoutTotal = document.getElementById('checkoutTotal');
    const placeOrderBtn = document.getElementById('placeOrderBtn');

    if (!checkoutItems) return; // Not on checkout page

    const cart = JSON.parse(localStorage.getItem('wearify-cart') || '[]');

    if (cart.length === 0) {
        checkoutItems.innerHTML = `
            <div style="text-align: center; padding: 3rem;">
                <div style="font-size: 4rem; margin-bottom: 1rem;">🛒</div>
                <h3 style="font-size: 1.5rem; margin-bottom: 1rem; color: var(--neutral-700);">Your cart is empty</h3>
                <p style="color: var(--neutral-600); margin-bottom: 2rem;">Add some items to get started!</p>
                <a href="/" class="btn btn-primary">Continue Shopping</a>
            </div>
        `;
        return;
    }

    // Get products array - it might not be loaded yet on checkout page
    const allProducts = typeof products !== 'undefined' ? products : [];

    // Display cart items
    let subtotal = 0;
    const itemsHTML = cart.map(item => {
        // Find product from products array
        let product = allProducts.find(p => p.id === item.id);

        // If product not found in array, use stored data from cart item
        if (!product && item.name) {
            product = {
                id: item.id,
                name: item.name,
                price: item.price || 0,
                category: item.category || 'Product'
            };
        }

        if (!product) return '';

        const itemTotal = product.price * item.quantity;
        subtotal += itemTotal;

        return `
            <div style="display: flex; gap: 1.5rem; padding: 1.5rem; border-bottom: 1px solid #e5e7eb; align-items: center;">
                <div style="flex-shrink: 0; width: 80px; height: 80px; background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%); border-radius: 8px;"></div>
                <div style="flex: 1;">
                    <h4 style="font-size: 1.125rem; margin-bottom: 0.5rem; color: var(--neutral-900);">${product.name}</h4>
                    <p style="color: var(--neutral-600); font-size: 0.875rem; margin-bottom: 0.5rem;">Category: ${product.category}</p>
                    <div style="display: flex; align-items: center; gap: 1rem;">
                        <span style="color: var(--neutral-600);">Qty: ${item.quantity}</span>
                        <span style="font-weight: 600; color: var(--primary-600);">₹${product.price.toFixed(2)} each</span>
                    </div>
                </div>
                <div style="text-align: right;">
                    <p style="font-size: 1.25rem; font-weight: 700; color: var(--neutral-900);">₹${itemTotal.toFixed(2)}</p>
                </div>
            </div>
        `;
    }).join('');

    checkoutItems.innerHTML = itemsHTML;

    // Calculate totals
    const taxRate = 0.18; // 18% GST
    const tax = subtotal * taxRate;
    const total = subtotal + tax;

    if (checkoutSubtotal) checkoutSubtotal.textContent = `₹${subtotal.toFixed(2)}`;
    if (checkoutTax) checkoutTax.textContent = `₹${tax.toFixed(2)}`;
    if (checkoutTotal) checkoutTotal.textContent = `₹${total.toFixed(2)}`;


    // Place order button
    if (placeOrderBtn) {
        placeOrderBtn.addEventListener('click', async () => {
            if (cart.length === 0) {
                showNotification('❌ Your cart is empty!');
                return;
            }

            try {
                // Change button state
                placeOrderBtn.disabled = true;
                placeOrderBtn.textContent = 'Processing...';

                // First, create a user (or get existing user ID)
                // For demo, we'll create a guest user
                const userResponse = await fetch('/api/users/register', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        name: 'Guest User',
                        email: 'guest@wearify.com',
                        phone: '9999999999'
                    })
                });

                let userId;
                if (userResponse.ok) {
                    const user = await userResponse.json();
                    userId = user.id;
                } else {
                    // If user already exists, get it by email
                    const existingUserResponse = await fetch('/api/users/email/guest@wearify.com');
                    if (existingUserResponse.ok) {
                        const existingUser = await existingUserResponse.json();
                        userId = existingUser.id;
                    } else {
                        throw new Error('Failed to create/get user');
                    }
                }

                // Create orders for each cart item
                const orderPromises = cart.map(async (item) => {
                    const orderData = {
                        userId: userId,
                        productId: item.id,
                        quantity: item.quantity,
                        addressId: 1 // Default address (you can make this dynamic later)
                    };

                    const response = await fetch(`/api/orders/place?userId=${userId}&productId=${item.id}&quantity=${item.quantity}&addressId=1`, {
                        method: 'POST'
                    });

                    if (!response.ok) {
                        throw new Error(`Failed to create order for ${item.name}`);
                    }

                    return await response.json();
                });

                // Wait for all orders to be created
                await Promise.all(orderPromises);

                // Clear cart from localStorage
                localStorage.removeItem('wearify-cart');
                cart = [];

                // Show success message
                showNotification(`🎉 Order placed successfully! ${cart.length} items ordered. Thank you!`);

                // Redirect to home after 2 seconds
                setTimeout(() => {
                    window.location.href = '/';
                }, 2000);

            } catch (error) {
                console.error('Order placement error:', error);
                showNotification('❌ Failed to place order. Please try again.');
                placeOrderBtn.disabled = false;
                placeOrderBtn.textContent = 'Place Order';
            }
        });
    }
}

// Add event listener to all "Proceed to Checkout" buttons
function initProceedToCheckout() {
    // Use event delegation on document
    document.addEventListener('click', (e) => {
        // Check if clicked element is the checkout button
        if (e.target && e.target.id === 'proceedToCheckout') {
            e.preventDefault();
            const cart = JSON.parse(localStorage.getItem('wearify-cart') || '[]');
            if (cart.length === 0) {
                showNotification('Your cart is empty! Add some items first.');
                return;
            }
            window.location.href = '/checkout';
        }
    });
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    initCheckoutPage();
    initProceedToCheckout();
});

// ========================================
// Dark Mode Theme Toggle
// ========================================
function initThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    if (!themeToggle) return;

    // Load saved theme preference
    const savedTheme = localStorage.getItem('wearify-theme') || 'light';
    applyTheme(savedTheme);

    // Toggle theme on button click
    themeToggle.addEventListener('click', () => {
        const currentTheme = document.body.classList.contains('dark-mode') ? 'dark' : 'light';
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        applyTheme(newTheme);
        localStorage.setItem('wearify-theme', newTheme);
    });
}

function applyTheme(theme) {
    if (theme === 'dark') {
        document.body.classList.add('dark-mode');
    } else {
        document.body.classList.remove('dark-mode');
    }
}

// Initialize theme on page load
document.addEventListener('DOMContentLoaded', () => {
    initThemeToggle();
});
