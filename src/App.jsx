import { createWeb3Modal } from "@web3modal/wagmi/react";
import { walletConnectProvider, EIP6963Connector } from "@web3modal/wagmi";

import { WagmiConfig, configureChains, createConfig } from "wagmi";
import { publicProvider } from "wagmi/providers/public";
import { mainnet } from "viem/chains";
import { CoinbaseWalletConnector } from "wagmi/connectors/coinbaseWallet";
import { InjectedConnector } from "wagmi/connectors/injected";
import { WalletConnectConnector } from "wagmi/connectors/walletConnect";

import Card from "./components/Card";
import Header from "./components/Header";

const projectId = "fc695360564a4a7cf63cfc33b51c6d78";

const { chains, publicClient } = configureChains([mainnet], [walletConnectProvider({ projectId }), publicProvider()]);

const metadata = {
  name: "Web3Modal",
  description: "Web3Modal Example",
  url: "https://web3modal.com",
  icons: ["https://avatars.githubusercontent.com/u/37784886"],
};

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors: [
    new WalletConnectConnector({ chains, options: { projectId, showQrModal: false, metadata } }),
    new EIP6963Connector({ chains }),
    new InjectedConnector({ chains, options: { shimDisconnect: true } }),
    new CoinbaseWalletConnector({ chains, options: { appName: metadata.name } }),
  ],
  publicClient,
});

const themes = {
  "--w3m-color-mix": "#00BB7F",
  "--w3m-color-mix-strength": 40,
  "--w3m-accent": "#00BB7F",
};

createWeb3Modal({ wagmiConfig, projectId, chains, themes });

function App() {
  return (
    <WagmiConfig config={wagmiConfig}>
      <div className="w-screen h-screen overflow-hidden">
        <Header />
        <Card />
      </div>
    </WagmiConfig>
  );
}

export default App;
