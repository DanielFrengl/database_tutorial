"use client";
import React from "react";
import { SparklesCore } from "./ui/Sparks";
import MagicButton from "./ui/MagicButton";
import { FaLocationArrow } from "react-icons/fa";

export function Hero() {
  return (
    <div className="h-[60vw] w-full bg-black flex flex-col items-center justify-center overflow-hidden rounded-md">
      <h1 className="md:text-5xl text-3xl lg:text-5xl font-bold text-center text-white relative z-20">
        Database Tutorial
      </h1>
      {/* Gradients */}
      <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-[2px] w-3/4 blur-sm" />
      <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-px w-3/4" />
      <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-[5px] w-1/4 blur-sm" />
      <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-px w-1/4" />

      <a
        href="/auth"
        className="text-center flex items-center justify-center z-10"
      >
        <MagicButton
          title="Login"
          icon={<FaLocationArrow />}
          position="right"
        />
      </a>
    </div>
  );
}
