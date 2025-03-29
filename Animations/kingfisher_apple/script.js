/* script.js */
const apple = document.getElementById("apple");
const kingfisher = document.getElementById("kingfisher");
let lastX = 0;
let isDragging = false;

// Initial position of the apple
apple.style.left = "50vw";
apple.style.top = "50vh";

apple.addEventListener("mousedown", (e) => {
    isDragging = true;
    moveApple(e); // Move instantly on click
    document.addEventListener("mousemove", moveApple);
});

document.addEventListener("mouseup", () => {
    isDragging = false;
    document.removeEventListener("mousemove", moveApple);
});

function moveApple(e) {
    apple.style.left = `${e.clientX - 25}px`;
    apple.style.top = `${e.clientY - 25}px`;
    
    setTimeout(() => {
        const birdX = e.clientX - 200; // Maintain horizontal distance from the apple
        const birdY = e.clientY - 100; // Move the bird slightly below the apple
        kingfisher.style.transition = "transform 1.2s ease-out"; // Slow down movement
        
        // Flip the bird based on movement direction
        if (Math.abs(e.clientX - lastX) > 5) { 
            if (e.clientX > lastX) {
                kingfisher.style.transform = `translate(${birdX}px, ${birdY}px) scaleX(1)`; // Face right
            } else {
                kingfisher.style.transform = `translate(${birdX - 10}px, ${birdY}px) scaleX(-1)`; // Face left and move slightly behind
            }
        } else {
            kingfisher.style.transform = `translate(${birdX}px, ${birdY}px)`; // Keep current direction
        }
        lastX = e.clientX;
    }, 100);
}
