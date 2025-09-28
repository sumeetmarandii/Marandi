// Mobile Navigation Toggle
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 70; // Account for fixed navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Navbar scroll effect
let lastScrollTop = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    // Add/remove scrolled class for styling
    if (scrollTop > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = 'none';
    }
    
    lastScrollTop = scrollTop;
});

// Active navigation link highlighting
const sections = document.querySelectorAll('section[id]');

function highlightNav() {
    const scrollY = window.pageYOffset;
    
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
        
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLink?.classList.add('active');
        } else {
            navLink?.classList.remove('active');
        }
    });
}

window.addEventListener('scroll', highlightNav);

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.about-card, .service-card, .portfolio-item');
    
    animateElements.forEach((el, index) => {
        // Set initial state
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease-out';
        el.style.transitionDelay = `${index * 0.1}s`;
        
        observer.observe(el);
    });
});

// Contact form handling
if (document.getElementById('contactForm')) {
    const contactForm = document.getElementById('contactForm');
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        let name = formData.get('full_Name_Marandi');
        const email = formData.get('email_Marandi');
        const message = formData.get('message_Marandi');

        // Check if we're on the new contact form which uses full_Name_Marandi instead of name
        if (!name) {
            const full_Name_Marandi = formData.get('full_Name_Marandi');
            const email_Marandi = formData.get('email_Marandi');
            if (full_Name_Marandi && email_Marandi) {
                name = full_Name_Marandi + ' ' + email_Marandi;
            }
        }
        
        // Simple validation
        if ((!name && !formData.get('full_Name_Marandi')) || !email || !message) {
            showNotification('Please fill in all required fields', 'error');
            return;
        }
        
        if (!isValidEmail(email)) {
            showNotification('Please enter a valid email address', 'error');
            return;
        }
        
        // Simulate form submission
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        
        // Simulate API call
        setTimeout(() => {
            // Get service from form data for the contact page form
            const service = formData.get('service') || 'your project';
            const displayName = name || formData.get('full_Name_Marandi');
            
            const thankYouMessage = `Thank you${displayName ? ', ' + displayName : ''}! Your message about ${service} has been sent successfully.`;
            showNotification(thankYouMessage, 'success');
            contactForm.reset();
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, 2000);
    });
}

// Email validation function
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Notification system
function showNotification(message, type) {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-icon">${type === 'success' ? '✓' : '!'}</span>
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 90px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : '#ef4444'};
        color: white;
        padding: 1rem;
        border-radius: 10px;
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
        z-index: 1001;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 400px;
    `;
    
    notification.querySelector('.notification-content').style.cssText = `
        display: flex;
        align-items: center;
        gap: 0.5rem;
    `;
    
    notification.querySelector('.notification-close').style.cssText = `
        background: none;
        border: none;
        color: white;
        font-size: 1.5rem;
        cursor: pointer;
        margin-left: auto;
        padding: 0;
        width: 20px;
        height: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
    `;
    
    // Add to document
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Close functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => notification.remove(), 300);
    });
    
    // Auto remove
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// Portfolio project view handlers
document.addEventListener('DOMContentLoaded', () => {
    const viewButtons = document.querySelectorAll('.view-btn');
    
    viewButtons.forEach((btn, index) => {
        btn.addEventListener('click', () => {
            // Get project ID if available
            const projectId = btn.getAttribute('data-project') || '';
            
            // Projects data - can be expanded for the portfolio page
            const projects = [
                {
                    title: 'E-commerce Platform',
                    description: 'A modern online store built with React and Node.js, featuring seamless checkout, inventory management, and responsive design.',
                    tech: ['React', 'Node.js', 'MongoDB', 'Stripe API'],
                    link: '#'
                },
                {
                    title: 'Creative Agency Website',
                    description: 'Brand identity and website for a creative agency, showcasing their portfolio with stunning animations and user experience.',
                    tech: ['HTML5', 'CSS3', 'JavaScript', 'GSAP'],
                    link: '#'
                },
                {
                    title: 'Mobile App Design',
                    description: 'iOS and Android app with intuitive user interface, featuring dark mode, accessibility options, and smooth animations.',
                    tech: ['Figma', 'React Native', 'TypeScript'],
                    link: '#'
                }
            ];
            
            // Use index to choose project if no specific projectId
            const project = projects[index] || projects[0];
            showProjectModal(project);
        });
    });
});

// Project modal functionality
function showProjectModal(project) {
    // Create modal overlay
    const modalOverlay = document.createElement('div');
    modalOverlay.className = 'modal-overlay';
    modalOverlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 1002;
        opacity: 0;
        transition: opacity 0.3s ease;
    `;
    
    // Create modal content
    const modalContent = document.createElement('div');
    modalContent.className = 'modal-content';
    modalContent.style.cssText = `
        background: white;
        border-radius: 20px;
        padding: 2rem;
        max-width: 500px;
        width: 90%;
        position: relative;
        transform: scale(0.8);
        transition: transform 0.3s ease;
    `;
    
    modalContent.innerHTML = `
        <button class="modal-close" style="
            position: absolute;
            top: 1rem;
            right: 1rem;
            background: none;
            border: none;
            font-size: 1.5rem;
            cursor: pointer;
            width: 30px;
            height: 30px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 50%;
            transition: background-color 0.3s ease;
        ">&times;</button>
        <h3 style="font-size: 1.5rem; margin-bottom: 1rem; color: var(--text-primary);">${project.title}</h3>
        <p style="color: var(--text-secondary); margin-bottom: 1.5rem; line-height: 1.6;">${project.description}</p>
        <div style="margin-bottom: 1.5rem;">
            <h4 style="font-size: 1rem; margin-bottom: 0.5rem; color: var(--text-primary);">Technologies Used:</h4>
            <div style="display: flex; flex-wrap: wrap; gap: 0.5rem;">
                ${project.tech.map(tech => `
                    <span style="
                        background: var(--gradient-primary);
                        color: white;
                        padding: 0.25rem 0.75rem;
                        border-radius: 15px;
                        font-size: 0.8rem;
                        font-weight: 500;
                    ">${tech}</span>
                `).join('')}
            </div>
        </div>
    `;
    
    modalOverlay.appendChild(modalContent);
    document.body.appendChild(modalOverlay);
    
    // Animate in
    setTimeout(() => {
        modalOverlay.style.opacity = '1';
        modalContent.style.transform = 'scale(1)';
    }, 10);
    
    // Close functionality
    const closeModal = () => {
        modalOverlay.style.opacity = '0';
        modalContent.style.transform = 'scale(0.8)';
        setTimeout(() => {
            document.body.removeChild(modalOverlay);
        }, 300);
    };
    
    modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) closeModal();
    });
    
    modalContent.querySelector('.modal-close').addEventListener('click', closeModal);
    
    modalContent.querySelector('.modal-cta').addEventListener('click', () => {
        showNotification('Demo link would open here!', 'success');
        closeModal();
    });
    
    // Close on Escape key
    const escapeHandler = (e) => {
        if (e.key === 'Escape') {
            closeModal();
            document.removeEventListener('keydown', escapeHandler);
        }
    };
    document.addEventListener('keydown', escapeHandler);
}

