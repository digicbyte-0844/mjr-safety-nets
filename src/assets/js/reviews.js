// ========================================
// LIVE REVIEW SYSTEM - LocalStorage & Firebase Setup
// ========================================

// Firebase SDK Imports (Module Type)
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-analytics.js";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBmHqQJ2zUOzl0zgdrL6Jhmnl3oCdMkVhY",
    authDomain: "safety-net-18e70.firebaseapp.com",
    projectId: "safety-net-18e70",
    storageBucket: "safety-net-18e70.firebasestorage.app",
    messagingSenderId: "74174225213",
    appId: "1:74174225213:web:3baf33885e3abfcd0b4354",
    measurementId: "G-1M3WDMKHTJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

(function () {
    'use strict';

    // Initialize Review System
    const ReviewSystem = {
        init() {
            this.setupModal();
            this.setupForm();
            this.loadReviews();
        },

        // Setup Modal Open/Close
        setupModal() {
            const modal = document.getElementById('reviewModal');
            const openBtn = document.getElementById('openReviewModal');
            const closeBtn = modal?.querySelector('.modal-close');

            if (openBtn && modal) {
                openBtn.addEventListener('click', () => {
                    modal.classList.add('active');
                    document.body.style.overflow = 'hidden';
                });
            }

            if (closeBtn && modal) {
                closeBtn.addEventListener('click', () => {
                    modal.classList.remove('active');
                    document.body.style.overflow = '';
                });
            }

            // Close on outside click
            modal?.addEventListener('click', (e) => {
                if (e.target === modal) {
                    modal.classList.remove('active');
                    document.body.style.overflow = '';
                }
            });
        },

        // Setup Star Rating Input
        setupForm() {
            const stars = document.querySelectorAll('.star-rating-input i');
            const ratingInput = document.getElementById('ratingValue');
            const form = document.getElementById('reviewForm');

            // Star rating click handler
            stars.forEach(star => {
                star.addEventListener('click', () => {
                    const rating = star.getAttribute('data-rating');
                    ratingInput.value = rating;

                    // Update star display
                    stars.forEach(s => {
                        const starRating = parseInt(s.getAttribute('data-rating'));
                        if (starRating <= parseInt(rating)) {
                            s.classList.add('active');
                        } else {
                            s.classList.remove('active');
                        }
                    });
                });
            });

            // Form submission handler
            if (form) {
                form.addEventListener('submit', (e) => {
                    e.preventDefault();
                    this.submitReview();
                });
            }
        },

        // Submit Review
        submitReview() {
            const name = document.getElementById('reviewerName').value.trim();
            const location = document.getElementById('reviewerLocation').value.trim();
            const rating = parseInt(document.getElementById('ratingValue').value);
            const text = document.getElementById('reviewText').value.trim();

            if (!name || !location || !text) {
                alert('Please fill in all required fields!');
                return;
            }

            // Create review object
            const review = {
                id: Date.now(),
                name: name,
                location: location,
                rating: rating,
                text: text,
                date: new Date().toISOString(),
                service: '🔹 Safety Nets'
            };

            // Save to localStorage
            this.saveReview(review);

            // Display review
            this.displayNewReview(review);

            // Show success message
            this.showSuccessMessage();

            // Reset form and close modal
            document.getElementById('reviewForm').reset();
            document.getElementById('ratingValue').value = '5';
            document.getElementById('reviewModal').classList.remove('active');
            document.body.style.overflow = '';
        },

        // Save review to localStorage
        saveReview(review) {
            let reviews = JSON.parse(localStorage.getItem('websiteReviews') || '[]');
            reviews.unshift(review); // Add to beginning

            // Keep only last 50 reviews
            if (reviews.length > 50) {
                reviews = reviews.slice(0, 50);
            }

            localStorage.setItem('websiteReviews', JSON.stringify(reviews));
        },

        // Display new review dynamically
        displayNewReview(review) {
            // Find the grid where reviews are displayed (after the slider)
            const reviewsContainer = document.querySelector('.testimonials .container');

            if (!reviewsContainer) {
                console.warn('Reviews container not found');
                return;
            }

            // Create new review HTML
            const reviewHTML = this.createReviewHTML(review);

            // Insert after the slider section
            const sliderWrapper = reviewsContainer.querySelector('.testimonial-slider-wrapper');
            if (sliderWrapper && sliderWrapper.nextElementSibling) {
                sliderWrapper.nextElementSibling.insertAdjacentHTML('afterbegin', reviewHTML);
            } else {
                // If no grid exists, create one
                sliderWrapper.insertAdjacentHTML('afterend', `
                    <div class="row" style="margin-top: 3rem;">
                        ${reviewHTML}
                    </div>
                `);
            }

            // Animate in
            setTimeout(() => {
                const newCard = document.querySelector(`[data-review-id="${review.id}"]`);
                if (newCard) {
                    newCard.style.opacity = '1';
                    newCard.style.transform = 'translateY(0)';
                }
            }, 100);
        },

        // Create review HTML
        createReviewHTML(review) {
            const initial = review.name.charAt(0).toUpperCase();
            const colors = [
                'linear-gradient(135deg, #9B59B6 0%, #8E44AD 100%)',
                'linear-gradient(135deg, #0077FF 0%, #00C9FF 100%)',
                'linear-gradient(135deg, #00D97E 0%, #00F5A0 100%)',
                'linear-gradient(135deg, #FF6B35 0%, #FFAA00 100%)'
            ];
            const randomColor = colors[Math.floor(Math.random() * colors.length)];

            // Generate stars
            const fullStars = review.rating;
            let starsHTML = '';
            for (let i = 0; i < 5; i++) {
                if (i < fullStars) {
                    starsHTML += '<i class="fas fa-star"></i> ';
                } else {
                    starsHTML += '<i class="far fa-star"></i> ';
                }
            }

            const timeAgo = this.getTimeAgo(new Date(review.date));

            return `
                <div class="testimonial-card" data-review-id="${review.id}" 
                     style="opacity: 0; transform: translateY(20px); transition: all 0.6s ease; margin: 1rem;">
                    <div class="testimonial-header">
                        <div class="author-avatar" style="background: ${randomColor};">${initial}</div>
                        <div class="author-info">
                            <h4>${this.escapeHtml(review.name)}</h4>
                            <p>${this.escapeHtml(review.location)}</p>
                        </div>
                        <div style="margin-left: auto; font-size: 0.75rem; color: #25D366; font-weight: 600;">
                            ✓ NEW
                        </div>
                    </div>
                    <div class="testimonial-rating">
                        ${starsHTML}
                    </div>
                    <div class="testimonial-text">
                        "${this.escapeHtml(review.text)}"
                    </div>
                    <div class="testimonial-service">${review.service}</div>
                    <div style="font-size: 0.75rem; color: #999; margin-top: 0.5rem; text-align: right;">
                        ${timeAgo}
                    </div>
                </div>
            `;
        },

        // Load existing reviews from localStorage
        loadReviews() {
            const reviews = JSON.parse(localStorage.getItem('websiteReviews') || '[]');

            if (reviews.length === 0) return;

            const reviewsContainer = document.querySelector('.testimonials .container');
            if (!reviewsContainer) return;

            const sliderWrapper = reviewsContainer.querySelector('.testimonial-slider-wrapper');
            if (!sliderWrapper) return;

            // Create container for user reviews
            let userReviewsContainer = sliderWrapper.nextElementSibling;
            if (!userReviewsContainer || !userReviewsContainer.classList.contains('user-reviews-grid')) {
                sliderWrapper.insertAdjacentHTML('afterend', `
                    <div class="user-reviews-grid row" style="margin-top: 3rem;"></div>
                `);
                userReviewsContainer = sliderWrapper.nextElementSibling;
            }

            // Display reviews
            reviews.forEach(review => {
                userReviewsContainer.insertAdjacentHTML('beforeend', this.createReviewHTML(review));
            });

            // Animate in
            setTimeout(() => {
                document.querySelectorAll('[data-review-id]').forEach(card => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                });
            }, 100);
        },

        // Show success message
        showSuccessMessage() {
            const message = document.createElement('div');
            message.className = 'review-success-toast';
            message.innerHTML = `
                <div style="background: linear-gradient(135deg, #00D97E 0%, #00F5A0 100%);
                            color: white; padding: 1.5rem 2rem; border-radius: 0.5rem;
                            box-shadow: 0 10px 30px rgba(0, 217, 126, 0.3);
                            position: fixed; top: 20px; right: 20px; z-index: 99999;
                            animation: slideInRight 0.5s ease;">
                    <strong style="font-size: 1.125rem;">✓ Review Submitted!</strong><br>
                    <span style="opacity: 0.9;">Thank you for your feedback! Your review is now live.</span>
                </div>
            `;
            document.body.appendChild(message);

            setTimeout(() => {
                message.style.opacity = '0';
                message.style.transform = 'translateX(100%)';
                setTimeout(() => message.remove(), 500);
            }, 4000);
        },

        // Utility: Escape HTML to prevent XSS
        escapeHtml(text) {
            const div = document.createElement('div');
            div.textContent = text;
            return div.innerHTML;
        },

        // Utility: Calculate time ago
        getTimeAgo(date) {
            const seconds = Math.floor((new Date() - date) / 1000);

            if (seconds < 60) return 'Just now';
            if (seconds < 3600) return `${Math.floor(seconds / 60)} min ago`;
            if (seconds < 86400) return `${Math.floor(seconds / 3600)} hours ago`;
            if (seconds < 604800) return `${Math.floor(seconds / 86400)} days ago`;

            return date.toLocaleDateString();
        }
    };

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => ReviewSystem.init());
    } else {
        ReviewSystem.init();
    }

})();

// Add animation CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            opacity: 0;
            transform: translateX(100%);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }

    .modal-overlay {
        display: none;
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.7);
        z-index: 10000;
        backdrop-filter: blur(5px);
        align-items: center;
        justify-content: center;
    }

    .modal-overlay.active {
        display: flex !important;
    }

    .star-rating-input i {
        color: #ddd;
        cursor: pointer;
        font-size: 1.5rem;
        transition: color 0.2s ease;
    }

    .star-rating-input i.active {
        color: #FFB800;
    }

    .star-rating-input i:hover {
        color: #FFB800;
    }

    .user-reviews-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
        gap: 1.5rem;
    }
`;
document.head.appendChild(style);

console.log('✅ Live Review System Initialized!');
