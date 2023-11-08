import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { ThirdwebProvider } from "@thirdweb-dev/react";
import "./styles/globals.css";
import { ethers } from "ethers";

// This is the chain your dApp will work on.
// Change this to the chain your app is built for.
// You can also import additional chains from `@thirdweb-dev/chains` and pass them directly.
const activeChain = "ethereum";

const container = document.getElementById("root");
const root = createRoot(container);
root.render(
  <React.StrictMode>
    <ThirdwebProvider
      activeChain={{
        // === Required information for connecting to the network === \\
        chainId: 10147, // Chain ID of the network
        // Array of RPC URLs to use
        rpc: ["https://rpc.dev.buildbear.io/quintessential-lobot-0cb74d7f"],

        // === Information for adding the network to your wallet (how it will appear for first time users) === \\
        // Information about the chain's native currency (i.e. the currency that is used to pay for gas)
        nativeCurrency: {
          decimals: 18,
          name: "BB ETH",
          symbol: "BB ETH",
        },
        shortName: "BB", // Display value shown in the wallet UI
        slug: "BB", // Display value shown in the wallet UI
        testnet: true, // Boolean indicating whether the chain is a testnet or mainnet
        chain: "", // Name of the network
        name: "BB", // Name of the network
      }}
      clientId={"fa4fad8d511d30d6089e02a370ca1a32"}
    >
      <App />
    </ThirdwebProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
