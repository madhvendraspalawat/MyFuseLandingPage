// src/Layout.js
import React, { useEffect, useRef } from "react";
import Lenis from "@studio-freight/lenis";
import ResponsiveNavbar from "./components/Navbar/Navbar";
import "./assets/styles/global.module.css";

// Create a Lenis wrapper component for smooth scrolling
export function ReactLenis({ children }) {
  const lenisRef = useRef();

  useEffect(() => {
    lenisRef.current = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      smoothTouch: false,
      touchMultiplier: 2,
      wheelMultiplier: 1,
      normalizeWheel: true,
      infinite: false,
    });

    function raf(time) {
      lenisRef.current.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenisRef.current.destroy();
    };
  }, []);

  return <>{children}</>;
}

// Global Layout Component
export default function Layout({ children }) {
  return (
    <ReactLenis>
      {/* Place the Navbar at the top of every page */}
      <ResponsiveNavbar />
      {children}
    </ReactLenis>
  );
}
