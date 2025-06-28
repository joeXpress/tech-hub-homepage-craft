// Preloader
document.addEventListener('DOMContentLoaded', function() {
    const preloader = document.getElementById('preloader');
    const mainContent = document.getElementById('mainContent');
    
    // Hide preloader after 3 seconds
    setTimeout(() => {
        preloader.classList.add('hidden');
        mainContent.style.display = 'block';
    }, 3000);
});

// Dark Mode Toggle
document.addEventListener('DOMContentLoaded', function() {
    const darkModeSwitch = document.getElementById('darkModeSwitch');
    const body = document.body;
    
    // Check for saved dark mode preference
    const savedDarkMode = localStorage.getItem('darkMode');
    if (savedDarkMode === 'true') {
        body.classList.add('dark-mode');
        darkModeSwitch.checked = true;
    }
    
    darkModeSwitch.addEventListener('change', function() {
        if (this.checked) {
            body.classList.add('dark-mode');
            localStorage.setItem('darkMode', 'true');
        } else {
            body.classList.remove('dark-mode');
            localStorage.setItem('darkMode', 'false');
        }
    });
});

// Hero Slider
document.addEventListener('DOMContentLoaded', function() {
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
    const heroTitle = document.getElementById('heroTitle');
    const heroSubtitle = document.getElementById('heroSubtitle');
    const indicators = document.querySelectorAll('.indicator');
    
    function updateSlide(index) {
        currentSlide = index;
        heroTitle.textContent = slides[currentSlide].title;
        heroSubtitle.textContent = slides[currentSlide].subtitle;
        
        // Update indicators
        indicators.forEach((indicator, i) => {
            indicator.classList.toggle('active', i === currentSlide);
        });
    }
    
    // Auto-advance slides
    setInterval(() => {
        currentSlide = (currentSlide + 1) % slides.length;
        updateSlide(currentSlide);
    }, 5000);
    
    // Indicator click handlers
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            updateSlide(index);
        });
    });
});

// Smooth Scrolling for anchor links
document.addEventListener('DOMContentLoaded', function() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});

// Contact Form Submission
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.querySelector('.contact-form');
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const fullName = document.getElementById('fullName').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;
        
        // Simple validation
        if (!fullName || !email || !phone || !subject || !message) {
            alert('Please fill in all fields');
            return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Please enter a valid email address');
            return;
        }
        
        // Success message
        alert('Thank you for your message! We will get back to you soon.');
        
        // Reset form
        this.reset();
    });
});

