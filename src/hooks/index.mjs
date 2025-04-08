var __defProp = Object.defineProperty;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);

// src/resize.ts
var Resize = class {
  constructor(canvas) {
    __publicField(this, "canvas");
    if (!(canvas instanceof HTMLCanvasElement)) {
      throw new TypeError("Parameter must be an HTMLCanvasElement");
    }
    this.canvas = canvas;
  }
  /**
   * Resizes the canvas to target dimensions using optimal downsampling.
   * Uses power-of-2 reductions for better quality before final resize.
   * @param targetWidth - Desired width in pixels
   * @param targetHeight - Desired height in pixels
   * @returns The resized canvas element
   * @throws {RangeError} If dimensions are invalid
   */
  resize(targetWidth, targetHeight) {
    if (!Number.isInteger(targetWidth) || !Number.isInteger(targetHeight)) {
      throw new RangeError("Width and height must be integers");
    }
    if (targetWidth <= 0 || targetHeight <= 0) {
      throw new RangeError("Width and height must be positive");
    }
    if (this.canvas.width === targetWidth && this.canvas.height === targetHeight) {
      return this.canvas;
    }
    let currentCanvas = this.createIntermediateCanvas(
      this.canvas.width,
      this.canvas.height
    );
    this.transferImage(this.canvas, currentCanvas);
    while (currentCanvas.width / 2 >= targetWidth && currentCanvas.height / 2 >= targetHeight) {
      const newWidth = Math.floor(currentCanvas.width / 2);
      const newHeight = Math.floor(currentCanvas.height / 2);
      currentCanvas = this.downscale(currentCanvas, newWidth, newHeight);
    }
    if (currentCanvas.width > targetWidth || currentCanvas.height > targetHeight) {
      currentCanvas = this.downscale(currentCanvas, targetWidth, targetHeight);
    }
    this.canvas = currentCanvas;
    return this.canvas;
  }
  /**
   * Creates an intermediate canvas with specified dimensions
   * @private
   */
  createIntermediateCanvas(width, height) {
    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    return canvas;
  }
  /**
   * Transfers image data between canvases
   * @private
   */
  transferImage(source, target) {
    const context = target.getContext("2d");
    if (!context) {
      throw new Error("Failed to get 2D context");
    }
    context.imageSmoothingEnabled = true;
    context.imageSmoothingQuality = "high";
    context.drawImage(source, 0, 0, target.width, target.height);
  }
  /**
   * Performs a single downscale operation with optimal quality settings
   * @private
   */
  downscale(source, width, height) {
    const target = this.createIntermediateCanvas(width, height);
    this.transferImage(source, target);
    return target;
  }
  /**
   * Getter for the current canvas
   */
  getCanvas() {
    return this.canvas;
  }
};
var resize_default = Resize;

