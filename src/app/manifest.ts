import type { MetadataRoute } from "next"
import { siteConfig } from "@/config"

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${siteConfig.slogan} - ${siteConfig.name}`,
    short_name: siteConfig.capitalizeName,
    description: siteConfig.description,
    start_url: "/",
    scope: "/",
    display: "standalone",
    display_override: ["standalone", "minimal-ui"],
    orientation: "portrait-primary",
    theme_color: "#000000",
    background_color: "#ffffff",
    categories: ["productivity", "utilities", "web-development"],
    lang: "en",
    dir: "ltr",

    icons: [
      {
        src: "/favicon-16x16.png",
        sizes: "16x16",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/favicon-32x32.png",
        sizes: "32x32",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/android-chrome-512x512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/apple-touch-icon.png",
        sizes: "180x180",
        type: "image/png",
        purpose: "any",
      },
    ],
    screenshots: [
      {
        src: "/og.png",
        sizes: "1200x630",
        type: "image/png",
        form_factor: "wide",
      },
    ],
    shortcuts: [
      {
        name: "Generate Favicon",
        short_name: "Generator",
        description: "Quickly generate a favicon from text",
        url: "/generator",
        icons: [
          {
            src: "/favicon-32x32.png",
            sizes: "32x32",
          },
        ],
      },
      {
        name: "Convert Image",
        short_name: "Converter",
        description: "Convert image to favicon",
        url: "/converter",
        icons: [
          {
            src: "/favicon-32x32.png",
            sizes: "32x32",
          },
        ],
      },
    ],
    related_applications: [],
    prefer_related_applications: false,
  }
}
