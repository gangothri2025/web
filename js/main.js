// Main JavaScript functionality
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initHeader();
    initHeroSlider();
    initMobileMenu();
    initSmoothScroll();
    initNewsletterForm();
    initVideoModal();
    
    // Load dynamic content
    loadProperties();
    loadTours();
    loadTestimonials();
    initInteractiveMap();
});

// Header functionality
function initHeader() {
    const header = document.getElementById('header');
    const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');
    
    // Handle scroll effect
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // Handle active navigation
    window.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('section[id]');
        const scrollY = window.pageYOffset;
        
        sections.forEach(function(section) {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            const sectionId = section.getAttribute('id');
            
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLinks.forEach(function(link) {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#' + sectionId) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });
}

// Mobile menu functionality
function initMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
    
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            mobileMenu.style.display = mobileMenu.style.display === 'block' ? 'none' : 'block';
        });
        
        // Close mobile menu when clicking on links
        mobileNavLinks.forEach(function(link) {
            link.addEventListener('click', function() {
                mobileMenu.style.display = 'none';
            });
        });
        
        // Close mobile menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!mobileMenuBtn.contains(e.target) && !mobileMenu.contains(e.target)) {
                mobileMenu.style.display = 'none';
            }
        });
    }
}

// Smooth scroll functionality
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(function(link) {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const headerHeight = document.getElementById('header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Newsletter form functionality
function initNewsletterForm() {
    const form = document.getElementById('newsletterForm');
    
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]').value;
            
            if (email) {
                // Simulate form submission
                alert('Thank you for subscribing! We will keep you updated with the latest properties and market insights.');
                this.reset();
            }
        });
    }
}

// Video modal functionality
function initVideoModal() {
    const modal = document.getElementById('videoModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalVideo = document.getElementById('modalVideo');
    const modalClose = document.getElementById('modalClose');
    
    if (modal && modalClose) {
        modalClose.addEventListener('click', function() {
            closeVideoModal();
        });
        
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeVideoModal();
            }
        });
        
        // Close on escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && modal.classList.contains('active')) {
                closeVideoModal();
            }
        });
    }
    
    function closeVideoModal() {
        modal.classList.remove('active');
        modalVideo.src = '';
    }
    
    // Make openVideoModal globally accessible
    window.openVideoModal = function(title, videoUrl) {
        modalTitle.textContent = title;
        modalVideo.src = videoUrl;
        modal.classList.add('active');
    };
}

