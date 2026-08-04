import { useState } from 'react';
import { Route, Routes } from 'react-router';
import Home from './components/Home.jsx';
import Products from './components/products.jsx';
import ProductsDetails from './components/productsDetails.jsx';
import Checkout from './components/Checkout.jsx'; // 1. Added missing Checkout import

function App() {
  // 2. State definition
  const [cart, setCart] = useState([]);

  // 3. Added closing brace for handleClearCart
  const handleClearCart = () => {
    setCart([]);
  };

  return (
    <Routes>
      <Route path="/" element={<Home />} />

      {/* Passed cart & setCart props to /products */}
      <Route 
        path="/products" 
        element={<Products cart={cart} setCart={setCart} />} 
      />

      <Route
        path="/products/:id"
        element={<ProductsDetails cart={cart} setCart={setCart} />}
      />

      <Route 
        path="/checkout" 
        element={<Checkout cart={cart} onClearCart={handleClearCart} />}
      />
    </Routes>
  );
}

export default App;