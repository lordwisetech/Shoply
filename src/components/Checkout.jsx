import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import Footer from "./Footer.jsx"; // Adjust path if needed

export default function Checkout({ cart = [], onClearCart }) {
  const navigate = useNavigate();

  // Form State
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    companyName: "",
    address: "",
    city: "",
    country: "",
    postcode: "",
    mobile: "",
    email: "",
    createAccount: false,
    shipToDifferent: false,
    orderNotes: "",
  });

  // Shipping & Payment Options
  const [shippingCost, setShippingCost] = useState(0); // 0 = Free, 15 = Flat, 8 = Local
  const [paymentMethod, setPaymentMethod] = useState("Transfer");

  // Calculate live totals
  const subtotal = cart.reduce(
    (acc, item) => acc + (item.price || 0) * (item.quantity || 1),
    0
  );
  const total = subtotal + Number(shippingCost);

  // Input change handler
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Submit Order Handler
  const handleSubmit = (e) => {
    e.preventDefault();

    if (cart.length === 0) {
      alert("Your cart is empty! Please add products before placing an order.");
      return;
    }

    alert("Order Placed Successfully! Thank you for your purchase.");

    if (onClearCart) {
      onClearCart();
    }

    navigate("/");
  };

  return (
    <>
      {/* Top Banner / Breadcrumb Header */}
      <div
        className="container-fluid py-5 text-center bg-dark"
        style={{
          marginTop: "100px",
          backgroundImage:
            "linear-gradient(rgba(0, 0, 0, 0.65), rgba(0, 0, 0, 0.65)), url('https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1600&q=80')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <h1 className="text-white display-6 fw-bold">Checkout</h1>
        <ol className="breadcrumb justify-content-center mb-0">
          <li className="breadcrumb-item">
            <Link to="/" className="text-decoration-none" style={{ color: "#81c408" }}>
              Home
            </Link>
          </li>
          <li className="breadcrumb-item text-white active" aria-current="page">
            Checkout
          </li>
        </ol>
      </div>

      {/* Checkout Section Start */}
      <div className="container-fluid py-5">
        <div className="container py-5">
          <h1 className="mb-4">Billing details</h1>
          <form onSubmit={handleSubmit}>
            <div className="row g-5">
              {/* Left Column: Billing Details Form */}
              <div className="col-md-12 col-lg-6 col-xl-7">
                <div className="row">
                  <div className="col-md-12 col-lg-6">
                    <div className="form-item w-100">
                      <label className="form-label my-3">
                        First Name<sup>*</sup>
                      </label>
                      <input
                        type="text"
                        name="firstName"
                        className="form-control"
                        required
                        value={formData.firstName}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="col-md-12 col-lg-6">
                    <div className="form-item w-100">
                      <label className="form-label my-3">
                        Last Name<sup>*</sup>
                      </label>
                      <input
                        type="text"
                        name="lastName"
                        className="form-control"
                        required
                        value={formData.lastName}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </div>

                <div className="form-item">
                  <label className="form-label my-3">
                    Company Name<sup>*</sup>
                  </label>
                  <input
                    type="text"
                    name="companyName"
                    className="form-control"
                    value={formData.companyName}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-item">
                  <label className="form-label my-3">
                    Address <sup>*</sup>
                  </label>
                  <input
                    type="text"
                    name="address"
                    className="form-control"
                    placeholder="House Number Street Name"
                    required
                    value={formData.address}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-item">
                  <label className="form-label my-3">
                    Town/City<sup>*</sup>
                  </label>
                  <input
                    type="text"
                    name="city"
                    className="form-control"
                    required
                    value={formData.city}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-item">
                  <label className="form-label my-3">
                    Country<sup>*</sup>
                  </label>
                  <input
                    type="text"
                    name="country"
                    className="form-control"
                    required
                    value={formData.country}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-item">
                  <label className="form-label my-3">
                    Postcode/Zip<sup>*</sup>
                  </label>
                  <input
                    type="text"
                    name="postcode"
                    className="form-control"
                    required
                    value={formData.postcode}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-item">
                  <label className="form-label my-3">
                    Mobile<sup>*</sup>
                  </label>
                  <input
                    type="tel"
                    name="mobile"
                    className="form-control"
                    required
                    value={formData.mobile}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-item">
                  <label className="form-label my-3">
                    Email Address<sup>*</sup>
                  </label>
                  <input
                    type="email"
                    name="email"
                    className="form-control"
                    required
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-check my-3">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="Account-1"
                    name="createAccount"
                    checked={formData.createAccount}
                    onChange={handleChange}
                  />
                  <label className="form-check-label" htmlFor="Account-1">
                    Create an account?
                  </label>
                </div>
                <hr />

                <div className="form-check my-3">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="Address-1"
                    name="shipToDifferent"
                    checked={formData.shipToDifferent}
                    onChange={handleChange}
                  />
                  <label className="form-check-label" htmlFor="Address-1">
                    Ship to a different address?
                  </label>
                </div>

                <div className="form-item">
                  <textarea
                    name="orderNotes"
                    className="form-control"
                    spellCheck="false"
                    cols="30"
                    rows="11"
                    placeholder="Order Notes (Optional)"
                    value={formData.orderNotes}
                    onChange={handleChange}
                  ></textarea>
                </div>
              </div>

              {/* Right Column: Order Summary & Payment Options */}
              <div className="col-md-12 col-lg-6 col-xl-5">
                <div className="table-responsive">
                  <table className="table">
                    <thead>
                      <tr>
                        <th scope="col">Products</th>
                        <th scope="col">Name</th>
                        <th scope="col">Price</th>
                        <th scope="col">Quantity</th>
                        <th scope="col">Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {cart.length === 0 ? (
                        <tr>
                          <td colSpan="5" className="text-center py-4 text-muted">
                            No products in cart.
                          </td>
                        </tr>
                      ) : (
                        cart.map((item) => {
                          const itemPrice = item.price || 0;
                          const itemQty = item.quantity || 1;
                          const itemTotal = itemPrice * itemQty;

                          return (
                            <tr key={item.id}>
                              <th scope="row">
                                <div className="d-flex align-items-center mt-2">
                                  <img
                                    src={
                                      item.thumbnail ||
                                      item.image ||
                                      "https://placehold.co/90x90"
                                    }
                                    className="img-fluid rounded-circle"
                                    style={{ width: "90px", height: "90px", objectFit: "cover" }}
                                    alt={item.title}
                                  />
                                </div>
                              </th>
                              <td className="py-5">{item.title}</td>
                              <td className="py-5">${itemPrice.toFixed(2)}</td>
                              <td className="py-5">{itemQty}</td>
                              <td className="py-5">${itemTotal.toFixed(2)}</td>
                            </tr>
                          );
                        })
                      )}

                      {/* Subtotal Row */}
                      <tr>
                        <th scope="row"></th>
                        <td className="py-5"></td>
                        <td className="py-5"></td>
                        <td className="py-5">
                          <p className="mb-0 text-dark py-3">Subtotal</p>
                        </td>
                        <td className="py-5">
                          <div className="py-3 border-bottom border-top">
                            <p className="mb-0 text-dark">${subtotal.toFixed(2)}</p>
                          </div>
                        </td>
                      </tr>

                      {/* Shipping Row */}
                      <tr>
                        <th scope="row"></th>
                        <td className="py-5">
                          <p className="mb-0 text-dark py-4">Shipping</p>
                        </td>
                        <td colSpan="3" className="py-5">
                          <div className="form-check text-start">
                            <input
                              type="radio"
                              className="form-check-input bg-primary border-0"
                              id="Shipping-1"
                              name="shippingOption"
                              value={0}
                              checked={shippingCost === 0}
                              onChange={() => setShippingCost(0)}
                            />
                            <label className="form-check-label" htmlFor="Shipping-1">
                              Free Shipping
                            </label>
                          </div>
                          <div className="form-check text-start">
                            <input
                              type="radio"
                              className="form-check-input bg-primary border-0"
                              id="Shipping-2"
                              name="shippingOption"
                              value={15}
                              checked={shippingCost === 15}
                              onChange={() => setShippingCost(15)}
                            />
                            <label className="form-check-label" htmlFor="Shipping-2">
                              Flat rate: $15.00
                            </label>
                          </div>
                          <div className="form-check text-start">
                            <input
                              type="radio"
                              className="form-check-input bg-primary border-0"
                              id="Shipping-3"
                              name="shippingOption"
                              value={8}
                              checked={shippingCost === 8}
                              onChange={() => setShippingCost(8)}
                            />
                            <label className="form-check-label" htmlFor="Shipping-3">
                              Local Pickup: $8.00
                            </label>
                          </div>
                        </td>
                      </tr>

                      {/* Grand Total Row */}
                      <tr>
                        <th scope="row"></th>
                        <td className="py-5">
                          <p className="mb-0 text-dark text-uppercase py-3">TOTAL</p>
                        </td>
                        <td className="py-5"></td>
                        <td className="py-5"></td>
                        <td className="py-5">
                          <div className="py-3 border-bottom border-top">
                            <p className="mb-0 text-dark">${total.toFixed(2)}</p>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                {/* Direct Bank Transfer */}
                <div className="row g-4 text-center align-items-center justify-content-center border-bottom py-3">
                  <div className="col-12">
                    <div className="form-check text-start my-3">
                      <input
                        type="radio"
                        className="form-check-input bg-primary border-0"
                        id="Transfer-1"
                        name="paymentMethod"
                        value="Transfer"
                        checked={paymentMethod === "Transfer"}
                        onChange={() => setPaymentMethod("Transfer")}
                      />
                      <label className="form-check-label" htmlFor="Transfer-1">
                        Direct Bank Transfer
                      </label>
                    </div>
                    {paymentMethod === "Transfer" && (
                      <p className="text-start text-dark">
                        Make your payment directly into our bank account. Please use
                        your Order ID as the payment reference. Your order will not be
                        shipped until the funds have cleared in our account.
                      </p>
                    )}
                  </div>
                </div>

                {/* Check Payments */}
                <div className="row g-4 text-center align-items-center justify-content-center border-bottom py-3">
                  <div className="col-12">
                    <div className="form-check text-start my-3">
                      <input
                        type="radio"
                        className="form-check-input bg-primary border-0"
                        id="Payments-1"
                        name="paymentMethod"
                        value="Check"
                        checked={paymentMethod === "Check"}
                        onChange={() => setPaymentMethod("Check")}
                      />
                      <label className="form-check-label" htmlFor="Payments-1">
                        Check Payments
                      </label>
                    </div>
                  </div>
                </div>

                {/* Cash On Delivery */}
                <div className="row g-4 text-center align-items-center justify-content-center border-bottom py-3">
                  <div className="col-12">
                    <div className="form-check text-start my-3">
                      <input
                        type="radio"
                        className="form-check-input bg-primary border-0"
                        id="Delivery-1"
                        name="paymentMethod"
                        value="COD"
                        checked={paymentMethod === "COD"}
                        onChange={() => setPaymentMethod("COD")}
                      />
                      <label className="form-check-label" htmlFor="Delivery-1">
                        Cash On Delivery
                      </label>
                    </div>
                  </div>
                </div>

                {/* Paypal */}
                <div className="row g-4 text-center align-items-center justify-content-center border-bottom py-3">
                  <div className="col-12">
                    <div className="form-check text-start my-3">
                      <input
                        type="radio"
                        className="form-check-input bg-primary border-0"
                        id="Paypal-1"
                        name="paymentMethod"
                        value="Paypal"
                        checked={paymentMethod === "Paypal"}
                        onChange={() => setPaymentMethod("Paypal")}
                      />
                      <label className="form-check-label" htmlFor="Paypal-1">
                        Paypal
                      </label>
                    </div>
                  </div>
                </div>

                {/* Submit / Place Order Button */}
                <div className="row g-4 text-center align-items-center justify-content-center pt-4">
                  <button
                    type="submit"
                    className="btn border-secondary py-3 px-4 text-uppercase w-100 text-primary"
                  >
                    Place Order
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
      {/* Checkout Section End */}

      <Footer />
    </>
  );
}