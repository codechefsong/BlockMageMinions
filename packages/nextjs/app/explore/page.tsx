"use client";

import Link from "next/link";
import type { NextPage } from "next";
import { useAccount } from "wagmi";

const Explore: NextPage = () => {
  const { address } = useAccount();

  return (
    <div className="flex items-center flex-col flex-grow pt-7">
      <h1>Welcome {address}</h1>
      <div className="flex flex-col bg-base-100 px-10 py-10 text-center items-center max-w-xs rounded-3xl">
        <Link href="/marketplace/minion" passHref className="link">
          Create Minion
        </Link>
      </div>
    </div>
  );
};

export default Explore;
