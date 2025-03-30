// Three.js Scene Setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
const container = document.querySelector('.canvas-container');

renderer.setSize(window.innerWidth, window.innerHeight);
container.appendChild(renderer.domElement);

// Particles
const particlesGeometry = new THREE.BufferGeometry();
const particlesCount = 5000;
const posArray = new Float32Array(particlesCount * 3);

for (let i = 0; i < particlesCount * 3; i++) {
    posArray[i] = (Math.random() - 0.5) * 5;
}

particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

const particlesMaterial = new THREE.PointsMaterial({
    size: 0.005,
    color: '#00ff9d',
    transparent: true,
    opacity: 0.8,
    blending: THREE.AdditiveBlending
});

const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
scene.add(particlesMesh);

// Camera position
camera.position.z = 2;

// Mouse movement effect
let mouseX = 0;
let mouseY = 0;

document.addEventListener('mousemove', (event) => {
    mouseX = event.clientX / window.innerWidth - 0.5;
    mouseY = event.clientY / window.innerHeight - 0.5;
});

// Animation
function animate() {
    requestAnimationFrame(animate);

    particlesMesh.rotation.y += 0.001;
    particlesMesh.rotation.x += 0.001;

    // Mouse movement effect
    particlesMesh.rotation.y += mouseX * 0.0003;
    particlesMesh.rotation.x += mouseY * 0.0003;

    renderer.render(scene, camera);
}

// Scroll animations
gsap.registerPlugin(ScrollTrigger);

// Parallax effect for particles
gsap.to(particlesMesh.rotation, {
    y: Math.PI * 2,
    duration: 20,
    scrollTrigger: {
        trigger: '.about-us',
        start: 'top center',
        end: 'bottom center',
        scrub: true
    }
});

// Fade in sections
const sections = document.querySelectorAll('section');
sections.forEach(section => {
    gsap.from(section, {
        opacity: 0,
        y: 50,
        duration: 1,
        scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            end: 'top 20%',
            scrub: true
        }
    });
});

// Responsive canvas
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// Start animation
animate(); 