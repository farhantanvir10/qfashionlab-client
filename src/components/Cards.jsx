import { FaArrowRight } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const Cards = ({ products }) => {
    const navigate = useNavigate();
    return (
        <>
            {products.length > 0 && (
                <div className={`p-3 sm:p-5 md:px-10 border-b border-gray-500`} id={products[0].productCategory[0]}>
                    <h2 className={`lg:w-1/3 rounded-bl-3xl rounded-tr-3xl p-1 bg-[#1E3A5F] border border-gray-600 select-none shadow-md shadow-black text-3xl font-semibold text-center mb-4`}>
                        {products[0].productCategory}
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6 mb-4">
                        {products.map((product) => (
                            <div
                                key={product._id}
                                className="border-gray-500 rounded-xl shadow-md shadow-black cursor-pointer transition-transform duration-300 transform hover:scale-105 hover:shadow-2xl overflow-hidden"
                                onClick={() => navigate(`/product/${product._id}`)}
                            >
                                <img
                                    src={product.productImage || 'https://via.placeholder.com/150'}
                                    alt={product.productCode}
                                    className="w-full h-60 object-cover object-center"
                                />
                                <div className="flex items-center justify-between py-1 px-4 font-semibold">
                                    <h3>{product.productCode.toUpperCase()}</h3>
                                    <h3 className="flex items-center gap-2">
                                        See Details <FaArrowRight />
                                    </h3>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </>
    );
};

export default Cards;
