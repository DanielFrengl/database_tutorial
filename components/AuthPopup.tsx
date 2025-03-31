"use client";

import { useAuth } from "@/context/AuthContext";
import { useState, useEffect } from "react";
import { FaUser } from "react-icons/fa";
import Dropdown from "./ui/DropdownNav";

export default function AuthPopup() {
  const { user, loading } = useAuth();
  const [show, setShow] = useState(true);

  if (loading || !show) return null;

  return (
    <>
      {user ? (
        <Dropdown />
      ) : (
        <a href="/auth" className="p-2 rounded-md bg-black text-white">
          Login
        </a>
      )}
    </>
  );
}
