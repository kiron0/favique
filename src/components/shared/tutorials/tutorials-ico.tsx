"use client"

import Link from "next/link"

import { TutorialsBadge } from "@/components/tutorials-badge"

export function TutorialsIco() {
  return (
    <div className="w-full max-w-4xl space-y-4 md:space-y-6">
      <p>
        Use this tutorial if you have an ICO formatted favicon. An ICO formatted
        favicon ends with the .ico file extension. If you have a PNG formatted
        favicon use{" "}
        <Link
          href="/tutorials/how-to-add-a-favicon-to-a-website-png-format"
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
        Make sure that your favicon is named{" "}
        <TutorialsBadge>favicon.ico</TutorialsBadge>. The naming of the file is
        important because web browsers automatically look for a file with that
        specific name. If you need to use a custom name then head to this
        advanced tutorial.
      </p>
      <h1 className="text-xl font-bold md:text-2xl">
        Step 2: Upload Your Favicon
      </h1>
      <p>
        Upload your favicon to your website&apos;s main or root directory. The
        file should be accessible at{" "}
        <TutorialsBadge>yourwebsite.com/favicon.ico</TutorialsBadge>. The
        location of the file is important because web browsers will
        automatically look for a file named{" "}
        <TutorialsBadge>favicon.ico</TutorialsBadge> in that specific location.
        If you need to use a custom location then head to this advanced
        tutorial.
      </p>
      <h1 className="text-xl font-bold md:text-2xl">Step 3: Testing</h1>
      <p>
        Once you&apos;ve uploaded the favicon you should be able to verify that
        installation worked by viewing the favicon in the tab of the browser.
        Bookmark your webpage to validate that the favicon shows up in the
        bookmarks bar as well.
      </p>
      <h1 className="text-xl font-bold md:text-2xl">Step 4: Debugging</h1>
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
