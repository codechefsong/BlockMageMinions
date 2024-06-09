"use client";

import Link from "next/link";
import type { NextPage } from "next";

const Explore: NextPage = () => {
  const links = [
    { href: "/marketplace/minion", label: "Create Minion", bg: "bg-orange-200", hoverBg: "hover:bg-orange-300" },
    { href: "/minion/manage", label: "Manage Minion", bg: "bg-blue-200", hoverBg: "hover:bg-blue-300" },
    { href: "/minion/train", label: "Train Minion", bg: "bg-green-200", hoverBg: "hover:bg-green-300" },
    { href: "/minion/rest", label: "Rest Minion", bg: "bg-purple-200", hoverBg: "hover:bg-purple-300" },
    { href: "/minion/gather", label: "Gather Material", bg: "bg-teal-200", hoverBg: "hover:bg-teal-300" },
    { href: "/minion/battle", label: "Battle Thief", bg: "bg-red-200", hoverBg: "hover:bg-red-300" },
    { href: "/marketplace/item", label: "Shop Item", bg: "bg-yellow-200", hoverBg: "hover:bg-yellow-300" },
    { href: "/marketplace/material", label: "Shop Material", bg: "bg-pink-200", hoverBg: "hover:bg-pink-300" },
  ];

  return (
    <div className="flex flex-col items-center flex-grow pt-7 bg-gray-50 min-h-screen">
      <h1 className="text-3xl mb-8 font-semibold text-gray-800">Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 w-full max-w-4xl">
        {links.map((link, index) => (
          <div
            key={index}
            className={`flex flex-col ${link.bg} ${link.hoverBg} transition-colors p-6 text-center items-center rounded-xl shadow-lg m-1 w-full`}
          >
            <Link href={link.href} passHref>
              <p className="text-lg font-medium text-gray-800">{link.label}</p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Explore;
