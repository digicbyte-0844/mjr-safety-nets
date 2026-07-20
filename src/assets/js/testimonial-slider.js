// Testimonials Carousel & Review System
document.addEventListener('DOMContentLoaded', function () {
    // === CAROUSEL LOGIC ===
    const track = document.querySelector('.testimonial-track');
    const slides = document.querySelectorAll('.testimonial-slide');
    const prevBtn = document.querySelector('.slider-prev');
    const nextBtn = document.querySelector('.slider-next');
    const dots = document.querySelectorAll('.dot');

    // Safety check
    if (!track || slides.length === 0) return;

    let currentSlide = 0;
    let totalSlides = slides.length; // Will update dynamically
    // Show 2 on desktop, 1 on mobile
    let slidesToShow = window.innerWidth >= 768 ? 2 : 1;

    // Update widths based on screen size
    function updateLayout() {
        slidesToShow = window.innerWidth >= 768 ? 2 : 1;
        const slideWidthPct = 100 / slidesToShow;

        // Re-select in case new slides added
        const allSlides = document.querySelectorAll('.testimonial-slide');
        totalSlides = allSlides.length;

        allSlides.forEach(slide => {
            slide.style.flex = `0 0 ${slideWidthPct}%`;
            slide.style.maxWidth = `${slideWidthPct}%`; // Enforce width
        });

        goToSlide(currentSlide);
    }

    // Move to specific slide
    function goToSlide(index) {
        // Bounds checking
        const maxIndex = Math.max(0, totalSlides - slidesToShow);

        if (index < 0) {
            currentSlide = maxIndex;
        } else if (index > maxIndex) {
            currentSlide = 0;
        } else {
            currentSlide = index;
        }

        const translateX = -(currentSlide * (100 / slidesToShow));
        track.style.transform = `translate3d(${translateX}%, 0, 0)`;

        // Update dots (limit to first 4 for simplicity if many reviews)
        dots.forEach((dot, i) => {
            if (i < dots.length) {
                dot.classList.toggle('active', i === currentSlide || (currentSlide > dots.length && i === dots.length - 1));
            }
        });
    }

    function nextSlide() {
        goToSlide(currentSlide + 1);
    }

    function prevSlide() {
        goToSlide(currentSlide - 1);
    }

    // Event Listeners (using slightly different syntax to ensure binding)
    if (prevBtn) prevBtn.onclick = prevSlide;
    if (nextBtn) nextBtn.onclick = nextSlide;

    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => goToSlide(index));
    });

    // Resize Handler
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(updateLayout, 200);
    });

    // Initial Setup
    updateLayout();

    // === AUTO PLAY (Pause on Hover) ===
    let autoPlayInterval = setInterval(nextSlide, 5000);
    const sliderWrapper = document.querySelector('.testimonial-slider-wrapper');
    if (sliderWrapper) {
        sliderWrapper.addEventListener('mouseenter', () => clearInterval(autoPlayInterval));
        sliderWrapper.addEventListener('mouseleave', () => autoPlayInterval = setInterval(nextSlide, 5000));
    }

    // === REVIEW MODAL LOGIC ===
    const modal = document.getElementById('reviewModal');
    const openBtn = document.getElementById('openReviewModal');
    const closeBtn = document.querySelector('.modal-close');
    const form = document.getElementById('reviewForm');
    const stars = document.querySelectorAll('.star-rating-input i');
    const ratingInput = document.getElementById('ratingValue');

    if (modal && openBtn) {
        openBtn.addEventListener('click', () => {
            modal.classList.add('active');
        });

        closeBtn.addEventListener('click', () => {
            modal.classList.remove('active');
        });

        // Close on outside click
        modal.addEventListener('click', (e) => {
            if (e.target === modal) modal.classList.remove('active');
        });
    }

    // Star Rating Interaction
    if (stars.length > 0) {
        stars.forEach(star => {
            star.addEventListener('click', function () {
                const rating = this.getAttribute('data-rating');
                ratingInput.value = rating;

                // Update visual
                stars.forEach(s => {
                    const sRating = s.getAttribute('data-rating');
                    if (sRating <= rating) {
                        s.classList.add('active');
                        s.style.color = '#FFB800';
                    } else {
                        s.classList.remove('active');
                        s.style.color = '#ddd';
                    }
                });
            });
        });
    }

    // Handle Form Submit (LIVE UPDATE)
    if (form) {
        form.addEventListener('submit', function (e) {
            e.preventDefault();

            // Get values
            const name = document.getElementById('reviewerName').value;
            const location = document.getElementById('reviewerLocation').value;
            const text = document.getElementById('reviewText').value;
            const rating = parseInt(document.getElementById('ratingValue').value);

            // Create New Slide HTML
            const newSlide = document.createElement('div');
            newSlide.className = 'testimonial-slide';

            // Generate Stars HTML
            let starsHtml = '';
            for (let i = 0; i < 5; i++) {
                if (i < rating) starsHtml += '<i class="fas fa-star" style="color:#FFB800"></i>';
                else starsHtml += '<i class="fas fa-star" style="color:#ddd"></i>'; // simplified
            }

            // Random avatar color for demo if no image
            const avatarColor = `hsl(${Math.random() * 360}, 70%, 50%)`;

            newSlide.innerHTML = `
                <div class="testimonial-card-slider" style="animation: fadeInUp-optimized 0.6s ease;">
                    <div class="testimonial-image-wrapper">
                        <div class="customer-photo" style="background: ${avatarColor}; display: flex; align-items: center; justify-content: center; color: white; font-size: 2rem; font-weight: bold;">
                            ${name.charAt(0)}
                        </div>
                        <div class="verified-badge"><i class="fas fa-check-circle"></i></div>
                    </div>
                    <div class="testimonial-content">
                        <div class="testimonial-rating">
                            ${starsHtml}
                        </div>
                        <div class="testimonial-text">
                            "${text}"
                        </div>
                        <div class="testimonial-author-info">
                            <h4>${name}</h4>
                            <p>${location}</p>
                        </div>
                        <div class="testimonial-service">🆕 New Review</div>
                    </div>
                </div>
            `;

            // Append to track
            track.appendChild(newSlide);

            // Close modal
            modal.classList.remove('active');

            // Show Success Message
            alert('Thank you! Your review has been added successfully.');

            // Update Carousel Layout
            updateLayout();

            // Go to the new slide (last one)
            goToSlide(totalSlides - slidesToShow); // totalSlides updated in updateLayout

            // Reset form
            form.reset();
        });
    }
});
