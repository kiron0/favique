import * as React from "react"

import { notifyError, notifySuccess } from "@/components/toast"

export function useCopyToClipboard(
  text: string,
  copyMessage = "Copied to clipboard!"
) {
  const [isCopied, setIsCopied] = React.useState(false)
  const timeoutRef = React.useRef<NodeJS.Timeout | null>(null)

  const handleCopy = React.useCallback(() => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        notifySuccess({
          description: copyMessage,
        })
        setIsCopied(true)
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current)
          timeoutRef.current = null
        }
        timeoutRef.current = setTimeout(() => {
          setIsCopied(false)
        }, 2000)
      })
      .catch(() => {
        notifyError({
          description: "Failed to copy to clipboard. Please try again.",
          duration: 2000,
        })
      })
  }, [text, copyMessage])

  return { isCopied, handleCopy }
}
