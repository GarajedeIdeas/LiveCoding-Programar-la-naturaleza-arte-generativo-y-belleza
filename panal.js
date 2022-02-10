// Dani Vicario - panal experiment (canvas)- Wed Feb 9 18:39:17 CET 2022

// eslint-disable-next-line no-unused-vars
const globalCompositeOperationModes = {
  "normal": "source-over",
  "source-in": "source-in",
  "source-out": "source-out",
  "source-atop": "source-atop",
  "destination-over": "destination-over",
  "destination-in": "destination-in",
  "destination-out": "destination-out",
  "destination-atop": "destination-atop",
  "lighter": "lighter",
  "copy": "copy",
  "xor": "xor",
  "multiply": "multiply",
  "screen": "screen",
  "overlay": "overlay",
  "darken": "darken",
  "lighten": "lighten",
  "color-dodge": "color-dodge",
  "color-burn": "color-burn",
  "hard-light": "hard-light",
  "soft-light": "soft-light",
  "difference": "difference",
  "exclusion": "exclusion",
  "hue": "hue",
  "saturation": "saturation",
  "color": "color",
  "luminosity": "luminosity"
};

function randomFloat(min, max) {
  return Math.random() * (max - min) + min;
}
function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}

// eslint-disable-next-line func-names
CanvasRenderingContext2D.prototype.rotateImageFromCenter = function (
  imageCanvas,
  angleInDegrees,
  placeImageInX,
  placeImageInY,
  width,
  height
) {
  this.save();

  if (width === undefined && height === undefined) {
    this.translate(placeImageInX, placeImageInY);
    this.rotate((angleInDegrees * Math.PI) / 180);
    this.drawImage(imageCanvas, -imageCanvas.width / 2, -imageCanvas.height / 2);
  } else {
    this.translate(placeImageInX, placeImageInY);
    this.rotate((angleInDegrees * Math.PI) / 180);
    this.drawImage(imageCanvas, -width / 2, -height / 2, width, height);
  }

  this.restore();
};

// eslint-disable-next-line no-unused-vars
Math.randomFloat = (min, max) => Math.random() * (max - min) + min;
// eslint-disable-next-line no-unused-vars
Math.randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);
// eslint-disable-next-line no-unused-vars
Math.shuffle = (array, _) => array.sort(() => Math.random() - 0.5);

// eslint-disable-next-line no-unused-vars
function getGlobalCompositeOperationMode() {
  const keys = Object.keys(globalCompositeOperationModes);
  let mode = 0;
  let consoleDone = false;

  // eslint-disable-next-line arrow-parens
  window.onkeydown = (e) => {
    if (e.keyCode === 39) {
      mode++;
      consoleDone = false;

      if (mode === keys.length) mode = 0;
    }

    if (e.keyCode === 37) {
      mode--;
      consoleDone = false;

      if (mode < 0) mode = keys.length - 1;
    }
  };

  // eslint-disable-next-line no-func-assign
  getGlobalCompositeOperationMode = () => {
    const modeFinal = globalCompositeOperationModes[keys[mode]];

    if (!consoleDone) {
      // eslint-disable-next-line no-console
      console.log("exposure mode to", modeFinal);

      consoleDone = true;
    }

    return modeFinal;
  };

  return getGlobalCompositeOperationMode;
}

// eslint-disable-next-line func-names
CanvasRenderingContext2D.prototype.rotateImageFromCenter = function (
  imageCanvas,
  angleInDegrees,
  placeImageInX,
  placeImageInY,
  width,
  height
) {
  this.save();

  if (width === undefined && height === undefined) {
    this.translate(placeImageInX, placeImageInY);
    this.rotate((angleInDegrees * Math.PI) / 180);
    this.drawImage(imageCanvas, -imageCanvas.width / 2, -imageCanvas.height / 2);
  } else {
    this.translate(placeImageInX, placeImageInY);
    this.rotate((angleInDegrees * Math.PI) / 180);
    this.drawImage(imageCanvas, -width / 2, -height / 2, width, height);
  }

  this.restore();
};

/** @type HTMLCanvasElement */
const canvasDOMEl = document.getElementById("canvas");

/** @type CanvasRenderingContext2D */
const ctx = canvasDOMEl.getContext("2d");

const w = window.innerWidth;
const h = window.innerHeight;
// eslint-disable-next-line no-unused-vars
const w2 = w / 2;
// eslint-disable-next-line no-unused-vars
const h2 = h / 2;

// eslint-disable-next-line no-unused-vars
const { PI } = Math;
// eslint-disable-next-line no-unused-vars
const PI_DOUBLE = 2 * Math.PI;
// eslint-disable-next-line no-unused-vars
const PI_HALF = Math.PI / 2;

canvasDOMEl.setAttribute("height", window.innerHeight);
canvasDOMEl.setAttribute("width", window.innerWidth);

ctx.save();

function drawPolygon(width, l) {
  // ctx.beginPath();
  // ctx.arc(w2, h2, 300, 0, 2 * Math.PI);
  // ctx.stroke();
  // ctx.closePath();

  const positions = [];

  for (let iteration = 1; iteration <= l; iteration++) {
    const angle = 360 / l;

    positions.push({
      x: width * Math.cos((angle * iteration * Math.PI) / 180),
      y: width * Math.sin((angle * iteration * Math.PI) / 180)
    });
  }

  ctx.lineWidth = 5;
  ctx.fillStyle = `rgba(${randomInt(100, 255)}, ${randomInt(100, 255)}, ${randomInt(100, 255)}, 1)`;
  ctx.beginPath();
  ctx.moveTo(positions[0].x, positions[0].y);
  for (let i = 1; i <= positions.length - 1; i++) {
    ctx.lineTo(positions[i].x, positions[i].y);
  }
  ctx.lineTo(positions[0].x, positions[0].y);
  ctx.stroke();
  ctx.fill();
  ctx.closePath();
}

function panal() {
  for (let posY = 0; posY < 20; posY++) {
    for (let posX = 0; posX < 20; posX++) {
      ctx.save();

      if (posY % 2) {
        ctx.translate(posX * 200, posY * 175);
      } else {
        ctx.translate(posX * 200 + 100, posY * 175);
      }

      drawPolygon(randomInt(100, 100), 4);
      ctx.restore();
    }
  }
}

panal();
