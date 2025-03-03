"use client";
import React from "react";
import { footerLinks } from "../../constants/footerLinks";
import styles from "./MobileFooterSection.module.css";

export default function MobileFooterSection() {
  return (
    <div className={styles.mobileFooter}>
      <div className={styles.innerWrapper}>
        <div className={styles.topSection}>
          {/* Brand */}
          <div className={styles.brand}>
            MyFuse<span className={styles.brandHighlight}>.</span>In
          </div>
          {/* Subheading */}
          <div className={styles.subheading}>Stand Out, Get Hired Faster</div>
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
        <div className={styles.dividerContainer}>
          <div className={styles.linkGroup}>
            <div className={styles.linkRow}>
              <a href={footerLinks.navLinks[2]}>Home</a>
              <a href={footerLinks.navLinks[2]}>Dashboard</a>
              <a href={footerLinks.navLinks[3]}>Blog</a>
            </div>
            <div className={styles.linkRow}>
              <a href={footerLinks.navLinks[4]}>About Us</a>
              <a href={footerLinks.navLinks[5]}>Contact Us</a>
            </div>
            <div className={styles.linkRow}>
              <a href={footerLinks.legalLinks[2]}>Terms &amp; Conditions</a>
              <a href={footerLinks.legalLinks[3]}>Privacy Policy</a>
            </div>
          </div>
          <div className={styles.socialIcons}>
            {footerLinks.socialLinks.map((social) => (
              <a href={social.redirectURL} key={social.id}>
                {social.icon}
              </a>
            ))}
          </div>
        </div>
        <div className={styles.bottomText}>All rights reserved © 2024</div>
      </div>
    </div>
  );
}
