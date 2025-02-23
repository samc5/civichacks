"use client";

import Link from 'next/link';
import Taskbar from '@/components/Taskbar';
import Image from 'next/image'; // Import the Image component
import FormComponent from "../FormComponent";
import UnverifiedFormComponent from '../UnverifiedFormComponent';
import { useState } from 'react';
import styles from './ReportPage.module.css'; // Import the CSS module

export default function FormPage() {
  const [showVerifiedForm, setShowVerifiedForm] = useState(false); // Set to false to show Unverified Form by default

  return (
    <div>
      <Taskbar />

      <section className={styles.formSection}>
        <h1 className={styles.title}>Arrest Report Form</h1>
        <div className={styles.switchContainer}>
          <button
            className={`${styles.switchButton} ${!showVerifiedForm ? styles.active : ''}`}
            onClick={() => setShowVerifiedForm(false)}
          >
            Unverified Form
          </button>
          <button
            className={`${styles.switchButton} ${showVerifiedForm ? styles.active : ''}`}
            onClick={() => setShowVerifiedForm(true)}
          >
            Verified Form
          </button>
        </div>
        {showVerifiedForm ? <FormComponent /> : <UnverifiedFormComponent />}
      </section>
    </div>
  );
}