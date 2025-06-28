
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
    
    // Initialize non-critical functionality with slight delay
    requestIdleCallback(() => {
        initContactForm();
        const heroCleanup = initHeroSlider();
        initAnimations();
        
        // Store cleanup functions for potential use
        window.appCleanup = [heroCleanup].filter(Boolean);
    });
});

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
