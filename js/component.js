// Additional component functionality

// Lazy loading for images
function initLazyLoading() {
    const images = document.querySelectorAll('img[loading="lazy"]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    }
}

// Animate elements on scroll
function initScrollAnimations() {
    const animateElements = document.querySelectorAll('.property-card, .tour-card, .testimonial-card');
    
    if ('IntersectionObserver' in window) {
        const animationObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });
        
        animateElements.forEach(element => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(20px)';
            element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            animationObserver.observe(element);
        });
    }
}

// Property filtering functionality
function initPropertyFiltering() {
    const properties = document.querySelectorAll('.property-card');
    const filterButtons = document.querySelectorAll('[data-filter]');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.dataset.filter;
            
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Filter properties
            properties.forEach(property => {
                const propertyType = property.querySelector('.property-type').textContent.toLowerCase();
                
                if (filter === 'all' || propertyType.includes(filter.toLowerCase())) {
                    property.style.display = 'block';
                    property.style.animation = 'fadeIn 0.5s ease';
                } else {
                    property.style.display = 'none';
                }
            });
        });
    });
}

// Search functionality
function initSearch() {
    const searchInput = document.getElementById('searchInput');
    const searchResults = document.getElementById('searchResults');
    
    if (searchInput) {
        let searchTimeout;
        
        searchInput.addEventListener('input', function() {
            clearTimeout(searchTimeout);
            const query = this.value.toLowerCase().trim();
            
            searchTimeout = setTimeout(() => {
                if (query.length >= 2) {
                    performSearch(query);
                } else {
                    hideSearchResults();
                }
            }, 300);
        });
        
        // Hide results when clicking outside
        document.addEventListener('click', function(e) {
            if (!searchInput.contains(e.target) && !searchResults.contains(e.target)) {
                hideSearchResults();
            }
        });
    }
    
    function performSearch(query) {
        // This would typically make an API call
        // For demo purposes, we'll search through existing properties
        const allProperties = document.querySelectorAll('.property-card');
        const results = [];
        
        allProperties.forEach(property => {
            const title = property.querySelector('.property-title').textContent.toLowerCase();
            const location = property.querySelector('.property-location').textContent.toLowerCase();
            
            if (title.includes(query) || location.includes(query)) {
                results.push({
                    title: property.querySelector('.property-title').textContent,
                    location: property.querySelector('.property-location').textContent,
                    price: property.querySelector('.property-price').textContent,
                    image: property.querySelector('img').src
                });
            }
        });
        
        displaySearchResults(results);
    }
    
    function displaySearchResults(results) {
        if (!searchResults) return;
        
        if (results.length === 0) {
            searchResults.innerHTML = '<div class="search-no-results">No properties found</div>';
        } else {
            searchResults.innerHTML = results.map(result => `
                <div class="search-result-item">
                    <img src="${result.image}" alt="${result.title}" class="search-result-image">
                    <div class="search-result-content">
                        <h4 class="search-result-title">${result.title}</h4>
                        <p class="search-result-location">${result.location}</p>
                        <p class="search-result-price">${result.price}</p>
                    </div>
                </div>
            `).join('');
        }
        
        searchResults.style.display = 'block';
    }
    
    function hideSearchResults() {
        if (searchResults) {
            searchResults.style.display = 'none';
        }
    }
}

// Contact form functionality
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const data = Object.fromEntries(formData);
            
            // Basic validation
            if (validateContactForm(data)) {
                // Simulate form submission
                showNotification('Thank you for your message! We will get back to you soon.', 'success');
                this.reset();
            }
        });
    }
}

function validateContactForm(data) {
    const errors = [];
    
    if (!data.name || data.name.trim().length < 2) {
        errors.push('Please enter a valid name');
    }
    
    if (!data.email || !isValidEmail(data.email)) {
        errors.push('Please enter a valid email address');
    }
    
    if (!data.phone || data.phone.trim().length < 10) {
        errors.push('Please enter a valid phone number');
    }
    
    if (!data.message || data.message.trim().length < 10) {
        errors.push('Please enter a message (minimum 10 characters)');
    }
    
    if (errors.length > 0) {
        showNotification(errors.join('<br>'), 'error');
        return false;
    }
    
    return true;
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Notification system
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // Show notification
    setTimeout(() => notification.classList.add('show'), 100);
    
    // Auto remove after 5 seconds
    setTimeout(() => removeNotification(notification), 5000);
    
    // Manual close
    notification.querySelector('.notification-close').addEventListener('click', () => {
        removeNotification(notification);
    });
}

