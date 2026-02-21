// COMPREHENSIVE SITE AUDIT SCRIPT
// Run this in browser console to test all functionality

console.log('🔍 Starting Eximatic Site Audit...\n');

// 1. TEST NAVIGATION LINKS
console.log('=== NAVIGATION AUDIT ===');
const navLinks = document.querySelectorAll('nav a');
console.log(`✓ Found ${navLinks.length} navigation links`);
navLinks.forEach(link => {
    const href = link.getAttribute('href');
    const text = link.textContent.trim();
    console.log(`  - ${text}: ${href}`);
});

// 2. TEST HAMBURGER MENU
console.log('\n=== HAMBURGER MENU TEST ===');
const hamburger = document.querySelector('.mobile-menu-toggle');
if(hamburger){
    const spans = hamburger.querySelectorAll('span');
    console.log(`✓ Hamburger found with ${spans.length} spans`);
    if(spans.length === 3){
        console.log('✓ 3-line hamburger structure correct');
    } else {
        console.log('❌ ERROR: Expected 3 spans, found ' + spans.length);
    }
} else {
    console.log('❌ ERROR: Hamburger menu not found');
}

// 3. TEST VIDEOS
console.log('\n=== VIDEO ELEMENTS TEST ===');
const videos = document.querySelectorAll('video');
console.log(`✓ Found ${videos.length} video elements`);
videos.forEach((video, i) => {
    console.log(`  Video ${i+1}:`);
    console.log(`    - autoplay: ${video.hasAttribute('autoplay')}`);
    console.log(`    - muted: ${video.hasAttribute('muted')}`);
    console.log(`    - loop: ${video.hasAttribute('loop')}`);
    console.log(`    - playsinline: ${video.hasAttribute('playsinline')}`);
    console.log(`    - source: ${video.querySelector('source')?.src || 'none'}`);
});

// 4. TEST FORMS
console.log('\n=== FORMS TEST ===');
const forms = document.querySelectorAll('form');
console.log(`✓ Found ${forms.length} forms`);
forms.forEach((form, i) => {
    const inputs = form.querySelectorAll('input, textarea, select');
    console.log(`  Form ${i+1}: ${inputs.length} input fields`);
});

// 5. TEST CTA BUTTONS
console.log('\n=== CTA BUTTONS TEST ===');
const buttons = document.querySelectorAll('.btn-red, .btn-white, button[type="submit"]');
console.log(`✓ Found ${buttons.length} CTA buttons`);

// 6. TEST IMAGES
console.log('\n=== IMAGES TEST ===');
const images = document.querySelectorAll('img');
let brokenImages = 0;
images.forEach(img => {
    if(!img.complete || img.naturalWidth === 0){
        console.log(`❌ Broken image: ${img.src}`);
        brokenImages++;
    }
});
if(brokenImages === 0){
    console.log(`✓ All ${images.length} images loaded successfully`);
} else {
    console.log(`❌ ${brokenImages} broken images found`);
}

// 7. TEST SECTIONS
console.log('\n=== PAGE SECTIONS ===');
const sections = document.querySelectorAll('section');
console.log(`✓ Found ${sections.length} sections`);

// 8. TEST MOBILE RESPONSIVENESS
console.log('\n=== RESPONSIVE TEST ===');
const viewportWidth = window.innerWidth;
console.log(`Current viewport: ${viewportWidth}px`);
if(viewportWidth <= 768){
    console.log('📱 Mobile view detected');
    const mobileMenu = window.getComputedStyle(hamburger).display;
    console.log(`  - Hamburger display: ${mobileMenu}`);
} else {
    console.log('💻 Desktop view detected');
}

// 9. CHECK FOR CONSOLE ERRORS
console.log('\n=== CHECKING FOR ERRORS ===');
console.log('(Check console for any red error messages above)');

console.log('\n✅ Site Audit Complete!');
console.log('Review the results above for any issues.\n');
