import Link from "next/link";
import styles from "./Taskbar.module.css";

const Taskbar = () => {
  return (
    <nav className={styles.nav}>
      <div className="flex items-center justify-between">
        {/* ICE ICE Title */}
        <h1 className={styles.title}>ICE Tracker</h1>

        {/* Navigation Links */}
        <div className="flex space-x-7">
          <Link href="/" passHref>
            <span className={`${styles.navLink} ${styles.map}`}>Map</span>
          </Link>

          <Link href="/statistics" passHref>
            <span className={`${styles.navLink} ${styles.statistics}`}>Statistics</span>
          </Link>

          <Link href="/report" passHref>
            <span className={`${styles.navLink} ${styles.report}`}>Report</span>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Taskbar;