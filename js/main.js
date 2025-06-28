
// Main application entry point with performance optimizations
import { initPreloader } from './preloader.js';
import { initTheme } from './theme.js';
import { initHeroSlider } from './hero-slider.js';
import { initNavigation } from './navigation.js';
import { initContactForm } from './forms.js';
import { initAnimations } from './animations.js';
import { DeliveryManager } from './delivery.js';

// Performance monitoring
const perfMarks = {
    start: performance.now(),
    domReady: null,
    fullyLoaded: null
};

// Initialize core functionality immediately
document.addEventListener('DOMContentLoaded', function() {
    perfMarks.domReady = performance.now();
    
    // Initialize critical functionality first
    initPreloader();
    initTheme();
    initNavigation();
    
    // Initialize delivery system
    window.deliveryManager = new DeliveryManager();
    
    // Fix delivery booking button links
    const deliveryButtons = document.querySelectorAll('.btn-success');
    deliveryButtons.forEach(button => {
        if (button.textContent.includes('Book Delivery') || button.textContent.includes('Book Now')) {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                window.deliveryManager.showDeliveryBooking();
            });
        }
    });
    
    // Initialize program slideshows
    initProgramSlideshows();
    
    // Initialize non-critical functionality with slight delay
    requestIdleCallback(() => {
        initContactForm();
        const heroCleanup = initHeroSlider();
        initAnimations();
        
        // Store cleanup functions for potential use
        window.appCleanup = [heroCleanup].filter(Boolean);
    });
});

// Initialize program slideshows
function initProgramSlideshows() {
    const programCards = document.querySelectorAll('.program-card');
    
    const programImages = {
        'Software Development': [
            'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=300&fit=crop',
            'https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=400&h=300&fit=crop',
            'https://images.unsplash.com/photo-1605810230434-7631ac76ec81?w=400&h=300&fit=crop'
        ],
        'Video Editing and Graphics Design': [
            'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=300&fit=crop',
            'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400&h=300&fit=crop',
            'https://images.unsplash.com/photo-1626785774573-4b799315345d?w=400&h=300&fit=crop'
        ],
        'Data Analysis': [
            'https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&h=300&fit=crop',
            'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop',
            'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop'
        ],
        'Forex Trading': [
            'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=400&h=300&fit=crop',
            'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=400&h=300&fit=crop',
            'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400&h=300&fit=crop'
        ],
        'UI/UX Design': [
            'https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=400&h=300&fit=crop',
            'https://images.unsplash.com/photo-1558655146-364adaf1fcc9?w=400&h=300&fit=crop',
            'https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=400&h=300&fit=crop'
        ],
        'Gadget Repairs & Sales': [
            'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=400&h=300&fit=crop',
            'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=400&h=300&fit=crop',
            'https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?w=400&h=300&fit=crop'
        ]
    };
    
    programCards.forEach(card => {
        const title = card.querySelector('h3').textContent;
        const imageContainer = card.querySelector('.program-image');
        const images = programImages[title];
        
        if (images && imageContainer) {
            let currentImageIndex = 0;
            const img = imageContainer.querySelector('img');
            
            function changeImage() {
                currentImageIndex = (currentImageIndex + 1) % images.length;
                img.src = images[currentImageIndex];
            }
            
            // Start slideshow
            setInterval(changeImage, 6000);
        }
    });
}

// Initialize remaining functionality after full page load
window.addEventListener('load', function() {
    perfMarks.fullyLoaded = performance.now();
    
    // Log performance metrics (can be removed in production)
    console.log('Performance metrics:', {
        domReady: `${(perfMarks.domReady - perfMarks.start).toFixed(2)}ms`,
        fullyLoaded: `${(perfMarks.fullyLoaded - perfMarks.start).toFixed(2)}ms`
    });
});

// Global functions for backward compatibility (will be removed eventually)
window.showDeliveryBooking = () => window.deliveryManager?.showDeliveryBooking();
window.showHome = () => window.deliveryManager?.showHome();
window.showBookingForm = (event) => {
    const button = event?.target || document.querySelector('.tab-btn');
    window.deliveryManager?.switchTab(button);
};
window.showTrackingForm = (event) => {
    const button = event?.target || document.querySelectorAll('.tab-btn')[1];
    window.deliveryManager?.switchTab(button);
};
window.trackPackage = () => window.deliveryManager?.trackPackage();
window.submitRating = () => window.deliveryManager?.submitRating();

// Error handling
window.addEventListener('error', function(e) {
    console.error('Application error:', e.error);
});

// Cleanup on page unload
window.addEventListener('beforeunload', function() {
    if (window.appCleanup) {
        window.appCleanup.forEach(cleanup => {
            if (typeof cleanup === 'function') {
                cleanup();
            }
        });
    }
});
