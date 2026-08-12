import React from "react";


export function ProductCard({ product, onAddToCart }) {
  return (
    <div className="col-md-6 col-lg-6 col-xl-4">
      <div className="rounded position-relative fruite-item">
        <div className="fruite-img">
          <img
            src={product.thumbnail || product.image}
            className="img-fluid w-100 rounded-top"
            alt={product.title}
          />
        </div>
        <div
          className="text-white bg-secondary px-3 py-1 rounded position-absolute"
          style={{ top: "10px", left: "10px" }}
        >
          {product.category}
        </div>
        <div className="p-4 border border-secondary border-top-0 rounded-bottom">
          <h4 className="text-truncate">{product.title}</h4>
          <p style={{ height: "48px", overflow: "hidden" }}>
            {product.description?.slice(0, 70)}...
          </p>
          <div className="d-flex justify-content-between flex-lg-wrap align-items-center">
            <p className="text-dark fs-5 fw-bold mb-0">${product.price}</p>
            <button
              onClick={() => onAddToCart(product)}
              className="btn border border-secondary rounded-pill px-3 text-primary"
            >
              <i className="fa fa-shopping-bag me-2 text-primary"></i> Add to cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}