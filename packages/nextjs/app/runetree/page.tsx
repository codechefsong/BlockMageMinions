"use client";

import Link from "next/link";
import type { NextPage } from "next";
import { BackButton } from "~~/components/ui/BackButton";

const RuneTree: NextPage = () => {
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
          Stake
        </Link>

        <p className="text-red-500">Comming Soon...</p>
      </div>
    </div>
  );
};

export default RuneTree;
