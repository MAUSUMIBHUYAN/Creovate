document.addEventListener('DOMContentLoaded', function() {
    // Create background stars
    function createStars() {
        const container = document.querySelector('.stars-container');
        const fragment = document.createDocumentFragment();
        const starCount = window.innerWidth < 768 ? 30 : 50;
        
        for (let i = 0; i < starCount; i++) {
            const star = document.createElement('div');
            star.classList.add(Math.random() > 0.5 ? 'star' : 'star-4-point');
            star.style.top = Math.random() * 100 + 'vh';
            star.style.left = Math.random() * 100 + 'vw';
            const size = (Math.random() * 8 + 5);
            star.style.width = size + 'px';
            star.style.height = size + 'px';
            star.style.animationDuration = (Math.random() * 2 + 1) + 's';
            fragment.appendChild(star);
        }
        container.appendChild(fragment);
    }

    // Button hover effects
    function setupButtonEffects() {
        const buttons = [
            document.querySelector('.explore-btn'),
            document.querySelector('.surprise-btn')
        ];
        
        buttons.forEach(button => {
            if (!button) return;
            
            let stars = [];
            
            button.addEventListener('mouseenter', () => {
                // Remove existing stars
                stars.forEach(star => {
                    if (star.parentNode) {
                        star.parentNode.removeChild(star);
                    }
                });
                stars = [];
                
                // Create new stars
                for (let i = 0; i < 5; i++) {
                    const star = document.createElement('div');
                    star.classList.add(Math.random() > 0.5 ? 'star' : 'star-4-point');
                    
                    const rect = button.getBoundingClientRect();
                    star.style.position = 'fixed';
                    star.style.left = `${Math.random() * rect.width + rect.left}px`;
                    star.style.top = `${Math.random() * rect.height + rect.top}px`;
                    star.style.opacity = '0';
                    star.style.transition = 'all 0.5s ease-out';
                    star.style.pointerEvents = 'none';
                    
                    document.body.appendChild(star);
                    stars.push(star);
                    
                    // Animate stars
                    requestAnimationFrame(() => {
                        const angle = Math.random() * Math.PI * 2;
                        const distance = Math.random() * 50 + 20;
                        star.style.transform = `translate(${Math.cos(angle) * distance}px, ${Math.sin(angle) * distance}px)`;
                        star.style.opacity = '1';
                    });
                }
            });
            
            button.addEventListener('mouseleave', () => {
                stars.forEach(star => {
                    star.style.opacity = '0';
                    setTimeout(() => {
                        if (star.parentNode) {
                            star.parentNode.removeChild(star);
                        }
                    }, 500);
                });
                stars = [];
            });
        });
    }

    // Typing effect for welcome text
    function typeWelcomeText() {
        const element = document.querySelector('.welcome-text');
        if (!element) return;

        const text = "Welcome to Creovate! ☆彡".split(" ");
        let i = 0;
        let result = "";

        function type() {
            if (i < text.length) {
                result += text[i] + " ";
                element.innerHTML = result.trim() + (i === 1 ? "<br>" : ""); // Add line break after "to"
                i++;
                setTimeout(type, 150);
            } else {
                element.style.borderRight = 'none';
            }
        }

        type();
    }

    // Initialize everything
    function init() {
        createStars();
        setupButtonEffects();
        typeWelcomeText();
    }

    init();
});