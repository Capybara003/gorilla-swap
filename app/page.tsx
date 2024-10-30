"use client"
import { RelayKitProvider } from '@reservoir0x/relay-kit-ui'
import { convertViemChainToRelayChain } from '@reservoir0x/relay-sdk'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import '@reservoir0x/relay-kit-ui/styles.css'
import { apeChain } from 'wagmi/chains';
import { getDefaultConfig } from '@rainbow-me/rainbowkit'
import { WagmiProvider } from 'wagmi'
import { RelayChain } from '@reservoir0x/relay-sdk'

import SwapwidgetPage from "./component/Swapwidget";

const queryClient = new QueryClient()

const solanaChain: RelayChain = {
  id: 792703809,
  name: "solana",
  displayName: "Solana",
  httpRpcUrl: "https://api.mainnet-beta.solana.com",
  wsRpcUrl: "",

  explorerUrl: "https://solscan.io",
  depositEnabled: true,
  blockProductionLagging: false,
  currency: {
    id: "sol",
    symbol: "SOL",
    name: "Solana",
    address: "11111111111111111111111111111111",
    decimals: 9,
    supportsBridging: false
  },
  erc20Currencies: [
    {
      id: "usdc",
      symbol: "USDC",
      name: "USD Coin",
      address: "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
      decimals: 6,
      supportsBridging: true,
      supportsPermit: true,
      withdrawalFee: 0,
      depositFee: 0,
      surgeEnabled: false
    }
  ],
  icon: {
    dark: "https://assets.relay.link/icons/792703809/light.png",
    light: "https://assets.relay.link/icons/792703809/light.png",
    squaredDark: "https://assets.relay.link/icons/792703809/light.png",
    squaredLight: "https://assets.relay.link/icons/792703809/light.png"
  },
  vmType: "svm",
  viemChain: {
    id: 792703809,
    name: "solana",
    nativeCurrency: {
      name: "Solana",
      symbol: "SOL",
      decimals: 9,
    },
    rpcUrls: {
      default: {
        http: ["https://api.mainnet-beta.solana.com"],
      },
    },
  },
}

const chains = [
  convertViemChainToRelayChain(apeChain),
  solanaChain
]

const wagmiConfig = getDefaultConfig({
  appName: 'RainbowKit demo',
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID ? process.env.NEXT_PUBLIC_PROJECT_ID : '1111',
  chains: [apeChain]
})

export default function Home() {

  return (
    <QueryClientProvider client={queryClient}>
      <RelayKitProvider options={{
        chains
      }}>
        <WagmiProvider config={wagmiConfig}>
          <div className="w-full text-white flex flex-col justify-center items-center -mt-20 sm:px-[70px] gap-8 p-4">
            <SwapwidgetPage />
          </div>
        </WagmiProvider>
      </RelayKitProvider>
    </QueryClientProvider>

  );
}
