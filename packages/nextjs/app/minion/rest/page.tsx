"use client";

import type { NextPage } from "next";
import { formatEther } from "viem";
import { useAccount } from "wagmi";
import { Address } from "~~/components/scaffold-eth";
import { BackButton } from "~~/components/ui/BackButton";
import { useScaffoldReadContract, useScaffoldWriteContract } from "~~/hooks/scaffold-eth";

const RestMinion: NextPage = () => {
  const { address } = useAccount();

  const { data: tbaAddress } = useScaffoldReadContract({
    contractName: "Game",
    functionName: "getActiveMinion",
    args: [address],
  });

  const { data: isRest } = useScaffoldReadContract({
    contractName: "Game",
    functionName: "getIsRest",
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
    <div>
      <BackButton />
      <div className="flex items-center flex-col flex-grow">
        <div>
          <h1>
            <span className="block text-3xl mb-2">Minion Resting</span>
            <Address address={tbaAddress} />
          </h1>
          <p className="text-gray-500">Let your minion rest to fully recover stamina</p>
          <p className="text-gray-500">They will be inactive during rest</p>
        </div>

        {!isRest ? (
          <button
            className="py-2 px-16 mb-1 mt-3 bg-green-500 rounded baseline hover:bg-green-300 disabled:opacity-50"
            onClick={async () => {
              try {
                await Game({
                  functionName: "restMinion",
                });
              } catch (e) {
                console.error("Error putting Minion to sleep:", e);
              }
            }}
          >
            Put minion to sleep
          </button>
        ) : (
          <button
            className="py-2 px-16 mb-1 mt-3 bg-green-500 rounded baseline hover:bg-green-300 disabled:opacity-50"
            onClick={async () => {
              try {
                await Game({
                  functionName: "wakeUpMinion",
                });
              } catch (e) {
                console.error("Error awaking up Minion:", e);
              }
            }}
          >
            Awake up the minion
          </button>
        )}

        <div className="text-xl mt-5">
          Stamina Point: {usedsp?.toString()} {" / "}
          <div className="inline-flex items-center justify-center">
            {parseFloat(formatEther(sp || 0n))}
            <span className="font-bold ml-1">SP</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestMinion;
