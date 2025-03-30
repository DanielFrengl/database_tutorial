"use client";

import { useAuth } from "@/context/AuthContext";
import { useState, useEffect } from "react";

export default function AuthPopup() {
  const { user, loading } = useAuth();
  const [show, setShow] = useState(true);

  if (loading || !show) return null;

  return (
    <div className="fixed top-5 right-5 bg-white shadow-md p-4 rounded-md border border-gray-300">
      <p className="text-sm font-medium text-black">
        {user ? `✅ Logged in as ${user.email}` : "❌ Not logged in"}
      </p>
    </div>
  );
}
