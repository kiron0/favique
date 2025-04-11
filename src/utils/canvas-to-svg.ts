class CanvasToSVG {
  private canvas: HTMLCanvasElement

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas
    const context = canvas.getContext("2d")
    if (!context) {
      throw new Error("Unable to get 2D rendering context")
    }
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

  toSVGWithFullScreen() {
    const dataURL = this.canvas.toDataURL("image/png")
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg")

    svg.setAttribute("width", "100%")
    svg.setAttribute("height", "100%")

    const aspectRatio = this.canvas.width / this.canvas.height
    const viewBoxWidth = 100
    const viewBoxHeight = 100 / aspectRatio
    svg.setAttribute("viewBox", `0 0 ${viewBoxWidth} ${viewBoxHeight}`)
    svg.setAttribute("preserveAspectRatio", "xMidYMid meet")

    const image = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "image"
    )
    image.setAttribute("href", dataURL)
    image.setAttribute("width", viewBoxWidth.toString())
    image.setAttribute("height", viewBoxHeight.toString())
    image.setAttribute("x", "0")
    image.setAttribute("y", "0")
    image.setAttribute("preserveAspectRatio", "none")

    svg.appendChild(image)

    const serializer = new XMLSerializer()
    return serializer.serializeToString(svg)
  }
}

export default CanvasToSVG
