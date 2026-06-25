import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "sonner";
import { ShopProvider } from "./context/ShopContext";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Catalog from "./pages/Catalog";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import Wishlist from "./pages/Wishlist";

function App() {
    return (
        <div className="App">
            <ShopProvider>
                <BrowserRouter>
                    <Routes>
                        <Route element={<Layout />}>
                            <Route path="/" element={<Home />} />
                            <Route path="/katalog" element={<Catalog />} />
                            <Route path="/produk/:id" element={<ProductDetail />} />
                            <Route path="/keranjang" element={<Cart />} />
                            <Route path="/checkout" element={<Checkout />} />
                            <Route path="/login" element={<Login />} />
                            <Route path="/register" element={<Register />} />
                            <Route path="/profil" element={<Profile />} />
                            <Route path="/wishlist" element={<Wishlist />} />
                        </Route>
                    </Routes>
                </BrowserRouter>
                <Toaster position="top-center" richColors />
            </ShopProvider>
        </div>
    )
}

export default App;