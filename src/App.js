// src/App.js
import React from "react";
import { BrowserRouter } from "react-router-dom";
import "../src/assets/styles/global.module.css";
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
}
