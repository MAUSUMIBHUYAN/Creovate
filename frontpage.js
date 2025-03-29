document.addEventListener('DOMContentLoaded', function() {
    // First make sure everything is visible
    document.body.style.opacity = '1';
    
    // Mobile viewport height fix
    function setViewportHeight() {
        let vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    }
    
    // Initial call
    setViewportHeight();
    
    // Re-calculate on resize
    window.addEventListener('resize', setViewportHeight);
    window.addEventListener('orientationchange', setViewportHeight);
    
    // Rest of your existing JavaScript code...
    function createParticles() {
        const container = document.querySelector('.particles-container');
        container.innerHTML = '';
        
        const particleCount = window.innerWidth < 768 ? 30 : 100;
        
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.classList.add('particle');
            
            const size = Math.random() * 5 + 1;
            const posX = Math.random() * 100;
            const posY = Math.random() * 100;
            const delay = Math.random() * 15;
            const duration = Math.random() * 10 + 10;
            const opacity = Math.random() * 0.5 + 0.1;
            
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            particle.style.left = `${posX}vw`;
            particle.style.top = `${posY}vh`;
            particle.style.animationDelay = `${delay}s`;
            particle.style.animationDuration = `${duration}s`;
            particle.style.opacity = opacity;
            
            const colors = ['#FFD700', '#00FFFF', '#FF5F5F', '#FFFFFF'];
            particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            
            container.appendChild(particle);
        }
    }
    
    // Button hover effects
    function setupButtonEffects() {
        const buttons = document.querySelectorAll('.explore-btn, .surprise-btn');
        const hoverSound = document.getElementById('hover-sound');
        
        buttons.forEach(button => {
            button.addEventListener('mouseenter', () => {
                if (hoverSound) {
                    hoverSound.currentTime = 0;
                    hoverSound.play();
                }
                
                // Create particles
                const particles = 10;
                for (let i = 0; i < particles; i++) {
                    const particle = document.createElement('div');
                    particle.classList.add('particle');
                    
                    const rect = button.getBoundingClientRect();
                    const size = Math.random() * 4 + 2;
                    const x = rect.left + Math.random() * rect.width;
                    const y = rect.top + Math.random() * rect.height;
                    
                    particle.style.width = `${size}px`;
                    particle.style.height = `${size}px`;
                    particle.style.left = `${x}px`;
                    particle.style.top = `${y}px`;
                    particle.style.position = 'fixed';
                    particle.style.animation = 'none';
                    particle.style.opacity = '1';
                    
                    document.body.appendChild(particle);
                    
                    const angle = Math.random() * Math.PI * 2;
                    const distance = Math.random() * 50 + 30;
                    const duration = Math.random() * 1000 + 500;
                    
                    gsap.to(particle, {
                        x: Math.cos(angle) * distance,
                        y: Math.sin(angle) * distance,
                        opacity: 0,
                        duration: duration / 1000,
                        ease: 'power2.out',
                        onComplete: () => {
                            particle.remove();
                        }
                    });
                }
            });
            
            if (button.classList.contains('surprise-btn')) {
                button.addEventListener('click', () => {
                    document.body.style.backgroundColor = getRandomColor();
                    setTimeout(() => {
                        document.body.style.backgroundColor = '';
                    }, 1000);
                    
                    const robot = document.querySelector('.robo-container');
                    if (robot) {
                        gsap.to(robot, {
                            y: -100,
                            duration: 0.3,
                            ease: 'power2.out',
                            yoyo: true,
                            repeat: 1
                        });
                    }
                });
            }
        });
    }
    
    function getRandomColor() {
        const colors = ['#FF4136', '#0074D9', '#2ECC40', '#FFDC00', '#B10DC9'];
        return colors[Math.floor(Math.random() * colors.length)];
    }
    
    // Mobile menu toggle
    function setupMobileMenu() {
        const hamburger = document.querySelector('.hamburger');
        const navbar = document.querySelector('.navbar');
        
        if (hamburger && navbar) {
            hamburger.addEventListener('click', () => {
                hamburger.classList.toggle('active');
                navbar.classList.toggle('active');
            });
            
            document.querySelectorAll('.nav-link').forEach(link => {
                link.addEventListener('click', () => {
                    hamburger.classList.remove('active');
                    navbar.classList.remove('active');
                });
            });
        }
    }
    function setActiveNavLink() {
        const navLinks = document.querySelectorAll('.nav-link');
        const currentPath = window.location.pathname;
        
        navLinks.forEach(link => {
            const linkPath = link.getAttribute('href');
            
            // Check if current path contains link path or vice versa
            if (currentPath.includes(linkPath) || linkPath.includes(currentPath)) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }
    
    // Initialize everything
    function init() {
        createParticles();
        setupButtonEffects();
        setupMobileMenu();
        setActiveNavLink()
        gsap.from('.robo-container', {
            opacity: 0,
            x: 100,
            duration: 1,
            delay: 1,
            ease: 'back.out'
        });
        
        gsap.to('.floating-shapes', {
            opacity: 1,
            duration: 2,
            delay: 0.5,
            ease: 'power2.out'
        });
    }
    
    // Start initialization when window loads
    window.addEventListener('load', init);
    
    // Handle window resize
    let resizeTimeout;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            createParticles();
        }, 200);
    });
});

document.querySelector('.explore-btn').addEventListener('click', () => {
    window.location.href = 'Explore/explore.html';  // adjust path if needed
});