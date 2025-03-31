"use client";

import React, { useState, useEffect } from "react";
import intToRoman from "@/app/applist/integerToRoman";
import SpotlightCard from "@/components/ui/SpotlightCard";

const IntegerToRoman = () => {
  const [number, setNumber] = useState("");
  const [romanResult, setRomanResult] = useState("");
  const [romanChars, setRomanChars] = useState<string[]>([]);

  const handleConvert = () => {
    const num = parseInt(number);
    if (isNaN(num) || num <= 0 || num > 3999) {
      setRomanResult("Invalid input");
      setRomanChars([]);
    } else {
      const converted = intToRoman(num);
      setRomanResult(converted);
      setRomanChars([]);

      // Add characters one by one with a delay
      converted.split("").forEach((char, index) => {
        setTimeout(() => {
          setRomanChars((prev) => [...prev, char]);
        }, index * 300); // 300ms delay per character
      });
    }
  };

  return (
    <div className="w-screen h-screen bg-white flex flex-col items-center justify-center">
      <div className="p-10 bg-gray-900 flex flex-col items-center rounded-lg shadow-lg">
        <h1 className="text-5xl text-center text-white mb-6">
          Integer to Roman
        </h1>

        {/* Input Field */}
        <input
          type="number"
          value={number}
          onChange={(e) => setNumber(e.target.value)}
          placeholder="Enter a number: 1-3999"
          className="text-black border rounded bg-white p-3 m-5 w-64 text-center"
        />

        {/* Convert Button */}
        <button
          onClick={handleConvert}
          className="bg-white text-gray-900 px-6 py-3 rounded hover:bg-gray-500 transition"
        >
          Convert!
        </button>
      </div>

      {/* Display each Roman numeral character in its own SpotlightCard with fade-in */}
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
