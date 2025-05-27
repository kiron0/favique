"use client"

import { siteConfig } from "@/config"

import { Banner } from "@/components/banner"

export function PrivacyPolicy() {
  return (
    <div className="space-y-4 pb-2 md:space-y-6 lg:space-y-8">
      <Banner
        title="Privacy Policy"
        description="This privacy policy outlines how we handle your data and privacy when using our website."
      />
      <div className="mx-auto w-full max-w-7xl space-y-20">
        <div className="mx-4 flex-col space-y-12 xl:mx-0">
          <div className="w-full max-w-4xl space-y-4 md:space-y-6">
            <h1 className="text-xl font-bold md:text-2xl">Summary</h1>
            <ul className="list-disc space-y-2 pl-6">
              <li>We do not collect any personal information.</li>
              <li>We use 3rd party services which use cookies.</li>
              <li>
                We use 3rd party services which collect website usage data.
              </li>
              <li>We use 3rd party services which display ads.</li>
            </ul>
            <h1 className="text-xl font-bold md:text-2xl">
              3rd Party Services
            </h1>
            <ul className="list-disc space-y-2 pl-6">
              <li>Google Tag Manager</li>
              <li>Google Analytics</li>
              <li>Google Adsense</li>
              <li>Vercel</li>
            </ul>
            <h1 className="text-xl font-bold md:text-2xl">Website Visitors</h1>
            <p>
              Like most website operators, Favicon.io collects
              non-personally-identifying information of the sort that web
              browsers and servers typically make available, such as the browser
              type, language preference, referring site, and the date and time
              of each visitor request. {siteConfig.name}&apos;s purpose in
              collecting non-personally identifying information is to better
              understand how
              {siteConfig.name}&apos;s visitors use its website. From time to
              time, Favicon.io may release non-personally-identifying
              information in the aggregate, e.g., by publishing a report on
              trends in the usage of its website.
            </p>
            <h1 className="text-xl font-bold md:text-2xl">
              Aggregated Statistics
            </h1>
            <p>
              {siteConfig.name} may collect statistics about the behavior of
              visitors to its website. For instance, Favicon.io may monitor the
              most popular pages on favicon.io. Favicon.io may display this
              information publicly or provide it to others. However, Favicon.io
              does not disclose personally-identifying information.
            </p>
            <h1 className="text-xl font-bold md:text-2xl">Cookies</h1>
            <p>
              A cookie is a string of information that a website stores on a
              visitor&apos;s computer, and that the visitor&apos;s browser
              provides to the website each time the visitor returns. Favicon.io
              uses cookies to help Favicon.io identify and track visitors, their
              usage of Favicon.io website, and their website access preferences.
              Favicon.io visitors who do not wish to have cookies placed on
              their computers should set their browsers to refuse cookies before
              using {siteConfig.name}&apos;s website, with the drawback that
              certain features of {siteConfig.name}&apos;s websites may not
              function properly without the aid of cookies.
            </p>
            <h1 className="text-xl font-bold md:text-2xl">Ads</h1>
            <p>
              Ads appearing on any of our websites may be delivered to users by
              advertising partners, who may set cookies. These cookies allow the
              ad server to recognize your computer each time they send you an
              online advertisement to compile information about you or others
              who use your computer. This information allows ad networks to,
              among other things, deliver targeted advertisements that they
              believe will be of most interest to you. This Privacy Policy
              covers the use of cookies by Favicon.io and does not cover the use
              of cookies by any advertisers.
            </p>
            <h1 className="text-xl font-bold md:text-2xl">
              Privacy Policy Changes
            </h1>
            <p>
              Although most changes are likely to be minor, Favicon.io may
              change its Privacy Policy from time to time, and in{" "}
              {siteConfig.name}&apos;s sole discretion. Favicon.io encourages
              visitors to frequently check this page for any changes to its
              Privacy Policy. Your continued use of this site after any change
              in this Privacy Policy will constitute your acceptance of such
              change.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
