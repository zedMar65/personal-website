class Scug {
    constructor(scug_sheet) {
        this.scug_sheet = scug_sheet;
        this.speed = 0.3;
        this.dividence = 100;
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
        // this.scug.style.transform = 'scale(1)';
        this.scug.style.transformOrigin = 'top left';
        this.scug.style.imageRendering = 'pixelated';
        this.scug.style.position = 'fixed';
        this.scug.style.top = '0px';
        this.scug.style.left = '0px';

        document.body.appendChild(this.scug);

        this.lay_flag = false;
        this.last_playing = -1;

    }
    update(target){
        const x = parseInt(this.scug.style.left.slice(0, this.scug.style.left.length-2))
        const y = parseInt(this.scug.style.top.slice(0, this.scug.style.top.length-2))
        const dividence = this.dividence;
        var direction = [0, 0];
        if( Math.round(target[0]/dividence) > Math.round((x+dividence/2)/dividence)){
            this.scug.style.left = (screenWidth/100*this.speed+x)+"px";
            direction[1] = 1;
        }else if(Math.round(target[0]/dividence) < Math.round((x+dividence/2)/dividence)){
            this.scug.style.left = (-screenWidth/100*this.speed+x)+"px";
            direction[1] = -1;
        }
        if( Math.round(target[1]/dividence) > Math.round((y+dividence/2)/dividence)){
            this.scug.style.top = (screenHeight/100*this.speed+y)+"px";
            direction[0] = 1;
        }else if(Math.round(target[1]/dividence) < Math.round((y+dividence/2)/dividence)){
            this.scug.style.top = (-screenHeight/100*this.speed+y)+"px";
            direction[0] = -1;
        }

        if(this.lay_flag && (direction[0]!=0 || direction[1] != 0)){
            this.lay_flag = false;
        }else if(this.lay_flag){
            return;
        }
        switch(direction[0]){
            case 1:
                switch(direction[1]){
                    case 1:
                        this.anim_bottom_right();
                        break;
                    case -1:
                        this.anim_bottom_left();
                        break;
                    case 0:
                        this.anim_bottom();
                        break;
                }
                break;
            case -1:
                switch(direction[1]){
                    case 1:
                        this.anim_top_right();
                        break;
                    case -1:
                        this.anim_top_left();
                        break;
                    case 0:
                        this.anim_top();
                        break;
                }
                break;
            case 0:
                switch(direction[1]){
                    case 1:
                        this.anim_right();
                        break;
                    case -1:
                        this.anim_left();
                        break;
                    case 0:
                        this.lay_flag = true;
                        this.anim_lay();
                        // this.stopAnimation();
                        break;
                } 
                break;
        }
    }
    stopAnimation(){
        clearInterval(this.interval);
        this.interval = null;
        const x = 0;
        const y = -this.row * this.frameHeight;
        this.scug.style.backgroundPosition = `${x}px ${y}px`;
    }
    playAnimation(row, reverse = false) {
        if(this.last_playing == row){
            return;
        }
        console.log("replay")
        this.last_playing = row;
        this.stopAnimation();
        this.row = row;
        this.currentFrame = 0;
        this.interval = setInterval( () => {
            const x = -this.currentFrame * this.frameWidth;
            const y = -this.row * this.frameHeight;
            this.scug.style.backgroundPosition = `${x}px ${y}px`;

            this.currentFrame = reverse
                ? this.currentFrame - 1
                : (this.currentFrame + 1) % this.framesPerRow;
            
            if(this.currentFrame == 3){
                this.last_playing = -1;
                clearInterval(this.interval)
            }
        }, 100);
        return;
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

    anim_lay()            { this.setFlipped(false); this.playAnimation(5); }

}

// scug that follows mouse position:

var screenWidth = window.screen.width;
var screenHeight = window.screen.height;
var mouseY; 
var mouseX; 
const scug_path = "img/scug-spritesheet.png"
var scug = new Scug(scug_path);

function init(){
    document.addEventListener('mousemove', function(event) {
        mouseX = event.clientX;
        mouseY = event.clientY;
    });
}


function gameLoop(timestamp) {
    scug.update([mouseX, mouseY]);
    requestAnimationFrame(gameLoop);
}


init();
requestAnimationFrame(gameLoop);