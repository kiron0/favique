"use client"

import { Hero } from "@/components/hero"

export function Logos() {
  return (
    <div className="space-y-4 pb-2 md:space-y-8">
      <Hero
        title="Logo Generator"
        description="Generate a logo by configuring the settings below. Download your logo in a variety of layouts and formats."
      />
      <div className="flex h-screen flex-col items-center justify-center text-center">
        <h1 className="mb-4 text-3xl font-bold">Logo Generator</h1>
        <p className="mb-4 text-lg">
          Generate a logo by configuring the settings below. Download your logo
          in a variety of layouts and formats.
        </p>
        <div className="flex flex-col items-center justify-center space-y-4">
          <p>Logo generation form goes here.</p>
        </div>
      </div>
    </div>
  )
}
