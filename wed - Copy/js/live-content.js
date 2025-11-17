// Real-time content updates
class LiveContentManager {
    constructor() {
        this.specials = [
            "Today's Special: Fresh Sourdough Bread - 20% OFF!",
            "Weekend Deal: Buy 2 Croissants, Get 1 Free!",
            "New: Gluten-free Banana Bread now available!",
            "Special: Family Cake Pack - Only R199!",
            "Limited Time: Artisan Bread Basket - 15% OFF"
        ];
        this.init();
    }

    init() {
        this.updateDateTime();
        this.rotateSpecials();
        
        // Update time every second
        setInterval(() => this.updateDateTime(), 1000);
        
        // Rotate specials every 15 seconds
        setInterval(() => this.rotateSpecials(), 15000);
    }

    updateDateTime() {
        const now = new Date();
        const options = {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            timeZone: 'Africa/Johannesburg'
        };
        
        const dateTimeString = now.toLocaleDateString('en-ZA', options);
        const timeElement = document.getElementById('liveDateTime');
        
        if (timeElement) {
            timeElement.textContent = dateTimeString;
        }
    }

    rotateSpecials() {
        const specialElement = document.getElementById('dailySpecialDisplay');
        if (specialElement) {
            const randomIndex = Math.floor(Math.random() * this.specials.length);
            const currentSpecial = this.specials[randomIndex];
            
            // Fade out
            specialElement.style.opacity = '0';
            
            setTimeout(() => {
                specialElement.textContent = currentSpecial;
                // Fade in
                specialElement.style.opacity = '1';
            }, 500);
        }
    }
}

// Initialize live content
document.addEventListener('DOMContentLoaded', () => {
    new LiveContentManager();
});