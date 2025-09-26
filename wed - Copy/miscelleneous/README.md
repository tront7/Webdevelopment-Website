## Sweet Delights Bakery Static Website Documentation
This project is a static bakery website template built with clean HTML, CSS, and basic JavaScript. It is designed to showcase an artisan bakery, complete with menu listings, an 'About Us' section, and a dedicated delivery page.

## Features 
Five Pages: Includes Home, About, Menu, Deliveries (latest addition), and Contact.

Responsive Navigation: A mobile-friendly hamburger menu controlled by vanilla JavaScript.

Centralized Styling: A single, well-organized CSS file (style.css) handles all layout, typography, and responsive adjustments.

External Dependencies: Integration with Font Awesome for social media and navigation icons, and Google Fonts for custom typography.

Semantic HTML5: Structured using modern, semantic tags (<header>, <main>, <footer>, <section>).

##  File & Folder Structure
The project uses a clear, hierarchical structure to manage assets and pages:

 SweetDelights/
├── page/  
│   ├── about.html           # Our story and staff (includes staff cards).  
│   ├── contact.html         # Contact form and opening hours.
│   ├── deliveries.html      # NEW: Delivery information and ordering guide.  
│   └── menu.html            # Menu cards for breads, pastries, and cakes.
│
├── css/
│   └── style.css            # Main stylesheet for all 5 pages.   
│
└── Assests/
│   └── *images*             # Folder containing all site images,Logo,Screenshots  
│
└── index.html               # Home page (entry point).

 ## Installation / How to Run
This is a static website and requires no server configuration:

Download or clone the project files.

Open the index.html file in any modern web browser (e.g., Chrome, Safari, Firefox).

## Usage Instructions
To modify and expand the bakery website:

Styling: Edit the css/style.css file to update the site's colors, font stacks, card styles, and responsiveness.

Navigation Paths: All links in the header and footer use relative paths (e.g., ../index.html from the page/ folder or ./page/menu.html from index.html). Be sure to maintain this structure when adding new pages.

Deliveries Page: Customize the text in deliveries.html with actual partner names (Uber Eats, Mr. D Food, etc.) and your specific delivery radius.

## References

- **Font Awesome** - For social media and UI icons
  - Used version 6.5.2 from CDNJS
  - Link: `https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css`

- **Google Fonts** - For typography
  - Merriweather (700 weight) for headings
  - Roboto (regular and 300 weight) for body text
  - Link: `https://fonts.googleapis.com/css2?family=Merriweather:wght@700&family=Roboto&display=swap`

- **Placeholder Images** - For delivery partner logo placeholder
  - Used placeholder.co service
  - Example: `https://placehold.co/250x150/EFEFEF/3D2B1F?text=Delivery+Partner`

Author: [Nemukongwe Oripfa Clinton]