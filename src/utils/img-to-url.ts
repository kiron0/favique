export const imgToFile = async (url: string) => {
  if (!url) return null

  const response = await fetch(url, { mode: "cors" })
  if (!response.ok) return
  const blob = await response.blob()
  const img = new File([blob], "emoji.png", { type: blob.type })

  return img
}
