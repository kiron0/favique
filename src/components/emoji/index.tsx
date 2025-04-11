"use client"

import * as React from "react"
import { Emoji as EmojiProps } from "emojibase"
import emojis from "emojibase-data/en/data.json"
import data from "emojibase-data/en/messages.json"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Banner } from "@/components/banner"

import { EmojiCard } from "./emoji-card"
import { EmojiFavicon } from "./emoji-favicon"

export function Emoji() {
  const groupFilters = React.useMemo(
    () =>
      data.groups.map(({ message, order, ...rest }) => ({
        label: message,
        val: order.toString(),
        ...rest,
      })),
    []
  )

  const [selectedGroup, setSelectedGroup] = React.useState<string>(
    groupFilters[0].val
  )

  const filteredEmojis = React.useMemo(() => {
    return emojis.filter((emoji) => {
      const group = emoji.group?.toString()
      return group === selectedGroup
    }) as EmojiProps[]
  }, [emojis, selectedGroup])

  return (
    <div className="space-y-4 pb-2 md:space-y-6 lg:space-y-8">
      <Banner
        title="Favicon Generator / Generate from Emoji"
        description="Choose from hundreds of emojis to create your favicon. Emoji images from the emoji-picker-react."
      />
      <div className="mx-auto w-full max-w-7xl">
        <div className="mx-4 flex-col space-y-8 xl:mx-0">
          <div className="space-y-6">
            <h2 className="text-xl leading-none font-bold md:text-2xl">
              Emoji Favicons
            </h2>
            <p className="text-muted-foreground text-sm md:text-base">
              The emoji graphics are from the open source project{" "}
              <a
                href="https://twemoji.twitter.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="underline underline-offset-4"
              >
                Twemoji
              </a>
              . The graphics are copyright 2020 Twitter, Inc and other
              contributors. The graphics are licensed under{" "}
              <a
                href="https://creativecommons.org/licenses/by/4.0/"
                target="_blank"
                rel="noopener noreferrer"
                className="underline underline-offset-4"
              >
                CC-BY 4.0
              </a>
              . You should review the license before usage in your project.
            </p>
          </div>
          <div className="space-y-2">
            <Label>Category</Label>
            <Select
              onValueChange={setSelectedGroup}
              defaultValue={selectedGroup}
            >
              <SelectTrigger className="w-full capitalize md:w-md">
                <SelectValue placeholder="Select an emoji group" className="" />
              </SelectTrigger>
              <SelectContent>
                {groupFilters.map((group) => (
                  <SelectItem
                    key={group.key}
                    value={group.val}
                    className="capitalize"
                  >
                    {group.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          {filteredEmojis.length > 0 ? (
            <div className="flex flex-wrap items-center gap-3">
              {filteredEmojis.map((emoji) => (
                <Dialog key={emoji.emoji}>
                  <DialogTrigger>
                    <EmojiCard emoji={emoji} />
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl">
                    <DialogHeader>
                      <DialogTitle className="capitalize">
                        {emoji.label}
                      </DialogTitle>
                      <DialogDescription>
                        You can use this emoji in your favicon generator.
                      </DialogDescription>
                    </DialogHeader>
                    <EmojiFavicon emoji={emoji} />
                  </DialogContent>
                </Dialog>
              ))}
            </div>
          ) : (
            <div className="text-muted-foreground flex h-20 w-full items-center justify-center overflow-hidden rounded-md border p-1">
              No emojis found in this group.
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
