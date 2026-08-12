import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import Navigation from "./Navigation.jsx";
import "../Home.css";
import Features from "./Features.jsx";
import { fetchOneproducts } from "./api/api";
import Products from "./products.jsx";
import Vegetables from "./vegetables.jsx";
import Services from "./services.jsx";
import Banner from "./banner.jsx";
import BestsellerProducts from "./Bestseller.jsx";
import Facts from "./fact.jsx";
import Footer from "./Footer.jsx";
import Copyright from "./copyright.jsx";

// Styled Loading Component for Home
function LoadingHome() {
  const [isHovered, setIsHovered] = useState(false);

  const containerStyle = {
    padding: "45px 65px",
    borderRadius: "24px",
    backgroundColor: "#ffffff",
    border: isHovered ? "2px solid #81c408" : "2px solid #e9ecef",
    boxShadow: isHovered
      ? "0 12px 30px rgba(129, 196, 8, 0.25)"
      : "0 4px 15px rgba(0, 0, 0, 0.06)",
    transform: isHovered ? "translateY(-6px) scale(1.02)" : "translateY(0) scale(1)",
    transition: "all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)",
    cursor: "pointer",
    textAlign: "center",
    maxWidth: "420px",
    width: "100%",
  };

  return (
    <div className="d-flex justify-content-center align-items-center py-5 my-5" style={{ minHeight: "50vh" }}>
      <div
        style={containerStyle}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="mb-3">
          <i
            className="fas fa-store fa-spin display-3"
            style={{
              color: "#81c408",
              filter: isHovered ? "drop-shadow(0 4px 8px rgba(129, 196, 8, 0.4))" : "none",
              transition: "filter 0.3s ease",
            }}
          ></i>
        </div>
        <h3
          className="fw-bold mb-2"
          style={{
            color: isHovered ? "#81c408" : "#2d3748",
            transition: "color 0.3s ease",
          }}
        >
          Loading Home...
        </h3>
        <p className="text-muted mb-0 small">Fetching featured products for you</p>
      </div>
    </div>
  );
}

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

  // Styled Loading state on initial render
  if (isLoading && !singleProducts) {
    return (
      <>
        <Navigation />
        <LoadingHome />
        <Footer />
        <Copyright />
      </>
    );
  }

  if (isError) {
    return (
      <>
        <Navigation />
        <div className="text-center py-5 my-5">
          <h2 className="text-danger">Error: {error.message}</h2>
        </div>
        <Footer />
        <Copyright />
      </>
    );
  }

  return (
    <>
      <Navigation />

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

            <Link to="/shop">
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

      <Features />
      <Products />
      <Services />
      <Vegetables />
      <Banner />
      <BestsellerProducts />
      <Facts />
      <Footer />
      <Copyright />
    </>
  );
}

export default Home;