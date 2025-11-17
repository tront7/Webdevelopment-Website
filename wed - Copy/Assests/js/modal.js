// Modal functionality for Contact and other pages
class ModalManager {
    constructor() {
        this.modals = new Map();
        this.init();
    }

    init() {
        // Initialize all modals
        document.querySelectorAll('.modal-overlay').forEach(modal => {
            const modalId = modal.id;
            this.modals.set(modalId, modal);
            
            // Close modal on overlay click
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    this.closeModal(modalId);
                }
            });
        });

        // Initialize open buttons
        document.querySelectorAll('[data-modal-open]').forEach(button => {
            const modalId = button.getAttribute('data-modal-open');
            button.addEventListener('click', () => this.openModal(modalId));
        });

        // Initialize close buttons
        document.querySelectorAll('[data-modal-close]').forEach(button => {
            const modalId = button.getAttribute('data-modal-close');
            button.addEventListener('click', () => this.closeModal(modalId));
        });

        // Close modal on Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeAllModals();
            }
        });
    }

    openModal(modalId) {
        const modal = this.modals.get(modalId);
        if (modal) {
            modal.classList.add('active');
            document.body.style.overflow = 'hidden'; // Prevent background scrolling
            
            // Focus trap
            this.trapFocus(modal);
            
            // Dispatch custom event
            modal.dispatchEvent(new CustomEvent('modalOpen', { bubbles: true }));
        }
    }

    closeModal(modalId) {
        const modal = this.modals.get(modalId);
        if (modal) {
            modal.classList.remove('active');
            document.body.style.overflow = ''; // Restore scrolling
            
            // Dispatch custom event
            modal.dispatchEvent(new CustomEvent('modalClose', { bubbles: true }));
        }
    }

    closeAllModals() {
        this.modals.forEach((modal, modalId) => {
            this.closeModal(modalId);
        });
    }

    trapFocus(modal) {
        const focusableElements = modal.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        
        if (focusableElements.length > 0) {
            const firstElement = focusableElements[0];
            const lastElement = focusableElements[focusableElements.length - 1];
            
            modal.addEventListener('keydown', function trapHandler(e) {
                if (e.key === 'Tab') {
                    if (e.shiftKey) {
                        if (document.activeElement === firstElement) {
                            e.preventDefault();
                            lastElement.focus();
                        }
                    } else {
                        if (document.activeElement === lastElement) {
                            e.preventDefault();
                            firstElement.focus();
                        }
                    }
                }
            });
        }
    }
}

// Initialize modals when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ModalManager();
});