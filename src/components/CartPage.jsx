import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import Footer from "./Footer.jsx"; // Adjust path if needed

export default function CartPage({ cart = [], setCart }) {
  const navigate = useNavigate();
  const [couponCode, setCouponCode] = useState("");
  const [discount, setDiscount] = useState(0);

  // Update item quantity
  const handleUpdateQuantity = (id, delta) => {
    if (!setCart) return;
    setCart((prevCart) =>
      prevCart
        .map((item) => {
          if (item.id === id) {
            const newQty = (item.quantity || 1) + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean)
    );
  };

  // Remove item from cart
  const handleRemoveItem = (id) => {
    if (!setCart) return;
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  // Apply Coupon Logic
  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (!couponCode.trim()) return;

    if (couponCode.toUpperCase() === "SAVE10") {
      setDiscount(10);
      alert("Success: $10 coupon applied!");
    } else {
      alert("Invalid coupon code. Try 'SAVE10'");
    }
  };

  // Calculations
  const subtotal = cart.reduce(
    (acc, item) => acc + (item.price || 0) * (item.quantity || 1),
    0
  );
  const shipping = subtotal > 0 ? 3.0 : 0.0;
  const total = Math.max(0, subtotal + shipping - discount);

  return (
    <>
      {/* Top Banner Header matching template style */}
      <div
        className="container-fluid py-5 text-center bg-dark"
        style={{
          marginTop: "100px",
          backgroundImage:
            "linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1600&q=80')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <h1 className="text-white display-6 fw-bold">Cart</h1>
        <ol className="breadcrumb justify-content-center mb-0">
          <li className="breadcrumb-item">
            <Link to="/" className="text-primary text-decoration-none" style={{ color: "#81c408" }}>
              Home
            </Link>
          </li>
          <li className="breadcrumb-item text-white active" aria-current="page">
            Cart
          </li>
        </ol>
      </div>

    
      <div className="container-fluid py-5">
        <div className="container py-5">
          {cart.length === 0 ? (
            <div className="text-center py-5">
              <i className="fas fa-shopping-basket display-1 text-muted mb-3"></i>
              <h2>Your Cart is Currently Empty</h2>
              <p className="text-muted">Looks like you haven't added anything to your cart yet.</p>
              <Link
                to="/shop"
                className="btn border-secondary rounded-pill px-4 py-3 text-primary mt-3"
              >
                Return To Shop
              </Link>
            </div>
          ) : (
            <>
              <div className="table-responsive">
                <table className="table">
                  <thead>
                    <tr>
                      <th scope="col">Products</th>
                      <th scope="col">Name</th>
                      <th scope="col">Price</th>
                      <th scope="col">Quantity</th>
                      <th scope="col">Total</th>
                      <th scope="col">Handle</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cart.map((item) => {
                      const itemPrice = item.price || 0;
                      const itemQty = item.quantity || 1;
                      const itemTotal = itemPrice * itemQty;

                      return (
                        <tr key={item.id}>
                          <th scope="row">
                            <div className="d-flex align-items-center">
                              <img
                                src={
                                  item.thumbnail ||
                                  item.image ||
                                  "https://placehold.co/80x80"
                                }
                                className="img-fluid me-5 rounded-circle"
                                style={{ width: "80px", height: "80px", objectFit: "cover" }}
                                alt={item.title}
                              />
                            </div>
                          </th>
                          <td>
                            <p className="mb-0 mt-4">{item.title}</p>
                          </td>
                          <td>
                            <p className="mb-0 mt-4">${itemPrice.toFixed(2)}</p>
                          </td>
                          <td>
                            <div className="input-group quantity mt-4" style={{ width: "100px" }}>
                              <div className="input-group-btn">
                                <button
                                  className="btn btn-sm btn-minus rounded-circle bg-light border"
                                  onClick={() => handleUpdateQuantity(item.id, -1)}
                                  type="button"
                                >
                                  <i className="fa fa-minus"></i>
                                </button>
                              </div>
                              <input
                                type="text"
                                className="form-control form-control-sm text-center border-0"
                                value={itemQty}
                                readOnly
                              />
                              <div className="input-group-btn">
                                <button
                                  className="btn btn-sm btn-plus rounded-circle bg-light border"
                                  onClick={() => handleUpdateQuantity(item.id, 1)}
                                  type="button"
                                >
                                  <i className="fa fa-plus"></i>
                                </button>
                              </div>
                            </div>
                          </td>
                          <td>
                            <p className="mb-0 mt-4">${itemTotal.toFixed(2)}</p>
                          </td>
                          <td>
                            <button
                              className="btn btn-md rounded-circle bg-light border mt-4"
                              onClick={() => handleRemoveItem(item.id)}
                              type="button"
                            >
                              <i className="fa fa-times text-danger"></i>
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              <div className="mt-5">
                <input
                  type="text"
                  className="border-0 border-bottom rounded me-5 py-3 mb-4"
                  placeholder="Coupon Code"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                />
                <button
                  className="btn border-secondary rounded-pill px-4 py-3 text-primary"
                  type="button"
                  onClick={handleApplyCoupon}
                >
                  Apply Coupon
                </button>
              </div>

              <div className="row g-4 justify-content-end">
                <div className="col-8"></div>
                <div className="col-sm-8 col-md-7 col-lg-6 col-xl-4">
                  <div className="bg-light rounded">
                    <div className="p-4">
                      <h1 className="display-6 mb-4">
                        Cart <span className="fw-normal">Total</span>
                      </h1>
                      <div className="d-flex justify-content-between mb-4">
                        <h5 className="mb-0 me-4">Subtotal:</h5>
                        <p className="mb-0">${subtotal.toFixed(2)}</p>
                      </div>
                      <div className="d-flex justify-content-between">
                        <h5 className="mb-0 me-4">Shipping</h5>
                        <div>
                          <p className="mb-0">Flat rate: ${shipping.toFixed(2)}</p>
                        </div>
                      </div>
                      {discount > 0 && (
                        <div className="d-flex justify-content-between mt-3 text-success">
                          <h5 className="mb-0 me-4">Discount:</h5>
                          <p className="mb-0">-${discount.toFixed(2)}</p>
                        </div>
                      )}
                    </div>
                    <div className="py-4 mb-4 border-top border-bottom d-flex justify-content-between">
                      <h5 className="mb-0 ps-4 me-4">Total</h5>
                      <p className="mb-0 pe-4">${total.toFixed(2)}</p>
                    </div>
                    <button
                      className="btn border-secondary rounded-pill px-4 py-3 text-primary text-uppercase mb-4 ms-4"
                      type="button"
                      onClick={() => navigate("/checkout")}
                    >
                      Proceed Checkout
                    </button>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    

      <Footer />
    </>
  );
}