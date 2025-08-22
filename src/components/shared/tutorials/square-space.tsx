"use client"

import Link from "next/link"
import { siteConfig } from "@/config"

import { CustomImage } from "@/components/custom-image"

export function SquareSpace() {
  return (
    <div className="w-full max-w-4xl space-y-4 md:space-y-6">
      <h1 className="text-xl font-bold md:text-2xl">Installation</h1>
      <p>
        So you&apos;ve created a new SquareSpace site and you&apos;re stuck with
        the dreaded default browser icon instead of a proper favicon. In this
        guide I&apos;ll show you how to add a custom favicon image to your
        SquareSpace website.
      </p>
      <CustomImage
        src="/assets/tutorials/tutorials-6.png"
        placeholder="blur"
        blurDataURL="/assets/tutorials/tutorials-6.png"
        alt="Favicon examples"
        className="w-full rounded-md border"
        width={1920}
        height={1080}
      />
      <h1 className="text-xl font-bold md:text-2xl">
        Step 1: Prepare your Favicon
      </h1>
      <p>
        This guide assumes you already have a favicon image also known as a
        browser icon. If you don&apos;t have one, head over to the{" "}
        <Link href="/generator" className="text-blue-400 hover:underline">
          favicon generator
        </Link>{" "}
        or{" "}
        <Link href="/converter" className="text-blue-400 hover:underline">
          favicon converter
        </Link>{" "}
        before continuing. For this guide any square image in PNG or ICO format
        will work. If you used one of the {siteConfig.name} favicon generators
        then we recommend using the android-chrome-512x512.png file. Below is
        the custom favicon we&apos;ve chosen for our SquareSpace website.
      </p>
      <CustomImage
        src="/assets/tutorials/tutorials-7.png"
        placeholder="blur"
        blurDataURL="/assets/tutorials/tutorials-7.png"
        alt="Favicon examples"
        className="w-full max-w-xs rounded-md border"
        width={1920}
        height={1080}
      />
      <h1 className="text-xl font-bold md:text-2xl">
        Note: Limitations with SquareSpace
      </h1>
      <p>
        SquareSpace has limitations with adding custom favicons. SquareSpace
        allows for only one image to be uploaded. This means that you can&apos;t
        have multiple sizes or favicon variations for specific browsers. Due to
        these limitations {siteConfig.name} recommends using a large, square
        image, in PNG format.
      </p>
      <h1 className="text-xl font-bold md:text-2xl">
        Step 2: Navigate to the Design Section
      </h1>
      <p>
        While signed into your SquareSpace editor click on the
        &quot;Design&quot; link on the left hand side navigation.
      </p>
      <CustomImage
        src="/assets/tutorials/tutorials-8.png"
        placeholder="blur"
        blurDataURL="/assets/tutorials/tutorials-8.png"
        alt="Favicon examples"
        className="w-full rounded-md border"
        width={1920}
        height={1080}
      />
      <h1 className="text-xl font-bold md:text-2xl">
        Step 3: Navigate to the Browser Icon Section
      </h1>
      <p>
        Next, in the Design section, click on &quot;Browser Icon&quot; on the
        left hand side navigation.
      </p>
      <CustomImage
        src="/assets/tutorials/tutorials-9.png"
        placeholder="blur"
        blurDataURL="/assets/tutorials/tutorials-9.png"
        alt="Favicon examples"
        className="w-full rounded-md border"
        width={1920}
        height={1080}
      />
      <h1 className="text-xl font-bold md:text-2xl">
        Step 4: Upload your Favicon Image
      </h1>
      <p>
        On the browser icon page you&apos;ll see a section to upload your
        favicon image. It may take a moment for SquareSpace to upload and
        process the favicon. Once complete you should see a preview of your
        favicon on the page. SquareSpace has an editor which allows you to tweak
        the colors and contrast of your favicon. Once you&apos;re satisfied,
        click the save button.
      </p>
      <CustomImage
        src="/assets/tutorials/tutorials-10.png"
        placeholder="blur"
        blurDataURL="/assets/tutorials/tutorials-10.png"
        alt="Favicon examples"
        className="w-full rounded-md border"
        width={1920}
        height={1080}
      />
      <h1 className="text-xl font-bold md:text-2xl">
        Step 5: Preview your Browser Icon
      </h1>
      <p>
        Open up an incognito window and navigate to your SquareSpace website. If
        everything was successful you should see the browser icon updated in the
        tab.
      </p>
      <CustomImage
        src="/assets/tutorials/tutorials-11.png"
        placeholder="blur"
        blurDataURL="/assets/tutorials/tutorials-11.png"
        alt="Favicon examples"
        className="w-full rounded-md border"
        width={1920}
        height={1080}
      />
    </div>
  )
}
