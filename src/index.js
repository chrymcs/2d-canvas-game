const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
const CANVAS_WIDTH = canvas.width = 800;
const CANVAS_HEIGTH = canvas.height = 700;

let gamespeed = 10;
const Layer1 = new Image();
const Layer2 = new Image();
const Layer3 = new Image();
const Layer4 = new Image();
const Layer5 = new Image();
Layer1.src = 'assets\\layer1.png';
Layer2.src = 'assets\\layer2.png';
Layer3.src = 'assets\\layer3.png';
Layer4.src = 'assets\\layer4.png';
Layer5.src = 'assets\\layer5.png';

class Layer {
    constructor(image, speedModifier) {
        this.x = 0;
        this.y = 0;
        this.width = 2400;
        this.height = 700;
        this.x2 = 2400;
        this.image = image;
        this.speedModifier = speedModifier;
        this.speed = gamespeed * this.speedModifier;
    }
    update() {
        this.speed = gamespeed * this.speedModifier;
        if (this.x < -2400) {
            this.x = 2400 + this.x2 - this.speed;
        }
        if (this.x2 < -2400) {
            this.x2 = 2400 + this.x - this.speed;
        }
        this.x = Math.floor(this.x - this.speed);
        this.x2 = Math.floor(this.x2 - this.speed);
    }
    draw() {
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
        ctx.drawImage(this.image, this.x2, this.y, this.width, this.height);
    }
}

const layer1 = new Layer(Layer1, 0.2);
const layer2 = new Layer(Layer2, 0.2);
const layer3 = new Layer(Layer3, 0.2);
const layer4 = new Layer(Layer4, 0.3);
const layer5 = new Layer(Layer5, 0.5);

const gameObjects = [layer1,layer2,layer3,layer4,layer5];

function animate() {
    ctx.clearRect(0,0,CANVAS_WIDTH,CANVAS_HEIGTH)
    gameObjects.forEach(object => {
        object.update();
        object.draw();
    });
    requestAnimationFrame(animate);
};
animate();