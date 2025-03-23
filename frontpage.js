function createStars() {
    const container = document.querySelector('.stars-container');
    for (let i = 0; i < 50; i++) { 
        let star = document.createElement('div');
        star.classList.add(Math.random() > 0.5 ? 'star' : 'star-4-point');
        star.style.top = Math.random() * 100 + 'vh';
        star.style.left = Math.random() * 100 + 'vw';
        star.style.width = (Math.random() * 8 + 5) + 'px';
        star.style.height = star.style.width;
        star.style.animationDuration = (Math.random() * 2 + 1) + 's';
        container.appendChild(star);
    }
}
createStars();

const button = document.querySelector(".explore-btn"); 
let stars = [];

button.addEventListener("mouseover", () => {
    removeStars();

    for (let i = 0; i < 5; i++) { 
        let star = document.createElement("div");
        star.classList.add(Math.random() > 0.5 ? 'star' : 'star-4-point');

        document.body.appendChild(star);

        let buttonRect = button.getBoundingClientRect();
        let startX = Math.random() * buttonRect.width + buttonRect.left;
        let startY = Math.random() * buttonRect.height + buttonRect.top;

        star.style.position = "absolute";
        star.style.left = `${startX}px`;
        star.style.top = `${startY}px`;
        star.style.opacity = "0";
        star.style.transition = "opacity 0.5s, transform 0.5s";

        setTimeout(() => {
            let angle = Math.random() * 2 * Math.PI;
            let distance = Math.random() * 50 + 20;
            let moveX = Math.cos(angle) * distance;
            let moveY = Math.sin(angle) * distance;

            star.style.transform = `rotate(45deg) translate(${moveX}px, ${moveY}px)`;
            star.style.opacity = "1";
        }, 50);

        stars.push(star);
    }
});

button.addEventListener("mouseleave", () => {
    removeStars();
});

function removeStars() {
    stars.forEach(star => {
        star.style.opacity = "0";
        setTimeout(() => star.remove(), 500);
    });
    stars = []; 
}