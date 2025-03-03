"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { imageLinks } from "../../constants/featureImages";
import styles from "./StorySection.module.css";

function StorySection() {
  // Use the appropriate image set (big for desktop, small for mobile)
  const [activeImages, setActiveImages] = useState(imageLinks.big);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsMobile(true);
        setActiveImages(imageLinks.small);
      } else {
        setIsMobile(false);
        setActiveImages(imageLinks.big);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Carousel images array
  const images = activeImages;

  // Current slide index
  const [currentIndex, setCurrentIndex] = useState(0);

  // Define separate slide widths and gaps for mobile and desktop
  const mobileSlidePx = 400;
  const desktopSlidePx = 800;
  const mobileGap = 24;
  const desktopGap = 24;

  // Choose slidePx and gap based on isMobile flag
  const slidePx = isMobile ? mobileSlidePx : desktopSlidePx;
  const gap = isMobile ? mobileGap : desktopGap;

  // Reference to carousel container and measure its width
  const carouselRef = useRef(null);
  const [containerWidth, setContainerWidth] = useState(0);

  useEffect(() => {
    function updateContainerWidth() {
      if (carouselRef.current) {
        setContainerWidth(carouselRef.current.offsetWidth);
      }
    }
    updateContainerWidth();
    window.addEventListener("resize", updateContainerWidth);
    return () => window.removeEventListener("resize", updateContainerWidth);
  }, []);

  // Effective width accounts for the horizontal padding (16px on each side => 32px total)
  const effectiveWidth = containerWidth - 32;

  // Calculate separate offsets for mobile and desktop.
  const mobileOffset =
    effectiveWidth > 0
      ? (effectiveWidth - mobileSlidePx) / 2 -
        currentIndex * (mobileSlidePx + mobileGap)
      : 0;
  const desktopOffset =
    effectiveWidth > 0
      ? (effectiveWidth - desktopSlidePx) * 0.434 -
        currentIndex * (desktopSlidePx + desktopGap)
      : 0;

  // Use the appropriate offset based on screen size.
  const computedOffset = isMobile ? mobileOffset : desktopOffset;

  // Arrow handlers
  const handleNext = () => {
    setCurrentIndex((prev) => Math.min(prev + 1, images.length - 1));
  };
  const handlePrev = () => {
    setCurrentIndex((prev) => Math.max(prev - 1, 0));
  };

  // Drag handler for mobile: update index if dragged more than half a slide
  const handleDragEnd = (event, info) => {
    if (!carouselRef.current) return;
    if (info.offset.x < -slidePx / 2) {
      setCurrentIndex((prev) => Math.min(prev + 1, images.length - 1));
    } else if (info.offset.x > slidePx / 2) {
      setCurrentIndex((prev) => Math.max(prev - 1, 0));
    }
  };

  // Dot pagination logic (mobile only)
  const windowSize = 7;
  const totalDots = images.length;
  let startDot = 0;
  if (totalDots > windowSize) {
    startDot = currentIndex - Math.floor(windowSize / 2);
    if (startDot < 0) startDot = 0;
    if (startDot > totalDots - windowSize) startDot = totalDots - windowSize;
  }
  const visibleDots = images.slice(startDot, startDot + windowSize);
  const activeDotInWindow = currentIndex - startDot;

  return (
    <div
      className={styles.container}
      style={{
        backgroundImage: isMobile
          ? "url('/images/backgrounds/featureSectionPhone.svg')"
          : "url('/images/backgrounds/featureSection.svg')",
      }}
    >
      {/* Heading */}
      <div className={styles.headingWrapper}>
        <div className={styles.headingText}>
          For you, Make the <br />
          <span className={styles.myFuseBlue}>Algorithm Work</span>
        </div>

        {/* Carousel Container */}
        <div className={styles.carouselContainer} ref={carouselRef}>
          <motion.div
            className={styles.carouselInner}
            animate={{ x: computedOffset }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            drag={isMobile ? "x" : false}
            onDragEnd={isMobile ? handleDragEnd : undefined}
            style={{ display: "flex", gap: `${gap}px` }}
          >
            {images.map((link, index) => (
              <div key={index} className={styles.slideWrapper}>
                {link ? (
                  <img
                    src={link}
                    alt={`Slide ${index}`}
                    width={isMobile ? 260 : 800}
                    height={400}
                    className={styles.slideImage}
                  />
                ) : (
                  <div className={styles.placeholder} />
                )}
              </div>
            ))}
          </motion.div>
        </div>

        {/* Arrow Buttons (desktop only) */}
        {!isMobile && (
          <div className={styles.arrowButtonsContainer}>
            <button
              onClick={handlePrev}
              className={styles.arrowButton}
              disabled={currentIndex === 0}
              style={{ border: "none" }}
            >
              <img
                width={24}
                height={24}
                src="/images/icons/Arrow_right.svg"
                alt="Previous Slide"
              />
            </button>
            <button
              onClick={handleNext}
              className={styles.arrowButton}
              disabled={currentIndex === images.length - 1}
              style={{ border: "none" }}
            >
              <img
                width={24}
                height={24}
                src="/images/icons/Arrow_right.svg"
                className={styles.rotate180}
                alt="Next Slide"
              />
            </button>
          </div>
        )}

        {/* Dot Pagination (mobile only) */}
        {isMobile && (
          <div className={styles.paginationDots}>
            {visibleDots.map((_, i) => (
              <div
                key={i}
                className={`${styles.dot} ${
                  i === activeDotInWindow
                    ? styles.activeDot
                    : styles.inactiveDot
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default StorySection;
