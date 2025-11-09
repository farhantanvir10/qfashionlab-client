import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import icon from "../assets/favicon.png";
import qfashion from "../assets/qfashionlab.png";
import { Link } from "react-router-dom";

function NavBar() {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <header
            className="sticky top-0 z-50 shadow-md shadow-black border-b border-gray-500"
            style={{ backgroundColor: "var(--primary-bg)" }}
        >
            {/* Announcement Bar */}
            <div className="w-full bg-gray-900 text-gray-100 text-center py-1 text-sm md:text-base overflow-hidden">
                <div className="flex animate-slide whitespace-nowrap">
                    <p className="flex-shrink-0 mr-[5vw] sm:mr-[50vw]">
                        Q Fashion Lab brings you lab-tested comfort, crafted with care.
                    </p>
                    {/* Duplicate for seamless loop */}
                    <p className="flex-shrink-0 mr-[5vw] sm:mr-[50vw]">
                        শুদ্ধতা ও সুরক্ষার মেলবন্ধন – এলার্জিমুক্ত কাপড়ের প্রতিশ্রুতি, শুধু আমাদের কাছেই।
                    </p>
                    <p className="flex-shrink-0">Q Fashion Lab brings you lab-tested comfort, crafted with care.</p>
                </div>
            </div>

            <style>{`
                @keyframes slide {
                    0% {
                        transform: translateX(12%);
                    }
                    100% {
                        transform: translateX(-220%);
                    }
                }
                .animate-slide {
                    animation: slide 15s linear infinite;
                }
                sm:@keyframes slide {
                    0% {
                        transform: translateX(77%);
                    }
                    100% {
                        transform: translateX(-100%);
                    }
                }
                .animate-slide {
                    animation: slide 25s linear infinite;
                }
            `}</style>

            {/* Main Navigation */}
            <nav className="flex items-center justify-between md:px-10">
                {/* Logo Section */}
                <div className="flex items-center gap-3 flex-shrink-0">
                    <Link to="/" className="flex items-center gap-2">
                        <img src={icon} className="w-10 h-10 md:w-12 md:h-12" alt="Q Fashion Lab" />
                        <img src={qfashion} className="w-full h-8" alt="Q Fashion Lab" />
                    </Link>
                </div>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden text-2xl focus:outline-none"
                    onClick={() => setMenuOpen(!menuOpen)}
                    aria-label="Toggle menu"
                >
                    {menuOpen ? <FaTimes /> : <FaBars />}
                </button>

                {/* Navigation Links */}
                <div
                    className={`absolute md:relative top-full left-0 w-full bg-[#1E3A5F] md:bg-transparent md:w-auto md:flex items-center gap-6 text-lg font-medium px-4 md:px-0 py-3 md:py-0 transition-all duration-300 ease-in-out ${
                        menuOpen ? "block" : "hidden"
                    }`}
                >
                    <Link
                        to="/"
                        className={`block md:inline-block px-3 py-2 rounded-lg hover:bg-[#00A8CC] hover:text-[#1E3A5F] transition-colors`}
                        onClick={() => setMenuOpen(false)}
                    >
                        Home
                    </Link>
                    <Link
                        to="/contact"
                        className={`block md:inline-block px-3 py-2 rounded-lg hover:bg-[#00A8CC] hover:text-[#1E3A5F] transition-colors`}
                        onClick={() => setMenuOpen(false)}
                    >
                        Contact
                    </Link>
                    <Link
                        to="/about"
                        className={`block md:inline-block px-3 py-2 rounded-lg hover:bg-[#00A8CC] hover:text-[#1E3A5F] transition-colors`}
                        onClick={() => setMenuOpen(false)}
                    >
                        About
                    </Link>
                </div>
            </nav>
        </header>
    );
}

export default NavBar;
