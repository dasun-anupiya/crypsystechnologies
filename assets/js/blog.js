// Blog Search Functionality
const searchForm = document.querySelector('.search-box form');
const searchInput = document.querySelector('.search-box input');

searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const searchTerm = searchInput.value.trim().toLowerCase();
    const blogCards = document.querySelectorAll('.blog-card');
    
    blogCards.forEach(card => {
        const title = card.querySelector('h2').textContent.toLowerCase();
        const excerpt = card.querySelector('.blog-excerpt').textContent.toLowerCase();
        const category = card.querySelector('.blog-category').textContent.toLowerCase();
        
        if (title.includes(searchTerm) || excerpt.includes(searchTerm) || category.includes(searchTerm)) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
});

// Blog Card Animations
const blogCards = document.querySelectorAll('.blog-card');

blogCards.forEach(card => {
    // Add scroll animation
    gsap.from(card, {
        scrollTrigger: {
            trigger: card,
            start: 'top bottom-=100',
            toggleActions: 'play none none reverse'
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out'
    });

    // Add hover animation
    card.addEventListener('mouseenter', () => {
        gsap.to(card, {
            y: -10,
            duration: 0.3,
            ease: 'power2.out'
        });
    });

    card.addEventListener('mouseleave', () => {
        gsap.to(card, {
            y: 0,
            duration: 0.3,
            ease: 'power2.out'
        });
    });
});

// Category Filter
const categoryLinks = document.querySelectorAll('.categories ul li a');

categoryLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const category = link.textContent.trim().toLowerCase();
        
        // Update active state
        categoryLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
        
        // Filter blog cards
        blogCards.forEach(card => {
            const cardCategory = card.querySelector('.blog-category').textContent.toLowerCase();
            if (category === 'all' || cardCategory === category) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    });
});

// Recent Posts Hover Animation
const recentPosts = document.querySelectorAll('.recent-posts ul li a');

recentPosts.forEach(post => {
    post.addEventListener('mouseenter', () => {
        gsap.to(post, {
            x: 10,
            duration: 0.3,
            ease: 'power2.out'
        });
    });

    post.addEventListener('mouseleave', () => {
        gsap.to(post, {
            x: 0,
            duration: 0.3,
            ease: 'power2.out'
        });
    });
});

// Pagination Animation
const paginationLinks = document.querySelectorAll('.pagination a');

paginationLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Update active state
        paginationLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
        
        // Animate page transition
        gsap.to('.blog-grid', {
            opacity: 0,
            y: 20,
            duration: 0.3,
            onComplete: () => {
                // Here you would typically load the new page content
                // For now, we'll just animate back
                gsap.to('.blog-grid', {
                    opacity: 1,
                    y: 0,
                    duration: 0.3
                });
            }
        });
    });
});

// Initialize Three.js background
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.querySelector('.canvas-container').appendChild(renderer.domElement);

// Create particles
const particlesGeometry = new THREE.BufferGeometry();
const particlesCount = 1000;
const posArray = new Float32Array(particlesCount * 3);

for (let i = 0; i < particlesCount * 3; i++) {
    posArray[i] = (Math.random() - 0.5) * 5;
}

particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

const particlesMaterial = new THREE.PointsMaterial({
    size: 0.005,
    color: '#00ff9d',
    transparent: true,
    opacity: 0.5
});

const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
scene.add(particlesMesh);

camera.position.z = 2;

// Animation
function animate() {
    requestAnimationFrame(animate);
    particlesMesh.rotation.y += 0.001;
    renderer.render(scene, camera);
}

animate();

// Handle window resize
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}); 