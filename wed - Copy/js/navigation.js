// Mobile navigation functionality
class NavigationManager {
    constructor() {
        this.menuToggle = document.querySelector('.mobile-menu-toggle');
        this.navLinks = document.querySelector('.navigation-links');
        this.body = document.body;
        this.init();
    }

    init() {
        if (!this.menuToggle || !this.navLinks) return;

        this.setupEventListeners();
    }

    setupEventListeners() {
        // Menu toggle click
        this.menuToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            this.toggleMenu();
        });

        // Close menu when clicking on nav links
        this.navLinks.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => this.closeMenu());
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (this.isMenuOpen() && 
                !this.menuToggle.contains(e.target) && 
                !this.navLinks.contains(e.target)) {
                this.closeMenu();
            }
        });

        // Close menu on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isMenuOpen()) {
                this.closeMenu();
            }
        });

        // Close menu on window resize (if resizing to desktop)
        window.addEventListener('resize', () => {
            if (window.innerWidth > 768 && this.isMenuOpen()) {
                this.closeMenu();
            }
        });
    }

    toggleMenu() {
        this.isMenuOpen() ? this.closeMenu() : this.openMenu();
    }

    openMenu() {
        this.menuToggle.classList.add('active');
        this.navLinks.classList.add('active');
        this.body.classList.add('menu-open');
        this.menuToggle.setAttribute('aria-expanded', 'true');
        this.menuToggle.setAttribute('aria-label', 'Close navigation menu');
    }

    closeMenu() {
        this.menuToggle.classList.remove('active');
        this.navLinks.classList.remove('active');
        this.body.classList.remove('menu-open');
        this.menuToggle.setAttribute('aria-expanded', 'false');
        this.menuToggle.setAttribute('aria-label', 'Open navigation menu');
    }

    isMenuOpen() {
        return this.navLinks.classList.contains('active');
    }
}

// Initialize navigation when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new NavigationManager();
});