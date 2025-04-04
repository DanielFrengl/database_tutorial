"use client";
import React, { useState } from "react";
import { rsaEncrypt } from "./rsaEncryption";
import CopyToClipboard from "@/utils/project/copyToClickboard";
import { IoIosArrowForward } from "react-icons/io";
import { motion, AnimatePresence } from "framer-motion"; // ✅ Correct Import
import { CodeBlock } from "@/components/ui/code-block";
import { code } from "@/lib/codeblocks/rsaencryption";

const RsaEncryptionBlock = () => {
  const [privateKey, setPrivateKey] = useState("");
  const [privateKey2, setPrivateKey2] = useState("");
  const [message, setMessage] = useState("");
  const [encryptedString, setEncryptedString] = useState("");
  const [handleArrow, setHandleArrow] = useState(false);

  const handleConvert = () => {
    const p = parseInt(privateKey);
    const q = parseInt(privateKey2);
    if (isNaN(p) || isNaN(q)) {
      alert("Please enter valid prime numbers!");
      return;
    }
    const encryptedMessage = rsaEncrypt(p, q, message);
    setEncryptedString(encryptedMessage);

    console.log("Encrypted Message:", encryptedMessage);
    console.log("Private Key:", privateKey, privateKey2);
    console.log("Public Key:", p * q);
    console.log("Message:", message);
  };

  return (
    <div className="w-screen h-screen bg-dark flex flex-col items-center justify-center">
      <div className="flex flex-row">
        <div className="p-10 bg-gray-900 flex flex-col items-center rounded-l-lg shadow-lg">
          <h1 className="text-5xl text-center text-white mb-6">
            RSA Encryption
          </h1>

          <input
            type="number"
            value={privateKey}
            onChange={(e) => setPrivateKey(e.target.value)}
            placeholder="Enter a prime number 1"
            className="text-black border rounded bg-white p-3 m-5 w-64 text-center"
          />

          <input
            type="number"
            value={privateKey2}
            onChange={(e) => setPrivateKey2(e.target.value)}
            placeholder="Enter a prime number 2" // ✅ Fixed Placeholder
            className="text-black border rounded bg-white p-3 m-5 w-64 text-center"
          />
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Enter a message"
            className="text-black border rounded bg-white p-3 m-5 w-64 text-center"
          />
          <button
            onClick={handleConvert}
            className="bg-white text-gray-900 px-6 py-3 rounded hover:bg-gray-500 transition"
          >
            Convert!
          </button>

          {encryptedString && (
            <div className="flex flex-col items-center justify-center gap-2 mt-5 text-white">
              <p>
                Private Key: ({privateKey}, {privateKey2})
              </p>{" "}
              {/* ✅ Fixed Formatting */}
              <p>Encrypted: {encryptedString}</p>
              <CopyToClipboard textToCopy={encryptedString} />
            </div>
          )}
        </div>

        {/* Toggle CodeBlock */}
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

        {/* Animated CodeBlock */}
        <AnimatePresence>
          {handleArrow && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="p-4 bg-gray-900 rounded-lg shadow-lg"
            >
              <CodeBlock
                code={code}
                language="ts"
                filename="rsaEncryption.ts"
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default RsaEncryptionBlock;
