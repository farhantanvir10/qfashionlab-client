import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { axiosInstance } from '../lib/axios';

function EditProduct() {
    const location = useLocation();
    const navigate = useNavigate();
    const product = location.state;

    const [productCode, setproductCode] = useState(product.productCode);
    const [productCategory, setProductCategory] = useState(product.productCategory);
    const [productImage, setProductImage] = useState(product.productImage);

    const handleUpdate = async () => {
        const token = localStorage.getItem('token');
        try {
            await axiosInstance.put(
                `/sellerProductUpload/products/${product._id}`,
                {
                    productCode,
                    productCategory,
                    productImage,
                },
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );

            // alert('Product Updated');
            navigate('/admin-view');
        } catch (error) {
            console.error('Update error:', error);
            // alert('Failed to update product.');
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-6 md:my-6 sm:border border-gray-500 sm:shadow-md shadow-black sm:rounded-lg">
            <h2 className="text-center text-3xl font-semibold mb-4">Edit Product</h2>
            <div className="md:flex gap-6">
                <img
                    src={product.productImage || 'https://via.placeholder.com/150'}
                    alt={product.productCode}
                    className="w-full md:w-1/2 h-full object-cover object-center mb-4"
                />

                <div className="flex flex-col justify-between md:w-1/2">
                    <div>
                        <div>
                            <label>Product Code:</label>
                            <input
                                type="text"
                                className="w-full p-2 border border-gray-500 rounded mt-1 mb-4"
                                value={productCode}
                                onChange={(e) => setproductCode(e.target.value.toUpperCase())}
                            />
                        </div>
                        <div>
                            <label>Category:</label>
                            <select
                                id="productCategory"
                                name="productCategory"
                                value={productCategory}
                                onChange={(e) => setProductCategory(e.target.value)}
                                className="w-full p-2 mt-1 bg-[#1E3A5F] border border-gray-500 rounded"
                            >
                                <option value="Feature Design">Feature Design</option>
                                <option value="Previously Ordered">Previously Ordered</option>
                                <option value="Customer Satisfaction">Customer Satisfaction</option>
                            </select>
                        </div>
                    </div>

                    <div className="flex justify-end mt-4">
                        <button
                            className="bg-blue-500 p-2 rounded"
                            onClick={handleUpdate}
                        >
                            Update Product
                        </button>
                        <button
                            className="bg-gray-600 p-2 rounded ml-4"
                            onClick={() => navigate('/admin-view')}
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EditProduct;
