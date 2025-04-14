// Animation configuration
const animationConfig = {
    animations: [
        { name: "sunset", path: "Animations/sunset/index.html" },
        { name: "Waves effect", path: "Animations/waves/index.html" },
        { name: "Neon Colored Rings", path: "Animations/colored_rings/index.html" },
        { name: "Glowing Squares Dance", folder: "Animations/squares_rotation/index.html" },
        { name: "Among Us", path: "Animations/imposter/index.html" },,
        { name: "Cherry Blossom", path: "Animations/cherry_blossom/index.html" },
        { name: "Sleeping Moon", path: "Animations/sleeping_moon/index.html" },
        { name: "Cross", path: "Animations/cross/index.html" }
        
    ],
    sounds: {
        hover: "sounds/hover-sound.mp3",
        click: "sounds/click-sound.mp3"
    }
};

// Initialize surprise button functionality
function initSurpriseButton(buttonSelector) {
    const surpriseBtn = document.querySelector(buttonSelector);
    
    if (!surpriseBtn) return;
    
    // Preload sounds
    const hoverSound = new Audio(animationConfig.sounds.hover);
    const clickSound = new Audio(animationConfig.sounds.click);
    
    // Button hover effects
    surpriseBtn.addEventListener('mouseenter', () => {
        hoverSound.currentTime = 0;
        hoverSound.play().catch(e => console.log("Sound prevented:", e));
        gsap.to(surpriseBtn, { scale: 1.05, duration: 0.3 });
    });
    
    surpriseBtn.addEventListener('mouseleave', () => {
        gsap.to(surpriseBtn, { scale: 1, duration: 0.3 });
    });
    
    // Button click handler
    surpriseBtn.addEventListener('click', () => {
        // Play click sound
        clickSound.play().catch(e => console.log("Sound prevented:", e));
        
        // Visual feedback
        surpriseBtn.classList.add('animate__animated', 'animate__rubberBand');
        setTimeout(() => {
            surpriseBtn.classList.remove('animate__animated', 'animate__rubberBand');
        }, 1000);
        
        // Get random animation
        const randomAnim = getRandomAnimation();
        
        // Open animation
        openAnimation(randomAnim);
    });
    
    // Get random animation from config
    function getRandomAnimation() {
        const randomIndex = Math.floor(Math.random() * animationConfig.animations.length);
        return animationConfig.animations[randomIndex];
    }
    
    // Open animation page
    function openAnimation(animation) {
        console.log(`Opening: ${animation.name}`);
        window.open(animation.path, '_blank');
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initSurpriseButton('.surprise-btn');
});