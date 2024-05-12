"use client";

import { useState } from "react";
import type { NextPage } from "next";
import { useAccount } from "wagmi";
import deployedContracts from "~~/contracts/deployedContracts";
import { useScaffoldReadContract, useScaffoldWriteContract } from "~~/hooks/scaffold-eth";

const CHAIN_ID = 31337;

const CreateMinion: NextPage = () => {
  const { address } = useAccount();

  const [selectedNFT, setSelectNFT] = useState(-1);

  const { data: nfts } = useScaffoldReadContract({
    contractName: "MinionNFT",
    functionName: "getMyNFTs",
    args: [address],
  });

  const { data: tbaAddress } = useScaffoldReadContract({
    contractName: "ERC6551Registry",
    functionName: "account",
    args: [
      deployedContracts[CHAIN_ID].ERC6551Account.address,
      BigInt(CHAIN_ID),
      deployedContracts[CHAIN_ID].MinionNFT.address,
      BigInt(selectedNFT),
      BigInt("1"),
    ],
  });

  const { writeContractAsync: Game } = useScaffoldWriteContract("Game");
  const { writeContractAsync: ERC6551Registry } = useScaffoldWriteContract("ERC6551Registry");

  return (
    <div className="flex items-center flex-col flex-grow pt-7">
      <div className="px-5">
        <h1 className="text-center mb-5">
          <span className="block text-3xl mb-2">Select your wallet NFT</span>
        </h1>

        <p>{tbaAddress}</p>

        <div className="flex">
          {nfts?.map((n, index) => (
            <div
              key={index}
              className="w-16 h-20 border border-gray-30 flex items-center justify-center font-bold mr-2 mb-2 cursor-pointer"
              style={{ background: selectedNFT === index ? "#00cc99" : "white" }}
              onClick={() => setSelectNFT(index)}
            >
              {n.id.toString()}
            </div>
          ))}
        </div>

        <button
          className="py-2 px-16 mb-10 mt-3 bg-green-500 rounded baseline hover:bg-green-300 disabled:opacity-50"
          onClick={async () => {
            try {
              await ERC6551Registry({
                functionName: "createAccount",
                args: [
                  deployedContracts[CHAIN_ID].ERC6551Account.address,
                  BigInt(CHAIN_ID),
                  deployedContracts[CHAIN_ID].MinionNFT.address,
                  BigInt(selectedNFT),
                  BigInt("1"),
                  "0x",
                ],
              });
            } catch (e) {
              console.error("Error minting Minion:", e);
            }
          }}
        >
          Create Token Bound Account
        </button>
        <h1 className="text-center mb-5">
          <span className="block text-2xl mb-2">Buy a Minion NFT</span>
        </h1>

        <button
          className="py-2 px-16 mb-1 mt-3 bg-green-500 rounded baseline hover:bg-green-300 disabled:opacity-50"
          onClick={async () => {
            try {
              await Game({
                functionName: "createMinion",
                // @ts-ignore
                args: [""],
              });
            } catch (e) {
              console.error("Error minting Minion:", e);
            }
          }}
        >
          Buy
        </button>
      </div>
    </div>
  );
};

export default CreateMinion;
