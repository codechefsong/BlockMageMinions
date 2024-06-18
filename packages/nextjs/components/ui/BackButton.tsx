"use client";

import React from "react";
import { useRouter } from "next/navigation";

interface PathProps {
  path?: string;
}

export const BackButton: React.FC<PathProps> = ({ path }) => {
  const router = useRouter();

  return (
    <button className="btn btn-sm btn-primary mt-5 ml-6" onClick={() => router.push(path || "/explore")}>
      Go Back
    </button>
  );
};
