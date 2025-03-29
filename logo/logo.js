document.addEventListener("DOMContentLoaded", () => {
    const star = document.querySelector(".star");
    const starGlow = document.querySelector(".star-glow");
    const logoText = document.querySelector(".logo-text");
    const tagline = document.querySelector(".tagline");
    const particlesContainer = document.getElementById("particles");
    const starField = document.getElementById("star-field");
    const lightPulse = document.getElementById("light-pulse");

    // Create starfield background
    function createStarfield() {
        const starCount = 150;
        for (let i = 0; i < starCount; i++) {
            const star = document.createElement("i");
            const size = Math.random() * 2;
            const posX = Math.random() * 100;
            const posY = Math.random() * 100;
            const duration = Math.random() * 10 + 5;
            const delay = Math.random() * 10;
            
            star.style.width = `${size}px`;
            star.style.height = `${size}px`;
            star.style.left = `${posX}%`;
            star.style.top = `${posY}%`;
            star.style.animationDuration = `${duration}s`;
            star.style.animationDelay = `${delay}s`;
            
            starField.appendChild(star);
        }
    }

    // Create particles
    function createParticles() {
        const particleCount = 30;
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement("div");
            particle.classList.add("particle");
            
            // Random properties
            const size = Math.random() * 5 + 2;
            const posX = Math.random() * 100;
            const posY = Math.random() * 100;
            const delay = Math.random() * 1000;
            const duration = Math.random() * 2000 + 1000;
            
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            particle.style.left = `${posX}%`;
            particle.style.top = `${posY}%`;
            particle.style.animation = `float ${duration}ms ease-in-out ${delay}ms infinite`;
            
            particlesContainer.appendChild(particle);
        }
    }

    // Create light pulse effect
    function createLightPulse() {
        setInterval(() => {
            lightPulse.style.opacity = "0.5";
            lightPulse.style.transition = "opacity 2s ease-out, transform 3s ease-out";
            lightPulse.style.transform = "scale(1.5)";
            
            setTimeout(() => {
                lightPulse.style.opacity = "0";
                lightPulse.style.transform = "scale(1)";
            }, 2000);
        }, 5000);
    }

    // Initialize background effects
    createStarfield();
    createLightPulse();

    // Star animation
    setTimeout(() => {
        star.style.opacity = "1";
        star.style.transition = "transform 1.5s cubic-bezier(0.175, 0.885, 0.32, 1.275), opacity 0.8s ease-out";
        star.style.transform = "translateY(0) rotateY(0deg)";
        
        // Star glow
        setTimeout(() => {
            starGlow.style.opacity = "1";
            starGlow.style.transition = "opacity 0.5s ease-out, transform 2s ease-out";
            starGlow.style.transform = "scale(1.2)";
            
            // Pulsing effect
            setInterval(() => {
                starGlow.style.transform = "scale(1.3)";
                setTimeout(() => {
                    starGlow.style.transform = "scale(1.2)";
                }, 500);
            }, 2000);
        }, 500);
        
        // Create particles after star appears
        setTimeout(createParticles, 800);
    }, 300);

    // Logo text animation
    setTimeout(() => {
        logoText.style.opacity = "1";
        logoText.style.transition = "opacity 1s ease-out, transform 1s cubic-bezier(0.175, 0.885, 0.32, 1.275)";
        logoText.style.transform = "translateY(0)";
        
        // Letter spacing animation
        logoText.style.letterSpacing = "4px";
        setTimeout(() => {
            logoText.style.transition = "letter-spacing 0.5s ease-out";
            logoText.style.letterSpacing = "2px";
        }, 1000);
    }, 1800);

    // Tagline animation
    setTimeout(() => {
        tagline.style.opacity = "0.8";
        tagline.style.transition = "opacity 1s ease-out, transform 1s ease-out";
        tagline.style.transform = "translateY(0)";
        
        // Fade in/out loop
        setInterval(() => {
            tagline.style.opacity = "1";
            setTimeout(() => {
                tagline.style.opacity = "0.8";
            }, 1500);
        }, 3000);
    }, 2500);

    // Add floating animation for particles
    const style = document.createElement("style");
    style.textContent = `
        @keyframes float {
            0% {
                transform: translateY(0) translateX(0);
                opacity: 0;
            }
            10% {
                opacity: 0.6;
            }
            90% {
                opacity: 0.6;
            }
            100% {
                transform: translateY(-100px) translateX(${Math.random() > 0.5 ? '-' : ''}${Math.random() * 50}px);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
});