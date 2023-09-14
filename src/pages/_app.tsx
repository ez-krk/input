import { useMemo } from "react";
// solana
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import { PhantomWalletAdapter } from "@solana/wallet-adapter-wallets";
import { clusterApiUrl } from "@solana/web3.js";
// gum
import GumSDKProvider from "src/components/GumSDKProvider";
import { GumUIProvider } from "@gumhq/ui-components";
// contexts
import { HolderProvider } from "../contexts/holder.context";
import { ContentContainer } from "../components/content-container/content-container.component";
import { WalletContextProvider } from "src/contexts/WalletContextProvider";

import Notifications from "../components/notification/notification.component";

import localFont from "next/font/local";

require("@solana/wallet-adapter-react-ui/styles.css");
require("../styles/globals.scss");
require("../styles/scrollbar.scss");

import type { AppProps } from "next/app";
import { Toaster } from "react-hot-toast";
import { Matrix } from "src/components/matrix/matrix.component";

const pixel = localFont({ src: "../assets/fonts/pixel.ttf" });

const App = ({ Component, pageProps }: AppProps) => {
  const cluster =
    (process.env.NEXT_PUBLIC_SOLANA_NETWORK as "devnet" | "mainnet-beta") ||
    "devnet";
  const network = useMemo(
    () =>
      cluster === "mainnet-beta"
        ? WalletAdapterNetwork.Mainnet
        : WalletAdapterNetwork.Devnet,
    [cluster]
  );
  const endpoint =
    process.env.NEXT_PUBLIC_SOLANA_ENDPOINT || clusterApiUrl(network);
  const wallets = useMemo(() => [new PhantomWalletAdapter()], [network]);
  return (
    <WalletContextProvider
      endpoint={endpoint}
      network={network}
      wallets={wallets}
    >
      <Toaster />
      <GumSDKProvider>
        <HolderProvider>
          <Notifications />
          <ContentContainer>
            <div className={pixel.className}>
              <Component {...pageProps} />
              <Matrix />
            </div>
          </ContentContainer>
        </HolderProvider>
      </GumSDKProvider>
    </WalletContextProvider>
  );
};

export default App;
