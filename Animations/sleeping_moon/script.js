function toggleFullscreen() {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen().catch(err => {
            console.warn("Fullscreen request denied", err);
        });
    } else {
        document.exitFullscreen();
    }
}

document.addEventListener("keydown", (event) => {
    if (event.key.toLowerCase() === "f") {
        toggleFullscreen();
    }
});

let lastTap = 0;
document.addEventListener("touchend", (event) => {
    let currentTime = new Date().getTime();
    let tapLength = currentTime - lastTap;
    if (tapLength < 300 && tapLength > 0) { // Double-tap detected
        toggleFullscreen();
    }
    lastTap = currentTime;
});

const starContainer = document.querySelector('.stars');
for (let i = 0; i < 100; i++) {
    let star = document.createElement('div');
    star.className = 'star';
    star.style.top = Math.random() * 100 + 'vh';
    star.style.left = Math.random() * 100 + 'vw';
    star.style.animationDelay = Math.random() * 2 + 's';
    starContainer.appendChild(star);
}