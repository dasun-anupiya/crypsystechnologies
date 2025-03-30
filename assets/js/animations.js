// Loading Screen
window.addEventListener('load', () => {
    const loadingScreen = document.querySelector('.loading-screen');
    
    // Ensure minimum display time of 2 seconds
    setTimeout(() => {
        loadingScreen.classList.add('fade-out');
        
        // Remove loading screen after fade out
        setTimeout(() => {
            loadingScreen.style.display = 'none';
        }, 500);
    }, 2000);
});

// Mobile Menu
const mobileMenuBtn = document.createElement('button');
mobileMenuBtn.className = 'mobile-menu-btn';
mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
document.querySelector('nav').appendChild(mobileMenuBtn);

const navLinks = document.querySelector('.nav-links');

// Create overlay element
const overlay = document.createElement('div');
overlay.className = 'menu-overlay';
document.body.appendChild(overlay);

// Toggle menu function
function toggleMenu() {
    navLinks.classList.toggle('active');
    mobileMenuBtn.classList.toggle('active');
    overlay.classList.toggle('active');
    document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
}

mobileMenuBtn.addEventListener('click', toggleMenu);
overlay.addEventListener('click', toggleMenu);

// Close menu when clicking a link
navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        if (navLinks.classList.contains('active')) {
            toggleMenu();
        }
    });
});

// Close menu on window resize if open
window.addEventListener('resize', () => {
    if (window.innerWidth > 768 && navLinks.classList.contains('active')) {
        toggleMenu();
    }
});

// Header scroll effect
const header = document.querySelector('header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        header.classList.remove('scrolled');
        return;
    }
    
    if (currentScroll > lastScroll && !header.classList.contains('scroll-down')) {
        // Scroll Down
        header.classList.remove('scroll-up');
        header.classList.add('scroll-down');
    } else if (currentScroll < lastScroll && header.classList.contains('scroll-down')) {
        // Scroll Up
        header.classList.remove('scroll-down');
        header.classList.add('scroll-up');
    }
    
    header.classList.add('scrolled');
    lastScroll = currentScroll;
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Service cards animation
const serviceCards = document.querySelectorAll('.service-card');

serviceCards.forEach(card => {
    gsap.from(card, {
        opacity: 0,
        y: 50,
        duration: 1,
        scrollTrigger: {
            trigger: card,
            start: 'top 80%',
            end: 'top 20%',
            scrub: true
        }
    });
});

// Text reveal animation
const textElements = document.querySelectorAll('h1, h2, h3, p');

textElements.forEach(element => {
    gsap.from(element, {
        opacity: 0,
        y: 30,
        duration: 1,
        scrollTrigger: {
            trigger: element,
            start: 'top 80%',
            end: 'top 20%',
            scrub: true
        }
    });
});

// Form input animations
const formInputs = document.querySelectorAll('.contact-form input, .contact-form textarea');

formInputs.forEach(input => {
    input.addEventListener('focus', () => {
        gsap.to(input, {
            scale: 1.02,
            duration: 0.3,
            ease: 'power2.out'
        });
    });

    input.addEventListener('blur', () => {
        gsap.to(input, {
            scale: 1,
            duration: 0.3,
            ease: 'power2.out'
        });
    });
});

// Button hover animation
const buttons = document.querySelectorAll('.btn');

buttons.forEach(button => {
    button.addEventListener('mouseenter', () => {
        gsap.to(button, {
            scale: 1.05,
            duration: 0.3,
            ease: 'power2.out'
        });
    });

    button.addEventListener('mouseleave', () => {
        gsap.to(button, {
            scale: 1,
            duration: 0.3,
            ease: 'power2.out'
        });
    });
}); 