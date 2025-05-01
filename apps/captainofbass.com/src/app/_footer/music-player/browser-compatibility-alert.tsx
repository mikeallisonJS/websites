'use client'

import {
  Alert,
  AlertDescription,
  AlertTitle
} from '@mikeallisonjs/ui/components/alert'
import { Button } from '@mikeallisonjs/ui/components/button'
import { ExclamationTriangleIcon } from '@radix-ui/react-icons'
import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'

type BrowserCompatibilityAlertProps = {
  isOpen: boolean
  onClose: () => void
}

export default function BrowserCompatibilityAlert({
  isOpen,
  onClose
}: BrowserCompatibilityAlertProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)

    // Auto-close after 10 seconds
    if (isOpen) {
      const timer = setTimeout(() => {
        onClose()
      }, 10000)

      return () => clearTimeout(timer)
    }
  }, [isOpen, onClose])

  if (!mounted || !isOpen) return null

  return createPortal(
    <div className="fixed bottom-20 left-1/2 z-50 w-full max-w-md -translate-x-1/2 px-4">
      <Alert variant="destructive" className="shadow-lg">
        <ExclamationTriangleIcon className="h-4 w-4" />
        <AlertTitle>Browser Compatibility Issue</AlertTitle>
        <AlertDescription>
          <p className="mb-2">
            Audio playback failed. This is likely due to browser compatibility
            issues. Please try using Chrome for the best experience.
          </p>
          <Button
            size="sm"
            variant="outline"
            className="mt-2"
            onClick={onClose}
          >
            Dismiss
          </Button>
        </AlertDescription>
      </Alert>
    </div>,
    document.body
  )
}
