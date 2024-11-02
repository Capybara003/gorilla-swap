"use client"

import { useEffect, useState } from 'react'
import { useConnectModal } from '@rainbow-me/rainbowkit'
import { SwapWidget } from '@reservoir0x/relay-kit-ui'
import { toast } from 'react-toastify'

export default function SwapwidgetPage() {
  const { openConnectModal } = useConnectModal()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <SwapWidget
      onSwapError={(error) => {
        toast.error(error)
      }}
      // multiWalletSupportEnabled={true}
      onConnectWallet={openConnectModal}
      onAnalyticEvent={(eventName: string, data: any) => {
        console.log('Analytic Event', eventName, data)
      }}
    />
  )
}

