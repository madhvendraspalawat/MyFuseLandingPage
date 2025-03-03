"use client";
import React, { useRef, useEffect } from "react";
import Lottie from "lottie-react";
import animationData from "../../assets/animations/MyFuse Animation Sparky.json";
import styles from "./AnimationSection.module.css";
import { buttonData } from "../../constants/buttons";
import { sections } from "../../constants/animationText";
import MyFuseButton from "../MyFuseButton/MyFuseButton";

const AnimationSection = () => {
  const containerRef = useRef(null);
  const textContentRef = useRef(null);
  const lottieRef = useRef(null);

  useEffect(() => {
    // Dynamically load GSAP and its ScrollTrigger plugin on the client
    const gsapModule = require("gsap");
    const gsap = gsapModule.gsap || gsapModule;
    const ScrollTriggerModule = require("gsap/ScrollTrigger");
    const ScrollTrigger =
      ScrollTriggerModule.ScrollTrigger || ScrollTriggerModule.default;
    gsap.registerPlugin(ScrollTrigger);

    // Fixed container height based on viewport width
    const totalHeight = window.innerWidth * 2.308;
    if (containerRef.current) {
      containerRef.current.style.height = `${totalHeight}px`;
    }
    const scrollDistance = totalHeight - window.innerHeight;
    lottieRef.current?.goToAndStop(0, true);

    // Animate text content on scroll
    gsap.to(textContentRef.current, {
      y: -scrollDistance,
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.1,
      },
    });

    // Control Lottie animation with scroll progress
    ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top top",
      end: "bottom bottom",
      scrub: 2,
      pin: true,
      pinSpacing: false,
      onUpdate: (self) => {
        const progress = self.progress;
        const totalFrames = 1380;
        const effectiveFrames = totalFrames * 0.95;
        const currentFrame = effectiveFrames * progress;
        lottieRef.current?.goToAndStop(currentFrame, true);
      },
      onLeave: () => {
        const totalFrames = 1380;
        const effectiveFrames = totalFrames * 0.95;
        lottieRef.current?.goToAndStop(effectiveFrames - 10, true);
      },
      onLeaveBack: () => {
        lottieRef.current?.goToAndStop(0, true);
      },
    });
  }, []);

  return (
    <div className={styles.root}>
      <div ref={containerRef} className={styles.containerInner}>
        <div className={styles.gridWrapper}>
          {/* Left Column: Section Content */}
          <div className={styles.leftColumn}>
            <div ref={textContentRef} className={styles.textContent}>
              {sections.map((item, index) => (
                <div
                  key={index}
                  className={`${styles.sectionItem} ${
                    index === 3 ? styles.sectionItemLast : ""
                  }`}
                >
                  <div className={styles.sectionTextWrapper}>
                    <div className={styles.subtitle}>{item.subtitle}</div>
                    <h2 className={styles.title}>{item.title}</h2>
                    <p className={styles.description}>{item.text}</p>
                  </div>
                  <MyFuseButton
                    className={styles.sectionButton}
                    onClick={buttonData.animationSection[index].onClick}
                    variant={buttonData.animationSection[index].variant}
                    title={item.buttonText}
                  />
                </div>
              ))}
            </div>
          </div>
          {/* Right Column: Lottie Animation */}
          <div className={styles.rightColumn}>
            <div className={styles.lottieWrapper}>
              <Lottie
                lottieRef={lottieRef}
                animationData={animationData}
                loop={false}
                autoPlay={false}
                className={styles.lottieAnimation}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnimationSection;
