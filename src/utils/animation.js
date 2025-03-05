/**
 * lottieAnimationController.js
 *
 * This file contains the animation function (initLottieScrollAnimation) which handles:
 *  - Calculating the total scroll height based on the text content.
 *  - Setting the container's height.
 *  - Configuring GSAP/ScrollTrigger animations for both text and Lottie.
 *  - Pinning the section and updating the Lottie animation frame as you scroll.
 *
 * The following commented-out code is an example of how a component (VerticalAnimationSection)
 * uses this animation function:
 *
 * ------------------------------------------------------------
 *
 * "use client";
 * import React, { useRef, useEffect } from "react";
 * import Lottie from "lottie-react";
 * import animationData from "../../assets/animations/MyFuse Animation Sparky.json";
 * import styles from "./VerticalAnimationSection.module.css";
 * import { sections } from "../../constants/animationText";
 * import { initLottieScrollAnimation } from "./lottieAnimationController";
 *
 * function VerticalAnimationSection() {
 *   // Create refs for container, pinned element, text content and Lottie instance.
 *   const containerRef = useRef(null);
 *   const pinnedRef = useRef(null);
 *   const textContentRef = useRef(null);
 *   const lottieRef = useRef(null);
 *
 *   useEffect(() => {
 *     if (
 *       containerRef.current &&
 *       pinnedRef.current &&
 *       textContentRef.current &&
 *       lottieRef.current
 *     ) {
 *       // The animation function handles all calculations and setups.
 *       // (Optionally, you could capture the returned totalHeight if needed.)
 *       initLottieScrollAnimation({
 *         container: containerRef.current,
 *         pinned: pinnedRef.current,
 *         textContent: textContentRef.current,
 *         lottie: lottieRef.current,
 *       });
 *     }
 *   }, []);
 *
 *   return (
 *     <div ref={containerRef} className={styles.root}>
 *       <div ref={pinnedRef} className={styles.pinnedContainer}>
 *         <div className={styles.textSection}>
 *           <div className={styles.textWrapper}>
 *             <div ref={textContentRef} className={styles.textContent}>
 *               {sections.map((item, index) => (
 *                 <div
 *                   key={index}
 *                   className={`${styles.sectionItem} ${
 *                     index === sections.length - 1 ? styles.sectionItemLast : ""
 *                   }`}
 *                 >
 *                   <div className={styles.sectionText}>
 *                     <div className={styles.subtitle}>{item.subtitle}</div>
 *                     <h2 className={styles.title}>{item.title}</h2>
 *                     <p className={styles.description}>{item.text}</p>
 *                   </div>
 *                 </div>
 *               ))}
 *             </div>
 *           </div>
 *         </div>
 *         <div className={styles.animationSection}>
 *           <Lottie
 *             lottieRef={lottieRef}
 *             animationData={animationData}
 *             loop={false}
 *             autoPlay={false}
 *             className={styles.lottieAnimation}
 *           />
 *         </div>
 *       </div>
 *       {/* If you previously used a spacer div with scrollHeight, you can remove it or handle it differently now */ //
/*     //</div>
 *   //);
 * //}
 *
 * export default VerticalAnimationSection;
 *
 * ------------------------------------------------------------
 */

/**
 * initLottieScrollAnimation sets up the scroll-based animation for Lottie and text.
 * It calculates heights, sets container styles, and initializes GSAP/ScrollTrigger animations.
 *
 * @param {Object} params - The parameters object.
 * @param {HTMLElement} params.container - The container element that drives the scroll animation.
 * @param {HTMLElement} params.pinned - The element to be pinned during scrolling.
 * @param {HTMLElement} params.textContent - The text content element that will move on scroll.
 * @param {Object} params.lottie - The Lottie instance (should support goToAndStop).
 * @param {string} [params.textStart="top top"] - ScrollTrigger start value for text animation.
 * @param {number} [params.textScrub=0.1] - Scrub value for text animation.
 * @param {string} [params.lottieStart="top top"] - ScrollTrigger start value for Lottie animation.
 * @param {number} [params.lottieScrub=2] - Scrub value for Lottie animation.
 * @param {number} [params.totalFrames=1380] - Total frames in the Lottie animation.
 * @param {number} [params.frameRatio=0.95] - Fraction of total frames used.
 * @param {number} [params.lottieEndOffset=2000] - Offset to adjust the scroll trigger's end for Lottie animation.
 * @returns {number} The computed totalHeight used for the container.
 */
export function initLottieScrollAnimation({
  container,
  pinned,
  textContent,
  lottie,
  textStart = "top top",
  textScrub = 0.1,
  lottieStart = "top top",
  lottieScrub = 2,
  totalFrames = 1380,
  frameRatio = 0.95,
  lottieEndOffset = 2000,
}) {
  // Dynamically require GSAP and its ScrollTrigger plugin.
  const gsapModule = require("gsap");
  const gsap = gsapModule.gsap || gsapModule;
  const ScrollTriggerModule = require("gsap/ScrollTrigger");
  const ScrollTrigger =
    ScrollTriggerModule.ScrollTrigger || ScrollTriggerModule.default;
  gsap.registerPlugin(ScrollTrigger);

  // Calculate heights and scroll distance.
  const contentHeight = textContent?.clientHeight || 0;
  const scrollDistance = contentHeight - window.innerHeight / 2;
  const totalHeight = scrollDistance + window.innerHeight;

  // Set the container's height.
  if (container) {
    container.style.height = `${totalHeight}px`;
  }

  // Reset the Lottie animation to the first frame.
  if (lottie) {
    lottie.goToAndStop(0, true);
  }

  // Animate text content upward based on scroll.
  gsap.to(textContent, {
    y: -scrollDistance,
    ease: "none",
    scrollTrigger: {
      trigger: container,
      start: textStart,
      end: `+=${totalHeight}`,
      scrub: textScrub,
    },
  });

  // Create a ScrollTrigger to update the Lottie animation based on scroll progress.
  ScrollTrigger.create({
    trigger: container,
    start: lottieStart,
    end: `+=${totalHeight - lottieEndOffset}`,
    scrub: lottieScrub,
    pin: pinned,
    pinSpacing: false,
    onUpdate: (self) => {
      const progress = self.progress;
      const effectiveFrames = totalFrames * frameRatio;
      const currentFrame = effectiveFrames * progress;
      lottie.goToAndStop(currentFrame, true);
    },
    onLeave: () => {
      const effectiveFrames = totalFrames * frameRatio;
      lottie.goToAndStop(effectiveFrames - 10, true);
    },
    onLeaveBack: () => {
      lottie.goToAndStop(0, true);
    },
  });

  // Optionally, return the computed totalHeight if needed.
  return totalHeight;
}
