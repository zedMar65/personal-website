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
    message = 
        "c\\> Hey, I'm a <b style='color: #00ff00;'>self-taught software developer</b> and <b style='color: #00ff00;'>cybersecurity enthusiast</b> with a passion for building <span style='color: #ffcc00;'>secure</span> and <span style='color: #ffcc00;'>efficient</span> applications.\n"+
        "c\\> With over <b style='color: #00ffff;'>two years</b> of experience freelancing on Fiverr, I've worked on a variety of projects, ranging from <span style='color: #ff6600;'>custom software solutions</span> to <span style='color: #ff6600;'>full-stack web development</span>.\n"+
        "c\\> My expertise lies in <b style='color: #ff3333;'>low-level programming</b>, <b style='color: #ff3333;'>system security</b>, and <b style='color: #ff3333;'>reverse engineering</b>, giving me a deep understanding of how things work under the hood.\n"+
        "c\\> <b style='color: #ff00ff;'>Constantly driven by curiosity and a passion for discovering new technologies.</b>";
    break;

    case 1:
        message = 
            "c\\> Programming Languages: C++, Python, Assembly\n" +
            "c\\> Cybersecurity Expertise: Reverse Engineering, Malware Analysis, Network Security\n" +
            "c\\> Software Development: Desktop Applications, Web Development, Scripting & Automation\n" +
            "c\\> Low-Level & System Knowledge: Machine Code, Internet Infrastructure, OS Internals\n" +
            "c\\> Freelancing Experience: Custom software solutions, Full-stack websites, Security consulting";
        break;
            case 2:
                message = 
        "c\\> CanSat Main Python Code for Competition 2023: " +
        "<a href='https://github.com/AntonLiutvinas/SpaceY' style='color: #00ff00;' target='_blank'>SpaceY</a>\n" +
        "c\\> Code and Work for 2024: " +
        "<a href='https://github.com/zedMar65/Cansat-Astrorum' style='color: #00ff00;' target='_blank'>Cansat-Astrorum</a>\n" +
        "c\\> Python Blackjack Simulation and Machine Learning Library: " +
        "<a href='https://github.com/zedMar65/Poker-sim-for-training-SOLID' style='color: #00ff00;' target='_blank'>Poker-sim-for-training-SOLID</a>\n" +
        "c\\> Reengineered LAN Protocols for Better Security: " +
        "<a href='https://github.com/zedMar65/Reengineered-Lan' style='color: #00ff00;' target='_blank'>Reengineered-Lan</a>\n" +
        "c\\> Other Private Works for Freelance Clients";
                break;
            case 3:
                message = "c\\> curl -L <div class='breakable'>https://zedmar65.github.io/Portfolio/resume.sh</div> | bash" +
                        "\nc\\> This operation will download the resume, <a href='https://github.com/zedMar65/personal-website/raw/master/assets/Resume.pdf' style='color: #00ff00;' target='_blank'>continue</a>";

                break;
                case 4:
                    message = 
                        "c\\> Contact me through the following:\n" +
                        "c\\> Email: " +
                        "<a href='https://mail.google.com/mail/?view=cm&fs=1&to=marius.jedinkus@gmail.com' style='color: #00ff00;' target='_blank'>marius.jedinkus@gmail.com</a>\n" +
                        "c\\> Phone: " +
                        "<a href='tel:+37064024968' style='color: #00ff00;' target='_blank'>+37064024968</a>\n" +
                        "c\\> GitHub: " +
                        "<a href='https://github.com/zedMar65' style='color: #00ff00;' target='_blank'>zedMar65</a>";
                    break;
                

                
            default:
                message = 'Unknown option selected';
        }

        typeText(message);
    }, time);
}

function typeText(text) {
    let paragraph = document.querySelector('.choice p');
    paragraph.innerHTML = ""; // Clear previous text
    paragraph.style.opacity = '1';

    let i = 0;
    let speed = 1; // Adjust typing speed
    let currentTypingSession = ++typingAbort; // Track latest function call

    function typeNextLetter() {
        if (currentTypingSession !== typingAbort) return;

        let tempText = text.slice(0, i)
            .replace(/\n/g, "<br>") // Convert newlines to <br>
            .replace(/(c\\>)/g, "<span style='color: #00ff00;'>$1</span>"); // Optional: Color the CMD prompt

        paragraph.innerHTML = tempText;

        if (i < text.length) {
            i++;
            setTimeout(typeNextLetter, speed);
        }
    }

    typeNextLetter(); // Start typing
}
