// Image Slider Functionality
class HeroSlider {
    constructor() {
        this.currentSlide = 0;
        this.slides = document.querySelectorAll('.slider-slide');
        this.prevBtn = document.getElementById('prevSlide');
        this.nextBtn = document.getElementById('nextSlide');
        this.indicators = document.querySelectorAll('[id^="slideIndicator"]');
        this.autoSlideInterval = null;
        
        if (this.slides.length === 0) return;
        
        this.setupEventListeners();
        this.startAutoSlide();
    }
    
    setupEventListeners() {
        if (this.prevBtn) this.prevBtn.addEventListener('click', () => this.prevSlide());
        if (this.nextBtn) this.nextBtn.addEventListener('click', () => this.nextSlide());
        
        this.indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => this.goToSlide(index));
        });
    }
    
    showSlide(index) {
        this.slides.forEach((slide, i) => {
            slide.classList.remove('active', 'opacity-100', 'pointer-events-auto');
            slide.classList.add('opacity-0', 'pointer-events-none');
            
            this.indicators[i].classList.remove('active-indicator');
            this.indicators[i].classList.add('w-2', 'h-2', 'bg-white/50');
            this.indicators[i].classList.remove('w-8', 'h-1', 'bg-white');
        });
        
        this.slides[index].classList.remove('opacity-0', 'pointer-events-none');
        this.slides[index].classList.add('active', 'opacity-100', 'pointer-events-auto');
        
        this.indicators[index].classList.add('active-indicator');
        this.indicators[index].classList.add('w-8', 'h-1', 'bg-white');
        this.indicators[index].classList.remove('w-2', 'h-2', 'bg-white/50');
    }
    
    nextSlide() {
        this.currentSlide = (this.currentSlide + 1) % this.slides.length;
        this.showSlide(this.currentSlide);
        this.resetAutoSlide();
    }
    
    prevSlide() {
        this.currentSlide = (this.currentSlide - 1 + this.slides.length) % this.slides.length;
        this.showSlide(this.currentSlide);
        this.resetAutoSlide();
    }
    
    goToSlide(index) {
        this.currentSlide = index;
        this.showSlide(this.currentSlide);
        this.resetAutoSlide();
    }
    
    startAutoSlide() {
        this.autoSlideInterval = setInterval(() => this.nextSlide(), 5000);
    }
    
    resetAutoSlide() {
        clearInterval(this.autoSlideInterval);
        this.startAutoSlide();
    }
}

// Initialize slider when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new HeroSlider();
});
