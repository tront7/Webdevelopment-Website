// Accordion functionality for About page
class AccordionManager {
    constructor(containerSelector = '.accordion-container') {
        this.accordions = document.querySelectorAll(containerSelector);
        this.init();
    }

    init() {
        this.accordions.forEach(container => {
            const items = container.querySelectorAll('.accordion-item');
            
            items.forEach(item => {
                const header = item.querySelector('.accordion-header');
                const content = item.querySelector('.accordion-content');
                
                header.addEventListener('click', () => {
                    this.toggleAccordion(item, content);
                });

                // Keyboard accessibility
                header.addEventListener('keydown', (e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        this.toggleAccordion(item, content);
                    }
                });
            });
        });
    }

    toggleAccordion(item, content) {
        const isActive = content.classList.contains('active');
        
        // Close all accordions in the same container
        const allContents = item.parentNode.querySelectorAll('.accordion-content');
        const allHeaders = item.parentNode.querySelectorAll('.accordion-header');
        
        allContents.forEach(c => c.classList.remove('active'));
        allHeaders.forEach(h => h.classList.remove('active'));
        
        // Open current accordion if it was closed
        if (!isActive) {
            content.classList.add('active');
            item.querySelector('.accordion-header').classList.add('active');
            
            // Smooth scroll to ensure accordion is visible
            content.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
    }
}

// Initialize accordions when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new AccordionManager();
});