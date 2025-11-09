import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEdit, FaTrash } from "react-icons/fa";
import { axiosInstance } from "../lib/axios";

function AdminView() {
    const [products, setProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        fetchProducts();
    }, []);

    // 👇 Scroll to top smoothly when a new product loads
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, [window.location.href]);

    const fetchProducts = async () => {
        setLoading(true);
        setError("");
        const token = localStorage.getItem("token");

        if (!token) {
            setError("No token found. Please log in.");
            setLoading(false);
            navigate("/seller-login");
            return;
        }
        ///
        try {
            const response = await axiosInstance.get("/sellerProductUpload/products", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (Array.isArray(response.data)) {
                setProducts(response.data);
            } else if (response.data.products && Array.isArray(response.data.products)) {
                setProducts(response.data.products);
            } else {
                setError("Invalid data format from API");
            }
        } catch (error) {
            console.error("Error fetching products:", error);
            setError("Failed to fetch products.");
        }
        setLoading(false);
    };

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this product?");
        if (!confirmDelete) return; // ❌ Stop if user clicks "Cancel"

        const token = localStorage.getItem("token");
        try {
            await axiosInstance.delete(`/sellerProductUpload/products/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setProducts(products.filter((product) => product._id !== id));
            // alert('Product Deleted');
        } catch (error) {
            console.error("Delete error:", error);
            setError("Failed to delete product.");
        }
    };

    const handleEdit = (product) => {
        navigate(`/edit/${product._id}`, { state: product });
    };

    const filteredProducts = products.filter(
        (product) =>
            product.productCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.productCategory.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="max-w-6xl mx-auto p-3 sm:p-6">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl md:text-3xl font-bold">Product List</h2>
                <input
                    type="text"
                    placeholder="Search products..."
                    className="w-[40vw] md:w-[60vw] px-4 py-1 border border-gray-500 rounded-lg"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            {error && <p className="text-red-500">{error}</p>}

            {loading ? (
                <p>Loading products...</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
                    {filteredProducts.length > 0 ? (
                        filteredProducts.map((product) => (
                            <div
                                key={product._id}
                                className="relative rounded-xl border border-gray-500 shadow-md shadow-black overflow-hidden"
                            >
                                <img
                                    src={product.productImage}
                                    alt={product.productCode}
                                    className="w-full h-65 object-cover object-center"
                                />
                                <div className="flex justify-between items-center mx-2 my-4">
                                    <h3 className="text-lg font-semibold">{product.productCode}</h3>
                                    <h3 className="text-lg font-semibold">{product.productCategory}</h3>
                                </div>

                                <div className="flex justify-between items-center mt-2">
                                    <button
                                        className="flex items-center gap-2 bg-green-500 px-4 py-2 rounded-tr-xl"
                                        onClick={() => handleEdit(product)}
                                    >
                                        <FaEdit />
                                        Edit
                                    </button>
                                    <button
                                        className="flex items-center gap-2 bg-red-500 px-4 py-2 rounded-tl-xl"
                                        onClick={() => handleDelete(product._id)}
                                    >
                                        <FaTrash />
                                        Delete
                                    </button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-center col-span-full text-gray-600">No products found</p>
                    )}
                </div>
            )}
        </div>
    );
}

export default AdminView;
