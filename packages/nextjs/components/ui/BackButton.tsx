"use client";

import { useRouter } from "next/navigation";

export const BackButton = () => {
  const router = useRouter();

  return (
    <button className="btn btn-sm btn-primary mt-5 ml-6" onClick={() => router.push(`/explore`)}>
      Go Back
    </button>
  );
};
