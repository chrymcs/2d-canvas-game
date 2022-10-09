const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
const CANVAS_WIDTH = canvas.width = 800;
const CANVAS_HEIGTH = canvas.height = 700;

const GAMESPEED = 10;
const ImageLayer1 = new Image();
const ImageLayer2 = new Image();
const ImageLayer3 = new Image();
const ImageLayer4 = new Image();
const ImageLayer5 = new Image();
ImageLayer1.src = 'assets\\layer1.png';
ImageLayer2.src = 'assets\\layer2.png';
ImageLayer3.src = 'assets\\layer3.png';
ImageLayer4.src = 'assets\\layer4.png';
ImageLayer5.src = 'assets\\layer5.png';
const layerConfig = {
    x: 0,
    y: 0,
    width:2400,
    height: 700,
    x2:2400,
    maxImageWidth:2400
}

const drawImageLayer = ({x, x2, speedModifier, maxImageWidth, width, height, image, y}) => {
    ctx.drawImage(image, x, y, width, height);
    ctx.drawImage(image, x2, y, width, height);

    return {
        image,height,width,y,speedModifier, maxImageWidth,x,x2
    }
}

const updateImageLayer = ({x, x2, speedModifier, maxImageWidth, width, height, image, y}) => {
    const speed = GAMESPEED * speedModifier;
    if (x < -maxImageWidth) {
        x = maxImageWidth + x2 - speed;
    }
    if (x2 < -maxImageWidth) {
        x2 = maxImageWidth + x - speed;
    }
    return {
        image,height,width,y,speedModifier, maxImageWidth,
        x:Math.floor(x - speed),
        x2:Math.floor(x2 - speed)
    }
}

const baseGameObjects = [{image:ImageLayer1,speedModifier:0.2}, {image:ImageLayer2,speedModifier:0.2}, {image:ImageLayer3,speedModifier:0.2}, {image:ImageLayer4,speedModifier:0.3}, {image:ImageLayer5,speedModifier:0.5}]
let enchancedGameObjects = baseGameObjects.map(baseGameObject => ({...baseGameObject, ...layerConfig}))

function animate(enchancedGameObjects) {
    ctx.clearRect(0,0,CANVAS_WIDTH,CANVAS_HEIGTH)

    let newenchancedGameObject = enchancedGameObjects.map(enchancedGameObject => drawImageLayer(updateImageLayer(enchancedGameObject)));
    requestAnimationFrame(() => animate(newenchancedGameObject));
};
animate(enchancedGameObjects);