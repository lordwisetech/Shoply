import { Link } from "react-router";
import "../Home.css";
import { useQuery } from "@tanstack/react-query";
import { fetchOneproducts } from "./api/api";
import Nav from "./nav.jsx";
import { useEffect, useState } from "react";

function Home() {
  const [nextProducts, setNextProducts] = useState(1);

  // Change featured product every 10 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setNextProducts(Math.floor(Math.random() * 194) + 1);
    }, 100 * 60 * 60 );

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

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (isError) {
    return <h2>{error.message}</h2>;
  }

  return (
    <div className="home">
      <Nav />

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

        {/* Featured Product */}
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

              <button className="cart-btn">
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;