// FAQ Toggle Functionality
document.addEventListener('DOMContentLoaded', () => {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Close all FAQ items
            faqItems.forEach(faqItem => {
                faqItem.classList.remove('active');
            });
            
            // Open clicked item if it wasn't active
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });
});

// Portfolio Filter Functionality
document.addEventListener('DOMContentLoaded', () => {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    if (filterButtons.length > 0) {
        filterButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                const filter = btn.getAttribute('data-filter');
                
                // Update active button
                filterButtons.forEach(button => button.classList.remove('active'));
                btn.classList.add('active');
                
                // Filter portfolio items
                portfolioItems.forEach(item => {
                    const categories = item.getAttribute('data-category');
                    
                    if (filter === 'all' || categories.includes(filter)) {
                        item.style.display = 'block';
                        item.style.opacity = '0';
                        setTimeout(() => {
                            item.style.opacity = '1';
                        }, 100);
                    } else {
                        item.style.opacity = '0';
                        setTimeout(() => {
                            item.style.display = 'none';
                        }, 300);
                    }
                });
            });
        });
    }
});

// Enhanced Navigation for Multi-page
document.addEventListener('DOMContentLoaded', () => {
    // Set active navigation link based on current page
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage || (currentPage === '' && href === 'index.html')) {
            link.classList.add('active');
        }
    });
});

// Smooth Page Transitions
function smoothPageTransition(url) {
    document.body.style.opacity = '0.7';
    document.body.style.transition = 'opacity 0.3s ease';
    
    setTimeout(() => {
        window.location.href = url;
    }, 300);
}

// Map Button Functionality
document.addEventListener('DOMContentLoaded', () => {
    const mapBtn = document.querySelector('.map-btn');
    if (mapBtn) {
        mapBtn.addEventListener('click', () => {
            // In a real application, this would open Google Maps
            const address = '123 Design Street, New York, NY 10001';
            const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
            window.open(googleMapsUrl, '_blank');
            showNotification('Opening Google Maps...', 'success');
        });
    }
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    const shapes = document.querySelectorAll('.shape');
    
    if (hero && scrolled < window.innerHeight) {
        shapes.forEach((shape, index) => {
            const speed = 0.5 + (index * 0.1);
            shape.style.transform = `translateY(${scrolled * speed}px) rotate(${scrolled * 0.1}deg)`;
        });
    }
});

// Add loading animation
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// Page-specific initializations
const initPageSpecificFeatures = () => {
    const currentPage = window.location.pathname.split('/').pop();
    
    switch (currentPage) {
        case 'portfolio.html':
            // Initialize portfolio filtering
            console.log('📁 Portfolio page features loaded');
            break;
        case 'services.html':
            // Initialize service interactions
            console.log('⚙️ Services page features loaded');
            break;
        case 'contact.html':
            // Initialize contact form enhancements
            console.log('📞 Contact page features loaded');
            break;
        case 'about.html':
            // Initialize about page features
            console.log('👥 About page features loaded');
            break;
        default:
            console.log('🏠 Home page features loaded');
    }
};

document.addEventListener('DOMContentLoaded', initPageSpecificFeatures);

console.log('🎨 Aesthetic Modern Website loaded successfully!');
console.log('✨ Features: Multi-page navigation, interactive forms, portfolio filtering');
console.log('🚀 Ready to make a great impression!');
