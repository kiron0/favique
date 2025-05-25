"use client"

import * as React from "react"
import { siteConfig } from "@/config"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Logo } from "@/components/logo"
import { notifyError, notifySuccess } from "@/components/toast"

export function Footer() {
  const [email, setEmail] = React.useState<string>("")

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

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

    setEmail("")
  }

  return (
    <footer className="bg-secondary mt-16 space-y-10 pb-10 md:mt-20">
      <div className="border-b" />
      <div className="mx-auto flex w-full max-w-7xl flex-col items-start justify-between gap-10 px-4 text-center lg:flex-row lg:text-left xl:px-0">
        <div className="flex w-full shrink flex-col items-center justify-between gap-6 lg:max-w-96 lg:items-start">
          <Logo className="lg:justify-start" />
          <p className="text-muted-foreground text-sm">{siteConfig.slogan}</p>
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
              placeholder="Enter your email"
              className="min-w-72"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Button type="submit" disabled={!email}>
              Subscribe
            </Button>
          </form>
        </div>
      </div>
      <div className="mx-auto w-full max-w-7xl space-y-2 px-4 text-center lg:px-0">
        <h2 className="text-lg font-semibold">Built with</h2>
        <div className="text-muted-foreground text-sm">
          {siteConfig.name} is built with{" "}
          <a
            href="https://www.npmjs.com/package/favium"
            target="_blank"
            rel="noreferrer noopener"
            className="text-primary underline hover:no-underline"
          >
            favium
          </a>
        </div>
      </div>
      <div className="text-muted-foreground mx-auto flex w-full max-w-7xl flex-col-reverse justify-between gap-4 px-4 text-center text-sm font-medium md:flex-col lg:flex-row lg:items-center lg:text-left xl:px-0">
        <p>
          &copy; {new Date().getFullYear()} {siteConfig.name}. All rights
          reserved.
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
