import Home from './components/Home.jsx';
import Products from './components/products.jsx';
import ProductsDetails from './components/productsDetails.jsx';
import { Route, Routes } from 'react-router';

function App() {

  return (
    <Routes>
      <Route path="/" element={<Home />} />

      <Route path="/products" element={<Products />} />

      <Route
        path="/products/:id"
        element={<ProductsDetails />}
      />
    </Routes>
  );
}

export default App;