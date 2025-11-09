import { useState, useEffect } from "react";
import { FaArrowUp, FaMapMarked } from "react-icons/fa";
import hero from "../assets/hero.jpeg";
import bkash from "../assets/bkash.png";
import nagad from "../assets/nagad.png";
import rocket from "../assets/rocket.png";
import upay from "../assets/upay.png";
import agrani from "../assets/agrani.png";
import { Link } from "react-router-dom";

function Footer() {
    const [showScrollTop, setShowScrollTop] = useState(false);

    // Detect scroll position
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 300) {
                setShowScrollTop(true);
            } else {
                setShowScrollTop(false);
            }
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Scroll to top smoothly
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };
    const backgroundStyle = {
        backgroundImage: `url(${hero})`,
        backgroundSize: "cover",
        backgroundPosition: "top",
        backgroundRepeat: "no-repeat",
        width: "100%",
    };
    const overlayStyle = {
        backgroundColor: "rgba(0, 0, 0, 0.7)",
    };
    return (
        <div className="" style={backgroundStyle}>
            <div className="text-white py-15 px-6 md:px-10" style={overlayStyle}>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-sm text-center">
                    <div className="sm:text-left">
                        <h2 className="text-lg font-bold mb-3">Support</h2>
                        <p className="mb-2 text-gray-200">Q Fashion Lab</p>
                        <a
                            href="https://mail.google.com/mail/?view=cm&fs=1&to=farhantanvir10110@gmail.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-2 text-blue-500"
                        >
                            farhantanvir10110@gmail.com
                        </a>
                        <p className="mt-2 text-gray-200">+8809638616742</p>
                    </div>

                    <div className="sm:text-center">
                        <h2 className="text-lg font-bold mb-3">Address</h2>
                        <ul className="space-y-2 text-gray-200">
                            <li className="select-none">Islambagh Mosque</li>
                            <li className="select-none">Notunpara, Demra</li>
                            <li className="select-none">Jatrabari, Dhaka-1236</li>
                            <li className="select-none">Bangladesh</li>
                        </ul>
                    </div>

                    <div className="sm:text-right">
                        <h2 className="text-lg font-bold mb-3">Quick Link</h2>
                        <ul className="space-y-2 text-gray-200">
                            <li className="cursor-pointer">Privacy Policy</li>
                            <Link
                                to="https://share.google/vxpsSudC003siLjt3"
                                className="flex gap-3 items-center justify-center sm:justify-end text-blue-500"
                                target="_blank"
                            >
                                <FaMapMarked className="text-xl " />
                                <li className="cursor-pointer">Courier Tracking</li>
                            </Link>
                            <Link to="/contact">
                                <li className="cursor-pointer">Contact</li>
                            </Link>
                        </ul>
                    </div>
                </div>

                {/* Online Payment */}
                <p className="text-center text-teal-500 mt-5 font-light">Online Payment Methods</p>
                <div className="flex px-5 lg:px-10 py-1 mx-auto mt-2 bg-[#ffffffb6] items-center justify-between">
                    <img src={bkash} alt="bKash" className="w-10 sm:w-20 lg:w-25" />
                    <img src={rocket} alt="Rocket" className="w-10 sm:w-20 lg:w-25" />
                    <img src={nagad} alt="Nagad" className="w-10 sm:w-20 lg:w-25" />
                    <img src={upay} alt="uPay" className="w-10 sm:w-20 lg:w-25" />
                    <img src={agrani} alt="Agrani" className="w-20 sm:w-40 lg:w-50" />
                </div>

                <div className="mt-10 text-center border-t border-gray-700 pt-4 text-gray-300 text-sm">
                    Q Fashion Lab - © Copyright{" "}
                    <Link to="https://www.linkedin.com/in/anumhosen/" className="text-blue-500 mx-2" target="_blank">
                        @anumhosen
                    </Link>{" "}
                    2025. All rights reserved.
                </div>
            </div>

            {/* Scroll to Top Button */}
            {showScrollTop && (
                <button
                    onClick={scrollToTop}
                    className="fixed bottom-5 right-5 bg-teal-600 hover:bg-teal-700 text-white p-3 rounded-full shadow-lg shadow-black transition-all duration-300"
                    aria-label="Scroll to top"
                >
                    <FaArrowUp className="text-lg" />
                </button>
            )}
        </div>
    );
}

export default Footer;
