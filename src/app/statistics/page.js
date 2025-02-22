// pages/statistics.js (or app/statistics.js in Next.js 13+)

import Link from 'next/link';
import Taskbar from '@/components/Taskbar';
import Image from 'next/image'; // Import the Image component

export default function StatisticsPage() {
  return (
    <div>
      <Taskbar/>

      <section>
          <h2>Sample Pie Chart</h2>
          <Image 
            src="/samplepiechart.png" // Path to the image in the public folder
            alt="Sample Pie Chart" // Alternative text for accessibility
            width={500} // Set the width of the image
            height={500} // Set the height of the image
          />
        </section>

    </div>
  );
}
