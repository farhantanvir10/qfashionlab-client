import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FaWhatsapp } from "react-icons/fa";
import { axiosInstance } from "../lib/axios";
import ImageSlider from "../components/ImageSlider";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);

  const [formData, setFormData] = useState({
    fabricType: "BOX JACQUARD (REEBOOK) FABRIC",
    size: "",
    quantity: 1,
  });
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const MAX_QUANTITY = 100;

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axiosInstance.get(
          `/sellerProductUpload/getProduct/${id}`
        );
        setProduct(response.data);
      } catch (err) {
        setError("Failed to fetch product details");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  // 👇 Scroll to top smoothly when a new product loads
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [id]);

  const handleWhatsAppOrder = () => {
    // Your WhatsApp Business number (international format, no + or spaces)
    const phoneNumber = "+8801613983510"; // Replace with Q Fashion Lab's number

    // Pre-fill message with product details – make it shop-ready!
    const message =
      `Hi! I'd like to order:\n` +
      `- Product: ${product.productCode}\n` +
      `- Size: ${formData.size}\n` +
      `- Fabric Type: ${formData.fabricType}\n\n` +
      `Quantity: ${formData.quantity}\n\n` +
      `Let's finalize! 😊`;

    // Encode the message for URL safety
    const encodedMessage = encodeURIComponent(message);

    // Build the WhatsApp URL
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

    // Open in new tab (works on mobile/desktop)
    window.open(whatsappUrl, "_blank");
    // console.log(message);
  };

  if (loading) return <p className="text-center text-lg">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="sm:p-8 min-h-screen flex items-center justify-center ">
      <div className="sm:rounded-xl shadow-md shadow-black sm:border border-gray-500 flex flex-col lg:flex-row w-full max-w-6xl overflow-hidden">
        {/* Product Image */}
        <div className="w-full lg:w-1/2 flex flex-col items-center bg-gray-950">
          <img
            src={product.productImage || "https://via.placeholder.com/300"}
            alt="Jersey Preview"
            className="object-cover"
          />
        </div>

        {/* Product Details */}
        <div className=" lg:w-1/2 m-3 sm:m-6">
          <h2 className="text-3xl font-bold">Customized Jersey</h2>
          <p className="mt-2">Jersey Code: {product.productCode}</p>

          {/* Size Selection */}
          <div className="flex my-4">
            <label htmlFor="size" className="w-30 mt-2">
              Size:
            </label>
            <select
              id="size"
              name="size"
              value={formData.size}
              onChange={handleChange}
              className="w-full p-2 bg-[#1E3A5F] border border-gray-500 rounded"
            >
              <option value="">Select Size</option>
              <option value="S">S (Length: 26", Width: 36")</option>
              <option value="M">M (Length: 27", Width: 38")</option>
              <option value="L">L (Length: 28", Width: 40")</option>
              <option value="XL">XL (Length: 29", Width: 42")</option>
              <option value="XXL">XXL (Length: 30", Width: 44")</option>
              <option value="3XL">3XL (Length: 31", Width: 46")</option>
            </select>
          </div>

          <ImageSlider />

          {/* Select Fabric Type */}
          <div className="flex">
            <label htmlFor="fabricType" className="w-30 mt-2">
              Fabric Type:
            </label>
            <select
              id="fabricType"
              name="fabricType"
              value={formData.fabricType}
              onChange={handleChange}
              className="w-full p-2 bg-[#1E3A5F] border border-gray-500 rounded"
            >
              <option value="BOX JACQUARD (REEBOOK) FABRIC">
                BOX JACQUARD (REEBOOK) FABRIC
              </option>
              <option value="LEAF JACQUARD (THERMOTRANSFER) FABRIC">
                LEAF JACQUARD (THERMOTRANSFER) FABRIC
              </option>
              <option value="DOT KNIT (MESH FABRIC)">
                DOT KNIT (MESH FABRIC)
              </option>
              <option value="PREMIUM PLAIN POLESTAR (PP)">
                PREMIUM PLAIN POLESTAR (PP)
              </option>
              <option value="SWEET HONEYCOMB PREMIUM">
                SWEET HONEYCOMB PREMIUM
              </option>
            </select>
          </div>

          {/* Select Quantity */}
          <div className="flex mt-6 items-center space-x-4">
            <p>Quantity: </p>
            <button
              className="flex items-center justify-center w-8 h-8 bg-[#1E3A5F] hover:bg-[#00A8CC] rounded-lg"
              onClick={() =>
                setFormData((prev) => ({
                  ...prev,
                  quantity: Math.max(1, prev.quantity - 1), // Prevent going below 1
                }))
              }
            >
              -
            </button>
            <input
              type="number"
              className="w-20 h-8 bg-[#1E3A5F] text-center ml-3 rounded-lg"
              min={1}
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
            />
            <button
              className="flex items-center justify-center w-8 h-8 bg-[#1E3A5F] hover:bg-[#00A8CC] rounded-lg"
              onClick={() =>
                setFormData((prev) => ({
                  ...prev,
                  quantity: Math.min(MAX_QUANTITY, prev.quantity + 1), // Prevent going below 1
                }))
              }
            >
              +
            </button>
          </div>

          {/* Place your WhatsApp order button */}
          <div className="flex mt-6 space-x-4 justify-end">
            <button
              className="flex items-center space-x-3 px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600"
              onClick={handleWhatsAppOrder}
            >
              <FaWhatsapp className="text-3xl" />{" "}
              <span className="text-xl">Order Now</span>
            </button>
          </div>

          {message && (
            <p className="text-center text-blue-500 mt-4">{message}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
