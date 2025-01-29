function mouse_spark(event) {
    // Get the position of the <h2> element relative to the document
    const titleElement = event.target;  // This refers to the clicked <h2>
    const rect = titleElement.getBoundingClientRect();  // Get its bounding box
    
    // Calculate mouse position relative to the <h2> element
    const x = event.clientX - rect.left;  // Mouse x relative to the <h2>
    const y = event.clientY - rect.top;   // Mouse y relative to the <h2>

    // Create the spark
    const spark = document.createElement('div');
    spark.className = 'spark';
    document.body.appendChild(spark);

    // Set the spark position to the mouse position relative to the <h2>
    spark.style.left = `${rect.left + x - 5}px`;  // Adjust for center positioning
    spark.style.top = `${rect.top + y - 5}px`;    // Adjust for center positioning
    spark.style.position = 'absolute';             // Ensure positioning relative to the body

    // Remove the spark after 1 second (when animation ends)
    setTimeout(() => {
        spark.remove();
    }, 1000);  // Match the animation duration
}

function mouse_spark2(event) {
    // Get the position of the <h2> element relative to the document
    const titleElement = event.target;  // This refers to the clicked <h2>
    const rect = titleElement.getBoundingClientRect();  // Get its bounding box
    
    // Calculate mouse position relative to the <h2> element
    const x = event.clientX - rect.left;  // Mouse x relative to the <h2>
    const y = event.clientY - rect.top;   // Mouse y relative to the <h2>

    // Create the spark
    const spark = document.createElement('div');
    spark.className = 'red-spark';
    document.body.appendChild(spark);

    // Set the spark position to the mouse position relative to the <h2>
    spark.style.left = `${rect.left + x - 5}px`;  // Adjust for center positioning
    spark.style.top = `${rect.top + y - 5}px`;    // Adjust for center positioning
    spark.style.position = 'absolute';             // Ensure positioning relative to the body

    // Remove the spark after 1 second (when animation ends)
    setTimeout(() => {
        spark.remove();
    }, 1000);  // Match the animation duration
}

let targetX = 50, targetY = 50; // Target gradient position
let currentX = 50, currentY = 50; // Current animated position
const lerpFactor = 0.01; // Slow transition for smooth movement

document.addEventListener("mousemove", (event) => {
    const { innerWidth: w, innerHeight: h } = window;

    // Normalize mouse position (-1 to 1)
    const x = (event.clientX / w) * 2 - 1;
    const y = (event.clientY / h) * 2 - 1;

    // Move gradient in the opposite direction, with more noticeable shift
    targetX = 50 - x * 15;
    targetY = 50 - y * 15;
});

function animateGradient() {
    const bg = document.querySelector(".background");

    // Smoothly interpolate (lerp) towards the target position
    currentX += (targetX - currentX) * lerpFactor;
    currentY += (targetY - currentY) * lerpFactor;

    // Apply the updated, stronger gradient
    bg.style.background = `radial-gradient(circle at ${currentX}% ${currentY}%, 
rgb(241, 114, 142) 20%,  
rgb(209, 78, 106) 40%, 
rgb(194, 46, 78) 100% )`;

    // Continue the animation loop
    requestAnimationFrame(animateGradient);
}

// Start the animation loop
animateGradient();



const shinyObject = document.querySelector('.shiny-object');

function triggerShine() {
  const shine = shinyObject.querySelector('.shine');
  
  // Ensure the shine starts off-screen
  shine.style.top = '-200%';
  shine.style.left = '-200%';
  
  // Reset and trigger the animation
  shine.style.animation = 'none'; // Stop the current animation
  void shine.offsetWidth; // Trigger reflow
  shine.style.animation = 'shine-animation 3s ease-in-out'; // Restart animation

  // Randomize next shine effect timing (between 2 to 6 seconds)
  const nextShine = Math.random() * (6000 - 2000) + 2000; // Random time between 2000ms and 6000ms
  setTimeout(triggerShine, nextShine);
}

// Start the first shine effect
triggerShine();
