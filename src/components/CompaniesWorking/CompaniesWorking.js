import React from "react";
import styles from "./CompaniesWorking.module.css";

const companies = [
  { name: "Google", img: "/images/companylogos/google.svg" },
  { name: "Netflix", img: "/images/companylogos/netflix.svg" },
  { name: "Capgemini", img: "/images/companylogos/capegemini.svg" },
  { name: "Infosys", img: "/images/companylogos/infosys.svg" },
  { name: "Wipro", img: "/images/companylogos/WIT.svg" },
  { name: "Accenture", img: "/images/companylogos/ACN.svg" },
  { name: "Genpact", img: "/images/companylogos/genpact.svg" },
];

const CompaniesWorking = () => {
  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>COMPANIES HIRING WITH US</h2>

      {/* Desktop View */}
      <div className={styles.desktopLogos}>
        {companies.map((company) => (
          <img
            key={company.name}
            src={company.img}
            alt={company.name}
            width={120}
            height={40}
            className={styles.logoDesktop}
          />
        ))}
      </div>

      {/* Mobile View */}
      <div className={styles.mobileLogos}>
        {companies.slice(0, 6).map((company) => (
          <img
            key={company.name}
            src={company.img}
            alt={company.name}
            width={100}
            height={30}
            className={styles.logoMobile}
          />
        ))}
      </div>
    </div>
  );
};

export default CompaniesWorking;
