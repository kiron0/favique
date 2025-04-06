export async function generateIco(pngBlobs: Blob[]): Promise<Blob> {
  const headerSize = 6
  const entrySize = 16
  const header = new Uint8Array(headerSize)
  header.set([0, 0, 1, 0])
  const entries: Uint8Array[] = []
  const imageData: Uint8Array[] = []

  let offset = headerSize + entrySize * pngBlobs.length

  for (const blob of pngBlobs) {
    const buffer = await blob.arrayBuffer()
    const data = new Uint8Array(buffer)

    const width = blob.type === "image/png" ? 32 : 16
    const height = width
    const entry = new Uint8Array(entrySize)
    entry.set([width & 0xff, height & 0xff, 0, 0, 1, 0, 32, 0])
    entry.set(new Uint8Array(new Uint32Array([data.length]).buffer), 8)
    entry.set(new Uint8Array(new Uint32Array([offset]).buffer), 12)

    entries.push(entry)
    imageData.push(data)
    offset += data.length
  }

  header.set(new Uint8Array(new Uint16Array([pngBlobs.length]).buffer), 4)

  const totalSize =
    headerSize +
    entrySize * entries.length +
    imageData.reduce((sum, d) => sum + d.length, 0)
  const icoBuffer = new Uint8Array(totalSize)
  let currentOffset = 0

  icoBuffer.set(header, currentOffset)
  currentOffset += headerSize

  for (const entry of entries) {
    icoBuffer.set(entry, currentOffset)
    currentOffset += entrySize
  }

  for (const data of imageData) {
    icoBuffer.set(data, currentOffset)
    currentOffset += data.length
  }

  return new Blob([icoBuffer], { type: "image/x-icon" })
}
