import { useEffect, useState } from "react";
import { axiosInstance } from "../lib/axios";
import { Link } from "react-router-dom";
import Cards from "../components/Cards";
import size from "../assets/size-chart.png";

const Home = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axiosInstance.get("/sellerProductUpload/getAllProducts");
                setProducts(response.data);
            } catch (err) {
                setError("Failed to fetch products");
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    // 👇 Scroll to top smoothly when a new product loads
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, [products]);

    const scrollToSection = (id) => {
        const element = document.getElementById(id);
        const offset = 70; // adjust for fixed navbar height
        const top = element.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: "smooth" });
    };

    const featureDesign = products.filter((product) => {
        const categoryMatch = product.productCategory === "Feature Design";
        return categoryMatch;
    });
    const previouslyOrdered = products.filter((product) => {
        const categoryMatch = product.productCategory === "Previously Ordered";
        return categoryMatch;
    });
    const customerSatisfaction = products.filter((product) => {
        const categoryMatch = product.productCategory === "Customer Satisfaction";
        return categoryMatch;
    });

    if (loading) return <p className="text-center text-lg">Loading...</p>;
    if (error) return <p className="text-center text-red-500">{error}</p>;

    function FacebookVideoEmbed() {
        return (
            <div className="sm:w-[60vw] h-[58vw] sm:h-[37vw] mb-2 sm:mb-0 rounded-xl border border-gray-500 shadow-md shadow-black overflow-hidden">
                <iframe
                    src="https://www.facebook.com/plugins/video.php?height=314&href=https%3A%2F%2Fwww.facebook.com%2F61565777258690%2Fvideos%2F1249143539729251%2F&show_text=false&t=0"
                    width="100%"
                    height="100%"
                ></iframe>
            </div>
        );
    }
    return (
        <div className="min-h-screen relative">
            {/* Hero Section */}
            <div className="sm:flex w-full gap-2 md:gap-5 p-2 sm:p-5 md:px-10 justify-center border-b border-gray-500">
                <FacebookVideoEmbed />
                <div className="flex sm:flex-col gap-2">
                    <img
                        src={size}
                        alt="Size Chart"
                        className="w-[60vw] sm:w-[32vw] h-full bg-gray-900 rounded-xl border border-gray-500 p-5 lg:p-10 mx-auto sm:mx-0 shadow-md shadow-black"
                    />

                    {/* Quick Links */}
                    <div className="grid grid-cols-1 sm:w-[32vw] text-sm font-semibold gap-1 items-center justify-center">
                        <button
                            onClick={() => scrollToSection("F")}
                            className="px-4 py-1 sm:p-1 bg-[#1E3A5F] border border-gray-600 rounded-bl-2xl rounded-tr-2xl hover:bg-gray-900"
                        >
                            Feature Design
                        </button>
                        <button
                            onClick={() => scrollToSection("P")}
                            className="px-4 py-1 sm:p-1 bg-[#1E3A5F] border border-gray-600 rounded-bl-2xl rounded-tr-2xl hover:bg-gray-900"
                        >
                            Previously Ordered
                        </button>
                        <button
                            onClick={() => scrollToSection("C")}
                            className="px-4 py-1 sm:p-1 bg-[#1E3A5F] border border-gray-600 rounded-bl-2xl rounded-tr-2xl hover:bg-gray-900"
                        >
                            Customer Satisfaction
                        </button>
                    </div>
                </div>
            </div>

            <Cards products={featureDesign} id="F" />
            <Cards products={previouslyOrdered} id="P" />
            <Cards products={customerSatisfaction} id="C" />
        </div>
    );
};

export default Home;
