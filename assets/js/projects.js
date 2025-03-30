// Category Tab Switching
const tabButtons = document.querySelectorAll('.tab-btn');
const projectCategories = document.querySelectorAll('.project-category');

// Show first category by default
projectCategories[0].classList.add('active');

tabButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Update active tab
        tabButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');

        // Show selected category
        const category = button.dataset.category;
        projectCategories.forEach(projectCategory => {
            if (projectCategory.id === category) {
                projectCategory.classList.add('active');
            } else {
                projectCategory.classList.remove('active');
            }
        });
    });
});

// Project Card Animations
const projectCards = document.querySelectorAll('.project-card');

projectCards.forEach(card => {
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

// Project Tech Tags Animation
const projectTechTags = document.querySelectorAll('.project-tech span');

projectTechTags.forEach(tag => {
    tag.addEventListener('mouseenter', () => {
        gsap.to(tag, {
            scale: 1.1,
            duration: 0.2,
            ease: 'power2.out'
        });
    });

    tag.addEventListener('mouseleave', () => {
        gsap.to(tag, {
            scale: 1,
            duration: 0.2,
            ease: 'power2.out'
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