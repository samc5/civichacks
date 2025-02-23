import Link from 'next/link';
import Taskbar from '@/components/Taskbar';
import Image from 'next/image'; // Import the Image component
import styles from './StatisticsPage.module.css'; // Import the CSS module

export default function StatisticsPage() {
  return (
    <div>
      <Taskbar />

      <section className={styles.dashboard}>
        <h1 className={styles.title}>Statistics</h1>
        <div className={styles.grid}>
          <div className={styles.gridItem}>
            <h2 className={styles.gridItemTitle}>Total ICE Events:</h2>
            <div className={styles.gridItemNumber}>123</div>
          </div>
          <div className={styles.gridItem}>
            <h2 className={styles.gridItemTitle}>Past 24 hrs:</h2>
            <div className={styles.gridItemNumber}>45</div>
          </div>
          <div className={styles.gridItem}>
            <h2 className={styles.gridItemTitle}>Past week:</h2>
            <div className={styles.gridItemNumber}>300</div>
          </div>
          <div className={styles.gridItem}>
            <h2 className={styles.gridItemTitle}>Hotspot:</h2>
            <div className={styles.gridItemNumber}>Location A</div>
          </div>
          <div className={styles.gridItem}>
            <h2 className={styles.gridItemTitle}>Common reason:</h2>
            <div className={styles.gridItemNumber}>Reason X</div>
          </div>
          <div className={styles.gridItem}>
            <h2 className={styles.gridItemTitle}>Trend Graph:</h2>
            <div className={styles.gridItemNumber}>Graph</div>
          </div>
        </div>
      </section>
    </div>
  );
}