// src/ico.ts
var Ico = class {
  constructor(canvas) {
    __publicField(this, "canvas");
    if (!(canvas instanceof HTMLCanvasElement)) {
      throw new TypeError("Parameter must be an HTMLCanvasElement");
    }
    this.canvas = canvas;
  }
  generate(sizes = [16, 32, 48]) {
    if (!this.validateSizes(sizes)) {
      throw new RangeError("Sizes must be positive integers between 1 and 256");
    }
    const masterCanvas = new resize_default(this.canvas).resize(128, 128);
    const iconDirHeader = this.createIconDirectoryHeader(sizes.length);
    let iconDirEntries = "";
    let bitmapData = "";
    for (let i = 0; i < sizes.length; i++) {
      const size = sizes[i];
      const resizedCanvas = new resize_default(masterCanvas).resize(size, size);
      const bitmapInfoHeader = this.createBitmapInfoHeader(size, size);
      const bitmapImageData = this.createBitmapImageData(resizedCanvas);
      const bitmapSize = bitmapInfoHeader.length + bitmapImageData.length;
      const bitmapOffset = this.calculateBitmapOffset(sizes, i);
      iconDirEntries += this.createIconDirectoryEntry(
        size,
        size,
        bitmapSize,
        bitmapOffset
      );
      bitmapData += bitmapInfoHeader + bitmapImageData;
    }
    const binary = iconDirHeader + iconDirEntries + bitmapData;
    return `data:image/x-icon;base64,${btoa(binary)}`;
  }
  validateSizes(sizes) {
    return sizes.every(
      (size) => Number.isInteger(size) && size > 0 && size <= 256
    );
  }
  calculateBitmapOffset(sizes, entry) {
    let offset = 6 + 16 * sizes.length;
    for (let i = 0; i < entry; i++) {
      const size = sizes[i];
      offset += 40 + 4 * size * size + 2 * size * size / 8;
    }
    return offset;
  }
  createBitmapImageData(canvas) {
    const ctx = canvas.getContext("2d");
    if (!ctx) throw new Error("Failed to get 2D context");
    const { width, height } = canvas;
    const imageData = ctx.getImageData(0, 0, width, height);
    const bitmapBuffer = this.canvasToBitmap(canvas, imageData);
    const maskSize = width * height * 2 / 8;
    const bitmapMask = new Uint8Array(maskSize).fill(0);
    return this.arrayBufferToBinary(bitmapBuffer) + this.arrayBufferToBinary(bitmapMask.buffer);
  }
  canvasToBitmap(canvas, imageData) {
    const { width, height } = canvas;
    const rgbaData8 = imageData.data;
    const bgraData8 = new Uint8ClampedArray(rgbaData8.length);
    for (let i = 0; i < rgbaData8.length; i += 4) {
      bgraData8[i] = rgbaData8[i + 2];
      bgraData8[i + 1] = rgbaData8[i + 1];
      bgraData8[i + 2] = rgbaData8[i];
      bgraData8[i + 3] = rgbaData8[i + 3];
    }
    const bgraData32 = new Uint32Array(bgraData8.buffer);
    const rotatedData32 = new Uint32Array(bgraData32.length);
    for (let i = 0; i < bgraData32.length; i++) {
      const x = i % width;
      const y = Math.floor(i / width);
      const rotatedIndex = (height - 1 - y) * width + x;
      rotatedData32[rotatedIndex] = bgraData32[i];
    }
    return rotatedData32.buffer;
  }
  createIconDirectoryHeader(numImages) {
    const buffer = new ArrayBuffer(6);
    const view = new DataView(buffer);
    view.setUint16(0, 0, true);
    view.setUint16(2, 1, true);
    view.setUint16(4, numImages, true);
    return this.arrayBufferToBinary(buffer);
  }
  createIconDirectoryEntry(width, height, size, offset) {
    const buffer = new ArrayBuffer(16);
    const view = new DataView(buffer);
    view.setUint8(0, width);
    view.setUint8(1, height);
    view.setUint8(2, 0);
    view.setUint8(3, 0);
    view.setUint16(4, 1, true);
    view.setUint16(6, 32, true);
    view.setUint32(8, size, true);
    view.setUint32(12, offset, true);
    return this.arrayBufferToBinary(buffer);
  }
  createBitmapInfoHeader(width, height) {
    const buffer = new ArrayBuffer(40);
    const view = new DataView(buffer);
    view.setUint32(0, 40, true);
    view.setInt32(4, width, true);
    view.setInt32(8, 2 * height, true);
    view.setUint16(12, 1, true);
    view.setUint16(14, 32, true);
    view.setUint32(16, 0, true);
    view.setUint32(20, 0, true);
    return this.arrayBufferToBinary(buffer);
  }
  arrayBufferToBinary(buffer) {
    return String.fromCharCode(...new Uint8Array(buffer));
  }
};
var ico_default = Ico;

// src/png.ts
var Png = class {
  constructor(canvas) {
    __publicField(this, "canvas");
    if (!(canvas instanceof HTMLCanvasElement)) {
      throw new TypeError("Parameter must be an HTMLCanvasElement");
    }
    this.canvas = canvas;
  }
  generate(size, quality = 0.92) {
    if (!Number.isInteger(size) || size <= 0) {
      throw new RangeError("Size must be a positive integer");
    }
    if (quality < 0 || quality > 1) {
      throw new RangeError("Quality must be between 0 and 1");
    }
    const resizedCanvas = new resize_default(this.canvas).resize(size, size);
    return resizedCanvas.toDataURL("image/png", quality);
  }
};
var png_default = Png;