// Load properties data
function loadProperties() {
    const properties = [
        {
            id: 1,
            title: 'Luxury Technopark Apartment',
            location: 'VALLAKKADAVU,THIRUVANATHAPURAM',
            price: '₹1.5 Cr',
            beds: 4,
            baths: 5,
            area: '4,500 sq ft',
            image: 'image/a1.jpeg',
            badge: 'Featured',
            badgeColor: 'var(--Trivandrum-green-500)',
            type: 'Villa',
            pdf: 'pdf/luxury-villa-brochure.pdf',
            whatsappMessage: 'Hi, I saw your Luxury Technopark Apartment in VALLACKADAVU listed for ₹1.5 Cr. Can you share more details about the amenities and available units?'
        },
        {
            id: 2,
            title: '3 cent land',
            location: 'Near Don Bosco',
            price: '₹7.2 lakhs//Cent',
            beds: 0,
            baths: 0,
            area: '1306.8 sq ft',
            image: 'image/3cent.png',
            badge: 'New',
            badgeColor: 'var(--Trivandrum-blue-500)',
            type: 'Penthouse',
            whatsappMessage: 'Hi, I saw your hare 3 cent land  Near Don Bosco can you share more details about the amenities and available units?'
        },
        {
            id: 3,
            title: '5 cent land',
            location: 'Near Bhavans school',
            price: '₹13.2 lakhs//Cent',
            beds: 0,
            baths: 0,
            area: '2178.0 sq ft',
            image: 'image/5cent.png',
            badge: 'Heritage',
            badgeColor: 'var(--Trivandrum-gold-500)',
            type: 'Traditional',
            whatsappMessage: 'Hi, I saw your hare 5 cent land  Near Bhavans school can you share more details about the amenities and available units?'
        },
        {
            id: 4,
            title: 'A three-story luxury',
            location: 'Sreekaryam',
            price: '₹4.5 Cr',
            beds: 14,
            baths: 16,
            area: '6000 sq ft',
            image: 'image/g+3.png',
            badge: 'Exclusive',
            badgeColor: '#8b5cf6',
            type: 'Traditional',
            whatsappMessage: 'Hi, I saw your hare A three-story luxury  Near Bhavans school can you share more details about the amenities and available units?'
        },
        {
            id: 5,
            title: '20 cent land',
            location: 'Ayoor',
            price: '₹2.2 Cr',
            beds: 0,
            baths: 0,
            area: '8712 sq ft',
            image: 'image/img.jpg',
            badge: 'Mountain View',
            badgeColor: '#10b981',
            type: 'Traditional',
            whatsappMessage: 'Hi, I saw your hare A 220 cent, facing main road Trivandrum Ayoor road, Asking price Rs. 11 lakhs/cent more details about the amenities and available units?'
        },
        {
            id: 6,
            title: 'Rajiv Nagar',
            location: 'Kulathoor, Trivandrum',
            price: '₹85Lk',
            beds: 4,
            baths: 4,
            area: '1,500 sq ft',
            image: 'image/img2.jpg',
            badge: 'Urban',
            badgeColor: 'var(--gray-500)',
            type: 'Apartment',
            whatsappMessage: 'Hi, I saw your hare For sale- Two 4BHK villas at Rajiv Nagar near Radio Station Monvila   Details'
        },
        {
    id: 7,
    title: 'Premium Villa with Pool',
    location: 'Kazhakootam, Trivandrum',
    price: '₹98 Lk',
    beds: 5,
    baths: 4,
    area: '1,860 sq ft',
    image: 'image//img2.jpg',
    badge: 'Luxury',
    badgeColor: '#f59e0b',
    type: 'Villa',
    whatsappMessage: 'Hi, I saw your Premium Villa with Pool in Kazhakootam listed for ₹3.2 Cr. Can you share more details about the amenities and available units?'
}
    ];
    
    const grid = document.getElementById('propertiesGrid');
    if (grid) {
        grid.innerHTML = properties.map(property => `
<div class="property-card">
    <div class="property-image">
        <img src="${property.image}" alt="${property.title}" loading="lazy">
        <div class="property-badge" style="background-color: ${property.badgeColor}">
            ${property.badge}
        </div>
        <div class="property-actions">
            <button class="property-action" title="Add to favorites">
                <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                </svg>
            </button>
        </div>
    </div>
    <div class="property-content">
        <div class="property-location">
            <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                <circle cx="12" cy="10" r="3"></circle>
            </svg>
            ${property.location}
        </div>
        <h3 class="property-title">${property.title}</h3>
        <div class="property-price-row">
            <span class="property-price">${property.price}</span>
            <span class="property-type">${property.type}</span>
        </div>
        <div class="property-features">
            <div class="property-feature">
                <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M20 9V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v3"></path>
                    <path d="M2 16a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-5a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2z"></path>
                    <path d="M6 12v4"></path>
                    <path d="M10 12v4"></path>
                    <path d="M14 12v4"></path>
                    <path d="M18 12v4"></path>
                </svg>
                ${property.beds} Beds
            </div>
            <div class="property-feature">
                <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M9 6 6.5 3.5a1.5 1.5 0 0 0-1 0l-1 1a1.5 1.5 0 0 0 0 1L6.5 9 9 6Z"></path>
                    <path d="M15 6l2.5-2.5a1.5 1.5 0 0 1 1 0l1 1a1.5 1.5 0 0 1 0 1L17.5 9 15 6Z"></path>
                    <path d="M9 18l-2.5 2.5a1.5 15 0 0 1-1 0l-1-1a1.5 1.5 0 0 1 0-1L6.5 15 9 18Z"></path>
                    <path d="M15 18l2.5 2.5a1.5 1.5 0 0 0 1 0l1-1a1.5 1.5 0 0 0 0-1L17.5 15 15 18Z"></path>
                    <rect width="7" height="7" x="8.5" y="8.5" rx="1"></rect>
                </svg>
                ${property.baths} Baths
            </div>
            <div class="property-feature">
                <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <rect width="18" height="18" x="3" y="3" rx="2" ry="2"></rect>
                    <rect width="6" height="6" x="9" y="9" rx="1" ry="1"></rect>
                </svg>
                ${property.area}
            </div>
        </div>
       <a href="https://wa.me/+919539041595?text=${encodeURIComponent(property.whatsappMessage)}" 
   class="btn-primary property-button" 
   target="_blank" 
   style="display: flex; align-items: center; justify-content: center; gap: 8px;">
    Contact on WhatsApp
</a>
    </div>
</div>`).join('');
    }
}

