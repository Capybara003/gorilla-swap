import '@reservoir0x/relay-kit-ui/styles.css'
import '../fonts.css'

import type { AppProps } from 'next/app'
import React, { ReactNode, FC, useState, useEffect } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { createConfig, http, WagmiProvider } from 'wagmi'
import { Chain, mainnet } from 'wagmi/chains'
import { RelayKitProvider } from '@reservoir0x/relay-kit-ui'
import { useRelayChains } from '@reservoir0x/relay-kit-hooks'
import {
  LogLevel,
  MAINNET_RELAY_API,
  TESTNET_RELAY_API
} from '@reservoir0x/relay-sdk'
import { ThemeProvider } from 'next-themes'
import { useRouter } from 'next/router'
import {
  DynamicContextProvider,
  FilterChain,
  RemoveWallets
} from '@dynamic-labs/sdk-react-core'
import { EthereumWalletConnectors } from '@dynamic-labs/ethereum'
import { SolanaWalletConnectors } from '@dynamic-labs/solana'
import { BitcoinWalletConnectors } from '@dynamic-labs/bitcoin'
import { convertRelayChainToDynamicNetwork } from 'utils/dynamic'
import { DynamicWagmiConnector } from '@dynamic-labs/wagmi-connector'
import { HttpTransport } from 'viem'
import { chainIdToAlchemyNetworkMap } from 'utils/chainIdToAlchemyNetworkMap'
import { useWalletFilter, WalletFilterProvider } from 'context/walletFilter'
import { pipe } from '@dynamic-labs/utils'

type AppWrapperProps = {
  children: ReactNode
}

const ALCHEMY_API_KEY = process.env.NEXT_PUBLIC_ALCHEMY_KEY || ''

const queryClient = new QueryClient()

const AppWrapper: FC<AppWrapperProps> = ({ children }) => {
  const { walletFilter, setWalletFilter } = useWalletFilter()
  const [wagmiConfig, setWagmiConfig] = useState<
    ReturnType<typeof createConfig> | undefined
  >()
  const router = useRouter()
  const [relayApi, setRelayApi] = useState(MAINNET_RELAY_API)

  useEffect(() => {
    const isTestnet = router.query.api === 'testnets'
    setRelayApi(isTestnet ? TESTNET_RELAY_API : MAINNET_RELAY_API)
  }, [router.query.api])

  const { chains, viemChains } = useRelayChains(relayApi, {
    includeChains: '8253038'
  })

  useEffect(() => {
    if (chains && viemChains && !wagmiConfig) {
      setWagmiConfig(
        createConfig({
          chains: (viemChains && viemChains.length === 0
            ? [mainnet]
            : viemChains) as [Chain, ...Chain[]],
          multiInjectedProviderDiscovery: false,
          transports: chains.reduce(
            (transportsConfig: Record<number, HttpTransport>, chain) => {
              const network = chainIdToAlchemyNetworkMap[chain.id]
              if (network && ALCHEMY_API_KEY) {
                transportsConfig[chain.id] = http(
                  `https://${network}.g.alchemy.com/v2/${ALCHEMY_API_KEY}`
                )
              } else {
                transportsConfig[chain.id] = http() // Fallback to default HTTP transport
              }
              return transportsConfig
            },
            {}
          )
        })
      )
    }
  }, [chains, relayApi, viemChains])

  if (!wagmiConfig || !chains) {
    return null
  }

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem
      disableTransitionOnChange
    >
      <RelayKitProvider
        options={{
          baseApiUrl: relayApi,
          source: 'relay-demo',
          logLevel: LogLevel.Verbose,
          duneApiKey: process.env.NEXT_PUBLIC_DUNE_TOKEN,
          chains,
          appName: 'Relay Demo'
        }}>
        <DynamicContextProvider
          settings={{
            logLevel: 'INFO',
            environmentId: process.env.NEXT_PUBLIC_DYNAMIC_ENV_ID ?? '',
            walletConnectors: [
              EthereumWalletConnectors,
              SolanaWalletConnectors,
              BitcoinWalletConnectors
            ],
            cssOverrides: `
              [data-testid="send-balance-button"] {
                display: none;
              }
            `,
            walletsFilter: walletFilter ? FilterChain(walletFilter) : undefined,
            overrides: {
              evmNetworks: () => {
                return chains
                  .filter((chain) => chain.vmType === 'evm')
                  .map((chain) => {
                    return convertRelayChainToDynamicNetwork(chain)
                  })
              }
            },
            initialAuthenticationMode: 'connect-only',
            events: {
              onAuthFlowClose: () => {
                setWalletFilter(undefined)
              }
            }
          }}
        >
          <WagmiProvider config={wagmiConfig}>
            <DynamicWagmiConnector>{children}</DynamicWagmiConnector>
          </WagmiProvider>
        </DynamicContextProvider>
      </RelayKitProvider>
    </ThemeProvider>
  )
}

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <WalletFilterProvider>
      <QueryClientProvider client={queryClient}>
        <AppWrapper>
          <Component {...pageProps} />
        </AppWrapper>
      </QueryClientProvider>
    </WalletFilterProvider>
  )
}

export default MyApp
