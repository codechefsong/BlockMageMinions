"use client";

import Image from "next/image";
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

const RestMinion: NextPage = () => {
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

  useScaffoldWatchContractEvent({
    contractName: "Game",
    eventName: "EaredCreditFromThief",
    onLogs: logs => {
      logs.map(log => {
        const { owner, amount } = log.args;
        console.log(owner, amount);
        if (address === owner) {
          // @ts-ignore
          notification.info("You earned " + amount / 10 ** 18 + "RC");
        }
      });
    },
  });

  return (
    <div>
      <BackButton />
      <div className="flex items-center flex-col flex-grow">
        <h1>Battle Thief</h1>
        <div className="text-xl">
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
        <Image
          className="mb-3"
          src="https://olive-exceptional-viper-654.mypinata.cloud/ipfs/QmY318Vg6nhmApuFgAf3oipjGxLBKjYvt5m1hPA77nk5ZB"
          width={150}
          height={150}
          alt="Thief"
        />
        <button
          className="py-2 px-16 mb-1 mt-3 bg-green-500 rounded baseline hover:bg-green-300 disabled:opacity-50"
          onClick={async () => {
            try {
              await Game({
                functionName: "attackThief",
              });
            } catch (e) {
              console.error("Error attacking thief:", e);
            }
          }}
        >
          Attack Theif
        </button>
      </div>
    </div>
  );
};

export default RestMinion;
