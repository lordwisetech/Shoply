import React from "react";
import { useParams, useNavigate } from "react-router";
import "../ProductDetails.css";
import Nav from "./nav.jsx";
import { useQuery } from "@tanstack/react-query";
import { fetchOneproducts } from "./api/api.js";

function ProductDetails({ cart = [], setCart }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["products details", id],
    queryFn: () => fetchOneproducts(id),
  });

  if (isLoading) {
    return <h1> Loading........</h1>;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
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
      <Nav cart={cart} />

      <main className="details-page">
        {/* Breadcrumb */}
        <div className="breadcrumb">
          Home / Products / {product.title}
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
    </>
  );
}

export default ProductDetails;