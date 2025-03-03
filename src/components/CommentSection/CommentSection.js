"use client";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaQuoteLeft } from "react-icons/fa";
import styles from "./CommentSection.module.css";
import { comments } from "../../constants/testimonials";

export default function CommentSection() {
  const [activeCategory, setActiveCategory] = useState("recent graduate");
  const [isMobile, setIsMobile] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollContainerRef = useRef(null);

  // Update isMobile state based on viewport width.
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Filter comments by the active category.
  const filteredComments = comments.filter(
    (comment) => comment.category === activeCategory
  );

  // When scrolling horizontally, update the current index.
  const handleScroll = (e) => {
    const containerWidth = e.currentTarget.clientWidth;
    const index = Math.round(e.currentTarget.scrollLeft / containerWidth);
    setCurrentIndex(index);
  };

  // Scroll smoothly to a particular comment.
  const scrollToIndex = (index) => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({
        left: index * scrollContainerRef.current.clientWidth,
        behavior: "smooth",
      });
    }
  };

  // Pagination Dot Logic for Mobile
  const totalDots = filteredComments.length;
  const windowSize = Math.min(5, totalDots);
  let startDot = 0;
  if (totalDots > windowSize) {
    startDot = currentIndex - Math.floor(windowSize / 2);
    if (startDot < 0) startDot = 0;
    if (startDot > totalDots - windowSize) startDot = totalDots - windowSize;
  }
  const visibleDots = filteredComments.slice(startDot, startDot + windowSize);
  const activeDotInWindow = currentIndex - startDot;

  return (
    <section className={styles.commentSection}>
      <div className={styles.backgroundContainer}>
        <div
          style={
            isMobile
              ? {
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }
              : {}
          }
        >
          {" "}
          {/* Heading & Image */}
          <div
            className={styles.headingContainer}
            style={
              isMobile
                ? {
                    display: "flex",
                    flexDirection: "row-reverse",
                    justifyContent: "center",
                    alignItems: "center",
                    borderBottom: "1px solid #4d4dff",
                    paddingLeft: "16px",
                    paddingRight: "16px",
                  }
                : {}
            }
          >
            <img
              src="/images/animations/testimonialSectionClip.svg"
              alt="Pin"
              className={styles.headingImage}
              style={isMobile ? { transform: "translateY(10px)" } : {}}
            />
            <div
              style={{
                textAlign: "left",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <h2 className={styles.heading} style={{ textAlign: "left" }}>
                Job Seekers Love <br className="hidden md:block" /> MyFuse
              </h2>
            </div>
          </div>
        </div>

        {/* Category Buttons */}
        <div
          className={
            !isMobile ? styles.categoryButton : styles.mobileCategoryButton
          }
          style={
            isMobile
              ? {
                  paddingTop: "16px",
                  width: "100%",
                  justifyContent: "space-around",
                  alignItems: "center",
                }
              : {}
          }
        >
          {[
            "recent graduate",
            "young professional",
            "experienced professional",
          ].map((category) => (
            // Use motion.button on mobile to enable shared layout animation.
            <motion.button
              key={category}
              onClick={() => {
                setActiveCategory(category);
                setCurrentIndex(0);
                if (scrollContainerRef.current) {
                  scrollContainerRef.current.scrollLeft = 0;
                }
              }}
              className={
                !isMobile ? styles.categoryButton : styles.mobileCategoryButton
              }
              style={
                isMobile
                  ? {}
                  : {
                      border: "2px solid #4d4dff",
                      paddingLeft: "12px",
                      paddingRight: "12px",
                    }
              }
              animate={{
                // Change text color when selected.
                color:
                  activeCategory === category
                    ? "var(--my-fuse-blue, #fdc460)"
                    : "#000000",
                backgroundColor:
                  activeCategory === category ? "#fff" : "transparent",
              }}
            >
              {category.toUpperCase().replace("_", " ")}
              {activeCategory === category && (
                <motion.div className={styles.underline} layoutId="underline" />
              )}
            </motion.button>
          ))}
        </div>

        {/* Comments Container */}
        <div
          ref={scrollContainerRef}
          onScroll={handleScroll}
          className={styles.commentsContainer}
          style={{
            touchAction: "pan-x",
            msOverflowStyle: "none",
            scrollbarWidth: "none",
          }}
        >
          {filteredComments.map((comment) => (
            <div key={comment.id} className={styles.commentCard}>
              <img
                src="/images/animations/quotations.svg"
                alt="Quotation Mark"
                className={styles.quotationImage}
              />
              <p className={styles.commentText}>{comment.text}</p>
              <div className={styles.cardFooter}>
                <img
                  src={comment.profile}
                  alt={comment.name}
                  className={styles.profileImage}
                />
                <span className={styles.commentName}>{comment.name}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination Dots (Mobile Only) */}
        {isMobile && totalDots > 1 && (
          <div className={styles.paginationDots}>
            {visibleDots.map((_, i) => (
              <button
                key={i}
                onClick={() => scrollToIndex(i + startDot)}
                className={`${styles.dot} ${
                  activeDotInWindow === i
                    ? styles.activeDot
                    : styles.inactiveDot
                }`}
                style={{ border: "1px solid #4d4dff" }}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
