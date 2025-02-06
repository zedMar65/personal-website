function mouse_spark(event) {
    const titleElement = event.target;
    const rect = titleElement.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const spark = document.createElement('div');
    spark.className = 'spark';
    document.body.appendChild(spark);

    spark.style.left = `${rect.left + x - 5}px`;
    spark.style.top = `${rect.top + y - 5}px`;
    spark.style.position = 'absolute';

    setTimeout(() => {
        spark.remove();
    }, 1000);
}

function mouse_spark2(event) {
    const titleElement = event.target;
    const rect = titleElement.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const spark = document.createElement('div');
    spark.className = 'red-spark';
    document.body.appendChild(spark);

    spark.style.left = `${rect.left + x - 5}px`;
    spark.style.top = `${rect.top + y - 5}px`;
    spark.style.position = 'absolute';

    setTimeout(() => {
        spark.remove();
    }, 1000);
}

let targetX = 50, targetY = 35;
let currentX = 50, currentY = 35;
const lerpFactor = 0.01;

document.addEventListener("mousemove", (event) => {
    const { innerWidth: w, innerHeight: h } = window;
    const x = (event.clientX / w) * 2 - 1;
    const y = (event.clientY / h) * 2 - 1;

    targetX = 50 - x * 15;
    targetY = 35 - y * 15;
});

function animateGradient() {
    const bg = document.querySelector(".background");

    currentX += (targetX - currentX) * lerpFactor;
    currentY += (targetY - currentY) * lerpFactor;

    bg.style.background = `radial-gradient(circle at ${currentX}% ${currentY}%, 
    rgb(241, 114, 142) 10%,  
    rgb(160, 51, 75) 30%, 
    rgb(148, 30, 56) 100%)`;

    requestAnimationFrame(animateGradient);
}

animateGradient();

const shinyObject = document.querySelector('.shiny-object');

function triggerShine() {
    const shine = shinyObject.querySelector('.shine');
    shine.style.top = '-200%';
    shine.style.left = '-200%';

    shine.style.animation = 'none';
    void shine.offsetWidth;
    shine.style.animation = 'shine-animation 3s ease-in-out';

    const nextShine = Math.random() * (6000 - 2000) + 2000;
    setTimeout(triggerShine, nextShine);
}

triggerShine();

function flipCartridge() {
    document.querySelector('.cartridge-container').classList.toggle('flipped');
}
