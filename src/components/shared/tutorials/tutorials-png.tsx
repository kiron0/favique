"use client"

import Link from "next/link"

import { TutorialsBadge } from "@/components/tutorials-badge"

export function TutorialsPng() {
  return (
    <div className="w-full max-w-4xl space-y-4 md:space-y-6">
      <p>
        Use this tutorial if you have a PNG formatted favicon. A PNG formatted
        favicon ends with the .png file extension. If you have a ICO formatted
        favicon use{" "}
        <Link
          href="/tutorials/how-to-add-a-favicon-to-a-website-ico-format"
          className="text-blue-400 hover:underline"
        >
          this tutorial
        </Link>{" "}
        instead.
      </p>
      <h1 className="text-xl font-bold md:text-2xl">
        Step 1: Name Your Favicon
      </h1>
      <p>
        While not required, we recommend that you name your PNG formatted
        favicon <TutorialsBadge>favicon.png</TutorialsBadge>. If you want to use
        a custom name then head to this advanced tutorial.
      </p>
      <h1 className="text-xl font-bold md:text-2xl">
        Step 2: Upload Your Favicon
      </h1>
      <p>
        While not required, we recommend that you upload your favicon to your
        website&apos;s main or root directory. The file should be accessible at
        <TutorialsBadge>yourwebsite.com/favicon.ico</TutorialsBadge>. If you
        want to use a custom location then head to this advanced tutorial.
      </p>
      <h1 className="text-xl font-bold md:text-2xl">
        Step 3: Link to Your Favicon
      </h1>
      <p>
        You will need tell the web browser the location of your favicon. This
        requires placing a <TutorialsBadge>link</TutorialsBadge> tag within the{" "}
        <TutorialsBadge>head</TutorialsBadge> tag of your website. An example of
        the link tag is shown below. You will need to replace the value of the{" "}
        <TutorialsBadge>href</TutorialsBadge> attribute with the location of
        your PNG formatted favicon.{" "}
        <TutorialsBadge>
          {'<link rel="icon" href="http://www.yourwebsite.com/favicon.png">'}
        </TutorialsBadge>
      </p>
      <h1 className="text-xl font-bold md:text-2xl">Step 4: Testing</h1>
      <p>
        Once you&apos;ve uploaded the favicon you should be able to verify that
        installation worked by viewing the favicon in the tab of the browser.
        Bookmark your webpage to validate that the favicon shows up in the
        bookmarks bar as well.
      </p>
      <h1 className="text-xl font-bold md:text-2xl">Step 5: Debugging</h1>
      <h2 className="text-lg font-bold md:text-xl">
        Why isn&apos;t my favicon being displayed?
      </h2>
      <p>
        The most likely scenario is that your favicon is misnamed or was
        installed in the wrong directory. Make sure that your favicon is
        accessible at{" "}
        <TutorialsBadge>yourwebsite.com/favicon.ico</TutorialsBadge>
      </p>
      <h2 className="text-lg font-bold md:text-xl">
        Why isn&apos;t it displaying the latest version?
      </h2>
      <p>
        Web browsers cache the favicon and sometimes display older versions. You
        may need to clear your cache if seems like your favicon is not updating.
        This will force the browser to display the latest version of your
        favicon.
      </p>
    </div>
  )
}