function removeNotification(notification) {
    notification.classList.remove('show');
    setTimeout(() => {
        if (notification.parentNode) {
            notification.parentNode.removeChild(notification);
        }
    }, 300);
}

// Bookmark/Favorites functionality
function initBookmarks() {
    const bookmarkButtons = document.querySelectorAll('.property-action[title*="favorite"]');
    let bookmarks = JSON.parse(localStorage.getItem('propertyBookmarks')) || [];
    
    bookmarkButtons.forEach(button => {
        const propertyCard = button.closest('.property-card');
        const propertyId = propertyCard.dataset.id || propertyCard.querySelector('.property-title').textContent;
        
        // Set initial state
        if (bookmarks.includes(propertyId)) {
            button.classList.add('bookmarked');
            button.querySelector('svg').style.fill = 'currentColor';
        }
        
        button.addEventListener('click', function(e) {
            e.preventDefault();
            toggleBookmark(propertyId, this);
        });
    });
    
    function toggleBookmark(propertyId, button) {
        const index = bookmarks.indexOf(propertyId);
        
        if (index > -1) {
            // Remove bookmark
            bookmarks.splice(index, 1);
            button.classList.remove('bookmarked');
            button.querySelector('svg').style.fill = 'none';
            showNotification('Property removed from favorites', 'info');
        } else {
            // Add bookmark
            bookmarks.push(propertyId);
            button.classList.add('bookmarked');
            button.querySelector('svg').style.fill = 'currentColor';
            showNotification('Property added to favorites', 'success');
        }
        
        localStorage.setItem('propertyBookmarks', JSON.stringify(bookmarks));
    }
}

// Price range slider functionality
function initPriceFilter() {
    const priceSlider = document.getElementById('priceSlider');
    const priceDisplay = document.getElementById('priceDisplay');
    
    if (priceSlider) {
        priceSlider.addEventListener('input', function() {
            const value = this.value;
            const formattedPrice = formatPrice(value);
            
            if (priceDisplay) {
                priceDisplay.textContent = `Up to ${formattedPrice}`;
            }
            
            // Filter properties by price
            filterPropertiesByPrice(value);
        });
    }
}

function formatPrice(value) {
    const crores = value / 10000000; // Convert to crores
    return `₹${crores.toFixed(1)} Cr`;
}

function filterPropertiesByPrice(maxPrice) {
    const properties = document.querySelectorAll('.property-card');
    
    properties.forEach(property => {
        const priceText = property.querySelector('.property-price').textContent;
        const price = parsePrice(priceText);
        
        if (price <= maxPrice) {
            property.style.display = 'block';
        } else {
            property.style.display = 'none';
        }
    });
}

function parsePrice(priceText) {
    // Extract number from price text like "₹12.5 Cr"
    const match = priceText.match(/₹(\d+\.?\d*)\s*Cr/);
    return match ? parseFloat(match[1]) * 10000000 : 0;
}

// Initialize all components
document.addEventListener('DOMContentLoaded', function() {
    initLazyLoading();
    initScrollAnimations();
    initPropertyFiltering();
    initSearch();
    initContactForm();
    initBookmarks();
    initPriceFilter();
});

// Performance optimization
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js')
            .then(function(registration) {
                console.log('ServiceWorker registration successful');
            })
            .catch(function(err) {
                console.log('ServiceWorker registration failed');
            });
    });
}


function downloadBrochure(pdfUrl, fileName) {
    // Create a temporary anchor element
    const link = document.createElement('a');
    link.href = pdfUrl;
    link.download = fileName || 'property-brochure.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // Optional: Track download with analytics
    console.log(`Downloaded: ${fileName}`);
    
    // Optional: Show a confirmation message
    showNotification(`Downloading ${fileName}...`, 'success');
}


// Notification system (if not already present)
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // Show notification
    setTimeout(() => notification.classList.add('show'), 100);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 5000);
    
    // Manual close
    notification.querySelector('.notification-close').addEventListener('click', () => {
        notification.classList.remove('show');
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    });
}

