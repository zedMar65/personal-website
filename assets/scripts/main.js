const scug_path = "img/scug-spritesheet.png"

class Scug {
    constructor(scug_sheet) {
        this.scug_sheet = scug_sheet;
        this.speed = 2;
        this.frameWidth = 32;
        this.frameHeight = 32;
        this.framesPerRow = 4;
        this.currentFrame = 0;
        this.row = 0;
        this.interval = null;

        this.scug = document.createElement('canvas');
        this.scug.style.width = `${this.frameWidth}px`;
        this.scug.style.height = `${this.frameHeight}px`;
        this.scug.style.backgroundImage = `url('${this.scug_sheet}')`;
        this.scug.style.backgroundRepeat = 'no-repeat';
        this.scug.style.backgroundSize = `${this.frameWidth * this.framesPerRow}px ${this.frameHeight * 6}px`;
        this.scug.style.transform = 'scale(2)';
        this.scug.style.transformOrigin = 'top left';
        this.scug.style.imageRendering = 'pixelated';
        this.scug.style.position = 'fixed';
        this.scug.style.top = '0px';
        this.scug.style.left = '0px';

        document.body.appendChild(this.scug);

    }
    update(target){
        const x = parseInt(this.scug.style.left.slice(0, this.scug.style.left.length-2))
        const y = parseInt(this.scug.style.top.slice(0, this.scug.style.top.length-2))
        var direction = [0, 0];
        if( Math.round(target[0]/10) > Math.round(x/10)){
            this.scug.style.left = (this.speed+x)+"px";
            direction[0] = 1;
        }else if(Math.round(target[0]/10) < Math.round(x/10)){
            this.scug.style.left = (-this.speed+x)+"px";
            direction[0] = -1;
        }
    }
    playAnimation(row, { loop = true, reverse = false, once = false } = {}) {
        if (this.interval) {
            clearInterval(this.interval);
        }

        this.row = row;
        this.currentFrame = reverse ? this.framesPerRow - 1 : 0;

        this.interval = setInterval(() => {
            const x = -this.currentFrame * this.frameWidth;
            const y = -this.row * this.frameHeight;
            this.scug.style.backgroundPosition = `${x}px ${y}px`;

            if (once) {
                if ((!reverse && this.currentFrame >= this.framesPerRow - 1) ||
                    (reverse && this.currentFrame <= 0)) {
                    clearInterval(this.interval);
                    return;
                }
            }

            this.currentFrame = reverse
                ? this.currentFrame - 1
                : (this.currentFrame + 1) % this.framesPerRow;

            if (!loop && !once && this.currentFrame === 0) {
                clearInterval(this.interval);
            }
        }, 100);
    }

    setFlipped(flipped) {
    if (flipped) {
        this.scug.style.transform = 'scale(-2, 2)';
        this.scug.style.transformOrigin = 'top right'; // Flip around right edge
    } else {
        this.scug.style.transform = 'scale(2, 2)';
        this.scug.style.transformOrigin = 'top left';
    }
}
    anim_bottom()         { this.setFlipped(false); this.playAnimation(0); }
    anim_left()           { this.setFlipped(false); this.playAnimation(1); }
    anim_right()          { this.setFlipped(true);  this.playAnimation(1); }

    anim_top()            { this.setFlipped(false); this.playAnimation(2); }

    anim_bottom_left()    { this.setFlipped(false); this.playAnimation(3); }
    anim_bottom_right()   { this.setFlipped(true);  this.playAnimation(3); }

    anim_top_left()       { this.setFlipped(false); this.playAnimation(4); }
    anim_top_right()      { this.setFlipped(true);  this.playAnimation(4); }

    anim_lay()            { this.setFlipped(false); this.playAnimation(5, { once: true }); }
    anim_standup()        { this.setFlipped(false); this.playAnimation(5, { once: true, reverse: true }); }

}


var mouseY; 
var mouseX; 
var scug = new Scug(scug_path);
scug.anim_left();

document.addEventListener('mousemove', function(event) {
    mouseX = event.clientX;
    mouseY = event.clientY;
});


function gameLoop(timestamp) {
    scug.update([mouseX, mouseY]);
    requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);