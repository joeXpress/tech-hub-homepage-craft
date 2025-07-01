
// Global variables
let isDarkMode = false;
let currentSlide = 0;
let slideInterval;

// Hero slides data
const slides = [
    {
        title: "LEARN GROW AND EXPLORE ENDLESS OPPORTUNITIES!",
        subtitle: "Join a community of like-minded learners and industry professionals who are passionate about technology and...",
        bgImage: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=1920&h=1080&fit=crop"
    },
    {
        title: "We Provide Services That You Can Trust!",
        subtitle: "Dedicated to empowering individuals and businesses with cutting-edge solutions.",
        bgImage: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1920&h=1080&fit=crop"
    },
    {
        title: "Get the skills, mentorship, and resources you need to thrive in today's digital world.",
        subtitle: "",
        bgImage: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=1920&h=1080&fit=crop"
    }
];

// Programs data
const programs = [
    {
        title: "Software Development",
        description: "Learn to build responsive and dynamic websites using modern technologies like HTML, CSS, JavaScript, and frameworks. Whether you want to create personal blogs, business websites, or complex web applications, our courses will equip you with the skills to succeed in the tech industry.",
        image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=300&fit=crop"
    },
    {
        title: "Video Editing and Graphics Design",
        description: "Unleash your creativity by mastering both video editing and graphic design. Learn to transform raw footage into professional-quality videos using industry-standard software like Adobe Premiere Pro and DaVinci Resolve. At the same time, develop skills in graphic design with tools like Photoshop, Illustrator, and Canva to create eye-catching logos, posters, social media content, and marketing materials.",
        image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=300&fit=crop"
    },
    {
        title: "Data Analysis",
        description: "Turn data into insights and make data-driven decisions. Learn how to use tools like Excel, Python, SQL, and Power BI to analyze and visualize data, helping businesses and organizations optimize their performance.",
        image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&h=300&fit=crop"
    },
    {
        title: "Forex Trading",
        description: "Discover how to trade the global financial markets and make informed investment decisions. Learn the fundamentals of forex trading, technical and fundamental analysis, risk management, and strategies to become a successful trader.",
        image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=400&h=300&fit=crop"
    },
    {
        title: "UI/UX Design",
        description: "Master the art of creating user-friendly and visually appealing interfaces. Learn the principles of user experience (UX) and user interface (UI) design using tools like Figma and Adobe XD to craft intuitive and engaging digital experiences.",
        image: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=400&h=300&fit=crop"
    },
    {
        title: "Gadget Repairs & Sales",
        description: "Top-Quality Gadgets, or reliable repair services? We offer a wide range of mobile devices, accessories and tech essentials at unbeatable prices... Whether you need a brand-new, high-performance gadget or expert repairs for your damaged device, We are ready to assist.",
        image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=400&h=300&fit=crop"
    }
];

// Testimonials data
const testimonials = [
    {
        name: "Sarah Jones",
        text: "JE Techhub transformed my career. The hands-on training and expert instructors helped me gain the skills I needed to land my first job in web development. The community and support I received here were amazing!",
        date: "22 Aug, 2023"
    },
    {
        name: "Michael Smith",
        text: "I've been through several tech training programs, but none compared to the quality of JE Techhub. The curriculum was up-to-date, and I learned everything I needed to start my own freelance business in digital marketing. Highly recommend!",
        date: "15 Sept, 2023"
    },
    {
        name: "Emma Watson",
        text: "Thanks to JE Techhub's software development course, I now have the skills to build my own applications. The instructors were not only experts but also genuinely caring, and the practical training helped me grow fast!",
        date: "5 Jan, 2024"
    }
];

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializePreloader();
    initializeDarkMode();
    initializeHeroSlider();
    renderPrograms();
    renderTestimonials();
    initializeContactForm();
    initializeDeliverySection();
});

// Preloader functionality
function initializePreloader() {
    const preloader = document.getElementById('preloader');
    setTimeout(() => {
        preloader.classList.add('hide');
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 500);
    }, 3000);
}

