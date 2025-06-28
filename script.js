
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
            title: "Fast & Reliable Delivery Services",
            subtitle: "Book your delivery and track your packages with ease"
        },
        {
            title: "Door-to-Door Delivery Solutions",
            subtitle: "We deliver to your exact location with care and precision"
        },
        {
            title: "Track Your Package in Real-Time",
            subtitle: "Stay updated with live tracking and delivery notifications"
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

// Delivery Booking System
class DeliveryBookingSystem {
    constructor() {
        this.bookings = JSON.parse(localStorage.getItem('deliveryBookings')) || [];
        this.currentRating = 0;
        this.currentBookingId = null;
        this.init();
    }

    init() {
        this.bindEventListeners();
        this.displayBookings();
    }

    bindEventListeners() {
        // Delivery form submission
        document.getElementById('deliveryForm').addEventListener('submit', (e) => {
            this.handleBookingSubmission(e);
        });

        // Tracking functionality
        document.getElementById('trackButton').addEventListener('click', () => {
            this.trackPackage();
        });

        // Rating system
        document.querySelectorAll('.star').forEach(star => {
            star.addEventListener('click', (e) => {
                this.setRating(parseInt(e.target.dataset.rating));
            });
        });

        document.getElementById('submitRating').addEventListener('click', () => {
            this.submitRating();
        });

        // Modal controls
        document.querySelectorAll('.close').forEach(closeBtn => {
            closeBtn.addEventListener('click', (e) => {
                this.closeModal(e.target.closest('.modal'));
            });
        });

        // Close modal when clicking outside
        window.addEventListener('click', (e) => {
            if (e.target.classList.contains('modal')) {
                this.closeModal(e.target);
            }
        });
    }

    generateTrackingNumber() {
        return 'JE' + Math.random().toString(36).substr(2, 8).toUpperCase();
    }

    calculatePrice(serviceType, urgency, weight) {
        const basePrice = {
            'door-to-door': 2000,
            'office': 1500,
            'food': 1000,
            'pickup': 800,
            'dropoff': 800,
            'mail': 500
        };

        const urgencyMultiplier = {
            'standard': 1,
            'express': 1.5,
            'urgent': 2
        };

        const weightMultiplier = weight > 5 ? 1.2 : 1;

        return Math.round(basePrice[serviceType] * urgencyMultiplier[urgency] * weightMultiplier);
    }

    handleBookingSubmission(e) {
        e.preventDefault();
        
        const formData = new FormData(e.target);
        const bookingData = {
            id: Date.now().toString(),
            trackingNumber: this.generateTrackingNumber(),
            senderName: formData.get('senderName'),
            senderPhone: formData.get('senderPhone'),
            recipientName: formData.get('recipientName'),
            recipientPhone: formData.get('recipientPhone'),
            pickupAddress: formData.get('pickupAddress'),
            deliveryAddress: formData.get('deliveryAddress'),
            packageDescription: formData.get('packageDescription'),
            serviceType: formData.get('serviceType'),
            urgency: formData.get('urgency'),
            packageWeight: parseFloat(formData.get('packageWeight')),
            status: 'pending',
            createdAt: new Date().toISOString(),
            price: this.calculatePrice(formData.get('serviceType'), formData.get('urgency'), parseFloat(formData.get('packageWeight'))),
            rating: null,
            ratingComment: null
        };

        this.bookings.push(bookingData);
        this.saveBookings();
        this.displayBookings();
        
        // Show success modal
        document.getElementById('generatedTrackingNumber').textContent = bookingData.trackingNumber;
        this.showModal('successModal');
        
        // Reset form
        e.target.reset();
    }

    trackPackage() {
        const trackingNumber = document.getElementById('trackingNumber').value.trim();
        const trackingResult = document.getElementById('trackingResult');
        
        if (!trackingNumber) {
            this.showNotification('Please enter a tracking number', 'error');
            return;
        }

        const booking = this.bookings.find(b => b.trackingNumber === trackingNumber);
        
        if (booking) {
            const statusDisplay = this.getStatusDisplay(booking.status);
            trackingResult.innerHTML = `
                <div class="tracking-info">
                    <h3>Package Found</h3>
                    <div class="tracking-details">
                        <div class="tracking-item">
                            <strong>Tracking Number:</strong> ${booking.trackingNumber}
                        </div>
                        <div class="tracking-item">
                            <strong>From:</strong> ${booking.pickupAddress}
                        </div>
                        <div class="tracking-item">
                            <strong>To:</strong> ${booking.deliveryAddress}
                        </div>
                        <div class="tracking-item">
                            <strong>Recipient:</strong> ${booking.recipientName}
                        </div>
                        <div class="tracking-item">
                            <strong>Status:</strong> <span class="status-badge status-${booking.status}">${statusDisplay}</span>
                        </div>
                        <div class="tracking-item">
                            <strong>Service Type:</strong> ${this.formatServiceType(booking.serviceType)}
                        </div>
                        <div class="tracking-item">
                            <strong>Price:</strong> ₦${booking.price.toLocaleString()}
                        </div>
                        ${booking.status === 'delivered' && !booking.rating ? 
                            `<button class="btn btn-primary rate-btn" onclick="deliverySystem.openRatingModal('${booking.id}')">Rate This Delivery</button>` : 
                            booking.rating ? `<div class="rating-display">Rating: ${'★'.repeat(booking.rating)}${'☆'.repeat(5-booking.rating)}</div>` : ''
                        }
                    </div>
                    <div class="tracking-timeline">
                        ${this.generateTrackingTimeline(booking)}
                    </div>
                </div>
            `;
        } else {
            trackingResult.innerHTML = `
                <div class="tracking-error">
                    <h3>Package Not Found</h3>
                    <p>Please check your tracking number and try again.</p>
                </div>
            `;
        }
    }

    generateTrackingTimeline(booking) {
        const timeline = [
            { status: 'pending', label: 'Order Placed', completed: true },
            { status: 'picked-up', label: 'Package Picked Up', completed: ['picked-up', 'in-transit', 'delivered'].includes(booking.status) },
            { status: 'in-transit', label: 'In Transit', completed: ['in-transit', 'delivered'].includes(booking.status) },
            { status: 'delivered', label: 'Delivered', completed: booking.status === 'delivered' }
        ];

        return `
            <div class="timeline">
                ${timeline.map(item => `
                    <div class="timeline-item ${item.completed ? 'completed' : ''}">
                        <div class="timeline-dot"></div>
                        <div class="timeline-content">
                            <h4>${item.label}</h4>
                        </div>
                    </div>
                `).join('')}
            </div>
        `;
    }

    getStatusDisplay(status) {
        const statusMap = {
            'pending': 'Order Placed',
            'picked-up': 'Package Picked Up',
            'in-transit': 'In Transit',
            'delivered': 'Delivered'
        };
        return statusMap[status] || status;
    }

    formatServiceType(serviceType) {
        const typeMap = {
            'door-to-door': 'Door-To-Door Delivery',
            'office': 'Office Delivery',
            'food': 'Food Delivery',
            'pickup': 'Motor Park Pickup',
            'dropoff': 'Motor Park Dropoff',
            'mail': 'Mail Pockets'
        };
        return typeMap[serviceType] || serviceType;
    }

    displayBookings() {
        const bookingsList = document.getElementById('bookingsList');
        
        if (this.bookings.length === 0) {
            bookingsList.innerHTML = '<p class="no-bookings">No bookings yet. <a href="#booking">Book your first delivery</a></p>';
            return;
        }

        bookingsList.innerHTML = this.bookings
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
            .slice(0, 10) // Show last 10 bookings
            .map(booking => `
                <div class="booking-card">
                    <div class="booking-header">
                        <h3>${booking.trackingNumber}</h3>
                        <span class="status-badge status-${booking.status}">${this.getStatusDisplay(booking.status)}</span>
                    </div>
                    <div class="booking-details">
                        <p><strong>To:</strong> ${booking.recipientName}</p>
                        <p><strong>Service:</strong> ${this.formatServiceType(booking.serviceType)}</p>
                        <p><strong>Price:</strong> ₦${booking.price.toLocaleString()}</p>
                        <p><strong>Date:</strong> ${new Date(booking.createdAt).toLocaleDateString()}</p>
                    </div>
                    <div class="booking-actions">
                        <button class="btn btn-secondary" onclick="deliverySystem.quickTrack('${booking.trackingNumber}')">Track</button>
                        ${booking.status === 'delivered' && !booking.rating ? 
                            `<button class="btn btn-primary" onclick="deliverySystem.openRatingModal('${booking.id}')">Rate</button>` : 
                            booking.rating ? `<div class="rating-display">Rating: ${'★'.repeat(booking.rating)}</div>` : ''
                        }
                    </div>
                </div>
            `).join('');
    }

    quickTrack(trackingNumber) {
        document.getElementById('trackingNumber').value = trackingNumber;
        document.getElementById('tracking').scrollIntoView({ behavior: 'smooth' });
        setTimeout(() => this.trackPackage(), 500);
    }

    openRatingModal(bookingId) {
        this.currentBookingId = bookingId;
        this.currentRating = 0;
        document.querySelectorAll('.star').forEach(star => star.classList.remove('active'));
        document.getElementById('ratingComment').value = '';
        this.showModal('ratingModal');
    }

    setRating(rating) {
        this.currentRating = rating;
        document.querySelectorAll('.star').forEach((star, index) => {
            star.classList.toggle('active', index < rating);
        });
    }

    submitRating() {
        if (this.currentRating === 0) {
            this.showNotification('Please select a rating', 'error');
            return;
        }

        const comment = document.getElementById('ratingComment').value;
        const booking = this.bookings.find(b => b.id === this.currentBookingId);
        
        if (booking) {
            booking.rating = this.currentRating;
            booking.ratingComment = comment;
            this.saveBookings();
            this.displayBookings();
            this.closeModal(document.getElementById('ratingModal'));
            this.showNotification('Thank you for your rating!', 'success');
        }
    }

    showModal(modalId) {
        document.getElementById(modalId).style.display = 'block';
    }

    closeModal(modal) {
        modal.style.display = 'none';
    }

    saveBookings() {
        localStorage.setItem('deliveryBookings', JSON.stringify(this.bookings));
    }

    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.classList.add('show');
        }, 100);
        
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }

    // Simulate status updates (for demo purposes)
    simulateStatusUpdates() {
        setInterval(() => {
            this.bookings.forEach(booking => {
                if (booking.status === 'pending' && Math.random() < 0.1) {
                    booking.status = 'picked-up';
                    this.saveBookings();
                    this.displayBookings();
                } else if (booking.status === 'picked-up' && Math.random() < 0.1) {
                    booking.status = 'in-transit';
                    this.saveBookings();
                    this.displayBookings();
                } else if (booking.status === 'in-transit' && Math.random() < 0.05) {
                    booking.status = 'delivered';
                    this.saveBookings();
                    this.displayBookings();
                }
            });
        }, 30000); // Check every 30 seconds
    }
}

// Initialize the delivery booking system
let deliverySystem;
document.addEventListener('DOMContentLoaded', function() {
    deliverySystem = new DeliveryBookingSystem();
    deliverySystem.simulateStatusUpdates();
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
