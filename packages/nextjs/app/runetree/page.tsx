"use client";

import Link from "next/link";
import type { NextPage } from "next";
import { Address } from "~~/components/scaffold-eth";
import { BackButton } from "~~/components/ui/BackButton";
import { useScaffoldReadContract } from "~~/hooks/scaffold-eth";

const RuneTree: NextPage = () => {
  const { data: currentRuneTrees } = useScaffoldReadContract({
    contractName: "Game",
    functionName: "getCurrentRuneTrees",
  });

  return (
    <div>
      <BackButton />
      <div className="flex flex-col items-center flex-grow pt-7 bg-gray-50 min-h-screen">
        <div>
          <h1>
            <span className="block text-3xl mb-2">Rune Tree</span>
          </h1>
          <p className="text-gray-500">Create Rune Tree and Stake Rune Credits to earn more</p>
          <p className="text-gray-500">Other can attack your Rune Tree to take your Rune Credits</p>
        </div>

        <Link
          href="/runetree/stake"
          passHref
          className=" py-2 px-16 mb-1 mt-3 bg-green-500 rounded baseline hover:bg-green-400 disabled:opacity-50"
        >
          Go to Stake
        </Link>

        <p className="text-2xl">Current Rune Trees</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 w-full max-w-4xl">
          {currentRuneTrees?.map((tree, index) => (
            <div
              className="bg-teal-200 flex flex-col transition-colors p-6 text-center items-center rounded-xl shadow-lg m-1 w-full"
              key={index}
            >
              <Address address={tree} />
              <Link
                href={`/runetree/tree/${tree}`}
                passHref
                className=" py-2 px-16 mb-1 mt-3 bg-green-500 rounded baseline hover:bg-green-400 disabled:opacity-50"
              >
                View
              </Link>
            </div>
          ))}
        </div>
        {/* <p className="text-red-500">Comming Soon...</p> */}
      </div>
    </div>
  );
};

export default RuneTree;
