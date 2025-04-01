"use client";

import React, { useState } from "react";

export default function AddAppPage() {
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const response = await fetch("../api/addApp/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, url }),
    });

    const result = await response.json();
    setMessage(result.message);
    setLoading(false);

    if (response.ok) {
      setName("");
      setUrl("");
    }
  };

  return (
    <div className="w-screen h-screen bg-dark flex flex-col items-center justify-center">
      <div className="flex flex-row">
        <div className="p-10 bg-gray-900 flex flex-col items-center rounded-l-lg shadow-lg">
          <h1 className="text-5xl text-center text-white mb-6 font-semibold">
            ADD A NEW APP
          </h1>
          <form onSubmit={handleSubmit} className="flex flex-col">
            <div className="flex flex-col mb-3">
              <label htmlFor="name" className="text-white">
                Enter the app name:
              </label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="text-black border rounded bg-white text-center p-2"
                required
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="url" className="text-white">
                Enter the URL:
              </label>
              <input
                id="url"
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="text-black border rounded bg-white text-center p-2"
                required
              />
            </div>
            <button
              type="submit"
              className="px-16 py-3 rounded-2xl shadow bg-white text-black mt-3"
              disabled={loading}
            >
              {loading ? "Submitting..." : "Submit"}
            </button>
          </form>
          {message && <p className="text-white mt-3">{message}</p>}
        </div>
      </div>
    </div>
  );
}
