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