// Load tours data
function loadTours() {
    const tours = [
        {
            id: 1,
            title: 'Luxury Waterfront Villa',
            location: 'Alleppey Backwaters',
            duration: '8:45',
            views: '2.5K',
            price: '₹12.5 Cr',
            thumbnail: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=600',
            videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
            features: ['360° Views', '4K Quality', 'Drone Footage'],
            type: 'Premium',
            typeColor: 'var(--Trivandrum-gold-500)'
        },
        {
            id: 2,
            title: 'Modern Penthouse Suite',
            location: 'Kochi Marine Drive',
            duration: '6:30',
            views: '1.8K',
            price: '₹8.2 Cr',
            thumbnail: 'https://images.unsplash.com/photo-1518005020951-eccb494ad742?q=80&w=600',
            videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
            features: ['Interactive Tour', 'HD Quality', 'Floor Plans'],
            type: 'Modern',
            typeColor: 'var(--Trivandrum-blue-500)'
        },
        {
            id: 3,
            title: 'Traditional Trivandrum Home',
            location: 'Kumarakom',
            duration: '10:20',
            views: '3.2K',
            price: '₹6.8 Cr',
            thumbnail: 'https://images.unsplash.com/photo-1494891848038-7bd202a2afeb?q=80&w=600',
            videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
            features: ['Heritage Details', '4K Quality', 'Cultural Context'],
            type: 'Heritage',
            typeColor: '#f59e0b'
        },
        {
            id: 4,
            title: 'Beach House Paradise',
            location: 'Kovalam Beach',
            duration: '7:15',
            views: '2.1K',
            price: '₹9.5 Cr',
            thumbnail: 'https://images.unsplash.com/photo-1487958449943-2429e8be8625?q=80&w=600',
            videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
            features: ['Ocean Views', 'Sunset Shots', 'Aerial Views'],
            type: 'Beachfront',
            typeColor: '#06b6d4'
        },
        {
            id: 5,
            title: 'Hill Station Retreat',
            location: 'Munnar Hills',
            duration: '9:10',
            views: '1.6K',
            price: '₹5.2 Cr',
            thumbnail: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=80&w=600',
            videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
            features: ['Mountain Views', 'Tea Gardens', 'Weather Details'],
            type: 'Mountain',
            typeColor: '#10b981'
        },
        {
            id: 6,
            title: 'Urban Luxury Apartment',
            location: 'Trivandrum Central',
            duration: '5:45',
            views: '1.4K',
            price: '₹4.8 Cr',
            thumbnail: 'https://images.unsplash.com/photo-1551038247-3d9af20df552?q=80&w=600',
            videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
            features: ['City Views', 'Amenities Tour', 'Lifestyle Focus'],
            type: 'Urban',
            typeColor: 'var(--gray-500)'
        }
    ];
    
    const grid = document.getElementById('toursGrid');
    if (grid) {
        grid.innerHTML = tours.map(tour => `
            <div class="tour-card">
                <div class="tour-thumbnail">
                    <img src="${tour.thumbnail}" alt="${tour.title}" loading="lazy">
                    <div class="tour-overlay">
                        <button class="play-button" onclick="openVideoModal('${tour.title}', '${tour.videoUrl}')">
                            <svg viewBox="0 0 24 24" fill="currentColor">
                                <polygon points="5,3 19,12 5,21"></polygon>
                            </svg>
                        </button>
                    </div>
                    <div class="tour-type-badge" style="background-color: ${tour.typeColor}">
                        ${tour.type}
                    </div>
                    <div class="tour-meta">
                        <div class="tour-meta-item">
                            <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                <circle cx="12" cy="12" r="10"></circle>
                                <polyline points="12,6 12,12 16,14"></polyline>
                            </svg>
                            ${tour.duration}
                        </div>
                        <div class="tour-meta-item">
                            <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                                <circle cx="12" cy="12" r="3"></circle>
                            </svg>
                            ${tour.views}
                        </div>
                    </div>
                </div>
                <div class="tour-content">
                    <div class="tour-location">
                        <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                            <circle cx="12" cy="10" r="3"></circle>
                        </svg>
                        ${tour.location}
                    </div>
                    <h3 class="tour-title">${tour.title}</h3>
                    <div class="tour-price">${tour.price}</div>
                    <div class="tour-features">
                        ${tour.features.map(feature => `
                            <span class="tour-feature">${feature}</span>
                        `).join('')}
                    </div>
                    <div class="tour-actions">
                        <button class="btn-primary" onclick="openVideoModal('${tour.title}', '${tour.videoUrl}')">
                            <svg class="icon" viewBox="0 0 24 24" fill="currentColor">
                                <polygon points="5,3 19,12 5,21"></polygon>
                            </svg>
                            Watch Tour
                        </button>
                        <button class="btn-outline">
                            <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                <polyline points="15,3 21,3 21,9"></polyline>
                                <polyline points="9,21 3,21 3,15"></polyline>
                                <line x1="21" y1="3" x2="14" y2="10"></line>
                                <line x1="3" y1="21" x2="10" y2="14"></line>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        `).join('');
    }
}

