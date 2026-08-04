import { Link } from "react-router";
import "../Home.css";
import { useQuery } from "@tanstack/react-query";
import { fetchOneproducts } from "./api/api";
import Nav from "./nav.jsx";
import { useEffect, useState } from "react";

function Home({ cart = [], setCart }) {
  const [nextProducts, setNextProducts] = useState(1);

  // Change featured product every 10 seconds (10,000 ms)
  useEffect(() => {
    const interval = setInterval(() => {
      setNextProducts(Math.floor(Math.random() * 194) + 1);
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

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (isError) {
    return <h2>{error.message}</h2>;
  }

  return (
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

          <Link to="/products">
            <button className="shop-btn">
              Shop Now →
            </button>
          </Link>
        </div>

        {/* Featured Product Card */}
        {singleProducts && (
          <div className="product-card">
            <div className="product-image">
              <img
                src={singleProducts.thumbnail}
                alt={singleProducts.title}
              />
            </div>

            <div className="product-info">
              <span className="category">
                {singleProducts.category}
              </span>

              <h2>{singleProducts.title}</h2>

              <div className="rating">
                ⭐ {singleProducts.rating}
              </div>

              <p className="description">
                {singleProducts.description}
              </p>

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
  );
}

export default Home;