// src/Layout.js
import React, { useEffect, useRef } from "react";
import Lenis from "@studio-freight/lenis";
import ResponsiveNavbar from "./components/Navbar/Navbar";
import "./assets/styles/global.module.css";

// Global Layout Component
export default function Layout({ children }) {
  return (
    <>
      {" "}
      {/* Place the Navbar at the top of every page */}
      <ResponsiveNavbar />
      {children}
    </>
  );
}
