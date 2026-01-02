// ================================================
// Clinic Website - Main JavaScript
// Features: Smooth Scrolling, Form Validation, Animations
// ================================================

// ================================================
// Smooth Scroll Navigation
// ================================================

document.addEventListener('DOMContentLoaded', function() {
    
    // Get all navigation links
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Add smooth scroll to all nav links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Get target section
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                // Calculate offset for fixed navbar
                const navHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetSection.offsetTop - navHeight;
                
                // Smooth scroll to target
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                const navMenu = document.getElementById('navMenu');
                navMenu.classList.remove('active');
            }
        });
    });
    
    // ================================================
    // Mobile Navigation Toggle
    // ================================================
    
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    
    if (navToggle) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            
            // Animate hamburger icon
            const spans = this.querySelectorAll('span');
            if (navMenu.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translateY(10px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translateY(-10px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
    }
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.navbar')) {
            navMenu.classList.remove('active');
            if (navToggle) {
                const spans = navToggle.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        }
    });
    
    // ================================================
    // Active Navigation Link on Scroll
    // ================================================
    
    window.addEventListener('scroll', function() {
        let current = '';
        const sections = document.querySelectorAll('section');
        const navHeight = document.querySelector('.navbar').offsetHeight;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - navHeight - 100;
            const sectionHeight = section.clientHeight;
            
            if (window.pageYOffset >= sectionTop && 
                window.pageYOffset < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
    
    // ================================================
    // Navbar Background on Scroll
    // ================================================
    
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // ================================================
    // Appointment Form Validation & Submission
    // ================================================
    
    const appointmentForm = document.getElementById('appointmentForm');
    const successMessage = document.getElementById('successMessage');
    
    if (appointmentForm) {
        appointmentForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value.trim();
            const phone = document.getElementById('phone').value.trim();
            const email = document.getElementById('email').value.trim();
            const date = document.getElementById('date').value;
            const service = document.getElementById('service').value;
            
            // Validation flags
            let isValid = true;
            let errorMessages = [];
            
            // Validate name (minimum 2 characters)
            if (name.length < 2) {
                isValid = false;
                errorMessages.push('Please enter a valid name (minimum 2 characters)');
            }
            
            // Validate phone (basic format check - 10 digits)
            const phoneRegex = /^[\d\s\-\(\)\+]{10,}$/;
            if (!phoneRegex.test(phone)) {
                isValid = false;
                errorMessages.push('Please enter a valid phone number (minimum 10 digits)');
            }
            
            // Validate email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                isValid = false;
                errorMessages.push('Please enter a valid email address');
            }
            
            // Validate date (must be today or future date)
            const selectedDate = new Date(date);
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            
            if (!date || selectedDate < today) {
                isValid = false;
                errorMessages.push('Please select a valid date (today or future)');
            }
            
            // Validate service selection
            if (!service) {
                isValid = false;
                errorMessages.push('Please select a service');
            }
            
            // Display errors or success
            if (!isValid) {
                alert('Please correct the following errors:\n\n' + errorMessages.join('\n'));
            } else {
                // Hide form and show success message
                appointmentForm.style.display = 'none';
                successMessage.classList.add('show');
                
                // Log form data (in real app, this would be sent to server)
                console.log('Appointment Details:', {
                    name: name,
                    phone: phone,
                    email: email,
                    date: date,
                    service: service,
                    message: document.getElementById('message').value
                });
                
                // Reset form after 5 seconds and hide success message
                setTimeout(function() {
                    appointmentForm.reset();
                    appointmentForm.style.display = 'block';
                    successMessage.classList.remove('show');
                }, 5000);
            }
        });
    }
    
    // Set minimum date for appointment (today)
    const dateInput = document.getElementById('date');
    if (dateInput) {
        const today = new Date().toISOString().split('T')[0];
        dateInput.setAttribute('min', today);
    }
    
    // ================================================
    // Scroll to Top Button
    // ================================================
    
    const scrollTopBtn = document.getElementById('scrollTop');
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollTopBtn.classList.add('show');
        } else {
            scrollTopBtn.classList.remove('show');
        }
    });
    
    scrollTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // ================================================
    // Fade-In Animation on Scroll (Intersection Observer)
    // ================================================
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                // Stop observing after animation
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe elements for fade-in animation
    const animatedElements = document.querySelectorAll(
        '.service-card, .doctor-card, .feature-card, .testimonial-card, .gallery-item, .highlight-card, .contact-item'
    );
    
    animatedElements.forEach(element => {
        observer.observe(element);
    });
    
    // ================================================
    // Form Input Validation Feedback (Real-time)
    // ================================================
    
    const formInputs = document.querySelectorAll('.form-group input, .form-group select, .form-group textarea');
    
    formInputs.forEach(input => {
        // Add focus styling
        input.addEventListener('focus', function() {
            this.parentElement.style.transform = 'translateY(-2px)';
            this.parentElement.style.transition = 'transform 0.2s ease';
        });
        
        input.addEventListener('blur', function() {
            this.parentElement.style.transform = 'translateY(0)';
            
            // Validate on blur
            if (this.hasAttribute('required') && !this.value.trim()) {
                this.style.borderColor = '#ef4444';
            } else {
                this.style.borderColor = '#e2e8f0';
            }
        });
        
        // Reset border color on input
        input.addEventListener('input', function() {
            this.style.borderColor = '#2563eb';
        });
    });
    
    // ================================================
    // Email Validation Real-time
    // ================================================
    
    const emailInput = document.getElementById('email');
    if (emailInput) {
        emailInput.addEventListener('blur', function() {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (this.value && !emailRegex.test(this.value)) {
                this.style.borderColor = '#ef4444';
                
                // Show error message
                let errorMsg = this.parentElement.querySelector('.error-msg');
                if (!errorMsg) {
                    errorMsg = document.createElement('span');
                    errorMsg.className = 'error-msg';
                    errorMsg.style.color = '#ef4444';
                    errorMsg.style.fontSize = '0.85rem';
                    errorMsg.style.marginTop = '5px';
                    errorMsg.style.display = 'block';
                    errorMsg.textContent = 'Please enter a valid email address';
                    this.parentElement.appendChild(errorMsg);
                }
            } else {
                // Remove error message if exists
                const errorMsg = this.parentElement.querySelector('.error-msg');
                if (errorMsg) {
                    errorMsg.remove();
                }
                if (this.value) {
                    this.style.borderColor = '#10b981';
                }
            }
        });
    }
    
    // ================================================
    // Phone Number Formatting
    // ================================================
    
    const phoneInput = document.getElementById('phone');
    if (phoneInput) {
        phoneInput.addEventListener('input', function() {
            // Remove non-numeric characters
            let value = this.value.replace(/\D/g, '');
            
            // Limit to reasonable phone number length
            if (value.length > 15) {
                value = value.substr(0, 15);
            }
            
            this.value = value;
        });
    }
    
    // ================================================
    // Gallery Image Click (Optional Enhancement)
    // ================================================
    
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            const imgSrc = this.querySelector('img').src;
            const imgAlt = this.querySelector('img').alt;
            
            // Create lightbox effect
            const lightbox = document.createElement('div');
            lightbox.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.9);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 9999;
                cursor: pointer;
            `;
            
            const img = document.createElement('img');
            img.src = imgSrc;
            img.alt = imgAlt;
            img.style.cssText = `
                max-width: 90%;
                max-height: 90%;
                object-fit: contain;
                border-radius: 8px;
            `;
            
            lightbox.appendChild(img);
            document.body.appendChild(lightbox);
            
            // Close on click
            lightbox.addEventListener('click', function() {
                this.remove();
            });
            
            // Close on ESC key
            document.addEventListener('keydown', function closeOnEsc(e) {
                if (e.key === 'Escape' && document.body.contains(lightbox)) {
                    lightbox.remove();
                    document.removeEventListener('keydown', closeOnEsc);
                }
            });
        });
    });
    
    // ================================================
    // Smooth Reveal for Section Headers
    // ================================================
    
    const sectionHeaders = document.querySelectorAll('.section-header');
    
    const headerObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '0';
                entry.target.style.transform = 'translateY(20px)';
                
                setTimeout(function() {
                    entry.target.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, 100);
                
                headerObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    sectionHeaders.forEach(header => {
        headerObserver.observe(header);
    });
    
    // ================================================
    // Loading Animation (Optional)
    // ================================================
    
    window.addEventListener('load', function() {
        // Add loaded class to body for any load-based animations
        document.body.classList.add('loaded');
    });
    
    // ================================================
    // Hero Stats Counter Animation
    // ================================================
    
    const statNumbers = document.querySelectorAll('.stat-number');
    let hasAnimated = false;
    
    const animateCounter = (element) => {
        const target = parseInt(element.getAttribute('data-target'));
        const duration = 2000; // 2 seconds
        const increment = target / (duration / 16); // 60fps
        let current = 0;
        
        const updateCounter = () => {
            current += increment;
            if (current < target) {
                element.textContent = Math.floor(current).toLocaleString();
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = target.toLocaleString() + (target === 15000 ? '+' : '+');
            }
        };
        
        updateCounter();
    };
    
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !hasAnimated) {
                hasAnimated = true;
                statNumbers.forEach(stat => {
                    animateCounter(stat);
                });
            }
        });
    }, { threshold: 0.5 });
    
    const heroStats = document.querySelector('.hero-stats');
    if (heroStats) {
        statsObserver.observe(heroStats);
    }
    
    // ================================================
    // Console Welcome Message
    // ================================================
    
    console.log('%c🏥 MediCare Clinic Website', 'color: #2563eb; font-size: 20px; font-weight: bold;');
    console.log('%cWelcome! This is a demo clinic website.', 'color: #10b981; font-size: 14px;');
    console.log('%cDesign can be customized as per your clinic needs.', 'color: #475569; font-size: 12px;');
    
});

// ================================================
// Service Worker Registration (Optional - for PWA)
// ================================================

// Uncomment to enable PWA features
/*
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js')
            .then(function(registration) {
                console.log('ServiceWorker registration successful');
            })
            .catch(function(err) {
                console.log('ServiceWorker registration failed: ', err);
            });
    });
}
*/
