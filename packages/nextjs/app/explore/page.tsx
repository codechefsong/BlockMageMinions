"use client";

import Link from "next/link";
import type { NextPage } from "next";

const Explore: NextPage = () => {
  return (
    <div className="flex flex-col items-center flex-grow pt-7 bg-gray-50 min-h-screen">
      <h1 className="text-3xl mb-8 font-semibold text-gray-800">Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 w-full max-w-4xl">
        <div className="flex flex-col bg-orange-200 hover:bg-orange-300 transition-colors p-6 text-center items-center rounded-xl shadow-lg m-1 w-full">
          <Link href="/marketplace/minion" passHref className="link">
            <p className="text-lg font-medium text-gray-800">Create Minion</p>
          </Link>
        </div>
        <div className="flex flex-col bg-blue-200 hover:bg-blue-300 transition-colors p-6 text-center items-center rounded-xl shadow-lg m-1 w-full">
          <Link href="/minion/manage" passHref className="link">
            <p className="text-lg font-medium text-gray-800">Manage Minion</p>
          </Link>
        </div>
        <div className="flex flex-col bg-green-200 hover:bg-green-300 transition-colors p-6 text-center items-center rounded-xl shadow-lg m-1 w-full">
          <Link href="/minion/train" passHref className="link">
            <p className="text-lg font-medium text-gray-800">Train Minion</p>
          </Link>
        </div>
        <div className="flex flex-col bg-purple-200 hover:bg-purple-300 transition-colors p-6 text-center items-center rounded-xl shadow-lg m-1 w-full">
          <Link href="/minion/rest" passHref className="link">
            <p className="text-lg font-medium text-gray-800">Rest Minion</p>
          </Link>
        </div>
        <div className="flex flex-col bg-teal-200 hover:bg-teal-300 transition-colors p-6 text-center items-center rounded-xl shadow-lg m-1 w-full">
          <Link href="/minion/gather" passHref className="link">
            <p className="text-lg font-medium text-gray-800">Gather Material</p>
          </Link>
        </div>
        <div className="flex flex-col bg-red-200 hover:bg-red-300 transition-colors p-6 text-center items-center rounded-xl shadow-lg m-1 w-full">
          <Link href="/minion/battle" passHref className="link">
            <p className="text-lg font-medium text-gray-800">Battle Thief</p>
          </Link>
        </div>
        <div className="flex flex-col bg-yellow-200 hover:bg-yellow-300 transition-colors p-6 text-center items-center rounded-xl shadow-lg m-1 w-full">
          <Link href="/marketplace/item" passHref className="link">
            <p className="text-lg font-medium text-gray-800">Shop Item</p>
          </Link>
        </div>
        <div className="flex flex-col bg-pink-200 hover:bg-pink-300 transition-colors p-6 text-center items-center rounded-xl shadow-lg m-1 w-full">
          <Link href="/marketplace/material" passHref className="link">
            <p className="text-lg font-medium text-gray-800">Shop Material</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Explore;
