"use client";

import type { NextPage } from "next";
import { formatEther } from "viem";
import { useAccount } from "wagmi";
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

  const { data: prices } = useScaffoldReadContract({
    contractName: "Items",
    functionName: "getPrices",
  });

  const { writeContractAsync: Game } = useScaffoldWriteContract("Game");

  return (
    <div className="flex items-center flex-col flex-grow pt-7">
      <h1 className="text-2xl">Welcome to the Item Shop</h1>
      <div className="text-xl">
        <div className="inline-flex items-center justify-center">
          {parseFloat(formatEther(runeCredit || 0n))}
          <span className="font-bold ml-1">RC</span>
        </div>
      </div>
      <div className="flex">
        <div className="flex flex-col bg-orange-100 px-10 py-10 text-center items-center max-w-xs rounded-3xl m-1">
          <h2>Food</h2>
          <p>Restore 20 SP</p>
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
                console.error("Error buying Item:", e);
              }
            }}
          >
            Use
          </button>
        </div>
        <div className="flex flex-col bg-orange-100 px-10 py-10 text-center items-center max-w-xs rounded-3xl m-1">
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
        </div>
      </div>
    </div>
  );
};

export default ShopItem;
