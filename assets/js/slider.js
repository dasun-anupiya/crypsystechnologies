class ProjectSlider {
    constructor(sliderElement) {
        this.slider = sliderElement;
        this.sliderTrack = sliderElement.querySelector('.slider-track');
        this.slides = sliderElement.querySelectorAll('.slider-slide');
        this.prevBtn = sliderElement.querySelector('.prev-btn');
        this.nextBtn = sliderElement.querySelector('.next-btn');
        this.dotsContainer = sliderElement.querySelector('.slider-dots');
        
        this.currentIndex = 0;
        this.slideCount = this.slides.length;
        this.autoPlayInterval = null;
        this.autoPlayDelay = 5000; // 5 seconds

        this.init();
    }

    init() {
        // Set initial slide width
        this.updateSlideWidth();
        
        // Create dots
        this.createDots();
        
        // Add event listeners
        this.prevBtn.addEventListener('click', () => this.prevSlide());
        this.nextBtn.addEventListener('click', () => this.nextSlide());
        
        // Add window resize handler
        window.addEventListener('resize', () => this.updateSlideWidth());

        // Start autoplay
        this.startAutoPlay();

        // Pause autoplay on hover
        this.slider.addEventListener('mouseenter', () => this.stopAutoPlay());
        this.slider.addEventListener('mouseleave', () => this.startAutoPlay());
    }

    createDots() {
        for (let i = 0; i < this.slideCount; i++) {
            const dot = document.createElement('button');
            dot.classList.add('dot');
            if (i === 0) dot.classList.add('active');
            dot.addEventListener('click', () => this.goToSlide(i));
            this.dotsContainer.appendChild(dot);
        }
        this.dots = this.dotsContainer.querySelectorAll('.dot');
    }

    updateSlideWidth() {
        const slideWidth = 100;
        this.slides.forEach(slide => {
            slide.style.width = `${slideWidth}%`;
        });
    }

    goToSlide(index) {
        this.currentIndex = index;
        this.updateSlider();
        this.startAutoPlay();
    }

    prevSlide() {
        this.currentIndex = (this.currentIndex - 1 + this.slideCount) % this.slideCount;
        this.updateSlider();
        this.startAutoPlay();
    }

    nextSlide() {
        this.currentIndex = (this.currentIndex + 1) % this.slideCount;
        this.updateSlider();
        this.startAutoPlay();
    }

    updateSlider() {
        // Update track position
        this.sliderTrack.style.transform = `translateX(-${this.currentIndex * 100}%)`;

        // Update dots
        this.dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === this.currentIndex);
        });
    }

    startAutoPlay() {
        this.stopAutoPlay();
        this.autoPlayInterval = setInterval(() => this.nextSlide(), this.autoPlayDelay);
    }

    stopAutoPlay() {
        if (this.autoPlayInterval) {
            clearInterval(this.autoPlayInterval);
            this.autoPlayInterval = null;
        }
    }
}

// Initialize all sliders when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const sliders = document.querySelectorAll('.project-slider');
    sliders.forEach(slider => new ProjectSlider(slider));
}); 