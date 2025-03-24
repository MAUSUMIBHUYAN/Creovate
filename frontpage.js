document.addEventListener('DOMContentLoaded', function() {
    // Debounce function for resize events
    function debounce(func, wait = 100) {
        let timeout;
        return function(...args) {
            clearTimeout(timeout);
            timeout = setTimeout(() => func.apply(this, args), wait);
        };
    }

    // Stars creation in the background
    function createStars() {
        const container = document.querySelector('.stars-container');
        const fragment = document.createDocumentFragment();
        const starCount = window.innerWidth < 768 ? 30 : 50; // Fewer stars on mobile
        
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

    // Create button hover effect
    function createButtonEffect(button, starsArray) {
        const createStars = () => {
            removeStars(starsArray);
            const fragment = document.createDocumentFragment();
            
            for (let i = 0; i < 5; i++) {
                const star = document.createElement('div');
                star.classList.add(Math.random() > 0.5 ? 'star' : 'star-4-point');
                
                const buttonRect = button.getBoundingClientRect();
                const startX = Math.random() * buttonRect.width + buttonRect.left;
                const startY = Math.random() * buttonRect.height + buttonRect.top;
                
                star.style.position = 'fixed';
                star.style.left = `${startX}px`;
                star.style.top = `${startY}px`;
                star.style.opacity = '0';
                star.style.transition = 'opacity 0.5s, transform 0.5s';
                star.style.pointerEvents = 'none';
                
                fragment.appendChild(star);
                starsArray.push(star);
                
                requestAnimationFrame(() => {
                    const angle = Math.random() * 2 * Math.PI;
                    const distance = Math.random() * 50 + 20;
                    star.style.transform = `rotate(45deg) translate(${Math.cos(angle) * distance}px, ${Math.sin(angle) * distance}px)`;
                    star.style.opacity = '1';
                });
            }
            
            document.body.appendChild(fragment);
        };
        
        const handleMouseEnter = () => {
            createStars();
        };
        
        const handleMouseLeave = () => {
            removeStars(starsArray);
        };
        
        button.addEventListener('mouseenter', handleMouseEnter);
        button.addEventListener('mouseleave', handleMouseLeave);
        
        // Cleanup function
        return () => {
            button.removeEventListener('mouseenter', handleMouseEnter);
            button.removeEventListener('mouseleave', handleMouseLeave);
            removeStars(starsArray);
        };
    }

    function removeStars(starsArray) {
        starsArray.forEach(star => {
            star.style.opacity = '0';
            setTimeout(() => {
                if (star.parentNode) {
                    star.parentNode.removeChild(star);
                }
            }, 500);
        });
        starsArray.length = 0;
    }

    function positionRobo() {
        const robo = document.querySelector('.robo-container');
        const button = document.querySelector('.explore-btn');
        
        if (robo && button) {
            const buttonRect = button.getBoundingClientRect();
            const newTop = buttonRect.top - robo.clientHeight + 33;
            robo.style.top = `${newTop}px`;
        }
    }

    function typeEffect(element, text, speed, callback) {
        let i = 0;
        function typing() {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                setTimeout(typing, speed);
            } else {
                element.style.borderRight = 'none';
                if (callback) callback();
            }
        }
        typing();
    }

    // Initialize everything
    function init() {
        createStars();
        
        const exploreBtn = document.querySelector('.explore-btn');
        const surpriseBtn = document.querySelector('.surprise-btn');
        const exploreStars = [];
        const surpriseStars = [];
        
        createButtonEffect(exploreBtn, exploreStars);
        createButtonEffect(surpriseBtn, surpriseStars);
        
        positionRobo();
        window.addEventListener('resize', debounce(positionRobo));
        
        const welcomeText = document.querySelector('.welcome-text');
        typeEffect(welcomeText, 'Welcome to Creovate! ☆彡', 150);
    }

    init();
});