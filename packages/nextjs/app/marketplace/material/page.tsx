"use client";

import Image from "next/image";
import type { NextPage } from "next";
import { formatEther } from "viem";
import { useAccount } from "wagmi";
import { BackButton } from "~~/components/ui/BackButton";
import { useScaffoldReadContract, useScaffoldWriteContract } from "~~/hooks/scaffold-eth";

const ShopMaterial: NextPage = () => {
  const { address } = useAccount();

  const { data: runeCredit } = useScaffoldReadContract({
    contractName: "RuneCredit",
    functionName: "balanceOf",
    args: [address],
  });

  const { data: WoodBalance } = useScaffoldReadContract({
    contractName: "Items",
    functionName: "balanceOf",
    args: [address, BigInt("5")],
  });

  const { data: IronBalance } = useScaffoldReadContract({
    contractName: "Items",
    functionName: "balanceOf",
    args: [address, BigInt("6")],
  });

  const { data: SteelBalance } = useScaffoldReadContract({
    contractName: "Items",
    functionName: "balanceOf",
    args: [address, BigInt("7")],
  });

  const { data: prices } = useScaffoldReadContract({
    contractName: "Items",
    functionName: "getSellPrices",
  });

  const { writeContractAsync: Game } = useScaffoldWriteContract("Game");

  return (
    <div>
      <BackButton />
      <div className="flex items-center flex-col flex-grow">
        <h1 className="text-2xl">Welcome to the Material Shop</h1>
        <div className="text-xl">
          <div className="inline-flex items-center justify-center">
            {parseFloat(formatEther(runeCredit || 0n))}
            <span className="font-bold ml-1">RC</span>
          </div>
        </div>
        <div className="flex">
          <div className="flex flex-col bg-orange-100 px-10 py-10 text-center items-center max-w-xs rounded-3xl m-1">
            <Image
              className="mb-3"
              src="https://olive-exceptional-viper-654.mypinata.cloud/ipfs/QmNq1X8AauGgsMRMkd35Y5hVwVvwsEqwJuzWYzufpJPUSS"
              width={150}
              height={150}
              alt="Wood"
            />
            <h2>Wood</h2>
            <p>Sell for: {prices && prices[0]?.toString()} RC</p>
            <p>Owned {WoodBalance?.toString()}</p>
            <button
              className="py-2 px-16 mb-1 mt-3 bg-green-500 rounded baseline hover:bg-green-300 disabled:opacity-50"
              onClick={async () => {
                try {
                  await Game({
                    functionName: "sellMaterial",
                    args: [BigInt("5")],
                  });
                } catch (e) {
                  console.error("Error buying Item:", e);
                }
              }}
            >
              Sell
            </button>
          </div>
          <div className="flex flex-col bg-orange-100 px-10 py-10 text-center items-center max-w-xs rounded-3xl m-1">
            <Image
              className="mb-3"
              src="https://olive-exceptional-viper-654.mypinata.cloud/ipfs/QmYaqqPQ5r4Fqr1qXTQXQnEE3Kgx5mVvBAGWvK7CPn81UC"
              width={175}
              height={175}
              alt="Iron"
            />
            <h2>Iron</h2>
            <p>Sell for: {prices && prices[1]?.toString()} RC</p>
            <p>Owned {IronBalance?.toString()}</p>
            <button
              className="py-2 px-16 mb-1 mt-3 bg-green-500 rounded baseline hover:bg-green-300 disabled:opacity-50"
              onClick={async () => {
                try {
                  await Game({
                    functionName: "sellMaterial",
                    args: [BigInt("6")],
                  });
                } catch (e) {
                  console.error("Error buying Item:", e);
                }
              }}
            >
              Sell
            </button>
          </div>
          <div className="flex flex-col bg-orange-100 px-10 py-10 text-center items-center max-w-xs rounded-3xl m-1">
            <Image
              className="mb-3"
              src="https://olive-exceptional-viper-654.mypinata.cloud/ipfs/QmcFu3aZCnVbMyAwuscbTJDfSm6XpprRAXGPJdEb1Nw87B"
              width={175}
              height={175}
              alt="Steel"
            />
            <h2>Steel</h2>
            <p>Sell for: {prices && prices[2]?.toString()} RC</p>
            <p>Owned {SteelBalance?.toString()}</p>
            <button
              className="py-2 px-16 mb-1 mt-3 bg-green-500 rounded baseline hover:bg-green-300 disabled:opacity-50"
              onClick={async () => {
                try {
                  await Game({
                    functionName: "sellMaterial",
                    args: [BigInt("7")],
                  });
                } catch (e) {
                  console.error("Error buying Item:", e);
                }
              }}
            >
              Sell
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopMaterial;
