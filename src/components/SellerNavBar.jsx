import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaPlus, FaBoxOpen, FaSignOutAlt, FaBars, FaTimes } from 'react-icons/fa';
import icon from '../assets/favicon.png';

function SellerNavBar() {
    const [menuOpen, setMenuOpen] = useState(false);
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/seller-login');
    };

    return (
        <div
            className="sticky top-0 z-50 shadow-md shadow-black border-b border-gray-500"
            style={{ backgroundColor: 'var(--primary-bg)' }}
        >
            <div className="flex items-center justify-between px-6 shadow-md shadow-black">
                {/* Logo Section */}
                <Link to="/admin">
                    <div className="flex items-center gap-2">
                        <img src={icon} className="w-12 h-12" alt="Logo" />
                        <h1 className="text-2xl font-extrabold md:block hidden">Q Fashion Lab</h1>
                    </div>
                </Link>

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
                    className={`absolute md:relative top-full left-0 w-full bg-[#1E3A5F] md:bg-transparent md:w-auto md:flex items-center gap-3 md:gap-6 text-lg font-medium px-5 py-3 md:py-0 transition-all duration-300 ease-in-out ${
                        menuOpen ? 'block' : 'hidden'
                    }`}
                >
                    <Link
                        to="/admin-add-product"
                        className="flex items-center gap-3  py-3 hover:bg-[#00A8CC]"
                        onClick={() => setMenuOpen(false)}
                    >
                        <FaPlus /> Add Product
                    </Link>
                    <Link
                        to="/admin-view"
                        className="flex items-center gap-3  py-3 hover:bg-[#00A8CC]"
                        onClick={() => setMenuOpen(false)}
                    >
                        <FaBoxOpen /> View Product
                    </Link>

                    {/* Logout Button */}
                    <button
                        onClick={handleLogout}
                        aria-label="Logout"
                        className="flex items-center gap-2 text-red-600 hover:text-red-400 text-lg font-semibold"
                    >
                        <FaSignOutAlt className="text-2xl" /> <span className="md:hidden lg:block">Logout</span>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default SellerNavBar;
