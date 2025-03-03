"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { journeySection } from "../../constants/journeySection";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import styles from "./CustomerJourney.module.css";

// Motion variants for content (front) and overlay (back)
const contentVariants = {
  initial: { opacity: 1 },
  hover: { opacity: 0, transition: { duration: 0.3, ease: "easeInOut" } },
};

const overlayVariants = {
  initial: { opacity: 0 },
  hover: { opacity: 1, transition: { duration: 0.3, ease: "easeInOut" } },
};

export default function CustomerJourney() {
  const [hoveredCard, setHoveredCard] = useState(null);

  return (
    <div className={styles.container}>
      {/* Heading */}
      <div className={styles.heading}>Your Journey with Us</div>
      <div className={styles.subheading}>
        Land your dream job in just 3 simple steps!
      </div>

      {/* Desktop Cards */}
      <div className={styles.desktopCards}>
        {journeySection.map((item) => (
          <div
            key={item.id}
            onMouseEnter={() => setHoveredCard(item.id)}
            onMouseLeave={() => setHoveredCard(null)}
            className={styles.desktopCard}
          >
            {/* Front Content */}
            <motion.div
              className={styles.frontContent}
              variants={contentVariants}
              animate={hoveredCard === item.id ? "hover" : "initial"}
            >
              <div className={styles.frontId}>{item.id}</div>
              <img
                src={item.icon}
                width={52}
                height={52}
                alt={`Icon ${item.id}`}
                style={{ margin: "0.5rem 0" }}
              />
              <div className={styles.frontTitle}>{item.title}</div>
            </motion.div>

            {/* Back Content (Revealed on Hover) */}
            <motion.div
              className={styles.backContent}
              variants={overlayVariants}
              animate={hoveredCard === item.id ? "hover" : "initial"}
            >
              <p className={styles.backText}>
                {item.revealText || "Learn More"}
              </p>
              <button className={styles.backButton}>
                <FaArrowRight />
              </button>
            </motion.div>
          </div>
        ))}
      </div>

      {/* Mobile Cards */}
      <div className={styles.mobileCards}>
        {journeySection.map((item) => (
          <div key={item.id} className={styles.mobileCard}>
            <div className={styles.mobileCardTop}>
              <img src={item.icon} alt="Icon" className={styles.mobileIcon} />
              <span className={styles.mobileTitle}>{item.title}</span>
            </div>
            <div className={styles.mobileCardBottom}>
              <p className={styles.mobileText}>
                {item.revealText || "Learn More"}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Start Now Button */}
      <button
        className={styles.startButton}
        style={{ border: "none", paddingTop: "16px", paddingBottom: "16px" }}
      >
        Start Now
      </button>
    </div>
  );
}
