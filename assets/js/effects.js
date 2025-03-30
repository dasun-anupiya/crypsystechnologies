// Particle Effects
function createParticles() {
    const container = document.createElement('div');
    container.className = 'particles-container';
    document.body.appendChild(container);

    const particleCount = 50;
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Random starting position
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.animationDelay = `${Math.random() * 20}s`;
        
        container.appendChild(particle);
    }
}

// Cursor Glow Effect
function initCursorGlow() {
    const cursor = document.createElement('div');
    cursor.className = 'cursor-glow';
    document.body.appendChild(cursor);

    let isActive = false;
    let timeout;

    document.addEventListener('mousemove', (e) => {
        cursor.style.left = `${e.clientX}px`;
        cursor.style.top = `${e.clientY}px`;
    });

    document.addEventListener('mousedown', () => {
        isActive = true;
        cursor.classList.add('active');
        clearTimeout(timeout);
    });

    document.addEventListener('mouseup', () => {
        isActive = false;
        cursor.classList.remove('active');
        timeout = setTimeout(() => {
            cursor.style.opacity = '0.5';
        }, 100);
    });

    document.addEventListener('mousemove', () => {
        cursor.style.opacity = '1';
    });
}

// Initialize effects when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    createParticles();
    initCursorGlow();
}); 