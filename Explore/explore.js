const animations = [
    { name: "Cherry Blossom", folder: "cherry_blossom", theme: "Nature" },
    { name: "Sleeping Moon", folder: "sleeping_moon", theme: "Nature" },
    { name: "Cross", folder: "cross", theme: "Symbolic" },
    { name: "Shadow Effect Button", folder: "shadow_effect_button", theme: "UI Effects" },
    { name: "Text Animation", folder: "text_animation", theme: "UI Effects" },
    { name: "Realistic Water Effect", folder: "water_ripple_effect", theme: "UI Effects" },
    { name: "Kingfisher Apple", folder: "kingfisher_apple", theme: "Creative" },
    { name: "Hovering Button", folder: "hovering_button", theme: "UI Effects" }
];

document.addEventListener('DOMContentLoaded', function() {
    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    // Group animations by theme
    const grouped = animations.reduce((acc, anim) => {
        if (!acc[anim.theme]) acc[anim.theme] = [];
        acc[anim.theme].push(anim);
        return acc;
    }, {});

    const themesContainer = document.getElementById('themes-container');

    // Create theme sections
    Object.entries(grouped).forEach(([theme, anims], index) => {
        const section = document.createElement('div');
        section.className = 'theme-section';
        if (!prefersReducedMotion) {
            section.style.animationDelay = `${index * 0.1}s`;
        }

        // Theme title
        const title = document.createElement('h2');
        title.className = 'theme-title';
        title.textContent = theme;
        section.appendChild(title);

        // Animation cards row
        const row = document.createElement('div');
        row.className = 'animation-row';

        anims.forEach(anim => {
            const card = document.createElement('div');
            card.className = 'animation-card';
            card.style.backgroundImage = `url(../Animations/${anim.folder}/img.png)`;
            card.title = anim.name;

            // Add play icon
            const playIcon = document.createElement('i');
            playIcon.className = 'fas fa-play play-icon';
            card.appendChild(playIcon);

            // Click handler
            card.addEventListener('click', () => {
                window.open(`../Animations/${anim.folder}/index.html`, '_blank');
            });

            // Only add parallax if no motion preference
            if (!prefersReducedMotion) {
                card.addEventListener('mousemove', (e) => {
                    const xAxis = (window.innerWidth / 2 - e.pageX) / 25;
                    const yAxis = (window.innerHeight / 2 - e.pageY) / 25;
                    card.style.transform = `translateY(-10px) rotateY(${xAxis}deg) rotateX(${yAxis}deg) scale(1.03)`;
                });

                card.addEventListener('mouseleave', () => {
                    card.style.transform = 'translateY(-10px) scale(1.03)';
                });
            }

            row.appendChild(card);
        });

        section.appendChild(row);
        themesContainer.appendChild(section);
    });

    // Setup mobile menu
    setupMobileMenu();
    
    // Setup header scroll effect
    setupHeaderScroll();
    
    // Only create particle network if no motion preference
    if (!prefersReducedMotion) {
        createParticleNetwork();
    }
});

function setupMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navbar = document.querySelector('.navbar');
    const header = document.querySelector('.header');
    
    if (hamburger && navbar) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navbar.classList.toggle('active');
            header.classList.toggle('menu-open');
        });
        
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navbar.classList.remove('active');
                header.classList.remove('menu-open');
            });
        });
    }
}

function setupHeaderScroll() {
    window.addEventListener('scroll', function() {
        const header = document.querySelector('.header');
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}

function createParticleNetwork() {
    const container = document.getElementById('particle-network');
    const canvas = document.createElement('canvas');
    canvas.id = 'particle-canvas';
    container.appendChild(canvas);
    
    const ctx = canvas.getContext('2d');
    resizeCanvas();
    
    // Adjust particle count based on device capability
    const isMobile = /Mobi|Android/i.test(navigator.userAgent);
    const particleCount = isMobile ? 
        Math.floor(window.innerWidth / 30) : 
        Math.floor(window.innerWidth / 20);
    
    const particles = [];
    const maxDistance = 150;
    const maxDistanceSq = maxDistance * maxDistance;
    
    // Create particles
    for (let i = 0; i < particleCount; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            size: Math.random() * 2 + 1,
            speedX: Math.random() * 1 - 0.5,
            speedY: Math.random() * 1 - 0.5
        });
    }
    
    // Animation loop with frame rate control
    let lastTime = 0;
    const fps = 30;
    const frameDelay = 1000 / fps;
    
    function animate(timestamp) {
        if (timestamp - lastTime < frameDelay) {
            requestAnimationFrame(animate);
            return;
        }
        lastTime = timestamp;
        
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Update and draw particles
        particles.forEach(p => {
            p.x += p.speedX;
            p.y += p.speedY;
            
            // Bounce off edges
            if (p.x < 0 || p.x > canvas.width) p.speedX *= -1;
            if (p.y < 0 || p.y > canvas.height) p.speedY *= -1;
            
            // Draw particle
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(100, 200, 255, ${p.size / 3})`;
            ctx.fill();
        });
        
        // Draw connections (optimized distance check)
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                
                if ((dx * dx + dy * dy) < maxDistanceSq) {
                    ctx.beginPath();
                    ctx.strokeStyle = `rgba(100, 200, 255, ${1 - Math.sqrt(dx*dx + dy*dy)/maxDistance})`;
                    ctx.lineWidth = 0.5;
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                }
            }
        }
        
        requestAnimationFrame(animate);
    }
    
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    
    // Debounced resize handler
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            resizeCanvas();
        }, 200);
    });
    
    // Start animation
    animate();
}