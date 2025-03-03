"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./FAQSection.module.css";
import { buttonData } from "../../constants/buttons";
import MyFuseButton from "../MyFuseButton/MyFuseButton";
const faqData = [
  {
    question: "What is MyFuse and why is it the best resume builder?",
    answer:
      "MyFuse is an AI-powered resume builder designed to help job seekers create optimized, ATS-friendly resumes. It enhances your resume with industry-specific keywords, formatting best practices, and real-time scoring to ensure it gets noticed by recruiters and hiring systems.",
  },
  {
    question: "How do you clone a resume?",
    answer:
      "MyFuse allows you to customize your resume for each job application by analyzing job descriptions and suggesting relevant keywords. With AI-driven insights, you can quickly adjust your resume to match specific job requirements, improving your chances of getting shortlisted.",
  },
  {
    question: "What are the AI features offered by MyFuse?",
    answer:
      "MyFuse AI provides instant ATS resume scoring, keyword optimization, grammar suggestions, and job-specific tailoring. It helps improve your resume's visibility in applicant tracking systems, increasing your chances of landing interviews.",
  },
  {
    question: "How can my resume get a high ATS score?",
    answer:
      "To get a high ATS score, ensure your resume includes relevant keywords, clear formatting, and job-specific skills. MyFuse provides a step-by-step guide to improving your score by analyzing your resume against job descriptions.",
  },
  {
    question: "Does MyFuse help with job applications?",
    answer:
      "Yes! MyFuse not only improves your resume but also auto-matches you with relevant job openings. You can apply directly through our platform, ensuring your resume is optimized before submission.",
  },
  {
    question: "Is MyFuse free to use?",
    answer:
      "To get a high ATS score, ensure your resume includes relevant keywords, clear formatting, and job-specific skills. MyFuse provides a step-by-step guide to improving your score by analyzing your resume against job descriptions.MyFuse offers both free and premium plans. The free version allows you to create and analyze your resume, while the premium version provides advanced features like AI-driven optimizations, job application tracking, and custom ATS reports.",
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
        <MyFuseButton
          title={buttonData.FAQSection[0].title}
          onClick={buttonData.FAQSection[0].onClick}
          variant={buttonData.FAQSection[0].variant}
        />
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
        <MyFuseButton
          title={buttonData.FAQSection[0].title}
          onClick={buttonData.FAQSection[0].onClick}
          variant={buttonData.FAQSection[0].variant}
          className={styles.getInTouchDesktop}
        />
      </div>
    </section>
  );
}
