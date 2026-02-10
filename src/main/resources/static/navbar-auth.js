// ========================================
// Navbar User Authentication Display
// ========================================
document.addEventListener('DOMContentLoaded', () => {
    updateNavbarAuth();
});

function updateNavbarAuth() {
    const userBtn = document.getElementById('userBtn');
    const loginBtn = document.getElementById('loginBtn');
    const user = localStorage.getItem('wearify-user');

    if (!userBtn || !loginBtn) return;

    if (user) {
        const userData = JSON.parse(user);

        // Show user button, hide login button
        userBtn.style.display = 'flex';
        loginBtn.style.display = 'none';

        // Create custom tooltip
        let tooltip = null;

        userBtn.addEventListener('mouseenter', (e) => {
            // Create tooltip element
            tooltip = document.createElement('div');
            tooltip.textContent = userData.name;
            tooltip.style.cssText = `
                position: fixed;
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                color: white;
                padding: 0.5rem 1rem;
                border-radius: 8px;
                font-size: 0.875rem;
                font-weight: 600;
                box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
                z-index: 10000;
                pointer-events: none;
                white-space: nowrap;
                opacity: 0;
                transform: translateY(-5px);
                transition: all 0.5s ease;
                font-family: 'Inter', sans-serif;
            `;

            // Position tooltip
            const rect = userBtn.getBoundingClientRect();
            tooltip.style.top = (rect.bottom + 8) + 'px';
            tooltip.style.left = (rect.left + rect.width / 2) + 'px';
            tooltip.style.transform = 'translateX(-50%) translateY(-5px)';

            document.body.appendChild(tooltip);

            // Animate in
            setTimeout(() => {
                if (tooltip) {
                    tooltip.style.opacity = '1';
                    tooltip.style.transform = 'translateX(-50%) translateY(0)';
                }
            }, 10);
        });

        userBtn.addEventListener('mouseleave', () => {
            if (tooltip) {
                tooltip.style.opacity = '0';
                tooltip.style.transform = 'translateX(-50%) translateY(-5px)';
                setTimeout(() => {
                    if (tooltip && tooltip.parentNode) {
                        tooltip.parentNode.removeChild(tooltip);
                    }
                    tooltip = null;
                }, 500);
            }
        });

        // Add click handler for user button
        userBtn.addEventListener('click', () => {
            // Remove tooltip on click
            if (tooltip && tooltip.parentNode) {
                tooltip.parentNode.removeChild(tooltip);
                tooltip = null;
            }

            const confirmed = confirm(`Logged in as: ${userData.name}\n\nDo you want to logout?`);
            if (confirmed) {
                localStorage.removeItem('wearify-user');
                showNotification('👋 Logged out successfully!');
                setTimeout(() => {
                    window.location.reload();
                }, 1000);
            }
        });
    } else {
        // Show login button, hide user button
        userBtn.style.display = 'none';
        loginBtn.style.display = 'flex';
    }
}
