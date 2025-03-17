"use client";

import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

import { ImagesContainer } from "app/components/images-container";

import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <ImagesContainer />
        {/* TODO Add snackbar container */}
      </main>
      <Analytics />
      <SpeedInsights />
    </div>
  );
}
