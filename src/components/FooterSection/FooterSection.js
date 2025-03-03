"use client";
import React, { useState, useEffect } from "react";
import { footerLinks } from "../../constants/footerLinks";
import MobileFooterSection from "./MobileFooterSection";
import DesktopFooterSection from "./DesktopFooterSection";
import styles from "./FooterSection.module.css";

function FooterSection() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className={styles.footerSection}>
      {isMobile ? <MobileFooterSection /> : <DesktopFooterSection />}
    </div>
  );
}

export default FooterSection;
