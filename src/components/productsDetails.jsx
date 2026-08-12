import React, { useState } from "react";
import { useParams, useNavigate } from "react-router";
import "../ProductDetails.css";
import { Link } from "react-router";

import Footer from './Footer.jsx';

import { useQuery } from "@tanstack/react-query";
import { fetchOneproducts } from "./api/api.js";

// Styled Loading Component for Product Details
function LoadingProductDetails() {
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
    <div className="d-flex justify-content-center align-items-center py-5 my-5" style={{ minHeight: "50vh", marginTop: "120px" }}>
      <div
        style={containerStyle}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="mb-3">
          <i
            className="fas fa-box-open fa-spin display-3"
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
          Loading Details...
        </h3>
        <p className="text-muted mb-0 small">Fetching product specs & availability</p>
      </div>
    </div>
  );
}

function ProductDetails({ cart = [], setCart }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["products details", id],
    queryFn: () => fetchOneproducts(id),
  });

  // Styled Loading State with Navbar & Footer integration
  if (isLoading) {
    return (
      <>
        
        <LoadingProductDetails />
        <Footer />
      </>
    );
  }

  if (isError) {
    return (
      <>
        <Navbar />
        <div className="text-center py-5 my-5" style={{ marginTop: "120px" }}>
          <h2 className="text-danger">Error: {error.message}</h2>
          <Link to="/shop" className="btn text-white mt-3" style={{ backgroundColor: "#81c408" }}>
            Back to Shop
          </Link>
        </div>
        <Footer />
      </>
    );
  }

  const product = data;

  // Add item to cart state
  const handleAddToCart = () => {
    if (!setCart) return;

    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);

      if (existingItem) {
        // If product is already in cart, increment quantity
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        // If product is not in cart, add it with quantity: 1
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };

  // Add item to cart and navigate straight to checkout
  const handleBuyNow = () => {
    handleAddToCart();
    navigate("/checkout");
  };

  return (
    <>
      <Navbar />
      <br /><br /><br /><br /><br />

      <main className="details-page">
        {/* Breadcrumb */}
        <div className="breadcrumb">
          <Link to="/">
            <p>Home </p>
          </Link>  / {product.title}
        </div>

        {/* Product */}
        <section className="details-container">
          {/* Image */}
          <div className="details-image">
            <img src={product.thumbnail} alt={product.title} />
          </div>

          {/* Information */}
          <div className="details-info">
            <span className="details-category">{product.category}</span>

            <h1>{product.title}</h1>

            <div className="details-rating">⭐ {product.rating}</div>

            <p className="details-description">{product.description}</p>

            <div className="details-price">${product.price}</div>

            <div className="stock">
              <span>●</span> {product.stock} items available
            </div>

            <div className="details-actions">
              <button className="add-cart" onClick={handleAddToCart}>
                Add to Cart
              </button>

              <button className="buy-now" onClick={handleBuyNow}>
                Buy Now
              </button>
            </div>

            {/* Extra details */}
            <div className="extra-details">
              <div>
                <span>Brand</span>
                <strong>{product.brand || "N/A"}</strong>
              </div>

              <div>
                <span>SKU</span>
                <strong>{product.sku}</strong>
              </div>

              <div>
                <span>Shipping</span>
                <strong>{product.shippingInformation}</strong>
              </div>

              <div>
                <span>Warranty</span>
                <strong>{product.warrantyInformation}</strong>
              </div>
            </div>

            {/* Tags */}
            <div className="tags">
              {product.tags?.map((tag) => (
                <span key={tag}>#{tag}</span>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

export default ProductDetails;