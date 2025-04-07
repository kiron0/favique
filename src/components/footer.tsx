"use client"

import { menuItems } from "@/utils"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { notifyError, notifySuccess } from "@/components/toast"

export function Footer() {
  const { logo } = menuItems

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const formData = new FormData(e.currentTarget)
    const email = formData.get("email") as string

    if (!email) {
      return notifyError({
        title: "Email required",
        description: "Please enter your email address",
      })
    }

    const isValidEmail = /\S+@\S+\.\S+/.test(email)
    if (!isValidEmail) {
      return notifyError({
        title: "Invalid email",
        description: "Please enter a valid email address",
      })
    }

    notifySuccess({
      title: "Subscribed",
      description: `You have successfully subscribed with ${email}`,
    })

    e.currentTarget.reset()
  }

  return (
    <footer className="space-y-10 pt-16 pb-10 md:pt-20">
      <div className="border-input/50 border-b" />
      <div className="mx-auto flex w-full max-w-7xl flex-col items-start justify-between gap-10 px-4 text-center lg:flex-row lg:text-left xl:px-0">
        <div className="flex w-full shrink flex-col items-center justify-between gap-6 lg:max-w-96 lg:items-start">
          <div className="flex items-center gap-2 lg:justify-start">
            <img
              src={logo.src}
              alt={logo.alt}
              title={logo.title}
              className="h-8"
            />
            <h2 className="text-xl font-semibold">{logo.title}</h2>
          </div>
          <p className="text-muted-foreground text-sm">{logo.description}</p>
        </div>
        <div className="mx-auto w-full space-y-2 sm:w-fit lg:mx-0">
          <div className="text-base font-semibold">Stay up to date</div>
          <form
            onSubmit={handleSubmit}
            className="flex w-full flex-col justify-center gap-2 sm:flex-row"
          >
            <label htmlFor="email" className="sr-only">
              Email
            </label>
            <Input
              id="email"
              name="email"
              placeholder="Enter your email"
              className="lg:min-w-72"
            />
            <Button type="submit">Subscribe</Button>
          </form>
        </div>
      </div>
      <div className="mx-auto w-full max-w-7xl space-y-2 px-4 text-center lg:px-0">
        <h2 className="text-lg font-semibold">Built with</h2>
        <div className="text-muted-foreground text-sm">
          {logo.title} is built with{" "}
          <a
            href="https://nextjs.org/"
            target="_blank"
            rel="noreferrer noopener"
            className="text-primary underline hover:no-underline"
          >
            Next.js
          </a>{" "}
          and{" "}
          <a
            href="https://ui.shadcn.com/"
            target="_blank"
            rel="noreferrer noopener"
            className="text-primary underline hover:no-underline"
          >
            shadcn/ui
          </a>{" "}
          using{" "}
          <a
            href="https://www.radix-ui.com/"
            target="_blank"
            rel="noreferrer noopener"
            className="text-primary underline hover:no-underline"
          >
            Radix UI
          </a>{" "}
          components.
        </div>
      </div>
      <div className="text-muted-foreground mx-auto flex w-full max-w-7xl flex-col-reverse justify-between gap-4 px-4 text-center text-sm font-medium md:flex-col lg:flex-row lg:items-center lg:text-left xl:px-0">
        <p>
          &copy; {new Date().getFullYear()} {logo.title}. All rights reserved.
        </p>
        <ul className="flex justify-center gap-4 lg:justify-start">
          <li className="text-primary underline hover:no-underline">
            <a href="#"> Terms and Conditions</a>
          </li>
          <span className="text-muted-foreground">|</span>
          <li className="text-primary underline hover:no-underline">
            <a href="#"> Privacy Policy</a>
          </li>
        </ul>
      </div>
    </footer>
  )
}
