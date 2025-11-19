// consolidated.js - All JavaScript functionality for Sweet Delights Bakery

// Navigation functionality
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
        this.menuToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            this.toggleMenu();
        });

        this.navLinks.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => this.closeMenu());
        });

        document.addEventListener('click', (e) => {
            if (this.isMenuOpen() && 
                !this.menuToggle.contains(e.target) && 
                !this.navLinks.contains(e.target)) {
                this.closeMenu();
            }
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isMenuOpen()) {
                this.closeMenu();
            }
        });

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
    }

    closeMenu() {
        this.menuToggle.classList.remove('active');
        this.navLinks.classList.remove('active');
        this.body.classList.remove('menu-open');
        this.menuToggle.setAttribute('aria-expanded', 'false');
    }

    isMenuOpen() {
        return this.navLinks.classList.contains('active');
    }
}

// Main initialization function
function initializeSweetDelights() {
    // Initialize only essential managers
    new NavigationManager();
    
    // Add page-specific initializations
    if (document.querySelector('.accordion-container')) {
        initializeAccordions();
    }
    
    if (document.getElementById('contactForm')) {
        initializeContactForm();
    }
    
    if (document.getElementById('dailySpecialDisplay')) {
        initializeHomepageFeatures();
    }
    
    if (document.querySelector('.product-card')) {
        initializeMenuFeatures();
    }
}

// Accordion functionality
function initializeAccordions() {
    const accordions = document.querySelectorAll('.accordion-container');
    
    accordions.forEach(container => {
        const items = container.querySelectorAll('.accordion-item');
        
        items.forEach(item => {
            const header = item.querySelector('.accordion-header');
            const content = item.querySelector('.accordion-content');
            
            header.addEventListener('click', () => {
                const isActive = content.classList.contains('active');
                
                // Close all accordions in the same container
                const allContents = item.parentNode.querySelectorAll('.accordion-content');
                const allHeaders = item.parentNode.querySelectorAll('.accordion-header');
                
                allContents.forEach(c => c.classList.remove('active'));
                allHeaders.forEach(h => h.classList.remove('active'));
                
                // Open current accordion if it was closed
                if (!isActive) {
                    content.classList.add('active');
                    header.classList.add('active');
                }
            });
        });
    });
}

// Contact form functionality
function initializeContactForm() {
    const contactForm = document.getElementById('contactForm');
    const messageTextarea = document.getElementById('message');
    const charCounter = document.getElementById('charCounter');
    
    if (messageTextarea && charCounter) {
        messageTextarea.addEventListener('input', function() {
            const length = this.value.length;
            charCounter.textContent = `${length}/1000 characters`;
            
            if (length > 800) {
                charCounter.classList.add('warning');
                charCounter.classList.remove('error');
            } else if (length > 950) {
                charCounter.classList.remove('warning');
                charCounter.classList.add('error');
            } else {
                charCounter.classList.remove('warning', 'error');
            }
        });
    }
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simple validation
            const name = document.getElementById('name');
            const email = document.getElementById('email');
            const message = document.getElementById('message');
            
            let isValid = true;
            
            // Clear previous errors
            document.querySelectorAll('.validation-error').forEach(error => error.remove());
            document.querySelectorAll('.field-error').forEach(field => field.classList.remove('field-error'));
            
            // Validate fields
            if (!name.value.trim()) {
                showError(name, 'Please enter your name');
                isValid = false;
            }
            
            if (!email.value.trim() || !isValidEmail(email.value)) {
                showError(email, 'Please enter a valid email address');
                isValid = false;
            }
            
            if (!message.value.trim() || message.value.trim().length < 10) {
                showError(message, 'Message must be at least 10 characters long');
                isValid = false;
            }
            
            if (isValid) {
                // Show loading state
                const submitButton = contactForm.querySelector('button[type="submit"]');
                const originalText = submitButton.innerHTML;
                submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
                submitButton.disabled = true;
                
                // Simulate form submission
                setTimeout(() => {
                    showSuccess('Thank you! Your message has been sent successfully.');
                    contactForm.reset();
                    if (charCounter) charCounter.textContent = '0/1000 characters';
                    submitButton.innerHTML = originalText;
                    submitButton.disabled = false;
                }, 2000);
            }
        });
    }
    
    function showError(field, message) {
        field.classList.add('field-error');
        const errorElement = document.createElement('div');
        errorElement.className = 'validation-error';
        errorElement.textContent = message;
        field.parentNode.appendChild(errorElement);
    }
    
    function showSuccess(message) {
        const successElement = document.createElement('div');
        successElement.className = 'form-success-message';
        successElement.innerHTML = `<i class="fas fa-check-circle"></i> ${message}`;
        
        const form = document.querySelector('.contact-form');
        form.insertBefore(successElement, form.firstChild);
        
        setTimeout(() => {
            successElement.remove();
        }, 5000);
    }
    
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
}

