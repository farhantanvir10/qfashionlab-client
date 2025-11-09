import { useState } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';

import NavBar from './components/NavBar';
import SellerNavBar from './components/SellerNavBar';
import Footer from './components/Footer';

import Home from './pages/Home';
import Contact from './pages/Contact';
import About from './pages/About';
import ProductDetails from './pages/ProductDetails';

import AdminSignup from './pages/AdminSignup';
import AdminLogin from './pages/AdminLogin';
import AdminView from './pages/AdminView';
import AdminAddProduct from './pages/AdminAddProduct';
import EditProduct from './pages/EditProduct';
import SellerResetPassword from './pages/SellerResetPassword';
function AppContent() {
    const location = useLocation();
    const [searchQuery, setSearchQuery] = useState('');

    const adminRoutes = [
        '/admin-add-product',
        '/admin-view',
        '/admin',
        '/seller-login',
        '/seller-signup',
        '/seller-reset-password',
        '/edit/:id',
    ];
    const sellerRoutes = ['/seller-login', '/seller-signup', '/seller-reset-password', '/edit/:id'];

    const isAdminPage = adminRoutes.includes(location.pathname);
    const isSellerPage = sellerRoutes.includes(location.pathname);
    const isEditProductPage = location.pathname.startsWith('/edit/');

    return (
        <>
            {!isAdminPage && !isEditProductPage && <NavBar setSearchQuery={setSearchQuery} />}
            {(isAdminPage || isEditProductPage) && !isSellerPage && <SellerNavBar />}

            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/about" element={<About />} />
                <Route path="/product/:id" element={<ProductDetails />} />
                {/* Admin Routes */}
                <Route path="/seller-signup" element={<AdminSignup />} />
                <Route path="/seller-login" element={<AdminLogin />} />
                <Route path="/admin" element={<AdminView />} />
                <Route path="/admin-add-product" element={<AdminAddProduct />} />
                <Route path="/edit/:id" element={<EditProduct />} />
                <Route path="/admin-view" element={<AdminView />} />
                <Route path="/seller-reset-password" element={<SellerResetPassword />} />
            </Routes>

            {!isAdminPage && !isEditProductPage && <Footer />}
        </>
    );
}

function App() {
    return (
        <BrowserRouter>
            <AppContent />
        </BrowserRouter>
    );
}

export default App;
