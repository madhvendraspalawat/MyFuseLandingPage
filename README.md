# MyFuse Landing Page Components Integration Guide

This guide explains how to integrate the converted MyFuse landing page components into your existing React project. These components include:

- **Navbar** (Responsive, mobile & desktop)
- **FindJobs** (Job Carousel)
- **CustomerJourney** (Animated journey cards)
- **FAQSection** (Expandable FAQ items)
- **GetStartedSection** (Call-to-action area)
- **Footer** (Desktop and Mobile versions)

All components are built in plain JavaScript (React 18.2.0) and use CSS Modules for styling. Follow this guide to set up and customize these components in your project.

---

## Table of Contents

- [Prerequisites](#prerequisites)
- [Project Structure](#project-structure)
- [Installation and Setup](#installation-and-setup)
- [Global Layout Integration](#global-layout-integration)
- [Page-Specific Integration](#page-specific-integration)
- [Customization](#customization)
- [Troubleshooting](#troubleshooting)
- [Support](#support)

---

## Prerequisites

Make sure your project has the following dependencies installed:

- **React 18.2.0**
- **Framer Motion:**

  `npm install framer-motion`

- **React Icons:**

  `npm install react-icons`

- **React Router DOM** (if using routing):

  `npm install react-router-dom`

- Your build system must support CSS Modules (e.g., Create React App or Next.js support CSS Modules out of the box).

---

## Project Structure

A sample project structure integrating these components might look like this:

vbnet

Copy

`src/
├── App.js
├── index.js
├── assets/
│   └── styles/
│       ├── global.module.css
│       └── global.js
├── components/
│   ├── Navbar/
│   │   ├── Navbar.js
│   │   └── Navbar.module.css
│   ├── FindJobs/
│   │   ├── FindJobs.js
│   │   └── FindJobs.module.css
│   ├── CustomerJourney/
│   │   ├── CustomerJourney.js
│   │   └── CustomerJourney.module.css
│   ├── FAQSection/
│   │   ├── FAQSection.js
│   │   └── FAQSection.module.css
│   ├── GetStartedSection/
│   │   ├── GetStartedSection.js
│   │   └── GetStartedSection.module.css
│   └── Footer/
│       ├── DesktopFooterSection.js
│       ├── DesktopFooterSection.module.css
│       ├── MobileFooterSection.js
│       └── MobileFooterSection.module.css
├── constants/
│   ├── footerLinks.js
│   └── journeySection.js
├── pages/
│   └── LandingPage/
│       └── index.js
└── routes/
    └── index.js`

Adjust folder names and paths as necessary to match your project.

---

## Installation and Setup

1.  **Copy the Component Files:**

    Place each component’s JavaScript and CSS Module files into your project according to the above structure.

2.  **Assets and Constants:**

    - Ensure that any images (e.g., `/landingPage/backgrounds/...`, `/landingPage/icons/...`) referenced in the components are placed in your public folder, or update the paths accordingly.
    - Copy constant files (e.g., `footerLinks.js`, `journeySection.js`) into your `src/constants/` folder.

---

## Global Layout Integration

To include common elements like the Navbar and Footer on every page, create a global layout component. For example, create `src/Layout.js`:

`import React from "react";
import ResponsiveNavbar from "./components/Navbar/Navbar";
import FooterSection from "./components/Footer/FooterSection"; // A component that conditionally renders the mobile or desktop footer.
import "./assets/styles/global.module.css";

export default function Layout({ children }) {
return (
<div>
<ResponsiveNavbar />
{children}
<FooterSection />
</div>
);
}`

Then, update your `src/App.js` to use the layout:

`import React from "react";
import { BrowserRouter } from "react-router-dom";
import GlobalStyles from "./assets/styles/global";
import Routes from "./routes";
import Layout from "./Layout";

export default function App() {
return (
<BrowserRouter>
<GlobalStyles />
<Layout>
<Routes />
</Layout>
</BrowserRouter>
);
}`

---

## Page-Specific Integration

If you want to use individual components on specific pages, simply import them in the corresponding page file. For example, in your landing page (`src/pages/LandingPage/index.js`):

js

Copy

`import React from "react";
import GetStartedSection from "../../components/GetStartedSection/GetStartedSection";
import FAQSection from "../../components/FAQSection/FAQSection";
import styles from "../../Home.module.css";

export default function LandingPage() {
return (
<div className={styles.container}>
<GetStartedSection />
<FAQSection />
{/_ Other page components _/}
</div>
);
}`

---

## Customization

- **Styling:**  
  Modify the CSS Module files (e.g., `Navbar.module.css`, `FAQSection.module.css`) to change colors, fonts, spacing, or breakpoints as needed.
- **Assets:**  
  Ensure that asset paths in your CSS and JS files point to the correct locations in your public folder.
- **Constants:**  
  Edit the constant files (e.g., `footerLinks.js`, `journeySection.js`) to update navigation links, social icons, or other dynamic content.
- **Behavior:**  
  Adjust the responsive logic (e.g., breakpoints in useEffect) within the components if necessary.

---

## Troubleshooting

- **CSS Module Errors:**  
  If your project cannot resolve a CSS Module, confirm that your build tool supports CSS Modules. Check your import paths and file names.
- **Asset Loading:**  
  Verify that image and icon paths are correct. If assets fail to load, update the paths in the CSS Modules or move the assets to the appropriate public folder.
- **Responsive Issues:**  
  If components do not switch between mobile and desktop versions as expected, double-check your media queries and JavaScript viewport checks.

---

## Support

For further help, consult:

- The [React documentation](https://reactjs.org/).
- The Framer Motion documentation.
- Your build tool’s documentation (e.g., Create React App or Next.js).

---

This documentation should help any third party quickly understand how to integrate and customize the MyFuse landing page components within their project. If additional assistance is required, please contact the support team or refer to the project’s issue tracker.
