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
    event.preventDefault(); // Prevent default touch behavior
    let currentTime = new Date().getTime();
    let tapLength = currentTime - lastTap;
    if (tapLength < 300 && tapLength > 0) {
        toggleFullscreen();
    }
    lastTap = currentTime;
});

// Prevent any touchmove events that could cause scrolling
document.addEventListener('touchmove', function(event) {
    event.preventDefault();
}, { passive: false });

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
    
    // Adjust size for mobile
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    if (isMobile) {
        size = size * 0.7; // Scale down for mobile
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

// Adjust intervals based on screen size
function getInterval() {
    return window.innerWidth < 768 ? 300 : 180;
}

setInterval(() => createFallingItem("cherry blossom"), getInterval());
setInterval(() => createFallingItem("petal"), getInterval() / 2);

// Handle resize
window.addEventListener('resize', function() {
    clearInterval(flowerInterval);
    clearInterval(petalInterval);
    flowerInterval = setInterval(() => createFallingItem("cherry blossom"), getInterval());
    petalInterval = setInterval(() => createFallingItem("petal"), getInterval() / 2);
});

let flowerInterval = setInterval(() => createFallingItem("cherry blossom"), getInterval());
let petalInterval = setInterval(() => createFallingItem("petal"), getInterval() / 2);