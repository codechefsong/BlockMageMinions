"use client";

import type { NextPage } from "next";
import { formatEther } from "viem";
import { useAccount } from "wagmi";
import { BackButton } from "~~/components/ui/BackButton";
import {
  useScaffoldReadContract,
  useScaffoldWatchContractEvent,
  useScaffoldWriteContract,
} from "~~/hooks/scaffold-eth";
import { notification } from "~~/utils/scaffold-eth";

const itemName = {
  "5": "Wood",
  "6": "Iron",
  "7": "Steel",
};

const GatherMaterials: NextPage = () => {
  const { address } = useAccount();

  const { data: tbaAddress } = useScaffoldReadContract({
    contractName: "Game",
    functionName: "getActiveMinion",
    args: [address],
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

  const { data: woodBalance } = useScaffoldReadContract({
    contractName: "Items",
    functionName: "balanceOf",
    args: [address, BigInt("5")],
  });

  const { data: ironBalance } = useScaffoldReadContract({
    contractName: "Items",
    functionName: "balanceOf",
    args: [address, BigInt("6")],
  });

  const { data: steelBalance } = useScaffoldReadContract({
    contractName: "Items",
    functionName: "balanceOf",
    args: [address, BigInt("7")],
  });

  const { writeContractAsync: Game } = useScaffoldWriteContract("Game");

  useScaffoldWatchContractEvent({
    contractName: "Game",
    eventName: "NewMaterial",
    onLogs: logs => {
      logs.map(log => {
        const { owner, itemID } = log.args;
        console.log(owner, itemID);
        if (address === owner) {
          // @ts-ignore
          notification.info("You found " + itemName[itemID]);
        }
      });
    },
  });

  return (
    <div>
      <BackButton />
      <div className="flex items-center flex-col flex-grow">
        <h1>Gather Materials {tbaAddress}</h1>
        <div className="text-xl">
          Stamina Point: {usedsp?.toString()} {" / "}
          <div className="inline-flex items-center justify-center">
            {parseFloat(formatEther(sp || 0n))}
            <span className="font-bold ml-1">SP</span>
          </div>
        </div>
        <p>Cost 50 SP</p>
        <button
          className="py-2 px-16 mb-1 mt-3 bg-green-500 rounded baseline hover:bg-green-300 disabled:opacity-50"
          onClick={async () => {
            try {
              await Game({
                functionName: "gatherMaterials",
              });
            } catch (e) {
              console.error("Error gathering materials", e);
            }
          }}
        >
          Gather Material
        </button>
        <div className="flex">
          <div className="flex flex-col bg-orange-100 px-10 py-10 text-center items-center max-w-xs rounded-3xl m-1">
            <h2>Wood</h2>
            <p>Owned {woodBalance?.toString()}</p>
          </div>
          <div className="flex flex-col bg-orange-100 px-10 py-10 text-center items-center max-w-xs rounded-3xl m-1">
            <h2>Iron</h2>
            <p>Owned {ironBalance?.toString()}</p>
          </div>
          <div className="flex flex-col bg-orange-100 px-10 py-10 text-center items-center max-w-xs rounded-3xl m-1">
            <h2>Steel</h2>
            <p>Owned {steelBalance?.toString()}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GatherMaterials;
