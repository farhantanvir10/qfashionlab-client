import { useState } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';

import NavBar from './components/NavBar';
import AdminNavBar from './components/AdminNavBar';
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
import AdminResetPassword from './pages/AdminResetPassword';
function AppContent() {
    const location = useLocation();
    const [searchQuery, setSearchQuery] = useState('');

    const adminRoutes = [
        '/admin-add-product',
        '/admin-view',
        '/admin',
        '/admin-login',
        '/admin-signup',
        '/admin-reset-password',
        '/edit/:id',
    ];

    const isAdminPage = adminRoutes.includes(location.pathname);
    const isEditProductPage = location.pathname.startsWith('/edit/');

    return (
        <>
            {!isAdminPage && !isEditProductPage && <NavBar setSearchQuery={setSearchQuery} />}
            {(isAdminPage || isEditProductPage) && <AdminNavBar />}

            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/about" element={<About />} />
                <Route path="/product/:id" element={<ProductDetails />} />
                {/* Admin Routes */}
                <Route path="/admin-signup" element={<AdminSignup />} />
                <Route path="/admin-login" element={<AdminLogin />} />
                <Route path="/admin" element={<AdminView />} />
                <Route path="/admin-add-product" element={<AdminAddProduct />} />
                <Route path="/edit/:id" element={<EditProduct />} />
                <Route path="/admin-view" element={<AdminView />} />
                <Route path="/admin-reset-password" element={<AdminResetPassword />} />
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
