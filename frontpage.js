// Stars Creation in the Background (Efficient with Document Fragment)
function createStars() {
    const container = document.querySelector('.stars-container');
    const fragment = document.createDocumentFragment();

    for (let i = 0; i < 50; i++) { 
        const star = document.createElement('div');
        star.className = Math.random() > 0.5 ? 'star' : 'star-4-point';
        star.style.cssText = `
            top: ${Math.random() * 100}vh;
            left: ${Math.random() * 100}vw;
            width: ${(Math.random() * 8 + 5)}px;
            height: ${(Math.random() * 8 + 5)}px;
            animation-duration: ${(Math.random() * 2 + 1)}s;
        `;
        fragment.appendChild(star);
    }
    container.appendChild(fragment);
}
createStars();

// Hover Effect on Buttons (Single Event Listener with Delegation)
document.addEventListener("mouseover", (event) => {
    if (event.target.matches(".explore-btn, .surprise-btn")) {
        createHoverStars(event.target);
    }
});

document.addEventListener("mouseleave", (event) => {
    if (event.target.matches(".explore-btn, .surprise-btn")) {
        removeHoverStars();
    }
});

let hoverStars = [];

function createHoverStars(button) {
    removeHoverStars(); // Clear previous stars first

    const buttonRect = button.getBoundingClientRect();
    const fragment = document.createDocumentFragment();

    for (let i = 0; i < 5; i++) {
        const star = document.createElement("div");
        star.className = Math.random() > 0.5 ? "star" : "star-4-point";
        star.style.cssText = `
            position: absolute;
            left: ${Math.random() * buttonRect.width + buttonRect.left}px;
            top: ${Math.random() * buttonRect.height + buttonRect.top}px;
            opacity: 0;
            transition: opacity 0.5s, transform 0.5s;
        `;

        fragment.appendChild(star);
        hoverStars.push(star);

        setTimeout(() => {
            const angle = Math.random() * 2 * Math.PI;
            const distance = Math.random() * 50 + 20;
            star.style.transform = `rotate(45deg) translate(${Math.cos(angle) * distance}px, ${Math.sin(angle) * distance}px)`;
            star.style.opacity = "1";
        }, 50);
    }
    document.body.appendChild(fragment);
}

function removeHoverStars() {
    hoverStars.forEach(star => {
        star.style.opacity = "0";
        setTimeout(() => star.remove(), 500);
    });
    hoverStars = [];
}

// Robo Positioning (Optimize on Resize)
function positionRobo() {
    const robo = document.querySelector('.robo-container');
    const button = document.querySelector('.explore-btn');
    
    if (robo && button) {
        const buttonRect = button.getBoundingClientRect();
        robo.style.top = `${buttonRect.top - robo.clientHeight + 33}px`;
    }
}

positionRobo();
window.addEventListener("resize", positionRobo);

// Typing Effect with Callback
function typeEffect(element, text, speed, callback) {
    let i = 0;
    function typing() {
        if (i < text.length) {
            element.innerHTML += text[i++];
            setTimeout(typing, speed);
        } else {
            element.style.borderRight = "none"; // Remove cursor after typing
            if (callback) callback();
        }
    }
    typing();
}

const welcomeText = document.querySelector('.welcome-text');
typeEffect(welcomeText, "Welcome to Creovate! ☆彡", 150, () => {
    welcomeText.style.animation = "textShine 2s infinite alternate";
});
