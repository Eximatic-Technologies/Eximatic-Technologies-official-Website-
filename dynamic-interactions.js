/* =====================================================
   DYNAMIC INTERACTIONS & UX ENHANCEMENTS
   Professional JavaScript for Eximatic site
   ===================================================== */

// ===== 1. PAGE LOADER =====
window.addEventListener('load', () => {
    const loader = document.querySelector('.page-loader');
    if(loader){
        setTimeout(() => {
            loader.classList.add('hidden');
            setTimeout(() => loader.remove(), 500);
        }, 500);
    }
});

// ===== 2. NAVBAR SCROLL EFFECT =====
let lastScroll = 0;
window.addEventListener('scroll', () => {
    const nav = document.querySelector('nav');
    const currentScroll = window.pageYOffset;
    
    if(currentScroll > 100){
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// ===== 3. SCROLL PROGRESS BAR =====
window.addEventListener('scroll', () => {
    const progressBar = document.querySelector('.scroll-progress');
    if(progressBar){
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (window.pageYOffset / windowHeight) * 100;
        progressBar.style.width = scrolled + '%';
    }
});

// ===== 4. BACK TO TOP BUTTON =====
const backToTop = document.querySelector('.back-to-top');
if(backToTop){
    window.addEventListener('scroll', () => {
        if(window.pageYOffset > 500){
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });
    
    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top:0,
            behavior:'smooth'
        });
    });
}

// ===== 5. FADE UP ON SCROLL =====
const observerOptions = {
    threshold:0.15,
    rootMargin:'0px 0px -50px 0px'
};

const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if(entry.isIntersecting){
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

document.querySelectorAll('.fade-up').forEach(el => fadeObserver.observe(el));

// ===== 6. NUMBER COUNTER ANIMATION =====
const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if(entry.isIntersecting){
            const counter = entry.target;
            const target = parseInt(counter.getAttribute('data-target'));
            const duration = 2000;
            const increment = target / (duration / 16);
            let current = 0;
            
            const updateCounter = () => {
                current += increment;
                if(current < target){
                    counter.textContent = Math.ceil(current);
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.textContent = target;
                }
            };
            
            updateCounter();
            counterObserver.unobserve(counter);
        }
    });
}, {threshold:0.5});

document.querySelectorAll('.counter').forEach(counter => counterObserver.observe(counter));

// ===== 7. PARALLAX EFFECT =====
window.addEventListener('scroll', () => {
    const parallaxElements = document.querySelectorAll('.parallax');
    const scrolled = window.pageYOffset;
    
    parallaxElements.forEach(el => {
        const speed = el.getAttribute('data-speed') || 0.5;
        el.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// ===== 8. FORM VALIDATION ENHANCEMENT =====
const forms = document.querySelectorAll('form');
forms.forEach(form => {
    const inputs = form.querySelectorAll('input[required], textarea[required]');
    
    inputs.forEach(input => {
        input.addEventListener('blur', () => {
            if(input.value.trim() === ''){
                input.classList.add('error');
                input.classList.remove('success');
            } else {
                input.classList.add('success');
                input.classList.remove('error');
            }
        });
        
        input.addEventListener('input', () => {
            input.classList.remove('error');
        });
    });
    
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        let isValid = true;
        inputs.forEach(input => {
            if(input.value.trim() === ''){
                input.classList.add('error');
                isValid = false;
            }
        });
        
        if(isValid){
            // Show success message
            const submitBtn = form.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = '✓ Sent Successfully!';
            submitBtn.style.background = '#10b981';
            
            setTimeout(() => {
                submitBtn.textContent = originalText;
                submitBtn.style.background = '';
                form.reset();
            }, 3000);
        }
    });
});

// ===== 9. VIDEO LAZY LOADING =====
const videoObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if(entry.isIntersecting){
            const video = entry.target;
            if(!video.src && video.dataset.src){
                video.src = video.dataset.src;
                video.load();
            }
            videoObserver.unobserve(video);
        }
    });
}, {rootMargin:'50px'});

document.querySelectorAll('video[data-src]').forEach(video => videoObserver.observe(video));

// ===== 10. SMOOTH ANCHOR LINKS =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e){
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if(target){
            target.scrollIntoView({
                behavior:'smooth',
                block:'start'
            });
        }
    });
});

// ===== 11. PREVENT WIDOW WORDS (Typography Enhancement) =====
function preventWidows(){
    const elements = document.querySelectorAll('h1, h2, h3, p');
    elements.forEach(el => {
        const text = el.innerHTML;
        const words = text.split(' ');
        if(words.length > 2){
            const lastTwo = words.slice(-2).join('&nbsp;');
            const rest = words.slice(0, -2).join(' ');
            el.innerHTML = rest + ' ' + lastTwo;
        }
    });
}

// Run after page load
if(document.readyState === 'complete'){
    preventWidows();
} else {
    window.addEventListener('load', preventWidows);
}

// ===== 12. CONSOLE BRANDING =====
console.log('%c✨ Eximatic Technologies', 'font-size:20px;font-weight:900;color:#ff1e1e');
console.log('%cWebsite by Eximatic - Smart Infrastructure Solutions', 'font-size:12px;color:#666');
console.log('%c🌐 Visit: eximatic.tech', 'font-size:12px;color:#111');

// ===== 13. PERFORMANCE MONITORING =====
if('performance' in window){
    window.addEventListener('load', () => {
        const loadTime = performance.now();
        console.log(`⚡ Page loaded in ${Math.round(loadTime)}ms`);
    });
}
