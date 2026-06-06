// components/CookieBanner.jsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const accepted = localStorage.getItem("cookiesAccepted");
    if (!accepted) setVisible(true);
  }, []);

  const accept = () => {
    localStorage.setItem("cookiesAccepted", "true");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div style={{
      position: "fixed", bottom: 0, left: 0, right: 0,
      background: "#1a1a1a", color: "#fff",
      padding: "16px 24px",
      display: "flex", alignItems: "center", justifyContent: "space-between",
      gap: "16px", zIndex: 9999, flexWrap: "wrap"
    }}>
      <p style={{ margin: 0, fontSize: "14px" }}>
        We use cookies to improve your experience and serve relevant ads.{" "}
        <Link href="/privacy" style={{ color: "#4ade80", textDecoration: "underline" }}>
          Learn more
        </Link>
      </p>
      <button onClick={accept} style={{
        background: "#258055", color: "#fff", border: "none",
        padding: "8px 20px", borderRadius: "6px",
        cursor: "pointer", fontSize: "14px", whiteSpace: "nowrap"
      }}>
        Got it
      </button>
    </div>
  );
      }
