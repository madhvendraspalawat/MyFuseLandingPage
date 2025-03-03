"use client";
import "../../assets/styles/global.module.css";
import React, { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./Navbar.module.css";
import MyFuseButton from "../MyFuseButton/MyFuseButton";
import { buttonData } from "../../constants/buttons";

export default function ResponsiveNavbar() {
  const [isMobile, setIsMobile] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Check screen size on mount & resize
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (isMobile) {
    // MOBILE NAVBAR (with Framer Motion transitions)
    return (
      <div className={styles.mobileContainer}>
        {/* Gray bar at very top */}
        <div className={styles.mobileTopBar} />

        {/* CLOSED STATE: Small navbar + purple bar */}
        {!isMenuOpen && (
          <div className={styles.mobileClosedWrapper}>
            {/* White navbar with hamburger & brand */}
            <div className={styles.whiteNav}>
              <button
                onClick={() => setIsMenuOpen(true)}
                style={{ backgroundColor: "white", border: "none" }}
              >
                <Menu className={styles.icon} />
              </button>
              <div className={styles.brand}>
                <img
                  src="/images/icons/MyFuseMascot.png"
                  width={36}
                  height={36}
                  style={{ display: "flex", objectPosition: "end" }}
                />
                MyFuse<span className={styles.brandHighlight}>.</span>In
              </div>
              {/* Spacer to center the brand */}
              <div style={{ width: "24px" }} />
            </div>
            {/* Purple bar below navbar */}
            <div className={styles.purpleBar}>TRY RESUME BUILDER NOW</div>
          </div>
        )}

        {/* OPEN STATE: Overlay menu with Framer Motion */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              className={styles.overlayMenu}
              initial={{ y: "-100%" }}
              animate={{ y: 0 }}
              exit={{ y: "-100%" }}
              transition={{ duration: 0.3 }}
            >
              {/* Gray bar at top inside overlay */}
              <div className={styles.overlayTopBar} />
              {/* Header row: Close icon & brand */}
              <div className={styles.overlayHeader}>
                <button
                  onClick={() => setIsMenuOpen(false)}
                  style={{ backgroundColor: "white", border: "none" }}
                >
                  <X className={styles.icon} />
                </button>
                <div className={styles.brand}>
                  MyFuse<span className={styles.brandHighlight}>.</span>In
                </div>
                <div style={{ width: "24px" }} />
              </div>
              {/* Nav links */}
              <div className={styles.overlayNavLinks}>
                <a
                  href="#"
                  className={styles.overlayNavLink}
                  style={{
                    borderBottom: "1px solid #d1d5db",
                    paddingBottom: "15px",
                  }}
                >
                  AI Resume
                </a>
                <a
                  href="#"
                  className={styles.overlayNavLink}
                  style={{
                    paddingBottom: "15px",
                    paddingTop: "15px",
                    borderBottom: "1px solid #d1d5db",
                  }}
                >
                  Blog
                </a>
                <a
                  href="#"
                  className={styles.overlayNavLink}
                  style={{
                    borderBottom: "1px solid #d1d5db",
                    paddingBottom: "15px",
                    paddingTop: "15px",
                  }}
                >
                  Jobs
                </a>
                <a
                  href="#"
                  className={styles.overlayNavLink}
                  style={{ paddingTop: "15px" }}
                >
                  Pricing
                </a>
              </div>
              {/* Purple bar at bottom */}
              <div className={styles.purpleBar}>TRY RESUME BUILDER NOW</div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  } else {
    // KTOP NAVBAR (for larger layouts)
    return (
      <main className={styles.desktopMain}>
        <nav className={styles.desktopNav}>
          <div className={styles.desktopContainer}>
            <div className={styles.desktopLinksWrapper}>
              <a href="#" className={styles.desktopBrand}>
                <img
                  src="/images/icons/MyFuseMascot.png"
                  width={36}
                  height={36}
                />
                MyFuse<span className={styles.brandHighlight}>.</span>In
              </a>
              <a href="#" className={styles.desktopNavLink}>
                AI Resume
              </a>
              <a href="#" className={styles.desktopNavLink}>
                Blog
              </a>
              <a href="#" className={styles.desktopNavLink}>
                Jobs
              </a>
              <a href="#" className={styles.desktopNavLink}>
                Pricing
              </a>
            </div>
            {/* Render dynamic button from buttonData.navbar */}
            {buttonData.navbar.map((btn, index) => (
              <MyFuseButton
                key={index}
                title={btn.title}
                variant={btn.variant}
                onClick={btn.onClick}
                className={`${styles.desktopButton} ${btn.className}`}
              />
            ))}
          </div>
        </nav>
        {/* Spacer so content isn't hidden by the fixed navbar */}
        <div className={styles.desktopSpacer} />
      </main>
    );
  }
}
