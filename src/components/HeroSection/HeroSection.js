import React, { useState, useEffect } from "react";
import BeforeAfterSlider from "./BeforeAfterSlider";
import MyFuseButton from "../MyFuseButton/MyFuseButton"; // Adjust the path if needed
import styles from "./HeroSection.module.css";

const HeroSection = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <section className={styles.heroSection}>
      {isMobile ? (
        // Mobile Layout: Three rows (Row 1: GIF & Heading; Row 2: Subtext; Row 3: Buttons)
        <div className={styles.mobileContainer}>
          {/* Row 1: GIF and Heading */}
          <div className={styles.mobileRow1}>
            {/* Bag GIF with Circle Behind */}
            <div className={styles.mobileGifContainer}>
              <div className={styles.mobileCircleContainer}>
                <div className={styles.mobileCircle} />
              </div>
              <div className={styles.mobileGifImageContainer}>
                <img
                  src="/images/animations/Clip Clap.gif"
                  alt="Pin Icon"
                  width="89"
                  height="89"
                  className={styles.mobileGifImage}
                />
              </div>
            </div>
            {/* Heading */}
            <div className={styles.mobileHeadingContainer}>
              <h1 className={styles.mobileHeading}>
                Create <span className={styles.myFuseBlue}>Resume</span>,
                <br />
                Crack <span className={styles.myFuseBlue}>ATS</span> Code,
                <br />
                Find <span className={styles.myFuseBlue}>Offers Faster</span>
              </h1>
            </div>
          </div>
          {/* Row 2: Subtext */}
          <div className={styles.mobileSubtextContainer}>
            <p className={styles.mobileSubtext}>
              75% of resumes never reach recruiters. MyFuse AI ensures you get
              interview calls.
            </p>
          </div>
          {/* Row 3: Buttons */}
          <div className={styles.mobileButtons}>
            <MyFuseButton
              title="CHECK RESUME SCORE"
              variant="filled"
              onClick={() => {}}
            />
            <MyFuseButton
              title="FIND JOBS"
              variant="ghost"
              onClick={() => {}}
            />
          </div>
        </div>
      ) : (
        // Desktop Layout: Left content together in one column
        <div className={styles.desktopLeft}>
          {/* Bag GIF with Circle Behind */}
          <div className={styles.desktopGifContainer}>
            <div className={styles.desktopCircleContainer}>
              <div className={styles.desktopCircle} />
            </div>
            <div className={styles.desktopGifImageContainer}>
              <img
                src="/images/animations/Clip Clap.gif"
                alt="Pin Icon"
                width="196"
                height="196"
              />
            </div>
          </div>
          {/* Heading */}
          <h1 className={styles.desktopHeading}>
            Create <span className={styles.myFuseBlue}>Resume</span>,
            <br />
            Crack <span className={styles.myFuseBlue}>ATS</span> Code,
            <br />
            Find <span className={styles.myFuseBlue}>Offers Faster</span>
          </h1>
          {/* Subtext */}
          <p className={styles.desktopSubtext}>
            75% of resumes never reach recruiters. MyFuse AI ensures you get
            interview calls.
          </p>
          {/* Buttons */}
          <div className={styles.desktopButtons}>
            <MyFuseButton
              title="CHECK RESUME SCORE"
              variant="filled"
              onClick={() => {}}
            />
            <MyFuseButton
              title="FIND JOBS"
              variant="ghost"
              onClick={() => {}}
            />
          </div>
        </div>
      )}

      {/* Divider for Large Screens */}
      <div className={styles.divider} />

      {/* Right Content (Slider) */}
      <div className={styles.sliderContainer}>
        <div className={styles.sliderInner}>
          <BeforeAfterSlider
            beforeImage="/images/animations/Bad.svg"
            afterImage="/images/animations/Good.svg"
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