// Intersection Observer for Animations
document.addEventListener('DOMContentLoaded', function() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.card, .program-card, .testimonial-card');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Button Click Effects
document.addEventListener('DOMContentLoaded', function() {
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            // Add ripple effect
            const ripple = document.createElement('span');
            ripple.style.position = 'absolute';
            ripple.style.borderRadius = '50%';
            ripple.style.background = 'rgba(255, 255, 255, 0.3)';
            ripple.style.transform = 'scale(0)';
            ripple.style.animation = 'ripple 0.6s linear';
            ripple.style.left = '50%';
            ripple.style.top = '50%';
            ripple.style.width = '20px';
            ripple.style.height = '20px';
            ripple.style.marginLeft = '-10px';
            ripple.style.marginTop = '-10px';
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
});

// Add ripple animation to CSS dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Delivery Booking Functionality
let deliveryBookings = JSON.parse(localStorage.getItem('deliveryBookings')) || [];

// Show/Hide Sections
function showDeliveryBooking() {
    document.getElementById('home').style.display = 'none';
    document.querySelectorAll('.mission-vision-section, .about-section, .offer-section, .programs-section, .cta-section, .delivery-section, .testimonials-section, .contact-section, .footer').forEach(section => {
        section.style.display = 'none';
    });
    document.getElementById('deliveryBooking').style.display = 'block';
    document.getElementById('mainContent').scrollIntoView({ behavior: 'smooth' });
}

function showHome() {
    document.getElementById('deliveryBooking').style.display = 'none';
    document.getElementById('home').style.display = 'flex';
    document.querySelectorAll('.mission-vision-section, .about-section, .offer-section, .programs-section, .cta-section, .delivery-section, .testimonials-section, .contact-section, .footer').forEach(section => {
        section.style.display = 'block';
    });
    document.getElementById('home').scrollIntoView({ behavior: 'smooth' });
}

// Tab Switching
function showBookingForm() {
    document.getElementById('bookingForm').style.display = 'block';
    document.getElementById('trackingForm').style.display = 'none';
    
    // Update tab buttons
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
}

function showTrackingForm() {
    document.getElementById('bookingForm').style.display = 'none';
    document.getElementById('trackingForm').style.display = 'block';
    
    // Update tab buttons
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
}

// Generate Tracking Number
function generateTrackingNumber() {
    const prefix = 'JE';
    const randomNum = Math.floor(Math.random() * 1000000000).toString().padStart(9, '0');
    return prefix + randomNum;
}

// Calculate Delivery Price
function calculateDeliveryPrice(deliveryType) {
    const prices = {
        'standard': 25,
        'express': 45,
        'overnight': 65
    };
    return prices[deliveryType] || 25;
}

// Delivery Booking Form Submission
document.addEventListener('DOMContentLoaded', function() {
    const deliveryBookingForm = document.getElementById('deliveryBookingForm');
    
    if (deliveryBookingForm) {
        deliveryBookingForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = {
                trackingNumber: generateTrackingNumber(),
                senderName: document.getElementById('senderName').value,
                senderPhone: document.getElementById('senderPhone').value,
                senderAddress: document.getElementById('senderAddress').value,
                recipientName: document.getElementById('recipientName').value,
                recipientPhone: document.getElementById('recipientPhone').value,
                recipientAddress: document.getElementById('recipientAddress').value,
                packageType: document.getElementById('packageType').value,
                deliveryType: document.getElementById('deliveryType').value,
                packageDescription: document.getElementById('packageDescription').value,
                status: 'confirmed',
                bookingDate: new Date().toISOString(),
                estimatedDelivery: getEstimatedDelivery(document.getElementById('deliveryType').value)
            };
            
            // Validate required fields
            const requiredFields = ['senderName', 'senderPhone', 'senderAddress', 'recipientName', 'recipientPhone', 'recipientAddress', 'packageType', 'deliveryType', 'packageDescription'];
            const emptyFields = requiredFields.filter(field => !formData[field]);
            
            if (emptyFields.length > 0) {
                alert('Please fill in all required fields');
                return;
            }
            
            // Phone validation
            const phoneRegex = /^[\+]?[0-9\s\-\(\)]{10,}$/;
            if (!phoneRegex.test(formData.senderPhone) || !phoneRegex.test(formData.recipientPhone)) {
                alert('Please enter valid phone numbers');
                return;
            }
            
            // Calculate price
            const price = calculateDeliveryPrice(formData.deliveryType);
            formData.price = price;
            
            // Save booking
            deliveryBookings.push(formData);
            localStorage.setItem('deliveryBookings', JSON.stringify(deliveryBookings));
            
            // Show success message with tracking number
            alert(`Booking confirmed! Your tracking number is: ${formData.trackingNumber}\nTotal cost: $${price}\n\nPlease save this tracking number to track your package.`);
            
            // Reset form
            this.reset();
            
            // Optionally switch to tracking tab with the new tracking number
            showTrackingForm();
            document.getElementById('trackingNumber').value = formData.trackingNumber;
        });
    }
});

// Estimated Delivery Calculation
function getEstimatedDelivery(deliveryType) {
    const now = new Date();
    let deliveryDate = new Date(now);
    
    switch (deliveryType) {
        case 'express':
            deliveryDate.setHours(now.getHours() + 8); // Same day
            break;
        case 'overnight':
            deliveryDate.setDate(now.getDate() + 1); // Next day
            break;
        case 'standard':
        default:
            deliveryDate.setDate(now.getDate() + 2); // 2-3 days
            break;
    }
    
    return deliveryDate.toISOString();
}

// Package Tracking
function trackPackage() {
    const trackingNumber = document.getElementById('trackingNumber').value.trim();
    
    if (!trackingNumber) {
        alert('Please enter a tracking number');
        return;
    }
    
    // Find booking by tracking number
    const booking = deliveryBookings.find(b => b.trackingNumber === trackingNumber);
    
    if (!booking) {
        alert('Tracking number not found. Please check your tracking number and try again.');
        return;
    }
    
    // Show tracking results
    displayTrackingResults(booking);
}

