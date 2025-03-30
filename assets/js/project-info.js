// Project data
const projects = {
    'ai-analytics': {
        title: 'AI-Powered Analytics Platform',
        subtitle: 'Machine learning solutions for business operations',
        description: 'A comprehensive analytics platform that leverages artificial intelligence to provide deep insights into business operations. The platform processes vast amounts of data in real-time, offering predictive analytics and actionable recommendations.',
        mainImage: 'assets/media/projects/software1.jpg',
        gallery: [
            'assets/media/projects/software1.jpg',
            'assets/media/projects/software1-detail1.jpg',
            'assets/media/projects/software1-detail2.jpg',
            'assets/media/projects/software1-detail3.jpg'
        ],
        features: [
            'Real-time data processing and analysis',
            'Predictive analytics with machine learning models',
            'Interactive dashboards and visualizations',
            'Automated report generation',
            'Custom alert system for anomalies'
        ],
        technologies: ['Python', 'TensorFlow', 'React', 'Node.js', 'MongoDB'],
        client: 'TechCorp Inc.',
        duration: '6 months',
        category: 'Software Development',
        teamSize: '8 members',
        challenges: [
            {
                title: 'Data Processing Speed',
                description: 'Handling large volumes of real-time data while maintaining system performance.'
            },
            {
                title: 'Model Accuracy',
                description: 'Ensuring high accuracy of predictive models across different business scenarios.'
            }
        ],
        results: [
            {
                title: 'Improved Efficiency',
                description: 'Reduced data processing time by 60% and improved decision-making speed.'
            },
            {
                title: 'Cost Reduction',
                description: 'Achieved 40% reduction in operational costs through predictive maintenance.'
            }
        ]
    },
    'smart-pos': {
        title: 'Smart POS System',
        subtitle: 'Advanced point of sale system with inventory management',
        description: 'A modern point of sale system that combines traditional POS functionality with advanced inventory management and analytics. The system helps businesses streamline their operations and make data-driven decisions.',
        mainImage: 'assets/media/projects/software2.jpg',
        gallery: [
            'assets/media/projects/software2.jpg',
            'assets/media/projects/software2-detail1.jpg',
            'assets/media/projects/software2-detail2.jpg',
            'assets/media/projects/software2-detail3.jpg'
        ],
        features: [
            'Real-time inventory tracking',
            'Advanced payment processing',
            'Customer relationship management',
            'Sales analytics and reporting',
            'Multi-location support'
        ],
        technologies: ['Java', 'Spring Boot', 'Vue.js', 'PostgreSQL'],
        client: 'RetailPro Solutions',
        duration: '4 months',
        category: 'Software Development',
        teamSize: '6 members',
        challenges: [
            {
                title: 'System Integration',
                description: 'Integrating with various payment gateways and existing business systems.'
            }
        ],
        results: [
            {
                title: 'Increased Sales',
                description: 'Helped clients increase sales by 25% through better inventory management.'
            }
        ]
    },
    // Add more projects here...
};

// Get project ID from URL
const urlParams = new URLSearchParams(window.location.search);
const projectId = urlParams.get('id');

// Load project data
function loadProjectData() {
    const project = projects[projectId];
    if (!project) {
        window.location.href = 'projects.html';
        return;
    }

    // Update page title
    document.title = `${project.title} - CRYPSYS`;

    // Update hero section
    document.getElementById('project-title').textContent = project.title;
    document.getElementById('project-subtitle').textContent = project.subtitle;

    // Update main image
    const mainImage = document.getElementById('project-main-image');
    mainImage.src = project.mainImage;
    mainImage.alt = project.title;

    // Create thumbnails
    const thumbnailsContainer = document.getElementById('project-thumbnails');
    project.gallery.forEach((image, index) => {
        const thumbnail = document.createElement('div');
        thumbnail.className = 'thumbnail';
        thumbnail.innerHTML = `<img src="${image}" alt="${project.title} - Image ${index + 1}">`;
        thumbnail.addEventListener('click', () => {
            mainImage.src = image;
        });
        thumbnailsContainer.appendChild(thumbnail);
    });

    // Update project description
    document.getElementById('project-description').textContent = project.description;

    // Update features
    const featuresList = document.getElementById('project-features');
    project.features.forEach(feature => {
        const li = document.createElement('li');
        li.textContent = feature;
        featuresList.appendChild(li);
    });

    // Update technologies
    const techContainer = document.getElementById('project-technologies');
    project.technologies.forEach(tech => {
        const tag = document.createElement('span');
        tag.className = 'tech-tag';
        tag.textContent = tech;
        techContainer.appendChild(tag);
    });

    // Update meta information
    document.getElementById('project-client').textContent = project.client;
    document.getElementById('project-duration').textContent = project.duration;
    document.getElementById('project-category').textContent = project.category;
    document.getElementById('project-team').textContent = project.teamSize;

    // Update challenges
    const challengesContainer = document.getElementById('project-challenges');
    project.challenges.forEach(challenge => {
        const div = document.createElement('div');
        div.className = 'challenge-item';
        div.innerHTML = `
            <h3>${challenge.title}</h3>
            <p>${challenge.description}</p>
        `;
        challengesContainer.appendChild(div);
    });

    // Update results
    const resultsContainer = document.getElementById('project-results');
    project.results.forEach(result => {
        const div = document.createElement('div');
        div.className = 'result-item';
        div.innerHTML = `
            <h3>${result.title}</h3>
            <p>${result.description}</p>
        `;
        resultsContainer.appendChild(div);
    });

    // Add scroll animations
    gsap.from('.project-info-main > div', {
        scrollTrigger: {
            trigger: '.project-info-main',
            start: 'top center',
            toggleActions: 'play none none reverse'
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2
    });

    gsap.from('.project-info-sidebar > div', {
        scrollTrigger: {
            trigger: '.project-info-sidebar',
            start: 'top center',
            toggleActions: 'play none none reverse'
        },
        x: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2
    });
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', loadProjectData); 