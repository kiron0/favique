### Favique - a favicon generator
# Favique - Favicon Generator

Favique is a modern favicon generator that allows you to create a complete favicon pack for your website with a single click. Built with [favium](https://www.npmjs.com/package/favium), Next.js, and Tailwind CSS, Favique makes it easy for web developers and designers to generate, customize, and download favicons in all the required formats.

## Features

- **Image to Favicon**: Upload your own image or logo and convert it to a favicon pack.
- **Text to Favicon**: Generate a favicon from custom text, with options for fonts, colors, and shapes.
- **Emoji Favicons**: Choose from hundreds of emojis to create a unique favicon.
- **Logo Generator**: Create a simple logo-based favicon with customizable text and colors.
- **One-click Download**: Download all favicon files and the web manifest in a single ZIP file.
- **Easy Installation**: Get ready-to-use HTML snippets and instructions for adding favicons to your website.
- **Modern UI**: Built with React, Next.js, and Radix UI for a fast and accessible experience.

## Usage

- **Image Converter**: Go to `/converter` to upload an image and generate favicons.
- **Text Generator**: Go to `/generator` to create a favicon from text.
- **Emoji Generator**: Go to `/emoji` to pick an emoji and generate a favicon.
- **Logo Generator**: Go to `/logos` to create a logo-based favicon.
- **Tutorials**: Visit `/tutorials` for guides on favicon usage and installation.

### Adding Favicons to Your Website

1. Download your favicon pack from Favique.
2. Place the files in the root directory of your website.
3. Add the following tags to the `<head>` of your HTML:

   ```html
   <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
   <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
   <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
   <link rel="manifest" href="/site.webmanifest" />
   ```

## Author
- **Toufiq Hasan Kiron**
  [Portfolio](https://kiron.dev) | [Twitter](https://twitter.com/hashtagkiron)

## License

This project is licensed under the MIT License.