// Load testimonials data
function loadTestimonials() {
    const testimonials = [
        {
            id: 1,
            name: 'Rajesh Menon',
            location: 'Mumbai',
            image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
            rating: 5,
            text: 'Gangothrigroup Real Estate made our dream of owning a waterfront villa in Alleppey come true. Their attention to detail and understanding of luxury is unmatched. The entire process was seamless and professional.',
            property: 'Waterfront Villa, Alleppey',
            investment: '₹12.5 Cr'
        },
        {
            id: 2,
            name: 'Priya Sharma',
            location: 'Bangalore',
            image: 'https://images.unsplash.com/photo-1494790108755-2616b612b734?w=150&h=150&fit=crop&crop=face',
            rating: 5,
            text: 'As an NRI investor, I was looking for a trusted partner in Trivandrum real estate. The team exceeded all expectations with their market knowledge and transparent communication throughout my property acquisition.',
            property: 'Modern Penthouse, Kochi',
            investment: '₹8.2 Cr'
        },
        {
            id: 3,
            name: 'Dr. Suresh Kumar',
            location: 'Delhi',
            image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
            rating: 5,
            text: 'The heritage property they helped us acquire in Kumarakom is absolutely stunning. Their expertise in traditional Trivandrum architecture and modern amenities created the perfect blend we were seeking.',
            property: 'Heritage Villa, Kumarakom',
            investment: '₹6.8 Cr'
        },
        {
            id: 4,
            name: 'Anita Reddy',
            location: 'Hyderabad',
            image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
            rating: 5,
            text: 'Exceptional service from start to finish. The virtual tours were incredibly detailed, and the team\'s knowledge of Munnar\'s property market helped us make an informed investment decision.',
            property: 'Hill Station Retreat, Munnar',
            investment: '₹5.2 Cr'
        },
        {
            id: 5,
            name: 'Mohammed Ali',
            location: 'Dubai',
            image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
            rating: 5,
            text: 'Being based overseas, I needed a reliable partner for my Trivandrum investment. Their digital-first approach and comprehensive market insights made the entire process smooth and trustworthy.',
            property: 'Beachfront Villa, Kovalam',
            investment: '₹9.5 Cr'
        }
    ];
    
    const carousel = document.getElementById('testimonialsCarousel');
    if (carousel) {
        carousel.innerHTML = `
            <div class="testimonials-track" id="testimonialsTrack">
                ${testimonials.map(testimonial => `
                    <div class="testimonial-card">
                        <div class="testimonial-header">
                            <img src="${testimonial.image}" alt="${testimonial.name}" class="testimonial-avatar">
                            <div class="testimonial-info">
                                <h3>${testimonial.name}</h3>
                                <div class="testimonial-location">${testimonial.location}</div>
                                <div class="testimonial-rating">
                                    ${Array(testimonial.rating).fill().map(() => `
                                        <svg class="star" viewBox="0 0 24 24" fill="currentColor">
                                            <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"></polygon>
                                        </svg>
                                    `).join('')}
                                </div>
                            </div>
                        </div>
                        <svg class="testimonial-quote" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"></path>
                        </svg>
                        <p class="testimonial-text">${testimonial.text}</p>
                        <div class="testimonial-footer">
                            <div class="testimonial-property">${testimonial.property}</div>
                            <div class="testimonial-investment">${testimonial.investment}</div>
                        </div>
                    </div>
                `).join('')}
            </div>
        `;
    }
    
    // Initialize testimonials carousel
    let currentTestimonial = 0;
    const track = document.getElementById('testimonialsTrack');
    const prevBtn = document.getElementById('testimonialsPrev');
    const nextBtn = document.getElementById('testimonialsNext');
    const indicators = document.getElementById('testimonialsIndicators');
    
    // Create indicators
    if (indicators) {
        indicators.innerHTML = testimonials.map((_, r) => `
            <button class="carousel-indicator ${r === 0 ? 'active' : ''}" data-slide="${r}"></button>
        `).join('');
        
        // Add click handlers for indicators
        indicators.querySelectorAll('.carousel-indicator').forEach((indicator, r) => {
            indicator.addEventListener('click', () => goToTestimonial(r));
        });
    }
    
    function goToTestimonial(r) {
        currentTestimonial = r;
        if (track) {
            track.style.transform = `translateX(-${currentTestimonial * 100}%)`;
        }
        
        // Update indicators
        indicators.querySelectorAll('.carousel-indicator').forEach((indicator, i) => {
            indicator.classList.toggle('active', i === currentTestimonial);
        });
    }
    
    function nextTestimonial() {
        currentTestimonial = (currentTestimonial + 1) % testimonials.length;
        goToTestimonial(currentTestimonial);
    }
    
    function prevTestimonial() {
        currentTestimonial = (currentTestimonial - 1 + testimonials.length) % testimonials.length;
        goToTestimonial(currentTestimonial);
    }
    
    if (nextBtn) nextBtn.addEventListener('click', nextTestimonial);
    if (prevBtn) prevBtn.addEventListener('click', prevTestimonial);
    
    // Auto-play testimonials
    setInterval(nextTestimonial, 5000);
}

