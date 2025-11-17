// Mobile navigation functionality
class NavigationManager {
    constructor() {
        this.menuToggle = document.querySelector('.mobile-menu-toggle');
        this.navLinks = document.querySelector('.navigation-links');
        this.init();
    }

    init() {
        if (this.menuToggle) {
            this.menuToggle.addEventListener('click', () => this.toggleMenu());
        }

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!this.menuToggle.contains(e.target) && !this.navLinks.contains(e.target)) {
                this.closeMenu();
            }
        });

        // Close menu on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeMenu();
            }
        });
    }

    toggleMenu() {
        this.navLinks.classList.toggle('active');
        this.updateToggleAriaLabel();
    }

    closeMenu() {
        this.navLinks.classList.remove('active');
        this.updateToggleAriaLabel();
    }

    updateToggleAriaLabel() {
        const isExpanded = this.navLinks.classList.contains('active');
        this.menuToggle.setAttribute('aria-expanded', isExpanded);
        this.menuToggle.setAttribute('aria-label', 
            isExpanded ? 'Close navigation menu' : 'Open navigation menu');
    }
}

// Initialize navigation when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new NavigationManager();
});