// src/bundle.ts
var Bundle = class {
  constructor(canvas) {
    __publicField(this, "canvas");
    if (!(canvas instanceof HTMLCanvasElement)) {
      throw new TypeError("Parameter must be an HTMLCanvasElement");
    }
    this.canvas = canvas;
  }
  /**
   * Generates a bundle of various image formats and sizes
   * @returns Object containing ICO and PNG data URLs
   */
  generate() {
    const icoGenerator = new ico_default(this.canvas);
    const pngGenerator = new png_default(this.canvas);
    return {
      ico: icoGenerator.generate([16, 32, 48]),
      png16: pngGenerator.generate(16),
      png32: pngGenerator.generate(32),
      png150: pngGenerator.generate(150),
      png180: pngGenerator.generate(180),
      png192: pngGenerator.generate(192),
      png512: pngGenerator.generate(512)
    };
  }
};
var bundle_default = Bundle;

// src/center.ts
var TextIconGenerator = class {
  constructor(canvas) {
    __publicField(this, "canvas");
    __publicField(this, "ctx");
    __publicField(this, "width");
    __publicField(this, "height");
    __publicField(this, "text");
    __publicField(this, "fontColor");
    __publicField(this, "fontFamily");
    __publicField(this, "fontSize");
    __publicField(this, "fontWeight");
    __publicField(this, "fontStyle");
    __publicField(this, "shape");
    __publicField(this, "backgroundColor");
    if (!(canvas instanceof HTMLCanvasElement)) {
      throw new TypeError("Parameter must be an HTMLCanvasElement");
    }
    this.canvas = canvas;
  }
  generate(options = {}) {
    const ctx = this.canvas.getContext("2d");
    if (!ctx) throw new Error("Failed to get 2D context");
    this.ctx = ctx;
    const defaults = {
      width: 128,
      height: 128,
      text: "C",
      fontColor: "white",
      fontFamily: "Helvetica",
      fontSize: 64,
      fontWeight: "400",
      fontStyle: "normal",
      shape: "square",
      backgroundColor: "black"
    };
    const data = __spreadValues(__spreadValues({}, defaults), options);
    this.width = data.width;
    this.height = data.height;
    this.text = data.text;
    this.fontColor = data.fontColor;
    this.fontFamily = data.fontFamily;
    this.fontSize = data.fontSize;
    this.fontWeight = data.fontWeight;
    this.fontStyle = data.fontStyle;
    this.shape = data.shape;
    this.backgroundColor = data.backgroundColor;
    this.canvas.width = 2 * this.width;
    this.canvas.height = 2 * this.height;
    this.canvas.style.width = this.width + "px";
    this.canvas.style.height = this.height + "px";
    this.ctx.scale(2, 2);
    this.drawBackground();
    this.drawText();
    return this.canvas;
  }
  drawBackground() {
    switch (this.shape) {
      case "square":
        this.drawSquare();
        break;
      case "circle":
        this.drawCircle();
        break;
      case "rounded":
        this.drawRounded();
        break;
      default:
        this.drawSquare();
        break;
    }
  }
  drawSquare() {
    this.ctx.beginPath();
    this.ctx.rect(0, 0, this.width, this.height);
    this.ctx.fillStyle = this.backgroundColor;
    this.ctx.fill();
  }
  drawCircle() {
    this.ctx.beginPath();
    this.ctx.arc(
      this.width / 2,
      this.height / 2,
      this.height / 2,
      0,
      2 * Math.PI,
      false
    );
    this.ctx.fillStyle = this.backgroundColor;
    this.ctx.fill();
  }
  drawRounded() {
    this.ctx.beginPath();
    const radius = this.height / 10;
    this.ctx.moveTo(this.width, this.height);
    this.ctx.arcTo(0, this.height, 0, 0, radius);
    this.ctx.arcTo(0, 0, this.width, 0, radius);
    this.ctx.arcTo(this.width, 0, this.width, this.height, radius);
    this.ctx.arcTo(this.width, this.height, 0, this.height, radius);
    this.ctx.fillStyle = this.backgroundColor;
    this.ctx.fill();
  }
  drawText() {
    this.ctx.fillStyle = this.fontColor;
    this.ctx.font = this.fontString();
    this.ctx.textBaseline = "alphabetic";
    this.ctx.textAlign = "center";
    const offsets = this.measureOffsets(this.text, this.fontSize);
    const x = this.width / 2 + offsets.horizontal;
    const y = this.height / 2 + offsets.vertical;
    this.ctx.fillText(this.text, x, y);
  }
  measureOffsets(text, fontSize) {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    if (!ctx) throw new Error("Failed to get 2D context");
    ctx.font = this.fontString();
    canvas.width = 2 * ctx.measureText(text).width;
    canvas.height = 2 * fontSize;
    ctx.font = this.fontString();
    ctx.textBaseline = "alphabetic";
    ctx.textAlign = "center";
    ctx.fillStyle = "white";
    ctx.fillText(text, canvas.width / 2, canvas.height / 2);
    const data = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
    let textTop;
    let textBottom;
    for (let y = 0; y <= canvas.height; y++) {
      for (let x = 0; x <= canvas.width; x++) {
        const r_index = 4 * (canvas.width * y + x);
        const r_value = data[r_index];
        if (r_value === 255) {
          if (!textTop) {
            textTop = y;
          }
          textBottom = y;
          break;
        }
      }
    }
    const canvasHorizontalCenterLine = canvas.height / 2;
    const textHorizontalCenterLine = textTop !== void 0 && textBottom !== void 0 ? (textBottom - textTop) / 2 + textTop : canvasHorizontalCenterLine;
    let textLeft;
    let textRight;
    for (let x = 0; x <= canvas.width; x++) {
      for (let y = 0; y <= canvas.height; y++) {
        const r_index = 4 * (canvas.width * y + x);
        const r_value = data[r_index];
        if (r_value === 255) {
          if (!textLeft) {
            textLeft = x;
          }
          textRight = x;
          break;
        }
      }
    }
    const canvasVerticalCenterLine = canvas.width / 2;
    const textVerticalCenterLine = textLeft !== void 0 && textRight !== void 0 ? (textRight - textLeft) / 2 + textLeft : canvasVerticalCenterLine;
    return {
      vertical: canvasHorizontalCenterLine - textHorizontalCenterLine,
      horizontal: canvasVerticalCenterLine - textVerticalCenterLine
    };
  }
  fontString() {
    return `${this.fontStyle} ${this.fontWeight} ${this.fontSize}px ${this.fontFamily}`;
  }
};
var center_default = TextIconGenerator;

