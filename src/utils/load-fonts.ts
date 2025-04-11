interface FontLoaderOptions {
  families: string[]
  timeout?: number
}

export async function loadFonts(options: FontLoaderOptions): Promise<boolean> {
  const WebFont = (await import("webfontloader")).default

  return new Promise<boolean>((resolve) => {
    WebFont.load({
      google: { families: options.families },
      active: () => resolve(true),
      inactive: () => {
        console.error(`Font loading failed for: ${options.families.join(", ")}`)
        resolve(false)
      },
      timeout: options.timeout || 2000,
    })
  })
}
