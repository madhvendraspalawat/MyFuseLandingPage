"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import styles from "./CarouselComponent.module.css";

const slides = [
  {
    id: 1,
    title: "Modern Template",
    preview: "/images/resumeTemplates/resumeTemplate1.png",
  },
  {
    id: 2,
    title: "Professional Template",
    preview: "/images/resumeTemplates/resumeTemplate1.png",
  },
  {
    id: 3,
    title: "Creative Template",
    preview: "/images/resumeTemplates/resumeTemplate9.png",
  },
  {
    id: 4,
    title: "Executive Template",
    preview: "/images/resumeTemplates/resumeTemplate8.png",
  },
  {
    id: 5,
    title: "Elegant Template",
    preview: "/images/resumeTemplates/resumeTemplate2.png",
  },
  {
    id: 6,
    title: "Minimal Template",
    preview: "/images/resumeTemplates/resumeTemplate3.png",
  },
  {
    id: 7,
    title: "Classic Template",
    preview: "/images/resumeTemplates/resumeTemplate4.png",
  },
  {
    id: 8,
    title: "Chic Template",
    preview: "/images/resumeTemplates/resumeTemplate5.png",
  },
  {
    id: 9,
    title: "Vibrant Template",
    preview: "/images/resumeTemplates/resumeTemplate6.png",
  },
  {
    id: 10,
    title: "Simple Template",
    preview: "/images/resumeTemplates/resumeTemplate7.png",
  },
];

function wrapIndex(index, length) {
  return ((index % length) + length) % length;
}

export default function CenterOverlapCarousel() {
  const [page, setPage] = useState(0);
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  // Detect small screens (below 640px)
  useEffect(() => {
    const checkScreenSize = () => {
      setIsSmallScreen(window.innerWidth < 640);
    };
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  // Increase gap between slides on small screens
  const gapMultiplier = 250;
  const effectiveGap = isSmallScreen ? gapMultiplier + 150 : gapMultiplier;

  function paginate(dir) {
    setPage((prev) => wrapIndex(prev + dir, slides.length));
  }

  function getOffset(i) {
    let offset = i - page;
    offset =
      ((offset + slides.length) % slides.length) -
      Math.floor(slides.length / 2);
    return offset;
  }

  // Slide dimensions
  const slideWidth = 350;
  const slideHeight = 490;
  const parallaxFactor = 0.1;
  const transitionSettings = { type: "tween", duration: 0.1, ease: "linear" };

  // --- Pagination dots logic (show a subset) ---
  const maxDots = 5;
  const totalSlides = slides.length;
  const half = Math.floor(maxDots / 2);
  const startDot = Math.max(0, Math.min(page - half, totalSlides - maxDots));
  const visibleDots = slides.slice(startDot, startDot + maxDots);

  return (
    <div className={styles.outerContainer}>
      {/* Heading */}
      <h2 className={styles.heading}>
        100+ Stunning Resume{isSmallScreen ? () => {} : <br />}
        <span className={styles.headingHighlight}>
          Templates at Your Fingertips
        </span>
      </h2>

      {/* Carousel Container */}
      <div className={styles.carouselContainer}>
        {slides.map((slide, i) => {
          const offset = getOffset(i);
          const xPos = offset * effectiveGap;
          const scale = 1 - Math.abs(offset) * 0.05;
          const zIndex = 10 - Math.abs(offset);
          return (
            <motion.div
              key={slide.id}
              className={styles.slideWrapper}
              style={{ zIndex }}
              animate={{ x: xPos, scale }}
              transition={transitionSettings}
            >
              <motion.div
                className={styles.slideImageWrapper}
                style={{ width: slideWidth, height: slideHeight }}
                animate={{ x: -xPos * parallaxFactor }}
                transition={transitionSettings}
              >
                <img
                  src={slide.preview}
                  alt={slide.title}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </motion.div>
            </motion.div>
          );
        })}
      </div>

      {/* Pagination Dots (small screens only) */}
      {isSmallScreen && (
        <div className={styles.paginationContainer}>
          <div className={styles.paginationDots}>
            {visibleDots.map((_, idx) => {
              const dotIndex = startDot + idx;
              return (
                <button
                  key={dotIndex}
                  onClick={() => setPage(dotIndex)}
                  className={styles.dotButton}
                  style={{ opacity: dotIndex === page ? 1 : 0.12 }}
                >
                  {dotIndex === page && (
                    <motion.div
                      layoutId="activeDot"
                      className={styles.activeDot}
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 20,
                      }}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* "USE TEMPLATE" Button for small screens */}
      {isSmallScreen && (
        <div className={styles.smallScreenButtonWrapper}>
          <button className={styles.useTemplateButtonSmall}>
            USE TEMPLATE
          </button>
        </div>
      )}

      {/* Controls Row for larger screens */}
      {!isSmallScreen && (
        <div className={styles.controlsRow}>
          <div className={styles.leftPlaceholder} />
          <div className={styles.centerButtonWrapper}>
            <button className={styles.useTemplateButtonLarge}>
              USE TEMPLATE
            </button>
          </div>
          <div className={styles.paginationButtons}>
            <button
              onClick={() => paginate(-1)}
              className={styles.controlButton}
            >
              <ChevronLeft className={styles.controlIcon} />
            </button>
            <button
              onClick={() => paginate(+1)}
              className={styles.controlButton}
            >
              <ChevronRight className={styles.controlIcon} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
