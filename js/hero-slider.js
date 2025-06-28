
// Hero slider functionality
export function initHeroSlider() {
    const slides = [
        {
            title: "LEARN GROW AND EXPLORE ENDLESS OPPORTUNITIES!",
            subtitle: "Join a community of like-minded learners and industry professionals who are passionate about technology and..."
        },
        {
            title: "We Provide Services That You Can Trust!",
            subtitle: "Dedicated to empowering individuals and businesses with cutting-edge solutions."
        },
        {
            title: "Get the skills, mentorship, and resources you need to thrive in today's digital world.",
            subtitle: ""
        }
    ];
    
    let currentSlide = 0;
    let slideInterval;
    
    const heroTitle = document.getElementById('heroTitle');
    const heroSubtitle = document.getElementById('heroSubtitle');
    const indicators = document.querySelectorAll('.indicator');
    
    if (!heroTitle || !heroSubtitle || !indicators.length) return;
    
    function updateSlide(index) {
        currentSlide = index;
        
        // Use requestAnimationFrame for smooth updates
        requestAnimationFrame(() => {
            heroTitle.textContent = slides[currentSlide].title;
            heroSubtitle.textContent = slides[currentSlide].subtitle;
            
            indicators.forEach((indicator, i) => {
                indicator.classList.toggle('active', i === currentSlide);
            });
        });
    }
    
    function startAutoSlide() {
        slideInterval = setInterval(() => {
            currentSlide = (currentSlide + 1) % slides.length;
            updateSlide(currentSlide);
        }, 5000);
    }
    
    function stopAutoSlide() {
        clearInterval(slideInterval);
    }
    
    // Indicator click handlers with event delegation
    const indicatorContainer = indicators[0]?.parentElement;
    if (indicatorContainer) {
        indicatorContainer.addEventListener('click', (e) => {
            if (e.target.classList.contains('indicator')) {
                const index = Array.from(indicators).indexOf(e.target);
                if (index !== -1) {
                    stopAutoSlide();
                    updateSlide(index);
                    startAutoSlide();
                }
            }
        });
    }
    
    // Pause on hover
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
        heroSection.addEventListener('mouseenter', stopAutoSlide);
        heroSection.addEventListener('mouseleave', startAutoSlide);
    }
    
    startAutoSlide();
    
    // Cleanup function
    return () => {
        stopAutoSlide();
    };
}
