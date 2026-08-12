import { useState } from 'react';
import { Route, Routes } from 'react-router';

// Page & Component Imports
import Home from './components/Home.jsx';
import Products from './components/products.jsx';
import ProductsDetails from './components/productsDetails.jsx';
import Shop from './components/shop/shop.jsx';
import Checkout from './components/Checkout.jsx';
import CartPage from './components/CartPage.jsx'; // 1. Added Cart page import
import NotFound from './components/NotFound.jsx';
import Nav from './components/Navigation.jsx';
import Contact from './components/contacts.jsx';

function App() {
  const [cart, setCart] = useState([]);

  const handleClearCart = () => {
    setCart([]);
  };

  return (
    <>
      {/* Global Navigation - Rendered once for all routes */}
      <Nav cart={cart} />

      <Routes>
        <Route 
          path="/" 
          element={<Home cart={cart} setCart={setCart} />} 
        />

        <Route 
          path="/shop" 
          element={<Shop cart={cart} setCart={setCart} />} 
        />

        <Route 
          path="/products" 
          element={<Products cart={cart} setCart={setCart} />} 
        />

        <Route
          path="/products/:id"
          element={<ProductsDetails cart={cart} setCart={setCart} />}
        />

        {/* 2. Added /cart route */}
        <Route 
          path="/cart" 
          element={<CartPage cart={cart} setCart={setCart} />} 
        />

        <Route 
          path="/checkout" 
          element={<Checkout cart={cart} onClearCart={handleClearCart} />}
        />
              <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;