"use client";

import Link from "next/link";
import type { NextPage } from "next";

const Explore: NextPage = () => {
  return (
    <div className="flex items-center flex-col flex-grow pt-7">
      <h1 className="text-2xl mb-3">Dashboard</h1>
      <div className="flex flex-wrap w-[600px]">
        <div className="flex flex-col bg-orange-100 px-10 py-10 text-center items-center max-w-xs rounded-3xl m-1">
          <Link href="/marketplace/minion" passHref className="link">
            Create Minion
          </Link>
        </div>
        <div className="flex flex-col bg-orange-100 px-10 py-10 text-center items-center max-w-xs rounded-3xl m-1">
          <Link href="/minion/train" passHref className="link">
            Train Minion
          </Link>
        </div>
        <div className="flex flex-col bg-orange-100 px-10 py-10 text-center items-center max-w-xs rounded-3xl m-1">
          <Link href="/minion/rest" passHref className="link">
            Rest Minion
          </Link>
        </div>
        <div className="flex flex-col bg-orange-100 px-10 py-10 text-center items-center max-w-xs rounded-3xl m-1">
          <Link href="/minion/gather" passHref className="link">
            Gather Material
          </Link>
        </div>
        <div className="flex flex-col bg-orange-100 px-10 py-10 text-center items-center max-w-xs rounded-3xl m-1">
          <Link href="/marketplace/item" passHref className="link">
            Shop Item
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Explore;
