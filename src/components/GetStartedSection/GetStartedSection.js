"use client";
import React, { useState, useEffect } from "react";
import styles from "./GetStartedSection.module.css";

export default function GetStartedSection() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const imageSrc = isMobile
    ? "/images/backgrounds/getStartedMobile.svg"
    : "/images/backgrounds/getStarted.svg";

  return (
    <div className={styles.getStartedContainer}>
      <div className={styles.innerContainer}>
        {/* Left Content */}
        <div
          className={`${styles.leftContent} ${
            isMobile ? styles.hAuto : styles.hFull
          }`}
        >
          <div className={styles.headingContainer}>
            <h2 className={styles.getStartedHeading}>
              Start building today. It's Free!
            </h2>
            <p className={styles.getStartedSubheading}>
              Build and Download your first Resume in under 20 minutes.
            </p>
          </div>
          <button
            className={styles.getStartedButton}
            style={{
              border: "none",
              paddingTop: "16px",
              paddingBottom: "16px",
            }}
          >
            craft your resume
          </button>
        </div>
        {/* Right Content */}
        <div className={styles.rightContent}>
          <img
            src={imageSrc}
            alt="Get Started"
            className={styles.getStartedImage}
          />
        </div>
      </div>
    </div>
  );
}
