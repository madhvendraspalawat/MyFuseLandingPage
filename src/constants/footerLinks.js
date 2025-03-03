import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
  FaYoutube,
} from "react-icons/fa";

export const footerLinks = {
  navLinks: [
    { id: 1, name: "Company", redirectURL: "#" },
    { id: 2, name: "home", redirectURL: "#" },
    { id: 3, name: "blog", redirectURL: "#" },
    { id: 4, name: "about us", redirectURL: "#" },
    { id: 5, name: "contact us", redirectURL: "#" },
  ],
  legalLinks: [
    { id: 1, name: "All rights reserved © 2024", redirectURL: "#" },
    { id: 2, name: "Terms & conditions", redirectURL: "#" },
    { id: 3, name: "privacy policy", redirectURL: "#" },
  ],
  socialLinks: [
    { id: 1, name: "facebook", icon: <FaFacebook />, redirectURL: "#" },
    { id: 2, name: "twitter", icon: <FaTwitter />, redirectURL: "#" },
    { id: 3, name: "instagram", icon: <FaInstagram />, redirectURL: "#" },
    { id: 4, name: "linkedin", icon: <FaLinkedin />, redirectURL: "#" },
    { id: 5, name: "youtube", icon: <FaYoutube />, redirectURL: "#" },
  ],
};
