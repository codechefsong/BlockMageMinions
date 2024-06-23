"use client";

import Link from "next/link";
import type { NextPage } from "next";

const Home: NextPage = () => {
  return (
    <>
      <div
        className="bg-green-200 flex items-center flex-col flex-grow mb-1"
        style={{
          backgroundImage: "url('/farmbackground3.jpg')",
          backgroundSize: "full",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "bottom",
          height: "90vh",
        }}
      >
        <div className="px-5">
          <h1 className="text-center mb-[200px] mt-[100px]">
            <span className="block text-2xl mb-2">Welcome to</span>
            <span className="block text-4xl font-bold">Block Mage Minions</span>
          </h1>

          <p className="text-center text-xl bg-green-300 p-1">Train your minions to become the best</p>
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
      </div>

      <div
        className="flex-grow bg-red-200 w-full px-8 py-12"
        style={{
          backgroundImage: "url('/farmbackground2.jpg')",
          backgroundSize: "full",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "bottom",
          height: "80vh",
        }}
      >
        <div className="text-center">
          <h2 className="mt-3 text-4xl mb-5">Gameplay</h2>
        </div>
        <div className="flex">
          <div className="w-[450px] ml-[150px] mt-[100px]">
            <ul className="list-disc text-xl text-white" style={{ width: "600px" }}>
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
    </>
  );
};

export default Home;
