"use client";

import { useState } from "react";
import Image from "next/image";
import type { NextPage } from "next";
import { formatEther } from "viem";
import { useAccount } from "wagmi";
import { BackButton } from "~~/components/ui/BackButton";
import deployedContracts from "~~/contracts/deployedContracts";
import { useScaffoldReadContract, useScaffoldWriteContract } from "~~/hooks/scaffold-eth";

const CHAIN_ID = 59141;

const ManageMinion: NextPage = () => {
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
      deployedContracts[CHAIN_ID].ERC6551Registry.address,
      BigInt(CHAIN_ID),
      deployedContracts[CHAIN_ID].MinionNFT.address,
      BigInt(selectedNFT),
      BigInt("1"),
    ],
  });

  const { data: sp } = useScaffoldReadContract({
    contractName: "StaminaPoint",
    functionName: "balanceOf",
    args: [tbaAddress],
  });

  const { data: usedsp } = useScaffoldReadContract({
    contractName: "Game",
    functionName: "getStaminaPointsLeft",
    args: [tbaAddress],
  });

  const { writeContractAsync: Game } = useScaffoldWriteContract("Game");

  return (
    <div>
      <BackButton />
      <div className="flex items-center flex-col flex-grow">
        <div className="px-5 mt-5">
          <h1 className="text-center">
            <span className="block text-3xl">Select your Minion NFT</span>
          </h1>

          <p className="text-gray-500">Only active minion can play the game</p>

          {selectedNFT != -1 && (
            <div>
              <p>{tbaAddress}</p>
              <div className="text-xl">
                Stamina Point: {usedsp?.toString()} {" / "}
                <div className="inline-flex items-center justify-center">
                  {parseFloat(formatEther(sp || 0n))}
                  <span className="font-bold ml-1">SP</span>
                </div>
              </div>
            </div>
          )}

          <div className="flex">
            {nfts?.map((n, index) => (
              <div
                key={index}
                className="w-16 h-20 border border-gray-30 flex items-center justify-center font-bold mr-2 mb-2 cursor-pointer"
                style={{ background: selectedNFT === index ? "#00cc99" : "white" }}
                onClick={() => setSelectNFT(index)}
              >
                <Image
                  className="mb-3"
                  src="https://olive-exceptional-viper-654.mypinata.cloud/ipfs/QmZx4FuZqqSQ9f3MMnsX46ts4RXufRSMAH2byyYy9bqPkH"
                  width={200}
                  height={200}
                  alt="Minions"
                />
              </div>
            ))}
          </div>

          <center>
            <button
              className="py-2 px-16 mb-10 mt-3 bg-green-500 rounded baseline hover:bg-green-300 disabled:opacity-50"
              onClick={async () => {
                try {
                  await Game({
                    functionName: "createTBA",
                    args: [BigInt(CHAIN_ID), BigInt("1"), BigInt(selectedNFT), "0x"],
                  });
                } catch (e) {
                  console.error("Error minting Minion:", e);
                }
              }}
            >
              Set Active
            </button>
          </center>
        </div>
      </div>
    </div>
  );
};

export default ManageMinion;
