"use client";
import React from "react";
import { footerLinks } from "../../constants/footerLinks";
import styles from "./DesktopFooterSection.module.css";

function DesktopFooterSection() {
  return (
    <div className={styles.outerContainer}>
      {/* Top Row */}
      <div className={styles.topRow}>
        {/* Left Column: Brand, Subheading, Subscription */}
        <div className={styles.leftColumn}>
          {/* Brand */}
          <div className={styles.brand}>
            MyFuse<span className={styles.brandHighlight}>.</span>In
          </div>
          {/* Subheading */}
          <div className={styles.subheading}>
            What is MyFuse and why is it the best resume builder?
          </div>
          {/* Subscription */}
          <div className={styles.subscription}>
            <input
              type="email"
              placeholder="Enter your email address"
              className={styles.subscriptionInput}
            />
            <button className={styles.subscriptionButton}>SUBSCRIBE</button>
          </div>
        </div>

        {/* Right Column: “Company” heading + Nav Links */}
        <div className={styles.rightColumn}>
          {/* First nav item as heading */}
          <span>{footerLinks.navLinks[0].name}</span>
          {/* Remaining nav items */}
          {footerLinks.navLinks.slice(1).map((item) => (
            <a key={item.id} href={item.redirectURL}>
              {item.name}
            </a>
          ))}
        </div>
      </div>

      {/* Bottom Row */}
      <div className={styles.bottomRow}>
        {/* Legal Links: single line with pipes */}
        <div className={styles.legalLinks} style={{ color: "#FFFFFF" }}>
          {footerLinks.legalLinks.map((item, idx) => (
            <React.Fragment key={item.id} style={{ color: "#FFFFFF" }}>
              <a
                href={item.id !== 1 ? item.redirectURL : "#"}
                className={item.id === 1 ? "pointer-events-none" : ""}
              >
                {item.name}
              </a>
              {idx < footerLinks.legalLinks.length - 1 && (
                <span className={styles.legalPipe}>|</span>
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Social Icons */}
        <div className={styles.socialIcons}>
          {footerLinks.socialLinks.map((social) => (
            <a
              href={social.redirectURL}
              key={social.id}
              style={{ color: "#fdc460" }}
            >
              {social.icon}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

export default DesktopFooterSection;
