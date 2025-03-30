import LogoutButton from "@/components/LogoutButton";
import React from "react";
import Link from "next/link";

const page = () => {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <LogoutButton />

      <div className="m-20 p-5 bg-white text-black">
        <Link href={"/instruments"}>Instruments</Link>
      </div>
    </div>
  );
};

export default page;
