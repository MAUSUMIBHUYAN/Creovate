const animations = [
    { name: "Matrix Rain", folder: "matrix"},
    { name: "Pulse Particle", folder: "particles"},
    { name: "Sunset", folder: "sunset"},
    { name: "Rocket spinning", folder: "spinning_rocket" },
    { name: "Waves effect", folder: "waves" },
    { name: "Among Us", folder: "imposter" },
    { name: "Neon Colored Rings", folder: "colored_rings" },
    { name: "Glowing Squares Dance", folder: "squares_rotation" },
    { name: "Cherry Blossom", folder: "cherry_blossom" },
    { name: "Sleeping Moon", folder: "sleeping_moon" },
    { name: "Cross", folder: "cross" },
    { name: "Shadow Effect Button", folder: "shadow_effect_button" },
    { name: "Text Animation", folder: "text_animation" },
    { name: "Hovering Button", folder: "hovering_button" }
];

// Performance constants
const MAX_PARTICLES = 100;
const MAX_STARS = 500;
const PARALLAX_FRAME_DELAY = 32; 

document.addEventListener('DOMContentLoaded', function() {
    createStarfield();
    createParticleNetwork();
    createAnimationGallery();
    setupMobileMenu();
    setupHeaderScroll();
});

function createStarfield() {
    const canvas = document.getElementById('galaxy-bg');
    const ctx = canvas.getContext('2d');
    
    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        drawStars();
    }
    
    function drawStars() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        const starCount = Math.min(
            Math.floor(canvas.width * canvas.height / 2000),
            MAX_STARS
        );
        
        for (let i = 0; i < starCount; i++) {
            const x = Math.random() * canvas.width;
            const y = Math.random() * canvas.height;
            const radius = Math.random() * 1.5;
            const opacity = Math.random() * 0.5 + 0.5;
            
            ctx.beginPath();
            ctx.arc(x, y, radius, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
            ctx.fill();
        }
    }
    
    window.addEventListener('resize', resize);
    resize();
}

function createParticleNetwork() {
    const canvas = document.getElementById('particle-network');
    const ctx = canvas.getContext('2d');
    let particles = [];
    
    function init() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        
        particles = [];
        const count = Math.min(
            Math.floor(window.innerWidth / 25),
            MAX_PARTICLES
        );
        
        for (let i = 0; i < count; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                size: Math.random() * 1.5 + 0.5,
                speedX: Math.random() * 1 - 0.5,
                speedY: Math.random() * 1 - 0.5
            });
        }
    }
    
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Update particles
        particles.forEach(p => {
            p.x += p.speedX;
            p.y += p.speedY;
            
            // Boundary check
            if (p.x < 0 || p.x > canvas.width) p.speedX *= -1;
            if (p.y < 0 || p.y > canvas.height) p.speedY *= -1;
            
            // Draw particle
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(100, 200, 255, ${p.size / 3})`;
            ctx.fill();
        });
        
        // Draw connections
        ctx.strokeStyle = 'rgba(100, 200, 255, 0.2)';
        ctx.lineWidth = 0.3;
        
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 100) {
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                }
            }
        }
        
        requestAnimationFrame(animate);
    }
    
    window.addEventListener('resize', init);
    init();
    animate();
}

function createAnimationGallery() {
    const gallery = document.getElementById('gallery');
    let lastParallaxTime = 0;
    
    animations.forEach(anim => {
        const item = document.createElement('div');
        item.className = 'animation-item';
        
        const img = document.createElement('img');
        img.className = 'animation-preview';
        img.src = `./${anim.folder}/img.png`;
        img.alt = anim.name;
        img.loading = 'lazy';
        
        const name = document.createElement('div');
        name.className = 'animation-name';
        name.textContent = anim.name;
        
        item.appendChild(img);
        item.appendChild(name);
        
        // Throttled parallax effect
        item.addEventListener('mousemove', (e) => {
            const now = Date.now();
            if (now - lastParallaxTime < PARALLAX_FRAME_DELAY) return;
            lastParallaxTime = now;
            
            const xAxis = (window.innerWidth / 2 - e.pageX) / 25;
            const yAxis = (window.innerHeight / 2 - e.pageY) / 25;
            img.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg) scale(1.05)`;
        });
        
        item.addEventListener('mouseleave', () => {
            img.style.transform = 'rotateY(0) rotateX(0) scale(1)';
        });
        
        item.onclick = () => window.open(`./${anim.folder}/index.html`, '_blank');
        gallery.appendChild(item);
    });
}

function setupMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navbar = document.querySelector('.navbar');
    
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

function setupHeaderScroll() {
    window.addEventListener('scroll', function() {
        const header = document.querySelector('.header');
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // Set active nav link
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-link').forEach(link => {
        const linkPath = link.getAttribute('href').split('/').pop();
        if (currentPath === linkPath) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}