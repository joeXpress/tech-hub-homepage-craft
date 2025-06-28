
// Navigation and smooth scrolling
export function initNavigation() {
    // Smooth scrolling with performance optimization
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            e.preventDefault();
            
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                // Use native smooth scrolling with fallback
                if ('scrollBehavior' in document.documentElement.style) {
                    targetSection.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                } else {
                    // Fallback for older browsers
                    const targetPosition = targetSection.offsetTop;
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
}
