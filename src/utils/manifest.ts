interface ManifestProps {
  name?: string
  short_name?: string
}

export const generateManifest = ({ name, short_name }: ManifestProps = {}) => {
  return {
    ...manifest,
    name: name || "",
    short_name: short_name || "",
  }
}

const manifest = {
  name: "",
  short_name: "",
  icons: [
    {
      src: "/android-chrome-192x192.png",
      sizes: "192x192",
      type: "image/png",
    },
    {
      src: "/android-chrome-512x512.png",
      sizes: "512x512",
      type: "image/png",
    },
  ],
  theme_color: "#ffffff",
  background_color: "#ffffff",
  display: "standalone",
}
