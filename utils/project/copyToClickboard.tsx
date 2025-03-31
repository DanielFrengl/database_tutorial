import React, { useState } from "react";
import { LuClipboardCopy } from "react-icons/lu";

interface CopyToClipboardProps {
  textToCopy: string;
}

const CopyToClipboard: React.FC<CopyToClipboardProps> = ({ textToCopy }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // Reset after 2 seconds
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  return (
    <div>
      <div
        className="flex flex-row items-center gap-1 bg-white text-black rounded-2xl p-1 cursor-pointer"
        onClick={handleCopy}
      >
        {/* If copied, display 'Copied!' */}
        {copied ? (
          <>
            <span>Copied!</span> <LuClipboardCopy className="text-green-500" />
          </>
        ) : (
          <>
            <span>Copy</span> <LuClipboardCopy />
          </>
        )}
      </div>
    </div>
  );
};

export default CopyToClipboard;
