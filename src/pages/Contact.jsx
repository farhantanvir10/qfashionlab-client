import { FaEnvelope, FaFacebook, FaWhatsapp, FaPhone } from "react-icons/fa";
import { useEffect } from "react";

function Contact() {
  const phoneNumber = "+8801771177801";
  const handleDial = () => {
    // Fallback for non-mobile: Just log or redirect to a contact page
    if (!window.location.href.includes("mobile")) {
      // alert('For calls, visit our contact page!');
      return;
    }
    // Open dialer with tel: protocol
    window.location.href = `tel:${phoneNumber}`;
  };

  // 👇 Scroll to top smoothly when a new product loads
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [window.location.href]);

  return (
    <div className="sm:min-h-screen flex sm:items-center justify-center sm:p-6">
      <div className="p-8 sm:border border-gray-500 sm:rounded-lg sm:shadow-md shadow-black max-w-lg w-full text-center mb-20">
        <h1 className="text-3xl font-bold text-gray-200 mb-4">Contact Us</h1>
        <p className="mb-6">
          Feel free to reach out through any of the platforms below:
        </p>

        <div className="flex flex-col space-y-4 text-lg">
          <a
            href="https://mail.google.com/mail/?view=cm&fs=1&to=farhantanvir10110@gmail.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-3 bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-lg transition"
          >
            <FaEnvelope className="text-xl" /> farhantanvir10110@gmail.com
          </a>

          <a
            href="https://www.facebook.com/share/1TV8FjQ6e1/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-3 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition"
          >
            <FaFacebook className="text-xl" /> Facebook
          </a>

          <a
            href="https://wa.me/message/NEAOPHV3B474G1"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-3 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition"
          >
            <FaWhatsapp className="text-xl" /> WhatsApp
          </a>

          <button
            className="flex items-center justify-center gap-3 bg-gray-800 hover:bg-black text-white px-4 py-2 rounded-lg transition"
            onClick={handleDial}
          >
            <FaPhone className="text-xl" /> 01771177801
          </button>
        </div>
      </div>
    </div>
  );
}

export default Contact;
