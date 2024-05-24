"use client";

import type { NextPage } from "next";
import { formatEther } from "viem";
import { useAccount } from "wagmi";
import { useScaffoldReadContract, useScaffoldWriteContract } from "~~/hooks/scaffold-eth";

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

  const { writeContractAsync: Game } = useScaffoldWriteContract("Game");

  return (
    <div className="flex items-center flex-col flex-grow pt-7">
      <h1>Gather Materials {tbaAddress}</h1>
      <div className="text-xl">
        Stamina Point: {usedsp?.toString()} {" / "}
        <div className="inline-flex items-center justify-center">
          {parseFloat(formatEther(sp || 0n))}
          <span className="font-bold ml-1">SP</span>
        </div>
      </div>
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
    </div>
  );
};

export default GatherMaterials;
