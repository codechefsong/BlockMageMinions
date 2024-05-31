"use client";

import Image from "next/image";
import Link from "next/link";
import type { NextPage } from "next";

const Home: NextPage = () => {
  return (
    <>
      <div className="flex items-center flex-col flex-grow pt-10">
        <div className="px-5">
          <h1 className="text-center">
            <span className="block text-2xl mb-2">Welcome to</span>
            <span className="block text-4xl font-bold">Block Mage Minions</span>
          </h1>
          <center>
            <Image
              className="mb-3"
              src="https://olive-exceptional-viper-654.mypinata.cloud/ipfs/QmZx4FuZqqSQ9f3MMnsX46ts4RXufRSMAH2byyYy9bqPkH"
              width={150}
              height={150}
              alt="Minions"
            />
          </center>

          <p className="text-center text-lg mb-0">Train your minions to become the best</p>
          <div className="flex justify-center mb-2">
            <Link
              href="/explore"
              passHref
              className=" py-2 px-16 mb-1 mt-3 bg-green-500 rounded baseline hover:bg-green-400 disabled:opacity-50"
            >
              Get Started
            </Link>
          </div>
        </div>

        <div className="flex-grow bg-blue-200 w-full mt-16 px-8 py-12">
          <div className="text-center">
            <h2 className="mt-3 text-4xl mb-5">Gameplay</h2>
          </div>
          <div className="flex justify-center">
            <div className="w-[700px]">
              <ul className="list-disc text-xl" style={{ width: "600px" }}>
                <li>Create BlockMage Minions</li>
                <li>Gather resources</li>
                <li>Train your Minions</li>
                <li>Buy potion to make your Minions stronger</li>
                <li>Buy food to recover your stamina points</li>
                <li>Each actions for minions cost SP</li>
                <li>Gather resources and sell them for Rune Credits</li>
                <li>Battle thief to earn Rune Credits</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