// Dark mode functionality
function initializeDarkMode() {
    const darkModeToggle = document.getElementById('darkModeToggle');
    const body = document.body;
    
    darkModeToggle.addEventListener('click', () => {
        isDarkMode = !isDarkMode;
        
        if (isDarkMode) {
            body.classList.add('dark');
            darkModeToggle.classList.add('active');
        } else {
            body.classList.remove('dark');
            darkModeToggle.classList.remove('active');
        }
    });
}

// Hero slider functionality
function initializeHeroSlider() {
    const heroImage = document.getElementById('heroImage');
    const heroTitle = document.getElementById('heroTitle');
    const heroSubtitle = document.getElementById('heroSubtitle');
    const slideDots = document.querySelectorAll('.slide-dot');
    
    function updateSlide(index) {
        currentSlide = index;
        heroImage.src = slides[currentSlide].bgImage;
        heroTitle.textContent = slides[currentSlide].title;
        heroSubtitle.textContent = slides[currentSlide].subtitle;
        
        slideDots.forEach((dot, i) => {
            if (i === currentSlide) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    }
    
    // Auto slide
    function startSlideShow() {
        slideInterval = setInterval(() => {
            currentSlide = (currentSlide + 1) % slides.length;
            updateSlide(currentSlide);
        }, 5000);
    }
    
    // Manual slide control
    slideDots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            clearInterval(slideInterval);
            updateSlide(index);
            startSlideShow();
        });
    });
    
    // Initialize first slide
    updateSlide(0);
    startSlideShow();
}

// Render programs section
function renderPrograms() {
    const programsContainer = document.getElementById('programsContainer');
    
    programs.forEach(program => {
        const programCard = document.createElement('div');
        programCard.className = 'group rounded-2xl p-6 lg:p-8 transition-all duration-500 hover:shadow-2xl hover:scale-105 hover:-translate-y-4 bg-gray-50 hover:bg-white hover:shadow-xl';
        
        programCard.innerHTML = `
            <div class="h-52 lg:h-60 rounded-xl mb-6 overflow-hidden relative">
                <div class="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent z-10"></div>
                <img src="${program.image}" alt="${program.title}" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500">
            </div>
            <h3 class="text-xl lg:text-2xl font-bold mb-4 group-hover:text-blue-800 transition-colors duration-300 text-gray-800">${program.title}</h3>
            <p class="mb-6 leading-relaxed text-sm lg:text-base text-gray-600">${program.description}</p>
            <button class="btn btn-primary w-full text-lg">Learn More</button>
        `;
        
        programsContainer.appendChild(programCard);
    });
}

// Render testimonials section
function renderTestimonials() {
    const testimonialsContainer = document.getElementById('testimonialsContainer');
    
    testimonials.forEach(testimonial => {
        const testimonialCard = document.createElement('div');
        testimonialCard.className = 'rounded-lg p-6 lg:p-8 transition-all duration-300 hover:scale-105 hover:shadow-xl bg-gray-50';
        
        testimonialCard.innerHTML = `
            <p class="mb-6 leading-relaxed italic text-lg text-gray-600">"${testimonial.text}"</p>
            <div class="border-t pt-4 border-gray-200">
                <h4 class="font-bold text-lg text-gray-800">${testimonial.name}</h4>
                <p class="text-sm text-gray-500">${testimonial.date}</p>
            </div>
        `;
        
        testimonialsContainer.appendChild(testimonialCard);
    });
}

// Contact form functionality
function initializeContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData);
        
        // Simulate form submission
        alert('Thank you for your message! We will get back to you soon.');
        
        // Reset form
        contactForm.reset();
    });
}

// Delivery section functionality
function initializeDeliverySection() {
    const deliveryButton = document.getElementById('deliveryButton');
    
    deliveryButton.addEventListener('click', function() {
        // For now, just show an alert
        alert('Delivery booking feature coming soon! Please contact us directly for delivery services.');
    });
}

// Smooth scrolling for anchor links
document.addEventListener('click', function(e) {
    if (e.target.matches('a[href^="#"]')) {
        e.preventDefault();
        const target = document.querySelector(e.target.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    }
});

// Add scroll animations
function addScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fade-in');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    // Observe all sections
    document.querySelectorAll('section').forEach(section => {
        observer.observe(section);
    });
}

// Initialize scroll animations after DOM content is loaded
document.addEventListener('DOMContentLoaded', addScrollAnimations);
