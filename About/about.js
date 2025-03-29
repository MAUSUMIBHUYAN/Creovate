document.addEventListener('DOMContentLoaded', function() {
    // Typing effect
    const text = "Welcome! I'm Mausumi, a creative mind in motion.";
    let index = 0;
    const typingText = document.getElementById('typing-text');
    
    function typeEffect() {
        if (index < text.length) {
            typingText.textContent += text[index];
            index++;
            setTimeout(typeEffect, 30 + Math.random() * 20);
        } else {
            typingText.style.borderRight = "none";
        }
    }

    // Enhanced cosmic background
    function createCosmicBackground() {
        const container = document.querySelector('.stars-container');
        
        // Create stars
        for (let i = 0; i < 200; i++) {
            const star = document.createElement('div');
            star.className = 'star';
            
            const size = Math.random() * 2;
            const left = Math.random() * 100;
            const top = Math.random() * 100;
            const opacity = Math.random() * 0.7 + 0.3;
            const duration = Math.random() * 5 + 5;
            const delay = Math.random() * 5;
            
            star.style.cssText = `
                width: ${size}px;
                height: ${size}px;
                left: ${left}%;
                top: ${top}%;
                opacity: ${opacity};
                --duration: ${duration}s;
                --delay: ${delay}s;
            `;
            
            container.appendChild(star);
        }
        
        // Create nebulas
        const nebula1 = document.createElement('div');
        nebula1.className = 'nebula nebula-1';
        container.appendChild(nebula1);
        
        const nebula2 = document.createElement('div');
        nebula2.className = 'nebula nebula-2';
        container.appendChild(nebula2);
        
        // Create shooting stars
        for (let i = 0; i < 5; i++) {
            const shootingStar = document.createElement('div');
            shootingStar.className = 'shooting-star';
            
            const left = Math.random() * 20;
            const top = Math.random() * 20 + 10;
            const duration = Math.random() * 3 + 2;
            const delay = Math.random() * 15;
            const size = Math.random() * 2 + 2;
            
            shootingStar.style.cssText = `
                left: ${left}%;
                top: ${top}%;
                --shoot-duration: ${duration}s;
                animation-delay: ${delay}s;
                width: ${size}px;
                height: ${size}px;
            `;
            
            container.appendChild(shootingStar);
        }
        
        // Create space debris
        for (let i = 0; i < 15; i++) {
            const debris = document.createElement('div');
            debris.className = 'debris';
            
            const size = Math.random() * 4 + 1;
            const left = Math.random() * 100;
            const duration = Math.random() * 50 + 50;
            const delay = Math.random() * -50;
            
            debris.style.cssText = `
                width: ${size}px;
                height: ${size}px;
                left: ${left}%;
                top: 100%;
                --debris-duration: ${duration}s;
                animation-delay: ${delay}s;
            `;
            
            container.appendChild(debris);
        }
    }

    // Parallax effect
    function setupParallax() {
        const roboImg = document.querySelector('.robo-img');
        const nebulas = document.querySelectorAll('.nebula');
        
        window.addEventListener('mousemove', (e) => {
            const x = e.clientX / window.innerWidth;
            const y = e.clientY / window.innerHeight;
            
            if (roboImg) {
                roboImg.style.transform = `translate(${x * 20 - 10}px, ${y * 20 - 10}px)`;
            }
            
            nebulas.forEach((nebula, i) => {
                const speed = i === 0 ? 0.03 : 0.02;
                nebula.style.transform = `translate(${x * 50 * speed - 25 * speed}px, ${y * 50 * speed - 25 * speed}px)`;
            });
        });
    }

    // Mobile menu toggle
    function setupMobileMenu() {
        const hamburger = document.querySelector('.hamburger');
        const navbar = document.querySelector('.navbar');
        const header = document.querySelector('.header');
        
        if (hamburger && navbar) {
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
    }
    
    // Set active nav link
    function setActiveNavLink() {
        const navLinks = document.querySelectorAll('.nav-link');
        const currentPath = window.location.pathname.split('/').pop() || 'index.html';
        
        navLinks.forEach(link => {
            const linkPath = link.getAttribute('href').split('/').pop();
            
            if (currentPath === linkPath) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }
    
    // Header scroll effect
    function setupHeaderScroll() {
        const header = document.querySelector('.header');
        
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }
    
    // Initialize everything
    function init() {
        typeEffect();
        createCosmicBackground();
        setupParallax();
        setupMobileMenu();
        setActiveNavLink();
        setupHeaderScroll();
    }
    
    // Start initialization
    init();
});