// Homepage features
function initializeHomepageFeatures() {
    // Business status
    function updateBusinessStatus() {
        const now = new Date();
        const day = now.getDay();
        const hour = now.getHours();
        const statusElement = document.getElementById('businessStatus');
        
        if (!statusElement) return;
        
        let isOpen = false;
        let statusText = '';
        
        if (day === 0) {
            statusText = 'Closed Today';
        } else if (day === 6) {
            isOpen = hour >= 8 && hour < 15;
            statusText = isOpen ? 'Open Now' : 'Closed Now';
        } else {
            isOpen = hour >= 7 && hour < 17;
            statusText = isOpen ? 'Open Now' : 'Closed Now';
        }
        
        statusElement.textContent = statusText;
        statusElement.className = `business-status ${isOpen ? '' : 'closed'}`;
    }
    
    // Daily specials rotation
    function rotateSpecials() {
        const specials = [
            "Today's Special: Fresh Sourdough Bread - 20% OFF!",
            "Weekend Deal: Buy 2 Croissants, Get 1 Free!",
            "New: Gluten-free Banana Bread now available!",
            "Special: Family Cake Pack - Only R199!",
            "Limited Time: Artisan Bread Basket - 15% OFF"
        ];
        
        const specialElement = document.getElementById('dailySpecialDisplay');
        if (!specialElement) return;
        
        const randomIndex = Math.floor(Math.random() * specials.length);
        const currentSpecial = specials[randomIndex];
        
        specialElement.style.opacity = '0';
        setTimeout(() => {
            specialElement.textContent = currentSpecial;
            specialElement.style.opacity = '1';
        }, 500);
    }
    
    // Date and time display
    function updateDateTime() {
        const timeElement = document.getElementById('liveDateTime');
        if (!timeElement) return;
        
        const now = new Date();
        const options = {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            timeZone: 'Africa/Johannesburg'
        };
        
        timeElement.textContent = now.toLocaleDateString('en-ZA', options);
    }
    
    // Statistics animation
    function animateStatistics() {
        function animateCounter(element, target, duration = 2000) {
            if (!element) return;
            
            let start = 0;
            const increment = target / (duration / 16);
            const timer = setInterval(() => {
                start += increment;
                if (start >= target) {
                    element.textContent = target;
                    clearInterval(timer);
                } else {
                    element.textContent = Math.floor(start);
                }
            }, 16);
        }
        
        setTimeout(() => {
            animateCounter(document.getElementById('happyCustomers'), 1250);
            animateCounter(document.getElementById('yearsExperience'), 15);
            animateCounter(document.getElementById('dailyBakes'), 200);
            animateCounter(document.getElementById('productsAvailable'), 45);
        }, 1000);
    }
    
    // Initialize homepage features
    updateBusinessStatus();
    updateDateTime();
    animateStatistics();
    
    setInterval(updateBusinessStatus, 60000);
    setInterval(updateDateTime, 60000);
    setInterval(rotateSpecials, 15000);
}

// Menu features
function initializeMenuFeatures() {
    // Add to cart functionality
    document.addEventListener('click', function(e) {
        if (e.target.closest('.add-to-cart') || e.target.closest('.cta-button.secondary')) {
            const button = e.target.closest('.add-to-cart') || e.target.closest('.cta-button.secondary');
            const productCard = button.closest('.product-card');
            const productName = productCard ? productCard.querySelector('h3').textContent : 'Product';
            const priceText = productCard ? productCard.querySelector('.price').textContent : '0';
            const price = extractPrice(priceText);
            
            addToCart(productName, price, button);
        }
    });
    
    function extractPrice(priceText) {
        const match = priceText.match(/R?(\d+\.?\d*)/);
        return match ? parseFloat(match[1]) : 0;
    }
    
    function addToCart(productName, price, button) {
        // Show notification
        showNotification(productName);
        
        // Update button state
        if (button) {
            updateButtonState(button);
        }
        
        console.log(`Added to cart: ${productName} - R${price.toFixed(2)}`);
    }
    
    function showNotification(productName) {
        let notification = document.getElementById('cartNotification');
        
        if (!notification) {
            notification = document.createElement('div');
            notification.id = 'cartNotification';
            notification.className = 'cart-notification';
            document.body.appendChild(notification);
        }
        
        notification.innerHTML = `
            <div class="cart-message">
                <i class="fas fa-check-circle"></i>
                <span>${productName} added to cart!</span>
            </div>
        `;
        
        notification.style.display = 'block';
        
        setTimeout(() => {
            notification.style.display = 'none';
        }, 3000);
    }
    
    function updateButtonState(button) {
        if (!button.dataset.original) {
            button.dataset.original = button.innerHTML;
        }

        const originalBackground = button.style.background;
        button.style.background = '#28a745';
        button.innerHTML = '<i class="fas fa-check"></i> Added!';

        setTimeout(() => {
            button.style.background = originalBackground;
            button.innerHTML = button.dataset.original;
        }, 2000);
    }
    
    // Menu filtering
    const filterButtons = document.querySelectorAll('.filter-btn');
    if (filterButtons.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                filterButtons.forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');
                
                const filter = this.getAttribute('data-filter');
                const menuCategories = document.querySelectorAll('.menu-category, .special-diet-section');
                
                menuCategories.forEach(category => {
                    if (filter === 'all' || category.getAttribute('data-category') === filter) {
                        category.style.display = 'block';
                    } else {
                        category.style.display = 'none';
                    }
                });
            });
        });
    }
    
    // Menu search
    const searchInput = document.getElementById('menuSearch');
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            const productCards = document.querySelectorAll('.product-card');
            
            productCards.forEach(card => {
                const productName = card.querySelector('h3').textContent.toLowerCase();
                const productDescription = card.querySelector('p').textContent.toLowerCase();
                
                if (productName.includes(searchTerm) || productDescription.includes(searchTerm)) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', initializeSweetDelights);