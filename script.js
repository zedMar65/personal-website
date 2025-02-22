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

var doShine = true;

function triggerShine() {
    if (!doShine) {
        return;
    }
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


document.querySelector(".cartridge-img").addEventListener("click", function (event) {
    if (this.classList.contains("clicked")) return; // Prevent repeat clicks
    this.classList.add("clicked");

    transition(event);
});

function transition(event) {
    doShine = false;
    const cartridgeImg = document.querySelector(".cartridge-img img");
    const cartridgeContainer = document.querySelector(".cartridge-img");

    // Capture current position before removing hover effect
    const computedStyle = window.getComputedStyle(cartridgeContainer);
    const currentTransform = computedStyle.transform;

    // Apply inline transform to freeze position
    cartridgeContainer.style.transform = currentTransform;

    // Disable hover effect
    cartridgeContainer.classList.add("disabled");

    // Disable interaction
    cartridgeImg.style.pointerEvents = 'none';

    // Reset animation
    cartridgeImg.style.animation = 'none';
    void cartridgeImg.offsetWidth; // Force reflow

    setTimeout(() => {}, 100);

    // Add spin animation
    cartridgeImg.style.animation = 'spin 1s ease-in-out';

    // Create explosion at mouse position
    createExplosionAura(event.clientX, event.clientY);

    // Wait for spin animation to finish, then change image
    setTimeout(() => {
        cartridgeImg.src = "assets/cartridge-back.png";
        cartridgeImg.style.transform += ' rotateY(0deg)';
    }, 500);

    setTimeout(() => {
        // cartridgeImg.style.transform = 'scaleX(-1)';
        cartridgeImg.style.animation = 'moveDown 1s ease-in-out';
        const scrollToElement = document.querySelector('.scroll-to');
        const elementTop = scrollToElement.getBoundingClientRect().top + window.scrollY;
        window.scrollTo({
            top: elementTop,
            behavior: 'smooth'
        });
    }, 1000);
    setTimeout(() => {
        cartridgeImg.style.top = '70vh';
    }, 2000);
    setTimeout(() => {
        transitionEffect()
    }, 2500);
    
}

function createExplosionAura(x, y) {
    const aura = document.createElement("div");
    aura.classList.add("explosion-aura");

    // Position the aura at the mouse coordinates
    aura.style.left = `${x - 75}px`; // Centering the explosion (half of 150px width)
    aura.style.top = `${y - 75}px`;

    document.body.appendChild(aura);

    // Remove aura after animation ends
    setTimeout(() => {
        aura.remove();
    }, 800);
}


const grid = document.getElementById("grid");
    const rows = 20;
    const cols = 20;
    let blocks = [];

    function updateGridPosition() {
        grid.style.top = "0px"; // Keep it in viewport
    }

    window.addEventListener("scroll", updateGridPosition);
    updateGridPosition(); // Set initial position

    // Create blocks
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            let block = document.createElement("div");
            block.classList.add("block");
            grid.appendChild(block);
            blocks.push({ el: block, x: c, y: r });
        }
    }

    function transitionEffect(callback) {
        let delay = 0;
        blocks.sort((a, b) => (a.x + a.y) - (b.x + b.y)); // Sort diagonally

        // Fade in (black blocks covering screen)
        blocks.forEach((block, index) => {
            setTimeout(() => {
                block.el.style.opacity = "1";
            }, delay);
            delay += 3; // Faster transition
        });

        setTimeout(() => {
            callback && callback(); // Call when fully black
        }, delay + 300);
        
        // Fade out (revealing new screen)
        setTimeout(() => {
            document.body.style.overflow = 'hidden';
            // document.querySelector('.screen').style.backgroundColor = 'rgb(198, 236, 256)';
            const screen = document.querySelector('.screen');
            screen.style.display = 'block';
            const scrollToElement = document.querySelector('.scroll-to');
            const elementTop = scrollToElement.getBoundingClientRect().top + window.scrollY;
            document.querySelector('.screen').style.top = `${elementTop}px`;
            document.querySelector('.screen').style.zIndex = '10';
            window.scrollTo({
                top: elementTop,
                behavior: 'auto'
            });

            window.addEventListener('scroll', () => {
                if (window.scrollY !== elementTop) {
                    window.scrollTo({
                        top: elementTop,
                        behavior: 'auto'
                    });
                }
            });
            delay = 0;
            blocks.forEach((block, index) => {
                setTimeout(() => {
                    block.el.style.opacity = "0";
                }, delay);
                delay += 3;
            });
        }, delay + 700);
        
    }
    const options = document.querySelectorAll('.option');
    let selectedIndex = -1; // No option is selected initially
    
    function updateSelected(newIndex) {
        // Remove 'hovered' class from all options
        options.forEach(opt => opt.classList.remove('hovered'));
    
        // Set new index and apply 'hovered' class
        selectedIndex = newIndex;
        options[selectedIndex].classList.add('hovered');
    }
    
    // Handle mouse hover
    options.forEach((option, index) => {
        option.addEventListener('mouseenter', () => {
            updateSelected(index);
        });
    });
    
    // Handle keyboard navigation
    document.addEventListener('keydown', (event) => {
        if (event.key === 'ArrowDown') {
            // Move down
            if (selectedIndex < options.length - 1) {
                updateSelected(selectedIndex + 1);
            } else {
                updateSelected(0); // Loop back to first option
            }
        } else if (event.key === 'ArrowUp') {
            // Move up
            if (selectedIndex > 0) {
                updateSelected(selectedIndex - 1);
            } else {
                updateSelected(options.length - 1); // Loop back to last option
            }
        } else if (event.key === 'Enter' && selectedIndex !== -1) {
            // Trigger the select function
            select(selectedIndex);
        }
    });
    

function exit() {
    // prompt("Are you sure you want to exit?");
    let really = confirm("Really?");
    if (really) {
        window.close();
    }
}


var selected = false;
var typingAbort = 0; // Flag to track typing instances

function select(index) {
    var time = 0;
    if (!selected) {
        selected = true;
        document.querySelector('.choice').style.display = 'block';
        document.querySelector('.choice').style.opacity = '1';
        setTimeout(() => {
            document.querySelector('.choice').classList.add('show');
        }, 10);
        time = 1000;
    }
    setTimeout(() => {
        let message;
        switch (index) {
            case 0:
                message = 'Option 1 selected';
                break;
            case 1:
                message = 'Option 2 selected';
                break;
            case 2:
                message = 'Option 3 selected';
                break;
            case 3:
                message = 'Option 4 selected';
                break;
            case 4:
                message = 'Option 5 selected';
                break;
            default:
                message = 'Unknown option selected';
        }

        typeText(message);
    }, time);
}

function typeText(text) {
    let paragraph = document.querySelector('.choice p');
    paragraph.textContent = ""; // Clear the text initially
    paragraph.style.opacity = '1';

    let i = 0;
    let speed = 50; // Adjust typing speed (milliseconds per letter)
    let currentTypingSession = ++typingAbort; // Update flag to track the latest function call

    function typeNextLetter() {
        // If typingAbort has changed, stop this function (another selection was made)
        if (currentTypingSession !== typingAbort) return;

        if (i < text.length) {
            paragraph.textContent += text.charAt(i);
            i++;
            setTimeout(typeNextLetter, speed);
        }
    }

    typeNextLetter(); // Start typing
}
