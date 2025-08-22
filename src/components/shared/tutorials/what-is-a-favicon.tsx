"use client"

import { CustomImage } from "@/components/custom-image"

const images = [
  "/assets/tutorials/tutorials-1.png",
  "/assets/tutorials/tutorials-2.png",
  "/assets/tutorials/tutorials-3.png",
]

export function WhatIsAFavicon() {
  return (
    <div className="w-full max-w-4xl space-y-4 md:space-y-6">
      <h1 className="text-xl font-bold md:text-2xl">What is a favicon?</h1>
      <p>
        A favicon is a small icon or collection of icons associated with a
        website, web page, or web application. It&apos;s displayed within the
        browser tabs and bookmarks bar. The examples below show the favicons for
        Google, Reddit, and SquareSpace within the browser tab.
      </p>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {images.map((image, index) => (
          <CustomImage
            key={index}
            src={image}
            placeholder="blur"
            blurDataURL={image}
            alt="Favicon examples"
            className="w-full rounded-md border"
            width={1920}
            height={1080}
          />
        ))}
      </div>
      <p>
        Below are some favicons from a handful of popular websites displayed
        within the Chrome bookmarks bar.
      </p>
      <CustomImage
        src="/assets/tutorials/tutorials-4.png"
        placeholder="blur"
        blurDataURL="/assets/tutorials/tutorials-4.png"
        alt="Favicon examples"
        className="w-full rounded-md border"
        width={1920}
        height={1080}
      />
      <h1 className="text-xl font-bold md:text-2xl">
        What is a favicon used for?
      </h1>
      <p>
        A favicon is used to help users visually identify websites, web pages,
        and web applications more easily within browser tabs, bookmarks,
        shortcuts, and address bars more easily. It&apos;s important to have a
        favicon for your website for brand recognition so that your users can
        easily identify your site in their browser tabs and bookmarks.
      </p>
      <p>
        SquareSpace uses its logo as its favicon to stay consistent with the
        company&apos;s brand.
      </p>
      <CustomImage
        src="/assets/tutorials/tutorials-5.png"
        placeholder="blur"
        blurDataURL="/assets/tutorials/tutorials-5.png"
        alt="Favicon examples"
        className="w-full rounded-md border"
        width={1920}
        height={1080}
      />
      <h1 className="text-xl font-bold md:text-2xl">
        What are alternative names for favicon?
      </h1>
      <p>
        Some alternative names for favicon are browser icon, favorite icon,
        shortcut icon, tab icon, URL icon, and bookmark icon. The word favicon
        is short for &quot;favorite icon&quot; and originates from Internet
        Explorer&apos;s &quot;Favorites&quot; feature which most modern browsers
        call &quot;bookmarks”.
      </p>
      <h1 className="text-xl font-bold md:text-2xl">
        What are common favicon file formats?
      </h1>
      <h2 className="text-lg font-bold md:text-xl">ICO - favicon.ico</h2>
      <p>
        The most common favicon formats are ICO, PNG, and SVG, but there are
        additional formats for specific browsers or devices. The ICO file format
        was developed by Microsoft and is the original file format for the
        favicon. The format is unique because it allows for multiple small
        images within the same file. This is advantageous because the small
        icons required for a favicon in ICO format (16x16, 32x32, and 48x48
        pixels) can be scaled and optimized independently. At small dimensions
        you can&apos;t rely on the browser to automatically resize your icon in
        an optimal way. The ICO format is supported by all browsers and
        it&apos;s the only format that IE5 through IE10 supports.
      </p>
      <h2 className="text-lg font-bold md:text-xl">PNG - favicon.png</h2>
      <p>
        The PNG format is a nice format because it&apos;s a format that most
        people are used to and doesn&apos;t require any special tools to create.
        With modern screens being high resolution the original problem of small
        icon dimensions for small resolutions no longer exists. For browsers
        that support the PNG favicon format oftentimes the quality of the
        favicon displayed within the browser tab or bookmarks bar will be higher
        than the ICO format. The disadvantage of the PNG format is that
        it&apos;s not compatible with IE5 through IE10.
      </p>
      <h2 className="text-lg font-bold md:text-xl">SVG - favicon.svg</h2>
      <p>
        The SVG format has benefits over the PNG and ICO formats, but
        doesn&apos;t have great browser support yet. SVG files are very
        lightweight and they are infinitely scalable. This means that image
        quality is superb without sacrificing load times for heavy images. Only
        Chrome, Firefox, and Opera support SVG format favicons.
      </p>
      <h1 className="text-xl font-bold md:text-2xl">
        What are common favicon sizes?
      </h1>
      <p>It’s important to note that your favicon needs to be square. </p>
      <p>
        For ICO format the recommended sizes are 16x16, 32x32, and 48x48 pixels.
      </p>
      <p>
        For PNG format the recommended sizes are 16x16 and 32x32, but browsers
        will accept any square PNG image.
      </p>
      <h1 className="text-xl font-bold md:text-2xl">
        Do favicons affect search engine optimization or SEO?
      </h1>
      <p>
        The presence of a favicon can indirectly affect SEO. Some search
        engines, such as DuckDuckGo, display the favicon within the search
        results. An eye-catching favicon can help increase click through rates
        (CTR) on these search engines. Additionally a favicon is a must for
        building brand recognition and brand trust. A missing favicon can cause
        users to lose trust in the website and increase bounce rates.
      </p>
    </div>
  )
}
