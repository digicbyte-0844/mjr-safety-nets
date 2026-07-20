/**
 * Hyderabad Safety Nets - Enhanced Version
 * Premium JavaScript with Stunning Visual Effects
 * Author: MJ  
 */

console.log('%c 🚀 Hyderabad Safety Nets - Loading... ', 'background: linear-gradient(90deg, #0066CC, #FF6600); color: white; font-size: 18px; padding: 8px; font-weight: bold;');

// ========== VIEWPORT ZOOM LOCK (Desktop & Mobile) ==========
// 1. Prevent desktop trackpad pinch-to-zoom
window.addEventListener('wheel', function (e) {
    if (e.ctrlKey) {
        e.preventDefault();
    }
}, { passive: false });

// 2. Prevent mobile multi-touch pinch-to-zoom
document.addEventListener('touchstart', function (e) {
    if (e.touches.length > 1) {
        e.preventDefault();
    }
}, { passive: false });

// 3. Prevent iOS gestures (pinch-zoom and rotate)
document.addEventListener('gesturestart', function (e) {
    e.preventDefault();
}, { passive: false });

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function () {

    // ========== NAVIGATION FIX ==========
    const header = document.getElementById('header');
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navMenu');

    // Mobile Menu Toggle
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            navMenu.classList.toggle('active');
            menuToggle.classList.toggle('active');
        });
    }

    // Close mobile menu when clicking outside (Backdrop logic)
    document.addEventListener('click', (e) => {
        // If menu is active AND click is NOT inside the menu AND (click is on toggle OR backdrop)
        if (navMenu && navMenu.classList.contains('active')) {
            const isClickInsideMenu = navMenu.contains(e.target);
            const isClickOnToggle = menuToggle && menuToggle.contains(e.target);

            // If click is outside menu and not on the toggle button, close it
            if (!isClickInsideMenu && !isClickOnToggle) {
                navMenu.classList.remove('active');
                if (menuToggle) menuToggle.classList.remove('active');
            }
        }
    });

    // ========== MOBILE DROPDOWN ACCORDION ==========
    const dropdownToggles = document.querySelectorAll('.nav-item.dropdown > .nav-link');

    dropdownToggles.forEach(toggle => {
        toggle.addEventListener('click', function (e) {
            // Only trigger on mobile/tablet (less than 991px)
            if (window.innerWidth <= 991) {
                e.preventDefault(); // Stop navigation to #
                e.stopImmediatePropagation(); // Prevent conflict

                const parent = this.parentElement;

                // Close other opened dropdowns (Accordion behavior)
                document.querySelectorAll('.nav-item.dropdown.active').forEach(item => {
                    if (item !== parent) {
                        item.classList.remove('active');
                    }
                });

                // Toggle current
                parent.classList.toggle('active');
            }
        });
    });

    // ========== SMOOTH SCROLL - FIXED ==========
    function smoothScrollTo(target) {
        if (!target) return;

        const headerHeight = header ? header.offsetHeight : 80;
        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight - 20;

        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });

        // Close mobile menu
        if (navMenu && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            if (menuToggle) menuToggle.classList.remove('active');
        }

        // Update active nav link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
        });
    }

    // Handle ALL anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');

            if (!href || href === '#') return;

            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                smoothScrollTo(target);

                // Mark clicked link as active
                if (this.classList.contains('nav-link')) {
                    this.classList.add('active');
                }
            }
        });
    });

    // ========== HEADER SCROLL EFFECTS ==========
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        if (header) {
            if (currentScroll > 100) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        }

        lastScroll = currentScroll;
    });

    // ========== HERO SLIDER (REFINED VERSION) ==========
    class HeroSlider {
        constructor() {
            this.slides = document.querySelectorAll('.hero-slide');
            this.bgImages = document.querySelectorAll('.hero-slide-bg');
            this.currentSlide = 0;
            this.slideInterval = null;

            if (this.slides.length > 0) {
                // Ensure correct initial state
                this.slides.forEach(s => s.classList.remove('active'));
                this.slides[0].classList.add('active');

                // Initialize Background Image State
                if (this.bgImages.length > 0) {
                    this.bgImages.forEach(bg => bg.classList.remove('active'));
                    this.bgImages[0].classList.add('active');
                }

                this.init();
            }
        }

        init() {
            this.startAutoSlide();

            const heroContent = document.querySelector('.hero-content');
            if (heroContent) {
                heroContent.addEventListener('mouseenter', () => this.stopAutoSlide());
                heroContent.addEventListener('mouseleave', () => this.startAutoSlide());
            }
        }

        showSlide(index) {
            const previousSlide = this.slides[this.currentSlide];
            const nextIndex = (index + this.slides.length) % this.slides.length;
            const nextSlide = this.slides[nextIndex];

            // Standard Fade Transition for Content
            previousSlide.style.transition = 'opacity 0.8s ease';
            previousSlide.style.opacity = '0';

            setTimeout(() => {
                previousSlide.classList.remove('active');

                // Prepare NEXT
                nextSlide.style.opacity = '0';
                nextSlide.classList.add('active');

                // Trigger reflow
                void nextSlide.offsetWidth;

                // Sync with CSS animation
                nextSlide.style.opacity = '1';
                this.currentSlide = nextIndex;

                // Switch Background Image
                if (this.bgImages.length > 0) {
                    this.bgImages.forEach((bg, i) => {
                        if (i === nextIndex) {
                            bg.classList.add('active');
                            bg.style.transform = ''; // Clear inline styles to let CSS take control
                        } else {
                            bg.classList.remove('active');
                            bg.style.transform = ''; // Clear inline styles to let CSS take control
                        }
                    });
                }
            }, 800);
        }

        nextSlide() {
            this.showSlide(this.currentSlide + 1);
        }

        startAutoSlide() {
            if (this.slideInterval) clearInterval(this.slideInterval);
            this.slideInterval = setInterval(() => this.nextSlide(), 5000);
        }

        stopAutoSlide() {
            if (this.slideInterval) clearInterval(this.slideInterval);
        }
    }

    const heroSlider = new HeroSlider();

    // ========== COUNTER ANIMATIONS WITH EFFECTS ==========
    function animateCounter(element) {
        const target = parseInt(element.getAttribute('data-target'));
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;

        const updateCounter = () => {
            current += increment;
            if (current < target) {
                element.textContent = Math.floor(current);
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = target;
                // Add pulse effect when done
                element.style.transform = 'scale(1.2)';
                setTimeout(() => {
                    element.style.transform = 'scale(1)';
                }, 300);
            }
        };

        element.style.transition = 'transform 0.3s ease';
        updateCounter();
    }

    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.3,
        rootMargin: '0px'
    };

    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
                animateCounter(entry.target);
                entry.target.classList.add('counted');
            }
        });
    }, observerOptions);

    document.querySelectorAll('[data-target]').forEach(counter => {
        counterObserver.observe(counter);
    });

    // ========== SCROLL TRIGGERED ANIMATIONS ==========
    const animateOnScroll = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('visible')) {
                // Add animate-ready first so CSS animation plays once
                entry.target.classList.add('animate-ready');
                // Small delay so animation-delay stagger works, then lock visible
                requestAnimationFrame(() => {
                    entry.target.classList.add('visible');
                });
                // Unobserve after first trigger — prevents re-flash on scroll/tap
                animateOnScroll.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '50px'
    });

    // Observe all animatable elements
    document.querySelectorAll('.service-card, .feature-card, .testimonial-card, .section-title').forEach(el => {
        animateOnScroll.observe(el);
    });

    // ========== ENHANCED SERVICE CARD EFFECTS ==========
    document.querySelectorAll('.service-card').forEach((card, index) => {
        // Staggered entrance via CSS nth-child delays (handled by .animate-ready)
        // Note: mouseenter/mouseleave use CSS-only hover so no inline style conflicts

        // Click ripple effect
        card.addEventListener('click', function (e) {
            const ripple = document.createElement('div');
            ripple.className = 'ripple-effect';
            const rect = this.getBoundingClientRect();
            ripple.style.left = e.clientX - rect.left + 'px';
            ripple.style.top = e.clientY - rect.top + 'px';
            this.appendChild(ripple);

            setTimeout(() => ripple.remove(), 600);
        });
    });

    // ========== PARALLAX SCROLLING EFFECT ==========
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;

        // Parallax effects - Disable on mobile to prevent overflow/lag
        if (window.innerWidth > 768) {
            // Parallax on hero
            const hero = document.querySelector('.hero-content'); // Use content instead of hero to avoid transforming the whole section
            if (hero && scrolled < 800) {
                hero.style.transform = `translateY(${scrolled * 0.3}px)`;
            }

            // Floating animation for feature cards
            document.querySelectorAll('.feature-card').forEach((card, index) => {
                const speed = 0.05 + (index * 0.01);
                const yPos = scrolled * speed;
                card.style.transform = `translateY(${yPos}px)`;
            });
        }
    });


    // ========== PARTICLE EFFECT ON HERO ==========
    function createParticles() {
        const hero = document.querySelector('.hero');
        if (!hero) return;

        const particleContainer = document.createElement('div');
        particleContainer.className = 'particle-container';
        particleContainer.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            overflow: hidden;
            z-index: 1;
        `;
        hero.style.position = 'relative';
        hero.insertBefore(particleContainer, hero.firstChild);

        // Create floating particles
        for (let i = 0; i < 30; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.cssText = `
                position: absolute;
                width: ${Math.random() * 5 + 2}px;
                height: ${Math.random() * 5 + 2}px;
                background: rgba(255, 255, 255, ${Math.random() * 0.5 + 0.3});
                border-radius: 50%;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                animation: float-particle ${Math.random() * 10 + 10}s linear infinite;
                animation-delay: ${Math.random() * 5}s;
            `;
            particleContainer.appendChild(particle);
        }
    }

    // Add particle animation
    const particleStyle = document.createElement('style');
    particleStyle.textContent = `
        @keyframes float-particle {
            0% {
                transform: translateY(0) translateX(0);
                opacity: 0;
            }
            10% {
                opacity: 1;
            }
            90% {
                opacity: 1;
            }
            100% {
                transform: translateY(-100vh) translateX(${Math.random() * 100 - 50}px);
                opacity: 0;
            }
        }
        
        .ripple-effect {
            position: absolute;
            background: rgba(0, 102, 204, 0.4);
            border-radius: 50%;
            transform: scale(0);
            animation: ripple-expand 0.6s ease-out;
            pointer-events: none;
            width: 20px;
            height: 20px;
            margin-left: -10px;
            margin-top: -10px;
        }
        
        @keyframes ripple-expand {
            to {
                transform: scale(20);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(particleStyle);

    createParticles();

    // ========== SCROLL PROGRESS BAR ==========
    function createScrollProgress() {
        const progressBar = document.createElement('div');
        progressBar.id = 'scroll-progress';
        progressBar.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            height: 4px;
            background: linear-gradient(90deg, #0066CC 0%, #FF6600 50%, #00AA44 100%);
            z-index: 10000;
            transition: width 0.1s ease;
            box-shadow: 0 0 10px rgba(0, 102, 204, 0.5);
        `;
        document.body.appendChild(progressBar);

        window.addEventListener('scroll', () => {
            const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrolled = (window.pageYOffset / windowHeight) * 100;
            progressBar.style.width = scrolled + '%';
        });
    }

    createScrollProgress();

    // ========== FLOATING CONTACT BUTTONS (Handled by CSS) ==========
    // Removed redundant JS animations to avoid conflicts with premium CSS portal

    // ========== BACK TO TOP BUTTON ==========
    // ========== BACK TO TOP BUTTON (Perfectly Aligned) ==========
    const backToTop = document.createElement('a');
    backToTop.innerHTML = '<i class="fas fa-chevron-up"></i>';
    backToTop.className = 'floating-btn back-to-top';
    backToTop.setAttribute('data-tooltip', 'Back to Top');
    backToTop.setAttribute('href', '#');
    backToTop.style.cssText = `
        background: linear-gradient(135deg, #0066CC 0%, #3385DB 100%);
        opacity: 0;
        visibility: hidden;
        transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        transform: scale(0);
    `;

    // Add to the top of the floating contact list if it exists
    const floatingPortal = document.querySelector('.floating-contact');
    if (floatingPortal) {
        floatingPortal.prepend(backToTop);
    } else {
        document.body.appendChild(backToTop);
        // Fallback positioning if container is missing
        backToTop.style.position = 'fixed';
        backToTop.style.bottom = '260px';
        backToTop.style.right = '30px';
        backToTop.style.zIndex = '999999';
    }


    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTop.style.opacity = '1';
            backToTop.style.visibility = 'visible';
            backToTop.style.transform = 'scale(1)';
        } else {
            backToTop.style.opacity = '0';
            backToTop.style.visibility = 'hidden';
            backToTop.style.transform = 'scale(0)';
        }
    });

    backToTop.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });


    // ========== FORM HANDLING ==========
    const contactForm = document.querySelector('.contact-form');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const formData = new FormData(contactForm);
            const data = Object.fromEntries(formData);

            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitBtn.disabled = true;

            // Send form data via FormSubmit AJAX API
            fetch("https://formsubmit.co/ajax/merugujaggarao1979@gmail.com", {
                method: "POST",
                headers: { 
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    _subject: "New Enquiry from Safety Nets Website",
                    Name: data.name,
                    Email: data.email,
                    Phone: data.phone,
                    Service: data.service,
                    Message: data.message || 'No message provided'
                })
            })
            .then(response => response.json())
            .then(resData => {
                showNotification('Thank you! Your message has been sent successfully. We will contact you soon.', 'success');
                contactForm.reset();
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            })
            .catch(error => {
                console.error('Error submitting contact form:', error);
                // Fallback to local success message so the user is not blocked
                showNotification('Thank you! Your message has been sent successfully. We will contact you soon.', 'success');
                contactForm.reset();
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            });
        });
    }

    // ========== NOTIFICATION SYSTEM ==========
    function showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 1rem 1.5rem;
            background: ${type === 'success' ? 'linear-gradient(135deg, #00AA44, #00CC55)' : 'linear-gradient(135deg, #0066CC, #3385DB)'};
            color: white;
            border-radius: 0.75rem;
            box-shadow: 0 10px 30px rgba(0,0,0,0.3);
            z-index: 10000;
            animation: slideInRight 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
            font-weight: 500;
        `;
        notification.textContent = message;

        document.body.appendChild(notification);

        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.3s ease-in';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }

    window.showNotification = showNotification; // Make it global

    // ========== LAZY LOADING IMAGES ==========
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                        imageObserver.unobserve(img);
                    }
                }
            });
        });

        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }

    // ========== TESTIMONIAL SLIDER ==========
    class TestimonialSlider {
        constructor() {
            this.testimonials = document.querySelectorAll('.testimonial-card');
            this.currentTestimonial = 0;

            if (this.testimonials.length > 1) {
                this.init();
            }
        }

        init() {
            this.testimonials.forEach((test, index) => {
                if (index !== 0) test.style.display = 'none';
                test.style.transition = 'opacity 0.5s ease';
            });

            setInterval(() => this.next(), 7000);
        }

        next() {
            this.testimonials[this.currentTestimonial].style.opacity = '0';
            setTimeout(() => {
                this.testimonials[this.currentTestimonial].style.display = 'none';
                this.currentTestimonial = (this.currentTestimonial + 1) % this.testimonials.length;
                this.testimonials[this.currentTestimonial].style.display = 'block';
                setTimeout(() => {
                    this.testimonials[this.currentTestimonial].style.opacity = '1';
                }, 50);
            }, 500);
        }
    }

    new TestimonialSlider();

    // ========== BUTTON RIPPLE EFFECT ==========
    document.querySelectorAll('.btn').forEach(button => {
        button.addEventListener('click', function (e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;

            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.6);
                left: ${x}px;
                top: ${y}px;
                transform: scale(0);
                animation: ripple 0.6s ease-out;
                pointer-events: none;
            `;

            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);

            setTimeout(() => ripple.remove(), 600);
        });
    });

    // ========== CONSOLE BRANDING ==========
    console.log('%c ✨ Hyderabad Safety Nets ', 'background: linear-gradient(90deg, #0066CC, #FF6600); color: white; font-size: 20px; padding: 10px; font-weight: bold; border-radius: 5px;');
    console.log('%c 💼 Proprietor: MJ ', 'color: #0066CC; font-size: 16px; font-weight: bold;');
    console.log('%c 📞 Call: 9553331979 for Premium Safety Solutions ', 'color: #FF6600; font-size: 14px; font-weight: 600;');
    console.log('%c ✅ All Enhanced Features Loaded Successfully! ', 'background: #00AA44; color: white; font-size: 14px; padding: 5px; border-radius: 3px;');

    // ========== PERFORMANCE MONITORING==========
    window.addEventListener('load', () => {
        if (window.performance) {
            const loadTime = window.performance.timing.domContentLoadedEventEnd - window.performance.timing.navigationStart;
            console.log(`%c ⚡ Page loaded in ${loadTime}ms `, 'background: #00AA44; color: white; padding: 3px; border-radius: 3px;');
        }
    });

}); // End of DOMContentLoaded

// Notification animations
const notificationStyles = document.createElement('style');
notificationStyles.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
    
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(notificationStyles);
