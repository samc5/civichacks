import Link from "next/link";
import "../styles/globals.css";

const Taskbar = () => {
  return (
    <nav className="bg-gray-800 text-white p-4 shadow-md">
      <div className="container mx-auto flex items-center justify-between">
        {/* ICE ICE Title */}
        <h1 className="text-3xl font-bold text-white">ICE ICE</h1>

        {/* Navigation Links */}
        <div className="flex space-x-4">
          <Link href="/">
            <span className="block py-2 px-4 bg-gray-600 hover:bg-yellow-400 text-center rounded-md transition-colors">
              Map
            </span>
          </Link>

          <Link href="/statistics">
            <span className="block py-2 px-4 bg-gray-600 hover:bg-green-400 text-center rounded-md transition-colors">
              Statistics
            </span>
          </Link>

          <Link href="/report">
            <span className="block py-2 px-4 bg-gray-600 hover:bg-blue-400 text-center rounded-md transition-colors">
              Submit a Report
            </span>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Taskbar;
