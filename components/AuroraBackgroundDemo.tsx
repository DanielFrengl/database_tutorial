"use client";

import { motion } from "motion/react";
import React from "react";
import { AuroraBackground } from "@/components/ui/AuroraBackround";
import MagicButton from "./ui/MagicButton";
import Link from "next/link";

interface AuroraBackgroundProps {
  title: string;
}

export function AuroraBackgroundDemo({ title }: AuroraBackgroundProps) {
  return (
    <AuroraBackground>
      <motion.div
        initial={{ opacity: 0.0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.3,
          duration: 0.8,
          ease: "easeInOut",
        }}
        className="relative flex flex-col items-center justify-center w-full"
      >
        <div className="text-3xl md:text-7xl font-bold dark:text-white text-center">
          {title}
        </div>
        <div className="flex items-center gap-4">
          <Link href="/auth/registration">
            <MagicButton title="Signup" icon="" position="" otherClasses="" />
          </Link>
          <Link href="/auth">
            <MagicButton title="Login" icon="" position="" otherClasses="" />
          </Link>
        </div>
      </motion.div>
    </AuroraBackground>
  );
}
