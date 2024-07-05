// Get the header and footer heights
let headerHeight = document.querySelector('header').offsetHeight;
let footerHeight = document.querySelector('footer').offsetHeight;

// Calculate total fixed height in pixels
let totalFixedHeight = headerHeight + footerHeight;

// Calculate remaining height in vh
let viewportHeight = window.innerHeight;
let remainingHeightInVh = ((viewportHeight - totalFixedHeight) / viewportHeight) * 100;

// Set the main element's height dynamically
let mainElement = document.querySelector('main');
mainElement.style.height = remainingHeightInVh + 'vh';