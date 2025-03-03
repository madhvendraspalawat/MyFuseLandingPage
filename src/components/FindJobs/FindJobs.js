"use client";
import React, { useState, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import styles from "./FindJobs.module.css";

const jobs = [
  {
    id: 1,
    logo: "/images/companylogos/pslogo.svg",
    title: "Senior Product Designer - Growth",
    category: "Photoshop",
    location: "Kabul, New, Afghanistan",
    type: "On-site",
    posted: "2 days ago",
  },
  {
    id: 2,
    logo: "/images/companylogos/rjslogo.svg",
    title: "Frontend Developer",
    category: "React.js",
    location: "New York, USA",
    type: "Remote",
    posted: "5 days ago",
  },
  {
    id: 3,
    logo: "/images/companylogos/nodejslogo.svg",
    title: "Backend Engineer",
    category: "Node.js",
    location: "Berlin, Germany",
    type: "Hybrid",
    posted: "1 week ago",
  },
  {
    id: 4,
    logo: "/images/companylogos/figma.svg",
    title: "UX/UI Designer",
    category: "Figma",
    location: "London, UK",
    type: "On-site",
    posted: "3 days ago",
  },
  {
    id: 5,
    logo: "/images/companylogos/figma.svg",
    title: "UX/UI Designer",
    category: "Figma",
    location: "London, UK",
    type: "On-site",
    posted: "3 days ago",
  },
  {
    id: 6,
    logo: "/images/companylogos/figma.svg",
    title: "UX/UI Designer",
    category: "Figma",
    location: "London, UK",
    type: "On-site",
    posted: "3 days ago",
  },
];

export default function FindJobs() {
  const slideWidth = 324;
  const maxIndex = jobs.length - 1;

  const [currentIndex, setCurrentIndex] = useState(0);
  const controls = useAnimation();

  // Animate to the current index
  const animateToIndex = (newIndex) => {
    controls.start({
      x: `-${newIndex * slideWidth}px`,
      transition: { duration: 0.6, ease: "easeInOut" },
    });
  };

  // Handle Swipe for Mobile
  const handleSwipe = (direction) => {
    if (direction === "left" && currentIndex < maxIndex) {
      setCurrentIndex(currentIndex + 1);
    } else if (direction === "right" && currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  useEffect(() => {
    animateToIndex(currentIndex);
  }, [currentIndex]);

  // Handle Previous and Next Buttons (Desktop Only)
  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < maxIndex) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  return (
    <section className={styles.findJobsSection}>
      {/* Heading */}
      <h2 className={styles.heading}>Find Matching Jobs</h2>
      <p className={styles.subheading}>
        Create or upload your resume to match relevant job opportunities
      </p>

      {/* Carousel Container */}
      <div className={styles.carouselContainer}>
        <div className={styles.carouselWrapper}>
          <motion.div
            className={styles.carouselTrack}
            // Add touch-action style so vertical scrolls work:
            style={{ touchAction: "pan-y" }}
            animate={controls}
            drag="x"
            dragConstraints={{ left: -slideWidth * maxIndex, right: 0 }}
            dragDirectionLock={true}
            dragPropagation={true}
            dragElastic={0.2}
            dragMomentum={false}
            onDragEnd={(event, info) => {
              if (info.offset.x < -50) {
                handleSwipe("left");
              } else if (info.offset.x > 50) {
                handleSwipe("right");
              }
            }}
          >
            {jobs.map((job) => (
              <div key={job.id} className={styles.jobCard}>
                <div className={styles.cardTop}>
                  <div className={styles.logoContainer}>
                    <img
                      src={job.logo}
                      alt="Company Logo"
                      className="w-12 h-12"
                      style={{ width: "3rem", height: "3rem" }}
                    />
                  </div>
                  <div className={styles.jobTitleSection}>
                    <h3 className={styles.jobTitle}>{job.title}</h3>
                    <p className={styles.jobCategory}>{job.category}</p>
                  </div>
                </div>
                <div className={styles.jobDetails}>
                  <p>{job.location}</p>
                  <p>{job.type}</p>
                </div>
                <p className={styles.postedInfo}>⏳ Posted {job.posted}</p>
                <hr className={styles.divider} />
                <button className={styles.viewDetailsButton}>
                  VIEW DETAILS
                </button>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Dot Indicators (Hidden on Desktop) */}
      <div className={styles.dotIndicators}>
        {jobs.map((_, index) => (
          <span
            key={index}
            className={`${styles.dot} ${
              index === currentIndex ? styles.activeDot : styles.inactiveDot
            }`}
          />
        ))}
      </div>

      {/* Navigation Buttons (Desktop Only) */}
      <div className={styles.navButtonsContainer}>
        <div className={styles.emptyDiv} />
        <div className={styles.findMoreCenter}>
          <button>Find more</button>
        </div>
        <div className={styles.navButtons}>
          <button
            onClick={handlePrev}
            disabled={currentIndex === 0}
            className={styles.navButton}
          >
            <FaArrowLeft />
          </button>
          <button
            onClick={handleNext}
            disabled={currentIndex === maxIndex}
            className={styles.navButton}
          >
            <FaArrowRight />
          </button>
        </div>
      </div>
    </section>
  );
}
