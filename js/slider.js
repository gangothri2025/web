

function initHeroSlider() {
    const slider = document.getElementById('heroSlider');
    const slides = slider.querySelectorAll('.hero-slide');
    const prevBtn = document.getElementById('heroPrev');
    const nextBtn = document.getElementById('heroNext');
    const indicators = document.getElementById('heroIndicators');
    
    let currentSlide = 0;
    let isTransitioning = false;
    
    // Set background images
    slides.forEach(slide => {
        const bgImage = slide.dataset.bg;
        if (bgImage) {
            slide.style.backgroundImage = `url(${bgImage})`;
        }
    });
    
    function goToSlide(index) {
        if (isTransitioning) return;
        isTransitioning = true;
        
        // Remove active class from current slide
        slides[currentSlide].classList.remove('active');
        
        // Update current slide index
        currentSlide = index;
        
        // Add active class to new slide
        slides[currentSlide].classList.add('active');
        
        // Update indicators
        updateIndicators();
        
        // Reset transition flag after animation
        setTimeout(() => {
            isTransitioning = false;
        }, 1000);
    }
    
    function nextSlide() {
        const next = (currentSlide + 1) % slides.length;
        goToSlide(next);
    }
    
    function prevSlide() {
        const prev = (currentSlide - 1 + slides.length) % slides.length;
        goToSlide(prev);
    }
    
    function updateIndicators() {
        indicators.querySelectorAll('.indicator').forEach((indicator, index) => {
            indicator.classList.toggle('active', index === currentSlide);
        });
    }
    
    // Event listeners
    if (nextBtn) {
        nextBtn.addEventListener('click', nextSlide);
    }
    
    if (prevBtn) {
        prevBtn.addEventListener('click', prevSlide);
    }
    
    // Indicator click handlers
    indicators.querySelectorAll('.indicator').forEach((indicator, index) => {
        indicator.addEventListener('click', () => goToSlide(index));
    });
    
    // Auto-slide functionality
    let autoSlideInterval = setInterval(nextSlide, 5000);
    
    // Pause auto-slide on hover
    slider.addEventListener('mouseenter', () => {
        clearInterval(autoSlideInterval);
    });
    
    slider.addEventListener('mouseleave', () => {
        autoSlideInterval = setInterval(nextSlide, 5000);
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowLeft') {
            clearInterval(autoSlideInterval);
            prevSlide();
            autoSlideInterval = setInterval(nextSlide, 5000);
        } else if (e.key === 'ArrowRight') {
            clearInterval(autoSlideInterval);
            nextSlide();
            autoSlideInterval = setInterval(nextSlide, 5000);
        }
    });
    
    // Touch/swipe support for mobile
    let touchStartX = 0;
    let touchEndX = 0;
    
    slider.addEventListener('touchstart', function(e) {
        touchStartX = e.changedTouches[0].screenX;
    });
    
    slider.addEventListener('touchend', function(e) {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });
    
    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;
        
        if (Math.abs(diff) > swipeThreshold) {
            clearInterval(autoSlideInterval);
            
            if (diff > 0) {
                nextSlide(); // Swipe left - next slide
            } else {
                prevSlide(); // Swipe right - previous slide
            }
            
            autoSlideInterval = setInterval(nextSlide, 5000);
        }
    }
    
    // Initialize
    updateIndicators();
}

// Call initialization when DOM is loaded
document.addEventListener('DOMContentLoaded', initHeroSlider);
