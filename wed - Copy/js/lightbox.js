// Lightbox functionality for Menu page gallery
class LightboxManager {
    constructor() {
        this.lightbox = null;
        this.images = [];
        this.currentIndex = 0;
        this.init();
    }

    init() {
        this.createLightbox();
        this.attachEventListeners();
    }

    createLightbox() {
        // Create lightbox HTML structure
        this.lightbox = document.createElement('div');
        this.lightbox.className = 'lightbox-overlay';
        this.lightbox.innerHTML = `
            <div class="lightbox-container">
                <button class="lightbox-close" aria-label="Close lightbox">&times;</button>
                <img class="lightbox-image" src="" alt="">
                <div class="lightbox-caption"></div>
                <button class="lightbox-nav lightbox-prev" aria-label="Previous image">‹</button>
                <button class="lightbox-nav lightbox-next" aria-label="Next image">›</button>
            </div>
        `;
        
        document.body.appendChild(this.lightbox);
        
        // Add styles for navigation buttons
        this.addNavigationStyles();
    }

    addNavigationStyles() {
        const style = document.createElement('style');
        style.textContent = `
            .lightbox-nav {
                position: absolute;
                top: 50%;
                transform: translateY(-50%);
                background: rgba(255, 255, 255, 0.2);
                border: none;
                color: white;
                font-size: 2rem;
                padding: 1rem;
                cursor: pointer;
                transition: var(--transition);
                border-radius: 4px;
            }
            .lightbox-nav:hover {
                background: rgba(255, 255, 255, 0.3);
            }
            .lightbox-prev {
                left: 1rem;
            }
            .lightbox-next {
                right: 1rem;
            }
        `;
        document.head.appendChild(style);
    }

    attachEventListeners() {
        // Close lightbox
        this.lightbox.querySelector('.lightbox-close').addEventListener('click', () => {
            this.close();
        });

        // Navigation
        this.lightbox.querySelector('.lightbox-prev').addEventListener('click', () => {
            this.previous();
        });

        this.lightbox.querySelector('.lightbox-next').addEventListener('click', () => {
            this.next();
        });

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (!this.lightbox.classList.contains('active')) return;
            
            switch(e.key) {
                case 'Escape':
                    this.close();
                    break;
                case 'ArrowLeft':
                    this.previous();
                    break;
                case 'ArrowRight':
                    this.next();
                    break;
            }
        });

        // Close on overlay click
        this.lightbox.addEventListener('click', (e) => {
            if (e.target === this.lightbox) {
                this.close();
            }
        });
    }

    open(imageElement) {
        this.images = Array.from(document.querySelectorAll('[data-lightbox]'));
        this.currentIndex = this.images.indexOf(imageElement);
        
        this.updateLightbox();
        this.lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    close() {
        this.lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }

    previous() {
        this.currentIndex = this.currentIndex > 0 ? this.currentIndex - 1 : this.images.length - 1;
        this.updateLightbox();
    }

    next() {
        this.currentIndex = this.currentIndex < this.images.length - 1 ? this.currentIndex + 1 : 0;
        this.updateLightbox();
    }

    updateLightbox() {
        const currentImage = this.images[this.currentIndex];
        const lightboxImage = this.lightbox.querySelector('.lightbox-image');
        const caption = this.lightbox.querySelector('.lightbox-caption');
        
        lightboxImage.src = currentImage.src;
        lightboxImage.alt = currentImage.alt;
        
        // Update caption if available
        const imageCaption = currentImage.getAttribute('data-caption');
        caption.textContent = imageCaption || '';
    }
}

// Auto-initialize lightbox for images with data-lightbox attribute
document.addEventListener('DOMContentLoaded', () => {
    const lightboxManager = new LightboxManager();
    
    // Attach click events to all lightbox images
    document.querySelectorAll('[data-lightbox]').forEach(image => {
        image.addEventListener('click', () => {
            lightboxManager.open(image);
        });
        
        // Keyboard accessibility
        image.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                lightboxManager.open(image);
            }
        });
        
        // Add cursor pointer and tabindex for accessibility
        image.style.cursor = 'pointer';
        image.setAttribute('tabindex', '0');
        image.setAttribute('role', 'button');
        image.setAttribute('aria-label', `View larger image: ${image.alt}`);
    });
});