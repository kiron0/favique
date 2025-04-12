"use client"

import { CheckIcon, ClipboardIcon } from "lucide-react"

import { useCopyToClipboard } from "@/hooks/use-copy-to-clipboard"
import { Button } from "@/components/ui/button"

interface CopyButtonProps {
  content: string
  copyMessage?: string
}

export function CopyButton({ content, copyMessage }: CopyButtonProps) {
  const { isCopied, handleCopy } = useCopyToClipboard(content, copyMessage)

  return (
    <Button
      size="icon"
      variant="secondary"
      className="z-10 size-6 [&_svg]:size-3"
      onClick={handleCopy}
    >
      <span className="sr-only">Copy</span>
      {isCopied ? <CheckIcon /> : <ClipboardIcon />}
    </Button>
  )
}
