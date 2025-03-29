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

function createFallingItem(type) {
    const item = document.createElement("div");
    item.classList.add("falling-item");
    document.body.appendChild(item);
    
    const startPos = Math.random() * window.innerWidth;
    const duration = Math.random() * 5 + 3;
    
    let size, imageUrl;
    
    if (type === "cherry blossom") {
        size = Math.random() * 50 + 50;
        imageUrl = 'cherry_blossom.png';
    } else {
        size = Math.random() * 35 + 35;
        imageUrl = 'petals.png';
    }
    
    item.style.left = `${startPos}px`;
    item.style.width = `${size}px`;
    item.style.height = `${size}px`;
    item.style.backgroundImage = `url(${imageUrl})`;
    
    item.animate(
        [
            { transform: `translateY(-10vh) rotate(${Math.random() * 720}deg)`, opacity: 1 },
            { transform: `translateY(50vh) rotate(${Math.random() * 720}deg)`, opacity: 1 },
            { transform: `translateY(120vh) rotate(${Math.random() * 720}deg)`, opacity: 1 }
        ],
        {
            duration: duration * 1000,
            easing: "linear",
            iterations: 1
        }
    ).onfinish = () => item.remove();
}

setInterval(() => createFallingItem("cherry blossom"), 180);
setInterval(() => createFallingItem("petal"), 80);