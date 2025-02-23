import Link from 'next/link';
import Taskbar from '@/components/Taskbar';
import Image from 'next/image'; // Import the Image component
import FormComponent from "../FormComponent";
import styles from './ReportPage.module.css'; // Import the CSS module

export default function FormPage() {
  return (
    <div>
      <Taskbar />

      <section className={styles.formSection}>
        <h1 className={styles.title}>Arrest Report Form</h1>
        <FormComponent />
      </section>
    </div>
  );
}