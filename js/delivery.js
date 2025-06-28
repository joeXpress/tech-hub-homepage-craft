
// Delivery booking and tracking functionality
export class DeliveryManager {
    constructor() {
        this.bookings = this.loadBookings();
        this.init();
    }
    
    init() {
        this.bindEvents();
        this.checkURLTracking();
    }
    
    loadBookings() {
        try {
            return JSON.parse(localStorage.getItem('deliveryBookings')) || [];
        } catch (e) {
            console.error('Error loading bookings:', e);
            return [];
        }
    }
    
    saveBookings() {
        try {
            localStorage.setItem('deliveryBookings', JSON.stringify(this.bookings));
        } catch (e) {
            console.error('Error saving bookings:', e);
        }
    }
    
    bindEvents() {
        // Form submission with event delegation
        document.addEventListener('submit', (e) => {
            if (e.target.id === 'deliveryBookingForm') {
                e.preventDefault();
                this.handleBookingSubmission(e.target);
            }
        });
        
        // Navigation buttons
        document.addEventListener('click', (e) => {
            if (e.target.matches('[onclick*="showDeliveryBooking"]')) {
                e.preventDefault();
                this.showDeliveryBooking();
            } else if (e.target.matches('[onclick*="showHome"]')) {
                e.preventDefault();
                this.showHome();
            } else if (e.target.matches('[onclick*="trackPackage"]')) {
                e.preventDefault();
                this.trackPackage();
            } else if (e.target.matches('[onclick*="submitRating"]')) {
                e.preventDefault();
                this.submitRating();
            }
        });
        
        // Tab switching
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('tab-btn')) {
                this.switchTab(e.target);
            }
        });
        
        // Star rating
        this.initStarRating();
    }
    
    generateTrackingNumber() {
        const prefix = 'JE';
        const randomNum = Math.floor(Math.random() * 1000000000).toString().padStart(9, '0');
        return prefix + randomNum;
    }
    
    calculateDeliveryPrice(deliveryType) {
        const prices = {
            'standard': 25,
            'express': 45,
            'overnight': 65
        };
        return prices[deliveryType] || 25;
    }
    
    getEstimatedDelivery(deliveryType) {
        const now = new Date();
        let deliveryDate = new Date(now);
        
        switch (deliveryType) {
            case 'express':
                deliveryDate.setHours(now.getHours() + 8);
                break;
            case 'overnight':
                deliveryDate.setDate(now.getDate() + 1);
                break;
            case 'standard':
            default:
                deliveryDate.setDate(now.getDate() + 2);
                break;
        }
        
        return deliveryDate.toISOString();
    }
    
    handleBookingSubmission(form) {
        const formData = new FormData(form);
        const booking = {
            trackingNumber: this.generateTrackingNumber(),
            senderName: formData.get('senderName'),
            senderPhone: formData.get('senderPhone'),
            senderAddress: formData.get('senderAddress'),
            recipientName: formData.get('recipientName'),
            recipientPhone: formData.get('recipientPhone'),
            recipientAddress: formData.get('recipientAddress'),
            packageType: formData.get('packageType'),
            deliveryType: formData.get('deliveryType'),
            packageDescription: formData.get('packageDescription'),
            status: 'confirmed',
            bookingDate: new Date().toISOString(),
            estimatedDelivery: this.getEstimatedDelivery(formData.get('deliveryType'))
        };
        
        // Validation
        const requiredFields = ['senderName', 'senderPhone', 'senderAddress', 'recipientName', 'recipientPhone', 'recipientAddress'];
        const emptyFields = requiredFields.filter(field => !booking[field]);
        
        if (emptyFields.length > 0) {
            this.showAlert('Please fill in all required fields');
            return;
        }
        
        // Phone validation
        const phoneRegex = /^[\+]?[0-9\s\-\(\)]{10,}$/;
        if (!phoneRegex.test(booking.senderPhone) || !phoneRegex.test(booking.recipientPhone)) {
            this.showAlert('Please enter valid phone numbers');
            return;
        }
        
        booking.price = this.calculateDeliveryPrice(booking.deliveryType);
        
        this.bookings.push(booking);
        this.saveBookings();
        
        this.showAlert(`Booking confirmed! Your tracking number is: ${booking.trackingNumber}\nTotal cost: $${booking.price}\n\nPlease save this tracking number to track your package.`);
        
        form.reset();
        this.switchToTracking(booking.trackingNumber);
    }
    
    switchToTracking(trackingNumber) {
        this.switchTab(document.querySelector('.tab-btn[onclick*="showTrackingForm"]'));
        if (trackingNumber) {
            const trackingInput = document.getElementById('trackingNumber');
            if (trackingInput) {
                trackingInput.value = trackingNumber;
            }
        }
    }
    
    trackPackage() {
        const trackingNumber = document.getElementById('trackingNumber')?.value.trim();
        
        if (!trackingNumber) {
            this.showAlert('Please enter a tracking number');
            return;
        }
        
        const booking = this.bookings.find(b => b.trackingNumber === trackingNumber);
        
        if (!booking) {
            this.showAlert('Tracking number not found. Please check your tracking number and try again.');
            return;
        }
        
        this.displayTrackingResults(booking);
    }
    
    displayTrackingResults(booking) {
        const trackingResults = document.getElementById('trackingResults');
        const trackingTitle = document.getElementById('trackingTitle');
        const trackingStatus = document.getElementById('trackingStatus');
        
        if (!trackingResults || !trackingTitle || !trackingStatus) return;
        
        trackingTitle.textContent = `Package: ${booking.trackingNumber}`;
        
        // Calculate current status
        const currentStatus = this.calculatePackageStatus(booking);
        const statusText = this.getStatusText(currentStatus);
        
        trackingStatus.textContent = statusText;
        trackingStatus.className = `status-badge ${currentStatus === 'delivered' ? 'delivered' : ''}`;
        
        this.updateTrackingTimeline(booking, currentStatus);
        
        const ratingSection = document.getElementById('ratingSection');
        if (ratingSection) {
            ratingSection.style.display = currentStatus === 'delivered' ? 'block' : 'none';
        }
        
        trackingResults.style.display = 'block';
    }
    
    calculatePackageStatus(booking) {
        const now = new Date();
        const bookingDate = new Date(booking.bookingDate);
        const estimatedDelivery = new Date(booking.estimatedDelivery);
        const hoursElapsed = (now - bookingDate) / (1000 * 60 * 60);
        
        if (booking.status === 'delivered') return 'delivered';
        if (hoursElapsed > 8 || now >= estimatedDelivery) return 'out_for_delivery';
        if (hoursElapsed > 4) return 'in_transit';
        if (hoursElapsed > 1) return 'picked_up';
        return 'confirmed';
    }
    
    getStatusText(status) {
        const statusMap = {
            'confirmed': 'Order Confirmed',
            'picked_up': 'Package Picked Up',
            'in_transit': 'In Transit',
            'out_for_delivery': 'Out for Delivery',
            'delivered': 'Delivered'
        };
        return statusMap[status] || 'Unknown Status';
    }
    
    updateTrackingTimeline(booking, currentStatus) {
        const timelineItems = document.querySelectorAll('.timeline-item');
        const statusOrder = ['confirmed', 'picked_up', 'in_transit', 'out_for_delivery', 'delivered'];
        const currentIndex = statusOrder.indexOf(currentStatus);
        
        timelineItems.forEach((item, index) => {
            item.classList.remove('completed', 'current');
            if (index < currentIndex) {
                item.classList.add('completed');
            } else if (index === currentIndex) {
                item.classList.add('current');
            }
        });
        
        // Update timestamps
        const bookingDate = new Date(booking.bookingDate);
        const pickupTime = document.getElementById('pickupTime');
        const transitTime = document.getElementById('transitTime');
        const deliveryTime = document.getElementById('deliveryTime');
        
        if (pickupTime) {
            pickupTime.textContent = new Date(bookingDate.getTime() + (2 * 60 * 60 * 1000)).toLocaleString();
        }
        if (transitTime) {
            transitTime.textContent = new Date(bookingDate.getTime() + (4 * 60 * 60 * 1000)).toLocaleString();
        }
        if (deliveryTime) {
            deliveryTime.textContent = currentStatus === 'delivered' 
                ? new Date().toLocaleString()
                : `Expected ${new Date(booking.estimatedDelivery).toLocaleString()}`;
        }
    }
    
    initStarRating() {
        let selectedRating = 0;
        
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('star')) {
                const stars = document.querySelectorAll('.star');
                const clickedIndex = Array.from(stars).indexOf(e.target);
                selectedRating = clickedIndex + 1;
                this.highlightStars(selectedRating);
            }
        });
        
        document.addEventListener('mouseover', (e) => {
            if (e.target.classList.contains('star')) {
                const stars = document.querySelectorAll('.star');
                const hoverIndex = Array.from(stars).indexOf(e.target);
                this.highlightStars(hoverIndex + 1);
            }
        });
        
        document.addEventListener('mouseout', (e) => {
            if (e.target.classList.contains('star')) {
                this.highlightStars(selectedRating);
            }
        });
    }
    
    highlightStars(rating) {
        const stars = document.querySelectorAll('.star');
        stars.forEach((star, index) => {
            star.classList.toggle('active', index < rating);
        });
    }
    
    submitRating() {
        const stars = document.querySelectorAll('.star.active');
        const rating = stars.length;
        const reviewText = document.getElementById('reviewText')?.value || '';
        const trackingNumber = document.getElementById('trackingNumber')?.value;
        
        if (rating === 0) {
            this.showAlert('Please select a rating');
            return;
        }
        
        const bookingIndex = this.bookings.findIndex(b => b.trackingNumber === trackingNumber);
        if (bookingIndex !== -1) {
            this.bookings[bookingIndex].rating = rating;
            this.bookings[bookingIndex].review = reviewText;
            this.bookings[bookingIndex].status = 'delivered';
            this.saveBookings();
        }
        
        this.showAlert(`Thank you for your feedback! You rated this delivery ${rating} star${rating !== 1 ? 's' : ''}.`);
        
        const ratingSection = document.getElementById('ratingSection');
        if (ratingSection) {
            ratingSection.style.display = 'none';
        }
    }
    
    switchTab(button) {
        const isBooking = button.textContent.includes('Book');
        const bookingForm = document.getElementById('bookingForm');
        const trackingForm = document.getElementById('trackingForm');
        
        if (bookingForm && trackingForm) {
            bookingForm.style.display = isBooking ? 'block' : 'none';
            trackingForm.style.display = isBooking ? 'none' : 'block';
        }
        
        document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
    }
    
    showDeliveryBooking() {
        const home = document.getElementById('home');
        const deliveryBooking = document.getElementById('deliveryBooking');
        const sections = document.querySelectorAll('.mission-vision-section, .about-section, .offer-section, .programs-section, .cta-section, .delivery-section, .testimonials-section, .contact-section, .footer');
        
        if (home) home.style.display = 'none';
        if (deliveryBooking) deliveryBooking.style.display = 'block';
        sections.forEach(section => section.style.display = 'none');
        
        document.getElementById('mainContent')?.scrollIntoView({ behavior: 'smooth' });
    }
    
    showHome() {
        const home = document.getElementById('home');
        const deliveryBooking = document.getElementById('deliveryBooking');
        const sections = document.querySelectorAll('.mission-vision-section, .about-section, .offer-section, .programs-section, .cta-section, .delivery-section, .testimonials-section, .contact-section, .footer');
        
        if (deliveryBooking) deliveryBooking.style.display = 'none';
        if (home) home.style.display = 'flex';
        sections.forEach(section => section.style.display = 'block');
        
        home?.scrollIntoView({ behavior: 'smooth' });
    }
    
    checkURLTracking() {
        const urlParams = new URLSearchParams(window.location.search);
        const trackingParam = urlParams.get('track');
        
        if (trackingParam) {
            this.showDeliveryBooking();
            setTimeout(() => {
                this.switchTab(document.querySelector('.tab-btn[onclick*="showTrackingForm"]'));
                const trackingInput = document.getElementById('trackingNumber');
                if (trackingInput) {
                    trackingInput.value = trackingParam;
                    this.trackPackage();
                }
            }, 100);
        }
    }
    
    showAlert(message) {
        // Use native alert for now, could be replaced with custom modal
        alert(message);
    }
}
