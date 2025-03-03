"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./FAQSection.module.css";

const faqData = [
  {
    question: "What is MyFuse and why is it the best resume builder?",
    answer:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  },
  {
    question: "How do you clone a resume?",
    answer:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    question: "What are the AI features offered by MyFuse?",
    answer:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    question: "How can my resume get a high ATS score?",
    answer:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(0);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className={styles.faqSection}>
      {/* Right Column: FAQ List */}
      <div className={styles.faqList}>
        {faqData.map((faq, index) => {
          const isOpen = openIndex === index;
          return (
            <div
              key={index}
              className={styles.faqItem}
              style={
                index === 0
                  ? { paddingBottom: "2.25rem" }
                  : { paddingTop: "2.25rem", paddingBottom: "2.25rem" }
              }
            >
              {/* FAQ Question Toggle */}
              <button
                onClick={() => toggleFAQ(index)}
                className={styles.faqToggle}
                style={{ backgroundColor: "transparent", border: "none" }}
              >
                <span>{faq.question}</span>
                <span>
                  {isOpen ? (
                    <img src="/images/icons/subtract.svg" alt="Minus" />
                  ) : (
                    <img src="/images/icons/Add.svg" alt="Plus" />
                  )}
                </span>
              </button>

              {/* Smooth Open/Close Animation with Framer Motion */}
              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    layout
                    key="content"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className={styles.faqAnswer}
                  >
                    <p>{faq.answer}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}

        {/* Get in Touch Button - Mobile Only */}
        <button
          className={styles.getInTouchMobile}
          style={{ border: "none", paddingTop: "16px", paddingBottom: "16px" }}
        >
          get in touch
        </button>
      </div>

      {/* Left Column: Heading, Subheading */}
      <div className={styles.faqHeadingCol}>
        <div className={styles.headingGroup}>
          <h2>Frequently asked questions</h2>
          <p>
            If you are new to MyFuse these Frequently asked questions can help
            you get started
          </p>
        </div>
        {/* Get in Touch Button - Default for Desktop */}
        <button className={styles.getInTouchDesktop} style={{ border: "none" }}>
          get in touch
        </button>
      </div>
    </section>
  );
}