// Display Tracking Results
function displayTrackingResults(booking) {
    const trackingResults = document.getElementById('trackingResults');
    const trackingTitle = document.getElementById('trackingTitle');
    const trackingStatus = document.getElementById('trackingStatus');
    
    // Update tracking info
    trackingTitle.textContent = `Package: ${booking.trackingNumber}`;
    
    // Simulate package status progression
    const now = new Date();
    const bookingDate = new Date(booking.bookingDate);
    const estimatedDelivery = new Date(booking.estimatedDelivery);
    const hoursElapsed = (now - bookingDate) / (1000 * 60 * 60);
    
    let currentStatus = 'confirmed';
    let statusText = 'Order Confirmed';
    
    if (hoursElapsed > 1) {
        currentStatus = 'picked_up';
        statusText = 'Package Picked Up';
    }
    if (hoursElapsed > 4) {
        currentStatus = 'in_transit';
        statusText = 'In Transit';
    }
    if (hoursElapsed > 8 || now >= estimatedDelivery) {
        currentStatus = 'out_for_delivery';
        statusText = 'Out for Delivery';
    }
    if (booking.status === 'delivered') {
        currentStatus = 'delivered';
        statusText = 'Delivered';
    }
    
    trackingStatus.textContent = statusText;
    trackingStatus.className = `status-badge ${currentStatus === 'delivered' ? 'delivered' : ''}`;
    
    // Update timeline
    updateTrackingTimeline(booking, currentStatus);
    
    // Show/hide rating section
    const ratingSection = document.getElementById('ratingSection');
    if (currentStatus === 'delivered') {
        ratingSection.style.display = 'block';
    } else {
        ratingSection.style.display = 'none';
    }
    
    trackingResults.style.display = 'block';
}

// Update Tracking Timeline
function updateTrackingTimeline(booking, currentStatus) {
    const timelineItems = document.querySelectorAll('.timeline-item');
    const bookingDate = new Date(booking.bookingDate);
    
    // Reset timeline
    timelineItems.forEach(item => {
        item.classList.remove('completed', 'current');
    });
    
    // Update timeline based on current status
    const statusOrder = ['confirmed', 'picked_up', 'in_transit', 'out_for_delivery', 'delivered'];
    const currentIndex = statusOrder.indexOf(currentStatus);
    
    timelineItems.forEach((item, index) => {
        if (index < currentIndex) {
            item.classList.add('completed');
        } else if (index === currentIndex) {
            item.classList.add('current');
        }
    });
    
    // Update timestamps
    document.getElementById('pickupTime').textContent = 
        new Date(bookingDate.getTime() + (2 * 60 * 60 * 1000)).toLocaleString();
    document.getElementById('transitTime').textContent = 
        new Date(bookingDate.getTime() + (4 * 60 * 60 * 1000)).toLocaleString();
    
    if (currentStatus === 'delivered') {
        document.getElementById('deliveryTime').textContent = 
            new Date().toLocaleString();
    } else {
        document.getElementById('deliveryTime').textContent = 
            `Expected ${new Date(booking.estimatedDelivery).toLocaleString()}`;
    }
}

// Star Rating System
document.addEventListener('DOMContentLoaded', function() {
    const stars = document.querySelectorAll('.star');
    let selectedRating = 0;
    
    stars.forEach((star, index) => {
        star.addEventListener('mouseover', function() {
            highlightStars(index + 1);
        });
        
        star.addEventListener('mouseout', function() {
            highlightStars(selectedRating);
        });
        
        star.addEventListener('click', function() {
            selectedRating = index + 1;
            highlightStars(selectedRating);
        });
    });
    
    function highlightStars(rating) {
        stars.forEach((star, index) => {
            if (index < rating) {
                star.classList.add('active');
            } else {
                star.classList.remove('active');
            }
        });
    }
});

// Submit Rating
function submitRating() {
    const stars = document.querySelectorAll('.star.active');
    const rating = stars.length;
    const reviewText = document.getElementById('reviewText').value;
    const trackingNumber = document.getElementById('trackingNumber').value;
    
    if (rating === 0) {
        alert('Please select a rating');
        return;
    }
    
    // Find and update booking with rating
    const bookingIndex = deliveryBookings.findIndex(b => b.trackingNumber === trackingNumber);
    if (bookingIndex !== -1) {
        deliveryBookings[bookingIndex].rating = rating;
        deliveryBookings[bookingIndex].review = reviewText;
        deliveryBookings[bookingIndex].status = 'delivered';
        localStorage.setItem('deliveryBookings', JSON.stringify(deliveryBookings));
    }
    
    alert(`Thank you for your feedback! You rated this delivery ${rating} star${rating !== 1 ? 's' : ''}.`);
    
    // Hide rating section
    document.getElementById('ratingSection').style.display = 'none';
}

// Auto-track on page load if tracking number in URL
document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const trackingParam = urlParams.get('track');
    
    if (trackingParam) {
        showDeliveryBooking();
        setTimeout(() => {
            showTrackingForm();
            document.getElementById('trackingNumber').value = trackingParam;
            trackPackage();
        }, 100);
    }
});
