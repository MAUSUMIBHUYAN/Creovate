document.addEventListener('DOMContentLoaded', function() {
    // Prevent scroll restoration
    if (history.scrollRestoration) {
        history.scrollRestoration = 'manual';
    } else {
        window.onbeforeunload = function() {
            window.scrollTo(0, 0);
        }
    }

    // Force scroll to top on initial load
    window.scrollTo(0, 0);
    
    // Check for hash in URL
    if (window.location.hash) {
        window.location.hash = '';
    }

    // Create cosmic background elements
    function createCosmicBackground() {
        const background = document.querySelector('.cosmic-background');
        
        // Create stars
        for (let i = 0; i < 150; i++) {
            const star = document.createElement('div');
            star.className = 'star';
            
            star.style.cssText = `
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                width: ${Math.random() * 3 + 1}px;
                height: ${Math.random() * 3 + 1}px;
                opacity: ${Math.random() * 0.5 + 0.5};
                animation-duration: ${Math.random() * 5 + 3}s;
                animation-delay: ${Math.random() * 5}s;
            `;
            
            background.appendChild(star);
        }
    }
    
    // Shooting star effect
    function setupShootingStars() {
        // Random shooting stars
        setInterval(() => {
            if (Math.random() > 0.7) {
                createShootingStar();
            }
        }, 3000);
    }
    
    function createShootingStar() {
        const star = document.createElement('div');
        star.className = 'star';
        
        const startX = Math.random() * 20;
        const startY = Math.random() * 20 + 10;
        const duration = Math.random() * 2 + 1;
        const size = Math.random() * 2 + 1;
        
        star.style.cssText = `
            left: ${startX}%;
            top: ${startY}%;
            width: ${size}px;
            height: ${size}px;
            animation-duration: ${duration}s;
        `;
        
        document.body.appendChild(star);
        
        // Remove after animation completes
        setTimeout(() => {
            star.remove();
        }, duration * 1000);
    }
    
    // Mobile menu toggle
    function setupMobileMenu() {
        const hamburger = document.querySelector('.hamburger');
        const navbar = document.querySelector('.navbar');
        const header = document.querySelector('.header');
        
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navbar.classList.toggle('active');
            header.classList.toggle('active');
        });
        
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navbar.classList.remove('active');
                header.classList.remove('active');
            });
        });
    }
    
    // Set active nav link
    function setActiveNavLink() {
        const navLinks = document.querySelectorAll('.nav-link');
        const currentPath = window.location.pathname.split('/').pop() || 'index.html';
        
        navLinks.forEach(link => {
            const linkPath = link.getAttribute('href').split('/').pop();
            link.classList.toggle('active', currentPath === linkPath);
        });
    }
    
    // Header scroll effect
    function setupHeaderScroll() {
        const header = document.querySelector('.header');
        
        window.addEventListener('scroll', () => {
            header.classList.toggle('scrolled', window.scrollY > 50);
        });
    }
    
    // Initialize everything
    function init() {
        createCosmicBackground();
        setupShootingStars();
        setupMobileMenu();
        setActiveNavLink();
        setupHeaderScroll();
    }
    
    init();
});