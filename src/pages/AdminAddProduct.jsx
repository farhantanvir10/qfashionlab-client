import { useState } from "react";
import { axiosInstance } from "../lib/axios";

function AdminAddProduct() {
    const [formData, setFormData] = useState({
        productCode: "",
        productCategory: "Feature Design",
        productImage: null,
    });

    const [imagePreview, setImagePreview] = useState(null);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFormData({ ...formData, productImage: file });
            setImagePreview(URL.createObjectURL(file));
        }
    };

    const validateForm = () => {
        const { productCode, productCategory, productImage } = formData;
        if (!productCode || !productCategory || !productImage) {
            return "All fields are required!";
        }
        return null;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const errorMessage = validateForm();
        if (errorMessage) {
            setMessage(errorMessage);
            return;
        }

        setLoading(true);
        setMessage("");

        const productData = new FormData();
        productData.append("productCode", formData.productCode.toUpperCase());
        productData.append("productCategory", formData.productCategory);
        productData.append("productImage", formData.productImage);

        const token = localStorage.getItem("token");
        if (!token) {
            setMessage("Authentication failed! Please log in.");
            setLoading(false);
            return;
        }

        try {
            await axiosInstance.post("/sellerProductUpload/products", productData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setMessage("Product uploaded successfully!");
            setFormData({
                productCode: "",
                productCategory: "Feature Design",
                productImage: null,
            });
            setImagePreview(null);
        } catch (error) {
            console.error("Upload error:", error);
            setMessage(error.response?.data?.error || "Error uploading product. Try again!");
        }

        setLoading(false);
    };

    return (
        <div className="max-w-2xl mx-auto p-6 sm:border border-gray-500 sm:shadow-md shadow-black sm:rounded-lg md:mt-6">
            <h2 className="text-2xl text-center font-bold mb-4">Add Product</h2>

            {message && (
                <p
                    className={`text-center ${
                        message == "Product uploaded successfully!" ? "text-green-500" : "text-red-500"
                    }`}
                >
                    {message}
                </p>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="md:flex gap-6">
                    <div className="md:w-1/3 space-y-4">
                        <div>
                            <label htmlFor="productCode" className="block">
                                Product Code
                            </label>
                            <input
                                type="text"
                                id="productCode"
                                name="productCode"
                                value={formData.productCode}
                                onChange={handleChange}
                                className="w-full p-2 border border-gray-500 rounded"
                                placeholder="Enter product code"
                            />
                        </div>

                        <div>
                            <label htmlFor="productCategory" className="block">
                                Category
                            </label>
                            <select
                                id="productCategory"
                                name="productCategory"
                                value={formData.productCategory}
                                onChange={handleChange}
                                className="w-full p-2 border border-gray-500 rounded"
                            >
                                <option value="Feature Design">Feature Design</option>
                                <option value="Previously Ordered">Previously Ordered</option>
                                <option value="Customer Satisfaction">Customer Satisfaction</option>
                            </select>
                        </div>
                    </div>
                    <div className="md:w-2/3 mt-4 md:mt-0">
                        <label className="block">Product Image</label>
                        <div className="border border-gray-500 p-4 rounded-lg text-center">
                            {imagePreview ? (
                                <img src={imagePreview} alt="Preview" className="w-full h-60 object-cover rounded-md" />
                            ) : (
                                <div className="flex flex-col items-center justify-center h-40 border-2 border-dashed border-gray-500 rounded-md">
                                    <span className="">Upload an image</span>
                                </div>
                            )}
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageUpload}
                                className="w-full mt-2 p-2 border rounded cursor-pointer"
                            />
                        </div>
                    </div>
                </div>

                <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded" disabled={loading}>
                    {loading ? "Uploading..." : "ADD"}
                </button>
            </form>
        </div>
    );
}

export default AdminAddProduct;
