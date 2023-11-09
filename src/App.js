import { ConnectWallet, ThirdwebSDK, useContract, useContractWrite, Web3Button } from "@thirdweb-dev/react";
import "./styles/Home.css";
import { ethers } from "ethers";
import { useState } from "react";
import axios from "axios";

// const signer = new ethers.Wallet("bce43927c26cbfc35015167902b422ad7f0160540b5587afca2f17fc596e1717");
const contractAddress = "0x9Af9ADB92CF3e5a9Ff1b84b649e5870436367646";
const abi = [
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "contract Fundraiser",
        "name": "fundraiser",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "owner",
        "type": "address"
      }
    ],
    "name": "FundraiserCreated",
    "type": "event"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "name",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "url",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "imageURL",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "description",
        "type": "string"
      },
      {
        "internalType": "address payable",
        "name": "beneficiary",
        "type": "address"
      }
    ],
    "name": "createFundraiser",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "limit",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "offset",
        "type": "uint256"
      }
    ],
    "name": "fundraisers",
    "outputs": [
      {
        "internalType": "contract Fundraiser[]",
        "name": "coll",
        "type": "address[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "fundraisersCount",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }
]

export default function Home() {
  // const { contract } = useContract(contractAddress, abi);
  // const { mutateAsync, isLoading, error } = useContractWrite(
  //   contract,
  //   "createFundraiser",
  // );

  // const sdk = new ThirdwebSDK({
  //   // === Required information for connecting to the network === \\
  //   chainId: 10147, // Chain ID of the network
  //   // Array of RPC URLs to use
  //   rpc: ["https://rpc.dev.buildbear.io/quintessential-lobot-0cb74d7f"],

  //   // === Information for adding the network to your wallet (how it will appear for first time users) === \\
  //   // Information about the chain's native currency (i.e. the currency that is used to pay for gas)
  //   nativeCurrency: {
  //     decimals: 18,
  //     name: "BB ETH",
  //     symbol: "BB ETH",
  //   },
  //   shortName: "BB", // Display value shown in the wallet UI
  //   slug: "BB", // Display value shown in the wallet UI
  //   testnet: true, // Boolean indicating whether the chain is a testnet or mainnet
  //   chain: "", // Name of the network
  //   name: "BB", // Name of the network
  // });

  const [address, setAddress] = useState("");

  const { contract } = useContract("0x916a18780C0F4Ae8A834d53AEFE729B77528968D", abi);
  const { mutateAsync, isLoading, error } = useContractWrite(
    contract,
    "createFundraiser",
  );

  

const mintToken = async (address) => {
  console.log(address)
  try {
    await axios.post('https://backend.dev.buildbear.io/node/faucet/native/quintessential-lobot-0cb74d7f',
        {
          "address": address,
          "balance": "100"
        })
  } catch (error) {
    console.error('Error in mintToken:', error);
  }
}


  const handleInputChange = (e) => {
    setAddress(e.target.value);
  };
  return (
    <main className="main">
      <div className="connect">
        <ConnectWallet
          dropdownPosition={{
            side: "bottom",
            align: "center",
          }}
        />
      </div>
      <div>
        {/* <button onClick={co}>
         createFundraiser
        </button> */}

        <Web3Button
          contractAddress="0x916a18780C0F4Ae8A834d53AEFE729B77528968D"
          contractAbi={abi}
          action={() => mutateAsync({ args: ["My Name", "My Name", "My Name", "My Name", "0xE314390E2355CD136b953a1d20041403c339d5bb"]})}
        >
          Execute Action
        </Web3Button>
        <h1>
          <a href="https://explorer.dev.buildbear.io/quintessential-lobot-0cb74d7f/transactions">explorer</a>
        </h1>
        
      </div>

      <div>
        <label>Enter your connected wallet address</label>
        <input
        type="text"
        value={address}
        onChange={handleInputChange}
      />
      </div>

      <button onClick={() => mintToken(address)}>Mint</button>


    </main>
  );
}