// src/favicon.ts
var FaviconComposer = class {
  constructor(canvas) {
    __publicField(this, "canvas");
    if (!(canvas instanceof HTMLCanvasElement)) {
      throw new TypeError("Parameter must be an HTMLCanvasElement");
    }
    this.canvas = canvas;
  }
  /**
   * Generates a complete bundle of favicon images
   * @returns Bundle containing ICO and various PNG sizes
   */
  bundle() {
    return new bundle_default(this.canvas).generate();
  }
  /**
   * Generates an ICO file with specified sizes
   * @param sizes - Array of sizes in pixels
   * @returns Data URL of ICO image
   */
  ico(sizes = [16, 32, 48]) {
    return new ico_default(this.canvas).generate(sizes);
  }
  /**
   * Generates a PNG image of specified size
   * @param size - Size in pixels (width and height)
   * @returns Data URL of PNG image
   */
  png(size) {
    return new png_default(this.canvas).generate(size);
  }
  /**
   * Resizes the canvas to specified dimensions
   * @param size - Size in pixels (width and height)
   * @returns Resized canvas element
   */
  resize(size) {
    return new resize_default(this.canvas).resize(size, size);
  }
};
var favicon_default = FaviconComposer;
export {
  resize_default as CanvasResize,
  favicon_default as FaviconComposer,
  ico_default as IcoGenerator,
  bundle_default as ImageBundleGenerator,
  png_default as PngGenerator,
  center_default as TextIconGenerator
};
