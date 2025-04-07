"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Hero } from "@/components/hero"

export function Generator() {
  return (
    <div className="space-y-4 md:space-y-8">
      <Hero
        title="Favicon Generator / Generate from Text"
        description="Quickly generate your favicon from text by selecting the text, fonts, and colors. Download your favicon in the most up to date formats."
      />
      <div className="mx-auto w-full max-w-7xl">
        <div className="mx-3 flex-col space-y-8 xl:mx-0">
          <Card className="w-full rounded-md border-none">
            <CardHeader>
              <CardTitle className="text-xl font-bold md:text-2xl">
                Generate From Text
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <h2>Hi</h2>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
