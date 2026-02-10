// ========================================
// Authentication System for Wearify
// ========================================

document.addEventListener('DOMContentLoaded', () => {
    initAuthTabs();
    initAuthForms();
});

// ========================================
// Tab Switching
// ========================================
function initAuthTabs() {
    const tabs = document.querySelectorAll('.auth-tab');
    const forms = document.querySelectorAll('.auth-form');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const targetTab = tab.dataset.tab;

            // Remove active from all tabs and forms
            tabs.forEach(t => t.classList.remove('active'));
            forms.forEach(f => f.classList.remove('active'));

            // Add active to clicked tab and corresponding form
            tab.classList.add('active');
            document.getElementById(`${targetTab}Form`).classList.add('active');
        });
    });
}

// ========================================
// Form Handling
// ========================================
function initAuthForms() {
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');

    // Password toggle for register form
    const toggleRegisterPassword = document.getElementById('toggleRegisterPassword');
    const registerPasswordInput = document.getElementById('registerPassword');
    const showPasswordIcon = document.getElementById('showPasswordIcon');
    const hidePasswordIcon = document.getElementById('hidePasswordIcon');

    if (toggleRegisterPassword) {
        toggleRegisterPassword.addEventListener('click', () => {
            if (registerPasswordInput.type === 'password') {
                registerPasswordInput.type = 'text';
                showPasswordIcon.style.display = 'none';
                hidePasswordIcon.style.display = 'block';
            } else {
                registerPasswordInput.type = 'password';
                showPasswordIcon.style.display = 'block';
                hidePasswordIcon.style.display = 'none';
            }
        });
    }

    // Password toggle for login form
    const toggleLoginPassword = document.getElementById('toggleLoginPassword');
    const loginPasswordInput = document.getElementById('loginPassword');
    const showLoginPasswordIcon = document.getElementById('showLoginPasswordIcon');
    const hideLoginPasswordIcon = document.getElementById('hideLoginPasswordIcon');

    if (toggleLoginPassword) {
        toggleLoginPassword.addEventListener('click', () => {
            if (loginPasswordInput.type === 'password') {
                loginPasswordInput.type = 'text';
                showLoginPasswordIcon.style.display = 'none';
                hideLoginPasswordIcon.style.display = 'block';
            } else {
                loginPasswordInput.type = 'password';
                showLoginPasswordIcon.style.display = 'block';
                hideLoginPasswordIcon.style.display = 'none';
            }
        });
    }

    // Login Form
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const email = document.getElementById('loginEmail').value;
        const password = document.getElementById('loginPassword').value;
        const rememberMe = document.getElementById('rememberMe').checked;

        try {
            // Check if user exists in backend
            const response = await fetch(`/api/users/email/${email}`);

            if (response.ok) {
                const user = await response.json();

                // Store user in localStorage
                const userData = {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    phone: user.phone,
                    isLoggedIn: true,
                    loginTime: new Date().toISOString()
                };

                localStorage.setItem('wearify-user', JSON.stringify(userData));

                // Show success message
                showNotification('✅ Login successful! Welcome back!');

                // Redirect based on return URL or home
                const returnUrl = new URLSearchParams(window.location.search).get('return') || '/';
                setTimeout(() => {
                    window.location.href = returnUrl;
                }, 1000);

            } else {
                showNotification('❌ User not found. Please register first.');
            }

        } catch (error) {
            console.error('Login error:', error);
            showNotification('❌ Login failed. Please try again.');
        }
    });

    // Register Form
    registerForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const name = document.getElementById('registerName').value;
        const email = document.getElementById('registerEmail').value;
        const phone = document.getElementById('registerPhone').value;
        const password = document.getElementById('registerPassword').value;

        try {
            // Register user via API
            const response = await fetch('/api/users/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: name,
                    email: email,
                    phone: phone
                })
            });

            if (response.ok) {
                const user = await response.json();

                // Store user in localStorage
                const userData = {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    phone: user.phone,
                    isLoggedIn: true,
                    loginTime: new Date().toISOString()
                };

                localStorage.setItem('wearify-user', JSON.stringify(userData));

                // Show success message
                showNotification('🎉 Account created successfully! Welcome to Wearify!');

                // Redirect to home
                setTimeout(() => {
                    window.location.href = '/';
                }, 1500);

            } else {
                const error = await response.text();
                showNotification('❌ Registration failed. Email may already exist.');
            }

        } catch (error) {
            console.error('Registration error:', error);
            showNotification('❌ Registration failed. Please try again.');
        }
    });
}

// ========================================
// Utility Functions
// ========================================
function showNotification(message) {
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
        font-family: 'Inter', sans-serif;
    `;
    notification.textContent = message;

    // Add animation
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

// Check if user is logged in
function isUserLoggedIn() {
    const user = localStorage.getItem('wearify-user');
    if (!user) return false;

    const userData = JSON.parse(user);
    return userData.isLoggedIn === true;
}

// Get logged in user
function getLoggedInUser() {
    const user = localStorage.getItem('wearify-user');
    if (!user) return null;

    return JSON.parse(user);
}

// Logout user
function logoutUser() {
    localStorage.removeItem('wearify-user');
    showNotification('👋 Logged out successfully!');
    setTimeout(() => {
        window.location.href = '/';
    }, 1000);
}
