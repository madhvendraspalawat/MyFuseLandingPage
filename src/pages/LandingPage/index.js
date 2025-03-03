// src/pages/LandingPage/index.js
import React from "react";
import ResponsiveNavbar from "../../components/Navbar/Navbar";
import styles from "../../Home.module.css";
import HeroSection from "../../components/HeroSection/HeroSection";
import CompaniesWorking from "../../components/CompaniesWorking/CompaniesWorking";
import StorySection from "../../components/StorySection/StorySection";
import ResponsiveAnimationSection from "../../components/ResponsiveAnimationSection/ResponsiveAnimationSection";
import CenterOverlapCarousel from "../../components/CarouselComponent/CarouselComponent";
import CommentSection from "../../components/CommentSection/CommentSection";
import FindJobs from "../../components/FindJobs/FindJobs";
import CustomerJourney from "../../components/CustomerJoueney/CustomerJourney";
import FAQSection from "../../components/FAQSection/FAQSection";
import GetStartedSection from "../../components/GetStartedSection/GetStartedSection";
import FooterSection from "../../components/FooterSection/FooterSection";

export default function LandingPage() {
  return (
    <div className={styles.container}>
      <ResponsiveNavbar />
      <HeroSection />
      <CompaniesWorking />
      <StorySection />
      <ResponsiveAnimationSection />
      <CenterOverlapCarousel />
      <CommentSection />
      <FindJobs />
      <CustomerJourney />
      <FAQSection />
      <GetStartedSection />
      <FooterSection />
    </div>
  );
}
