import { Link } from "react-router";
import Navigation from "./Navigation.jsx";
import "../Home.css";
import Features from './Features.jsx'
import { useQuery, keepPreviousData } from "@tanstack/react-query"; // 1. Import keepPreviousData
import { fetchOneproducts } from "./api/api";
import { useEffect, useState } from "react";
import Products from "./products.jsx";
import Vegetables from "./vegetables.jsx";

function Home({ cart = [], setCart }) {
  const [nextProducts, setNextProducts] = useState(1);
  const [slideState, setSlideState] = useState("slide-in");

  useEffect(() => {
    const interval = setInterval(() => {
      setSlideState("slide-out");

      setTimeout(() => {
        setNextProducts(Math.floor(Math.random() * 194) + 1);
        setSlideState("slide-in");
      }, 500);
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const {
    isLoading,
    isError,
    data: singleProducts,
    error,
  } = useQuery({
    queryKey: ["one products", nextProducts],
    queryFn: () => fetchOneproducts(nextProducts),
    // 2. This keeps the current product visible while fetching the next one
    placeholderData: keepPreviousData, 
  });

  const handleAddToCart = () => {
    if (!setCart || !singleProducts) return;

    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === singleProducts.id);

      if (existingItem) {
        return prevCart.map((item) =>
          item.id === singleProducts.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevCart, { ...singleProducts, quantity: 1 }];
      }
    });
  };

  // 3. ONLY show loading on the very first render when there is no product data at all
  if (isLoading && !singleProducts) {
    return <h1>Loading...</h1>;
  }

  if (isError) {
    return <h2>{error.message}</h2>;
  }

  return (<>
  <Navigation />
  <br /> <br /> <br /> <br /> <br /> 
    <div className="home">
      


      <section className="hero">
        <div className="hero-text">
          <span className="small-title">FEATURED PRODUCT</span>

          <h1>
            Discover products
            <br />
            you'll love.
          </h1>

          <p>
            Find quality products at great prices. Explore our collection
            and discover something perfect for you.
          </p>

          <Link to="/">
            <button className="shop-btn">Shop Now →</button>
          </Link>
        </div>

        {/* Featured Product Card */}
        {singleProducts && (
          <div className={`product-card ${slideState}`}>
            <div className="product-image">
              <img
                src={singleProducts.thumbnail}
                alt={singleProducts.title}
              />
            </div>

            <div className="product-info">
              <span className="category">{singleProducts.category}</span>

              <h2>{singleProducts.title}</h2>

              <div className="rating">⭐ {singleProducts.rating}</div>

              <p className="description">{singleProducts.description}</p>

              <div className="product-bottom">
                <strong>${singleProducts.price}</strong>

                <button className="cart-btn" onClick={handleAddToCart}>
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        )}
      </section>
      
    </div>
    <Features/>

    <Products/>
    <Vegetables/>

 </> );
}

export default Home;