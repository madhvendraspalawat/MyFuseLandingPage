import React from "react";
import ResponsiveNavbar from "./components/Navbar/Navbar";
import styles from "./Home.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <ResponsiveNavbar />
    </div>
  );
}
