"use client";

import { useState } from "react";
import type { NextPage } from "next";
import { formatEther, parseEther } from "viem";
import { useAccount } from "wagmi";
import { IntegerInput } from "~~/components/scaffold-eth";
import { BackButton } from "~~/components/ui/BackButton";
import { useScaffoldReadContract, useScaffoldWriteContract } from "~~/hooks/scaffold-eth";

const RuneTree: NextPage = () => {
  const { address } = useAccount();

  const [amountToStake, setAmountToStake] = useState<string | bigint>("");

  const { data: runeTrees } = useScaffoldReadContract({
    contractName: "Game",
    functionName: "getUserRuneTree",
    args: [address],
  });

  const { writeContractAsync: Game } = useScaffoldWriteContract("Game");

  return (
    <div>
      <BackButton path="/runetree" />
      <div className="flex flex-col items-center flex-grow pt-7 bg-gray-50 min-h-screen">
        <div>
          <h1>
            <span className="block text-3xl mb-2">Stake for Rune Tree</span>
          </h1>
          <p className="text-gray-500">Create Rune Tree and Stake Rune Credits to earn more</p>
          <p className="text-gray-500">Your Rune Tree defense is base on your minion defense</p>
          <p className="text-gray-500">Other can attack your Rune Tree to take your Rune Credits</p>
        </div>

        {runeTrees?.amount === BigInt(0) ? (
          <>
            <div className="flex flex-col space-y-2">
              <IntegerInput
                placeholder="Amount of RC to Stake"
                value={amountToStake.toString()}
                onChange={value => setAmountToStake(value)}
                disableMultiplyBy1e18
              />
            </div>
            <button
              className="py-2 px-16 mb-1 mt-3 bg-green-500 rounded baseline hover:bg-green-300 disabled:opacity-50"
              onClick={async () => {
                try {
                  await Game({
                    functionName: "stakeAndCreateRuneTree",
                    args: [parseEther(amountToStake.toString())],
                  });
                } catch (e) {
                  console.error("Error staking and creating Rune Tree:", e);
                }
              }}
            >
              Stake
            </button>
          </>
        ) : (
          <>
            <button
              className="py-2 px-16 mb-1 mt-3 bg-green-500 rounded baseline hover:bg-green-300 disabled:opacity-50"
              onClick={async () => {
                try {
                  await Game({
                    functionName: "collectCredits",
                    args: [address],
                  });
                } catch (e) {
                  console.error("Error collection credits:", e);
                }
              }}
            >
              Claim Credit
            </button>
            <button
              className="py-2 px-16 mb-1 mt-3 bg-green-500 rounded baseline hover:bg-green-300 disabled:opacity-50"
              onClick={async () => {
                try {
                  await Game({
                    functionName: "unStakeAndRemoveRuneTree",
                  });
                } catch (e) {
                  console.error("Error collection credits:", e);
                }
              }}
            >
              UnStake
            </button>
          </>
        )}

        {runeTrees?.amount !== BigInt(0) && (
          <div>
            <h2 className="mt-3 text-2xl">Your Rune Tree</h2>
            <p className="mr-2">
              Amount: {parseFloat(formatEther(runeTrees?.amount || 0n))}
              <span className="font-bold ml-1">RC</span>
            </p>
            <p className="mr-2">
              Defense Point: {parseFloat(formatEther(runeTrees?.defensePoint || 0n))}
              <span className="font-bold ml-1">DP</span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default RuneTree;
