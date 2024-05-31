"use client";

import Image from "next/image";
import type { NextPage } from "next";
import { formatEther } from "viem";
import { useAccount } from "wagmi";
import { BackButton } from "~~/components/ui/BackButton";
import { useScaffoldReadContract, useScaffoldWriteContract } from "~~/hooks/scaffold-eth";

const ShopItem: NextPage = () => {
  const { address } = useAccount();

  const { data: runeCredit } = useScaffoldReadContract({
    contractName: "RuneCredit",
    functionName: "balanceOf",
    args: [address],
  });

  const { data: foodBalance } = useScaffoldReadContract({
    contractName: "Items",
    functionName: "balanceOf",
    args: [address, BigInt("1")],
  });

  const { data: StaminaPotionBalance } = useScaffoldReadContract({
    contractName: "Items",
    functionName: "balanceOf",
    args: [address, BigInt("2")],
  });

  const { data: MagicPotionBalance } = useScaffoldReadContract({
    contractName: "Items",
    functionName: "balanceOf",
    args: [address, BigInt("3")],
  });

  const { data: DefensePotionBalance } = useScaffoldReadContract({
    contractName: "Items",
    functionName: "balanceOf",
    args: [address, BigInt("4")],
  });

  const { data: prices } = useScaffoldReadContract({
    contractName: "Items",
    functionName: "getPrices",
  });

  const { writeContractAsync: Game } = useScaffoldWriteContract("Game");

  return (
    <div>
      <BackButton />
      <div className="flex items-center flex-col flex-grow">
        <h1 className="text-2xl">Welcome to the Item Shop</h1>
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
              src="https://olive-exceptional-viper-654.mypinata.cloud/ipfs/QmPr7Cde4XLrsUih9TaVfLbkgnsXMhF4Pv1d9qgRiGPpQg"
              width={60}
              height={60}
              alt="Food"
            />
            <h2>Food</h2>
            <p>Restore 50 SP</p>
            <p>Cost: {prices && prices[0]?.toString()} RC</p>
            <p>Owned {foodBalance?.toString()}</p>
            <button
              className="py-2 px-16 mb-1 mt-3 bg-green-500 rounded baseline hover:bg-green-300 disabled:opacity-50"
              onClick={async () => {
                try {
                  await Game({
                    functionName: "buyItem",
                    args: [BigInt("1")],
                  });
                } catch (e) {
                  console.error("Error buying Item:", e);
                }
              }}
            >
              Buy
            </button>
            <button
              className="py-2 px-16 mb-1 mt-3 bg-green-500 rounded baseline hover:bg-green-300 disabled:opacity-50"
              onClick={async () => {
                try {
                  await Game({
                    functionName: "useFoodItem",
                  });
                } catch (e) {
                  console.error("Error using Food Item:", e);
                }
              }}
            >
              Use
            </button>
          </div>
          <div className="flex flex-col bg-orange-100 px-10 py-10 text-center items-center max-w-xs rounded-3xl m-1">
            <Image
              className="mb-3"
              src="https://olive-exceptional-viper-654.mypinata.cloud/ipfs/QmaDdD6ZXTGGtnzfdWBo5Dt1EGZZYiTxG12kBUCPSBc32u"
              width={150}
              height={150}
              alt="Stamina Potion"
            />
            <h2>Stamina Potion</h2>
            <p>Inscrease 1 SP</p>
            <p>Cost: {prices && prices[1]?.toString()} RC</p>
            <p>Owned {StaminaPotionBalance?.toString()}</p>
            <button
              className="py-2 px-16 mb-1 mt-3 bg-green-500 rounded baseline hover:bg-green-300 disabled:opacity-50"
              onClick={async () => {
                try {
                  await Game({
                    functionName: "buyItem",
                    args: [BigInt("2")],
                  });
                } catch (e) {
                  console.error("Error buying Item:", e);
                }
              }}
            >
              Buy
            </button>
            <button
              className="py-2 px-16 mb-1 mt-3 bg-green-500 rounded baseline hover:bg-green-300 disabled:opacity-50"
              onClick={async () => {
                try {
                  await Game({
                    functionName: "usePotionItem",
                    args: [2],
                  });
                } catch (e) {
                  console.error("Error using Potion Item:", e);
                }
              }}
            >
              Use
            </button>
          </div>
          <div className="flex flex-col bg-orange-100 px-10 py-10 text-center items-center max-w-xs rounded-3xl m-1">
            <Image
              className="mb-3"
              src="https://olive-exceptional-viper-654.mypinata.cloud/ipfs/QmPAZNhLXAhw9dfj2twaDqJC2m5eZYuRUSmZHX48HiK7aC"
              width={150}
              height={150}
              alt="Magic Potion"
            />
            <h2>Magic Potion</h2>
            <p>Inscrease 1 MP</p>
            <p>Cost: {prices && prices[2]?.toString()} RC</p>
            <p>Owned {MagicPotionBalance?.toString()}</p>
            <button
              className="py-2 px-16 mb-1 mt-3 bg-green-500 rounded baseline hover:bg-green-300 disabled:opacity-50"
              onClick={async () => {
                try {
                  await Game({
                    functionName: "buyItem",
                    args: [BigInt("3")],
                  });
                } catch (e) {
                  console.error("Error buying Item:", e);
                }
              }}
            >
              Buy
            </button>
            <button
              className="py-2 px-16 mb-1 mt-3 bg-green-500 rounded baseline hover:bg-green-300 disabled:opacity-50"
              onClick={async () => {
                try {
                  await Game({
                    functionName: "usePotionItem",
                    args: [3],
                  });
                } catch (e) {
                  console.error("Error using Potion Item:", e);
                }
              }}
            >
              Use
            </button>
          </div>
          <div className="flex flex-col bg-orange-100 px-10 py-10 text-center items-center max-w-xs rounded-3xl m-1">
            <Image
              className="mb-3"
              src="https://olive-exceptional-viper-654.mypinata.cloud/ipfs/QmP8tvy1kM6MFBABoNuDfoyVZDb7RXFd7AHqYaSZBktqcJ"
              width={150}
              height={150}
              alt="Defense Potion"
            />
            <h2>Defense Potion</h2>
            <p>Inscrease 1 DP</p>
            <p>Cost: {prices && prices[3]?.toString()} RC</p>
            <p>Owned {DefensePotionBalance?.toString()}</p>
            <button
              className="py-2 px-16 mb-1 mt-3 bg-green-500 rounded baseline hover:bg-green-300 disabled:opacity-50"
              onClick={async () => {
                try {
                  await Game({
                    functionName: "buyItem",
                    args: [BigInt("4")],
                  });
                } catch (e) {
                  console.error("Error buying Item:", e);
                }
              }}
            >
              Buy
            </button>
            <button
              className="py-2 px-16 mb-1 mt-3 bg-green-500 rounded baseline hover:bg-green-300 disabled:opacity-50"
              onClick={async () => {
                try {
                  await Game({
                    functionName: "usePotionItem",
                    args: [4],
                  });
                } catch (e) {
                  console.error("Error using Potion Item:", e);
                }
              }}
            >
              Use
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopItem;
