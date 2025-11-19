# Sweet Delights Bakery Static Website Documentation

This project is a static bakery website template built with clean HTML, CSS, and modular JavaScript. It is designed to showcase an artisan bakery with interactive features, responsive design, and comprehensive functionality across all pages.

## Features

- **Five Main Pages**: Home, About, Menu, Deliveries, and Contact
- **Responsive Navigation**: Mobile-friendly hamburger menu with smooth animations
- **Interactive Components**: 
  - Image lightbox for menu items
  - Accordion FAQs
  - Form validation
  - Modal dialogs
  - Live content updates
  - Search functionality
- **Centralized Styling**: Comprehensive CSS with CSS variables and modern design
- **External Dependencies**: 
  - Font Awesome for icons
  - Google Fonts for custom typography (Roboto & Merriweather)
- **Semantic HTML5**: Modern, accessible structure using semantic tags
- **Accessibility Features**: ARIA labels, keyboard navigation, focus management

## File & Folder Structure

The project uses a modular, organized structure to manage assets and functionality:
SweetDelights/
├── pages/ # All website pages
│ ├── about.html # Our story and staff profiles
│ ├── contact.html # Contact form and business information
│ ├── deliveries.html # Delivery information and ordering
│ └── menu.html # Product categories with lightbox
├── js/ # Modular JavaScript components
│ └── script.js #FAQ accordion functionality
│               # Contact form validation
│               # Image lightbox for products
│               # Dynamic content updates
│               # Modal dialog system
│               # Mobile navigation manager
│               # Search functionality
├── css/
│ └── style.css # Main stylesheet with CSS variables
├── assets/ # All media assets
│ ├── images/ # Product images, staff photos, logos
│ └── screenshots/ # Project documentation images
├── index.html # Home page (landing page)
├── miscelleneous/ # Information about website
├── Changelog.md # Record of major changes to website
└── README.md # Project documentation


## Technical Implementation

### CSS Architecture
- **CSS Custom Properties**: Centralized color scheme and design tokens
- **Mobile-First Approach**: Responsive design with progressive enhancement
- **Component-Based Styling**: Reusable card components and utility classes
- **Smooth Animations**: CSS transitions and transforms for enhanced UX
- **Accessibility Focus**: High contrast ratios and focus indicators

### JavaScript Modules
- **NavigationManager**: Handles mobile menu toggle and accessibility
- **Form Validation**: Real-time input validation with user feedback
- **Lightbox System**: Full-screen image viewing for product galleries
- **Accordion Component**: Collapsible content sections for FAQs
- **Modal System**: Reusable dialog windows for various interactions

### Key Components
- **Hero Section**: Gradient background with call-to-action buttons
- **Product Cards**: Hover effects with price display and lightbox integration
- **Staff Profiles**: Team member cards with photos and descriptions
- **Contact Form**: Validated form with success/error states
- **Delivery Information**: Process steps and service area details
- **Special Diet Options**: Dietary requirement accommodations display

## Installation / How to Run

This is a static website requiring no server configuration:

1. **Download or clone** the project files
2. **Open `index.html`** in any modern web browser (Chrome, Firefox, Safari, Edge)
3. **Navigate between pages** using the header navigation

### Development Setup
For local development:
```bash
# Clone the repository
git clone <repository-url>

# Open in code editor
cd SweetDelights
code .

##Browser Requirements:

-Chrome 90+
-Firefox 88+
-Safari 14+
-Edge 90+
-JavaScript must be enabled for full functionality

## Usage Instructions
To customize and expand the bakery website:

#Styling & Theming
Edit css/style.css to modify colors, fonts, and layout
Update CSS custom properties in the :root section for global theme changes
Modify component styles in their respective CSS sections
Adjust media queries for custom responsive breakpoints

#Content Management:
Update text content, images, and product information in HTML files
Add new staff members in about.html following the existing card structure
Expand menu items in menu.html using the product grid pattern
Modify delivery information and partners in deliveries.html

#Navigation & Structure:
Maintain relative path structure when adding new pages
From pages/ folder: ../index.html
From root: ./pages/menu.html
Update navigation links in all header components
Follow semantic HTML5 structure for new sections
JavaScript Features:
Extend functionality by modifying respective JS modules in js/ folder
Add new interactive components using existing patterns
Customize form validation rules in form-validation.js
Modify lightbox behavior in lightbox.js
Delivery Information:
Update partner names and logos in deliveries.html
Specify actual delivery radius and service areas
Modify delivery process steps to match business workflow
Adjust pricing, minimum orders, and delivery rules
Assets Management:

Replace placeholder images in assets/images/ with actual photos
Optimize images for web before adding
Maintain consistent file naming conventions
Update image references in HTML files

#References
External Libraries & Resources:

Font Awesome. (2025). Icon library v6.5.2. Retrieved from: https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css
Google Fonts. (2025). Typography: Merriweather & Roboto. Retrieved from: https://fonts.googleapis.com/css2?family=Merriweather:wght@700&family=Roboto&display=swap
Placeholder Images. (2025). Development placeholder service. Retrieved from: https://placehold.co/

#Technical Standards
HTML5 Living Standard
CSS3 Specifications
ECMAScript 2023
Web Content Accessibility Guidelines (WCAG) 2.1

#Development Tools:
Modern web browsers with developer tools
Code editors with HTML/CSS/JS support
Image optimization tools
Accessibility validation tools

#Author
[Nemukongwe Oripfa Clinton]