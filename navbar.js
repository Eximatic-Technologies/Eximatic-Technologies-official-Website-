// ===================================
// MOBILE MENU TOGGLE - SHARED ACROSS ALL PAGES
// ===================================

document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    
    if (mobileMenuBtn && mobileMenu) {
        const line1 = document.getElementById('line1');
        const line2 = document.getElementById('line2');
        const line3 = document.getElementById('line3');

        mobileMenuBtn.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
            
            // Hamburger animation
            line1.classList.toggle('rotate-45');
            line1.classList.toggle('translate-y-2');
            line2.classList.toggle('opacity-0');
            line3.classList.toggle('-rotate-45');
            line3.classList.toggle('-translate-y-2');
        });

        // Close menu when a link is clicked
        const mobileMenuLinks = mobileMenu.querySelectorAll('a');
        mobileMenuLinks.forEach(link => {
            link.addEventListener('click', function() {
                mobileMenu.classList.add('hidden');
                line1.classList.remove('rotate-45', 'translate-y-2');
                line2.classList.remove('opacity-0');
                line3.classList.remove('-rotate-45', '-translate-y-2');
            });
        });
    }
});
