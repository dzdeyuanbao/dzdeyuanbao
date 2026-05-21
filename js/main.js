// Deyuanbao Technology - Main JavaScript
// Rich animations and interactions

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initLoader();
    initNavigation();
    initScrollAnimations();
    initCounterAnimations();
    initMobileMenu();
    initSmoothScroll();
    initParallaxEffects();
    initCardHoverEffects();
});

// Loading Screen
function initLoader() {
    const loader = document.querySelector('.loading');
    if (loader) {
        window.addEventListener('load', function() {
            setTimeout(function() {
                loader.classList.add('hidden');
            }, 500);
        });
    }
}

// Navigation
function initNavigation() {
    const header = document.querySelector('.header');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Header scroll effect
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // Active link highlighting
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });
}

// Scroll Animations
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    animatedElements.forEach(el => observer.observe(el));
}

// Counter Animation
function initCounterAnimations() {
    const counters = document.querySelectorAll('.stat-number');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.getAttribute('data-target')) || parseInt(counter.textContent);
                const duration = 2000;
                const step = target / (duration / 16);
                let current = 0;
                
                const updateCounter = () => {
                    current += step;
                    if (current < target) {
                        counter.textContent = Math.floor(current);
                        requestAnimationFrame(updateCounter);
                    } else {
                        counter.textContent = target;
                    }
                };
                
                updateCounter();
                observer.unobserve(counter);
            }
        });
    }, { threshold: 0.5 });
    
    counters.forEach(counter => observer.observe(counter));
}

// Mobile Menu
function initMobileMenu() {
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    const nav = document.querySelector('.nav');
    
    if (mobileBtn && nav) {
        mobileBtn.addEventListener('click', function() {
            nav.classList.toggle('active');
            this.classList.toggle('active');
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!mobileBtn.contains(e.target) && !nav.contains(e.target)) {
                nav.classList.remove('active');
                mobileBtn.classList.remove('active');
            }
        });
    }
}

// Smooth Scroll
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
}

// Parallax Effects
function initParallaxEffects() {
    const parallaxElements = document.querySelectorAll('[data-parallax]');
    
    window.addEventListener('scroll', function() {
        parallaxElements.forEach(el => {
            const speed = parseFloat(el.getAttribute('data-parallax')) || 0.5;
            const yPos = -(window.scrollY * speed);
            el.style.transform = `translateY(${yPos}px)`;
        });
    });
}

// Card Hover Effects
function initCardHoverEffects() {
    const cards = document.querySelectorAll('.feature-card, .service-card, .testimonial-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function(e) {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function(e) {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// Form Validation
function validateForm(form) {
    const inputs = form.querySelectorAll('input[required], textarea[required]');
    let isValid = true;
    
    inputs.forEach(input => {
        if (!input.value.trim()) {
            isValid = false;
            input.classList.add('error');
        } else {
            input.classList.remove('error');
        }
    });
    
    return isValid;
}

// Newsletter Form
function initNewsletterForm() {
    const form = document.querySelector('.newsletter-form');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            if (validateForm(this)) {
                // Add success animation
                this.querySelector('button').textContent = 'Subscribed!';
                this.querySelector('button').style.background = '#28a745';
                setTimeout(() => {
                    this.reset();
                    this.querySelector('button').textContent = 'Subscribe';
                    this.querySelector('button').style.background = '';
                }, 3000);
            }
        });
    }
}

// Contact Form
function initContactForm() {
    const form = document.querySelector('.contact-form');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            if (validateForm(this)) {
                // Add loading state
                const btn = this.querySelector('button[type="submit"]');
                btn.textContent = 'Sending...';
                btn.disabled = true;
                
                // Simulate sending
                setTimeout(() => {
                    btn.textContent = 'Message Sent!';
                    btn.style.background = '#28a745';
                    setTimeout(() => {
                        this.reset();
                        btn.textContent = 'Send Message';
                        btn.style.background = '';
                        btn.disabled = false;
                    }, 3000);
                }, 1500);
            }
        });
    }
}

// Image Lazy Loading
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Back to Top Button
function initBackToTop() {
    const btn = document.createElement('button');
    btn.innerHTML = '↑';
    btn.className = 'back-to-top';
    btn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: linear-gradient(135deg, #0066CC, #00AAFF);
        color: white;
        border: none;
        font-size: 24px;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 1000;
        box-shadow: 0 5px 20px rgba(0, 102, 204, 0.3);
    `;
    
    document.body.appendChild(btn);
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 500) {
            btn.style.opacity = '1';
            btn.style.visibility = 'visible';
        } else {
            btn.style.opacity = '0';
            btn.style.visibility = 'hidden';
        }
    });
    
    btn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Testimonials Carousel (if exists)
function initTestimonialsCarousel() {
    const carousel = document.querySelector('.testimonials-carousel');
    if (carousel) {
        // Add carousel functionality
        const slides = carousel.querySelectorAll('.testimonial-slide');
        let currentSlide = 0;
        
        setInterval(() => {
            slides[currentSlide].style.opacity = '0';
            slides[currentSlide].style.transform = 'translateX(-100px)';
            
            currentSlide = (currentSlide + 1) % slides.length;
            
            slides[currentSlide].style.opacity = '1';
            slides[currentSlide].style.transform = 'translateX(0)';
        }, 5000);
    }
}

// Video Modal
function initVideoModal() {
    const videoBtns = document.querySelectorAll('[data-video]');
    
    videoBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const videoId = this.getAttribute('data-video');
            // Create modal with video
            const modal = document.createElement('div');
            modal.className = 'video-modal';
            modal.innerHTML = `
                <div class="modal-content">
                    <span class="close-modal">&times;</span>
                    <iframe src="https://www.youtube.com/embed/${videoId}" frameborder="0" allowfullscreen></iframe>
                </div>
            `;
            document.body.appendChild(modal);
            
            modal.querySelector('.close-modal').addEventListener('click', () => {
                modal.remove();
            });
        });
    });
}

// Initialize additional features
document.addEventListener('DOMContentLoaded', function() {
    initNewsletterForm();
    initContactForm();
    initLazyLoading();
    initBackToTop();
    initTestimonialsCarousel();
    initVideoModal();
});

// Performance: Throttle scroll events
let throttleTimer;
const throttle = (callback, time) => {
    if (throttleTimer) return;
    throttleTimer = true;
    setTimeout(() => {
        callback();
        throttleTimer = false;
    }, time);
};

// Use throttle for scroll-heavy operations
window.addEventListener('scroll', () => {
    throttle(() => {
        // Scroll-based animations here
    }, 100);
});
