import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import Header from "./components/Header";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import ProductDetail from "./pages/ProductDetail";
import Checkout from "./pages/Checkout";
import Success from "./pages/Success";
import LoadingPage from "./pages/LoadingPage";

function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/loading" element={<LoadingPage />} />
          <Route path="/success" element={<Success />} />
        </Routes>
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;