// Interactive map functionality
function initInteractiveMap() {
    const locations = [
        {
            id: 'vallakkadavu ',
            name: 'vallakkadavu ',
            coordinates: { x: 45, y: 40 },
            properties: 125,
            avgPrice: '₹8.5 Cr',
            growth: '+12%',
            description: 'Commercial hub with modern amenities',
            highlights: ['Marine Drive', 'IT Corridor', 'Metro Connectivity']
        },
        {
            id: 'trivandrum',
            name: 'Trivandrum',
            coordinates: { x: 35, y: 85 },
            properties: 89,
            avgPrice: '₹6.2 Cr',
            growth: '+8%',
            description: 'Capital city with government proximity',
            highlights: ['Technopark', 'Airport Access', 'Educational Hubs']
        },
        {
            id: 'Kadinamkulam',
            name: 'Kadinamkulam',
            coordinates: { x: 30, y: 25 },
            properties: 67,
            avgPrice: '₹5.8 Cr',
            growth: '+15%',
            description: 'Historic trading center with beaches',
            highlights: ['Beach Front', 'Business District', 'Cultural Heritage']
        },
        {
            id: 'Kumarakom',
            name: 'Kumarakom',
            coordinates: { x: 40, y: 60 },
            properties: 45,
            avgPrice: '₹12.5 Cr',
            growth: '+20%',
            description: 'Venice of the East - Backwater paradise',
            highlights: ['Backwaters', 'Houseboat Tourism', 'Luxury Resorts']
        },
        {
            id: 'Ponmudi',
            name: 'Ponmudi',
            coordinates: { x: 55, y: 45 },
            properties: 32,
            avgPrice: '₹7.8 Cr',
            growth: '+18%',
            description: 'Hill station retreat destination',
            highlights: ['Tea Plantations', 'Cool Climate', 'Adventure Tourism']
        },
        {
            id: 'kovalam',
            name: 'Kovalam',
            coordinates: { x: 38, y: 90 },
            properties: 28,
            avgPrice: '₹9.2 Cr',
            growth: '+22%',
            description: 'Premium beach resort destination',
            highlights: ['Lighthouse Beach', 'Ayurvedic Resorts', 'International Tourism']
        }
    ];
    
    let selectedLocation = 'kochi';
    
    const mapElement = document.getElementById('TrivandrumMap');
    const detailsElement = document.getElementById('locationDetails');
    
    if (mapElement) {
        // Create map locations
        mapElement.innerHTML = locations.map(location => `
            <button 
                class="map-location ${location.id === selectedLocation ? 'active' : ''}"
                style="left: ${location.coordinates.x}%; top: ${location.coordinates.y}%"
                data-location="${location.id}"
                data-name="${location.name}"
            ></button>
        `).join('');
        
        // Add click handlers
        mapElement.querySelectorAll('.map-location').forEach(locationBtn => {
            locationBtn.addEventListener('click', function() {
                selectedLocation = this.dataset.location;
                updateMapSelection();
                updateLocationDetails();
            });
        });
    }
    
    function updateMapSelection() {
        mapElement.querySelectorAll('.map-location').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.location === selectedLocation);
        });
    }
    
    function updateLocationDetails() {
        const location = locations.find(loc => loc.id === selectedLocation);
        if (location && detailsElement) {
            detailsElement.innerHTML = `
                <div class="location-header">
                    <div class="location-name">
                        <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                            <circle cx="12" cy="10" r="3"></circle>
                        </svg>
                        <h3 class="location-title">${location.name}</h3>
                    </div>
                    <div class="location-growth">${location.growth} Growth</div>
                </div>
                
                <p class="location-description">${location.description}</p>
                
                <div class="location-stats">
                    <div class="location-stat">
                        <div class="stat-header">
                            <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                <path d="M3 9a2 2 0 0 1 2-2h.93a2 2 0 0 0 1.664-.89l.812-1.22A2 2 0 0 1 10.07 4h3.86a2 2 0 0 1 1.664.89l.812 1.22A2 2 0 0 0 18.07 7H19a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9z"></path>
                                <circle cx="12" cy="13" r="3"></circle>
                            </svg>
                            <span class="stat-label">Properties</span>
                        </div>
                        <div class="stat-value">${location.properties}</div>
                    </div>
                    
                    <div class="location-stat price">
                        <div class="stat-header">
                            <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                            </svg>
                            <span class="stat-label">Avg. Price</span>
                        </div>
                        <div class="stat-value">${location.avgPrice}</div>
                    </div>
                </div>
                
                <div class="location-highlights">
                    <h4 class="highlights-title">Key Highlights</h4>
                    <div class="highlights-list">
                        ${location.highlights.map(highlight => `
                            <span class="highlight-tag">${highlight}</span>
                        `).join('')}
                    </div>
                </div>
                
               <a href="daycaer.html"> <button class="btn-primary" style="width: 100%">
                    View Properties in ${location.name}
                </button></a>
            `;
        }
    }
    
    // Initialize with default location
    updateLocationDetails();
}
