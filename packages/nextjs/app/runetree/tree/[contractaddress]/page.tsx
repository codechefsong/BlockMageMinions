"use client";

import type { NextPage } from "next";
import { formatEther } from "viem";
import { useAccount } from "wagmi";
import { BackButton } from "~~/components/ui/BackButton";
import { useScaffoldReadContract, useScaffoldWriteContract } from "~~/hooks/scaffold-eth";

const RuneTree: NextPage = () => {
  const { address } = useAccount();

  const { data: runeTrees } = useScaffoldReadContract({
    contractName: "Game",
    functionName: "getUserRuneTree",
    args: [address],
  });

  const { writeContractAsync: Game } = useScaffoldWriteContract("Game");

  console.log(Game);

  return (
    <div>
      <BackButton path="/runetree" />
      <div className="flex flex-col items-center flex-grow pt-7 bg-gray-50 min-h-screen">
        <div>
          <h1>
            <span className="block text-3xl mb-2">Rune Tree</span>
          </h1>
          <p className="text-gray-500">Earn Rune Credits for attacking this Rune Tree</p>
        </div>

        <div>
          <p className="mr-2">
            Amount: {parseFloat(formatEther(runeTrees?.amount || 0n))}
            <span className="font-bold ml-1">RC</span>
          </p>
          <p className="mr-2">
            Defense Point: {parseFloat(formatEther(runeTrees?.defensePoint || 0n))}
            <span className="font-bold ml-1">DP</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RuneTree;
