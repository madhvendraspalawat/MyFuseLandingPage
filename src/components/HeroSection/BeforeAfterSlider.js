import React, { useState, useRef, useEffect } from "react";
import { IoCodeSlashOutline } from "react-icons/io5";
import styles from "./BeforeAfterSlider.module.css";

const BeforeAfterSlider = ({ beforeImage, afterImage }) => {
  const containerRef = useRef(null);
  const [sliderPos, setSliderPos] = useState(50);
  const [isDragging, setIsDragging] = useState(false);

  const updateSliderPosition = (clientX) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const offsetX = clientX - rect.left;
    const newSliderPos = (offsetX / rect.width) * 100;
    setSliderPos(Math.max(0, Math.min(newSliderPos, 100)));
  };

  const handleStart = (event) => {
    setIsDragging(true);
    event.preventDefault();
  };

  const handleMove = (event) => {
    if (!isDragging) return;
    const clientX =
      event.touches && event.touches[0]
        ? event.touches[0].clientX
        : event.clientX;
    updateSliderPosition(clientX);
  };

  const handleEnd = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      window.addEventListener("mousemove", handleMove);
      window.addEventListener("mouseup", handleEnd);
      window.addEventListener("touchmove", handleMove, { passive: false });
      window.addEventListener("touchend", handleEnd);
    } else {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mouseup", handleEnd);
      window.removeEventListener("touchmove", handleMove);
      window.removeEventListener("touchend", handleEnd);
    }
    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mouseup", handleEnd);
      window.removeEventListener("touchmove", handleMove);
      window.removeEventListener("touchend", handleEnd);
    };
  }, [isDragging]);

  const clipPath = `polygon(0 0, ${sliderPos}% 0, ${sliderPos}% 100%, 0 100%)`;

  return (
    <div
      ref={containerRef}
      className={styles.container}
      style={{
        userSelect: "none",
        WebkitTapHighlightColor: "transparent",
      }}
    >
      <img src={beforeImage} alt="Before" className={styles.beforeImage} />
      <img
        src={afterImage}
        alt="After"
        className={styles.afterImage}
        style={{
          clipPath,
          transition: isDragging ? "none" : "clip-path 0.2s ease",
        }}
      />
      <div
        className={styles.sliderHandle}
        style={{ left: `${sliderPos}%` }}
        onMouseDown={handleStart}
        onTouchStart={handleStart}
      >
        <div className={styles.verticalLine} />
        <div
          className={styles.circularHandle}
          style={{ WebkitTapHighlightColor: "transparent" }}
        >
          <IoCodeSlashOutline className={styles.iconHandle} />
        </div>
      </div>
    </div>
  );
};

export default BeforeAfterSlider;
