"use client";

import { formatEther } from "viem";
import { useAccount } from "wagmi";
import { BackButton } from "~~/components/ui/BackButton";
import { useScaffoldReadContract, useScaffoldWriteContract } from "~~/hooks/scaffold-eth";

const RuneTree = ({ params }: { params: { contractaddress: string } }) => {
  const { address } = useAccount();

  const { data: runeTrees } = useScaffoldReadContract({
    contractName: "Game",
    functionName: "getUserRuneTree",
    args: [params.contractaddress],
  });

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

  const { data: mp } = useScaffoldReadContract({
    contractName: "MagicPoint",
    functionName: "balanceOf",
    args: [tbaAddress],
  });

  const { data: dp } = useScaffoldReadContract({
    contractName: "DefensePoint",
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

        <button
          className="py-2 px-16 mb-1 mt-3 bg-green-500 rounded baseline hover:bg-green-300 disabled:opacity-50"
          onClick={async () => {
            try {
              await Game({
                functionName: "attackTree",
                args: [params.contractaddress],
              });
            } catch (e) {
              console.error("Error attacking thief:", e);
            }
          }}
        >
          Attack
        </button>

        <div className="text-xl mt-5">
          Stamina Point: {usedsp?.toString()} {" / "}
          <div className="inline-flex items-center justify-center">
            {parseFloat(formatEther(sp || 0n))}
            <span className="font-bold ml-1">SP</span>
          </div>
        </div>
        <div className="text-xl">
          Magic Point:{" "}
          <div className="inline-flex items-center justify-center">
            {parseFloat(formatEther(mp || 0n))}
            <span className="font-bold ml-1">MP</span>
          </div>
        </div>
        <div className="text-xl">
          Defense Point:{" "}
          <div className="inline-flex items-center justify-center">
            {parseFloat(formatEther(dp || 0n))}
            <span className="font-bold ml-1">DP</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RuneTree;
