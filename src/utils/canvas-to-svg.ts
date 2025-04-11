class CanvasToSVG {
  private canvas: HTMLCanvasElement
  private context: CanvasRenderingContext2D

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas
    const context = canvas.getContext("2d")
    if (!context) {
      throw new Error("Unable to get 2D rendering context")
    }
    this.context = context
  }

  toSVG() {
    const dpr = window.devicePixelRatio || 1
    const canvasWidth = this.canvas.width
    const canvasHeight = this.canvas.height
    const svgWidth = canvasWidth / dpr
    const svgHeight = canvasHeight / dpr
    const dataURL = this.canvas.toDataURL("image/png", 1.0)

    const svg =
      `<svg width="${svgWidth}" height="${svgHeight}" viewBox="0 0 ${svgWidth} ${svgHeight}" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" preserveAspectRatio="xMidYMid meet">
    <image xlink:href="${dataURL}" href="${dataURL}" width="${svgWidth}" height="${svgHeight}" x="0" y="0" preserveAspectRatio="xMidYMid meet" /></svg>`.trim()

    return svg
  }
}

export default CanvasToSVG
