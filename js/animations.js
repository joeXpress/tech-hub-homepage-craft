
// Animation and intersection observer
export function initAnimations() {
    // Optimized intersection observer
    const observerOptions = {
        threshold: [0.1, 0.2],
        rootMargin: '0px 0px -50px 0px'
    };
    
    const animatedElements = new Set();
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !animatedElements.has(entry.target)) {
                requestAnimationFrame(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    animatedElements.add(entry.target);
                });
                
                // Stop observing once animated
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Batch DOM queries
    const elementsToAnimate = document.querySelectorAll('.card, .program-card, .testimonial-card');
    
    elementsToAnimate.forEach(el => {
        // Set initial state
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        el.style.willChange = 'opacity, transform';
        
        observer.observe(el);
    });
    
    // Button ripple effects with event delegation
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('btn')) {
            createRipple(e, e.target);
        }
    });
    
    function createRipple(event, button) {
        const ripple = document.createElement('span');
        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = event.clientX - rect.left - size / 2;
        const y = event.clientY - rect.top - size / 2;
        
        ripple.style.cssText = `
            position: absolute;
            left: ${x}px;
            top: ${y}px;
            width: ${size}px;
            height: ${size}px;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.3);
            transform: scale(0);
            animation: ripple 0.6s linear;
            pointer-events: none;
        `;
        
        button.style.position = 'relative';
        button.style.overflow = 'hidden';
        button.appendChild(ripple);
        
        ripple.addEventListener('animationend', () => ripple.remove());
    }
}

// Add CSS animation dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    .error {
        border-color: #dc3545 !important;
        box-shadow: 0 0 0 0.2rem rgba(220, 53, 69, 0.25);
    }
`;
document.head.appendChild(style);
