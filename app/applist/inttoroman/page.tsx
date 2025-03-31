"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion"; // Import Framer Motion
import intToRoman from "@/app/applist/inttoroman/integerToRoman";
import SpotlightCard from "@/components/ui/SpotlightCard";
import { LuClipboardCopy } from "react-icons/lu";
import CopyToClipboard from "@/utils/project/copyToClickboard";
import { IoIosArrowForward } from "react-icons/io";
import { CodeBlock } from "@/components/ui/code-block";
import { code } from "@/lib/codeblocks/inttoroman";

const IntegerToRoman = () => {
  const [number, setNumber] = useState("");
  const [romanResult, setRomanResult] = useState("");
  const [romanChars, setRomanChars] = useState<string[]>([]);
  const [handleArrow, setHandleArrow] = useState(false);

  const handleConvert = () => {
    const num = parseInt(number);
    if (isNaN(num) || num <= 0 || num > 3999) {
      setRomanResult("Invalid input");
      setRomanChars([]);
    } else {
      const converted = intToRoman(num);
      setRomanResult(converted);
      setRomanChars([]);

      converted.split("").forEach((char, index) => {
        setTimeout(() => {
          setRomanChars((prev) => [...prev, char]);
        }, index * 100);
      });
    }
  };

  return (
    <div className="w-screen h-screen bg-dark flex flex-col items-center justify-center">
      <div className="flex flex-row">
        <div className="p-10 bg-gray-900 flex flex-col items-center rounded-l-lg shadow-lg">
          <h1 className="text-5xl text-center text-white mb-6">
            Integer to Roman
          </h1>

          <input
            type="number"
            value={number}
            onChange={(e) => setNumber(e.target.value)}
            placeholder="Enter a number: 1-3999"
            className="text-black border rounded bg-white p-3 m-5 w-64 text-center"
          />

          <button
            onClick={handleConvert}
            className="bg-white text-gray-900 px-6 py-3 rounded hover:bg-gray-500 transition"
          >
            Convert!
          </button>

          {romanResult && (
            <div className="flex flex-row items-center justify-center gap-2 mt-5">
              <p>Result: {romanResult}</p>
              <CopyToClipboard textToCopy={romanResult} />
            </div>
          )}
        </div>

        {/* Arrow Button to Toggle CodeBlock */}
        <div
          className="bg-gray-800 rounded-r flex items-center px-2 hover:bg-gray-400 hover:text-black cursor-pointer"
          onClick={() => setHandleArrow((prev) => !prev)}
        >
          <IoIosArrowForward
            className={`transition-transform duration-300 ${
              handleArrow ? "rotate-90" : ""
            }`}
          />
        </div>

        {/* Animate Presence for Fade-In/Out Effect */}
        <AnimatePresence>
          {handleArrow && (
            <motion.div
              initial={{ opacity: 0, y: -10 }} // Start hidden & slightly above
              animate={{ opacity: 1, y: 0 }} // Fade in & move down
              exit={{ opacity: 0, y: -10 }} // Fade out & move up
              transition={{ duration: 0.3 }} // Animation speed
              className="p-4 bg-gray-900 rounded-lg shadow-lg"
            >
              <CodeBlock code={code} language="ts" filename="intToRoman.ts" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="flex flex-wrap gap-4 mt-6">
        {romanResult !== "Invalid input" ? (
          romanChars.map((char, index) => (
            <SpotlightCard key={index} title={char} delay={index * 0.3} />
          ))
        ) : (
          <p className="text-red-500 text-xl">{romanResult}</p>
        )}
      </div>
    </div>
  );
};

export default IntegerToRoman;
