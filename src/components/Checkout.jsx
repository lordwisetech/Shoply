import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import './Checkout.css';

export default function Checkout({ cart = [], onClearCart }) {
  const navigate = useNavigate();

  // Form state
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    address: '',
    city: '',
    zipCode: '',
    cardNumber: '',
    expDate: '',
    cvv: '',
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  
  // 1. State to save order summary before cart gets cleared
  const [orderDetails, setOrderDetails] = useState(null);

  // Calculate totals from active cart
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = subtotal > 0 ? 10.00 : 0;
  const grandTotal = (subtotal + shipping).toFixed(2);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (cart.length === 0) return;

    // 2. Lock in order details BEFORE clearing the cart
    setOrderDetails({
      fullName: formData.fullName,
      address: formData.address,
      city: formData.city,
      totalPaid: grandTotal,
    });

    setIsSubmitted(true);

    // 3. Clear the cart in App component
    if (onClearCart) {
      onClearCart();
    }
  };

  // Confirmation screen after placing order
  if (isSubmitted && orderDetails) {
    return (
      <div className="checkout-container">
        <div className="order-success-card">
          <div className="success-icon">🎉</div>
          <h2>Thank You for Your Order!</h2>
          <p>We've received your order and are processing it right now.</p>
          <div className="order-details-summary">
            <p><strong>Deliver to:</strong> {orderDetails.fullName}</p>
            <p><strong>Address:</strong> {orderDetails.address}, {orderDetails.city}</p>
            <p><strong>Total Paid:</strong> ${orderDetails.totalPaid}</p>
          </div>
          <button className="back-home-btn" onClick={() => navigate('/products')}>
            Back to Products
          </button>
        </div>
      </div>
    );
  }

  // If cart is empty and order was not submitted
  if (cart.length === 0) {
    return (
      <div className="checkout-container">
        <div className="empty-checkout-card">
          <h2>Your Cart is Empty</h2>
          <p>Add some products before proceeding to checkout.</p>
          <Link to="/products" className="back-home-btn">
            Explore Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="checkout-container">
      <h1 className="checkout-title">Checkout</h1>

      <div className="checkout-grid">
        {/* Left Side: Shipping & Payment Form */}
        <form className="checkout-form" onSubmit={handleSubmit}>
          <section className="form-section">
            <h3>Shipping Information</h3>
            <div className="input-group">
              <label>Full Name</label>
              <input
                type="text"
                name="fullName"
                required
                placeholder="John Doe"
                value={formData.fullName}
                onChange={handleChange}
              />
            </div>

            <div className="input-group">
              <label>Email Address</label>
              <input
                type="email"
                name="email"
                required
                placeholder="john@example.com"
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            <div className="input-group">
              <label>Shipping Address</label>
              <input
                type="text"
                name="address"
                required
                placeholder="123 Main Street"
                value={formData.address}
                onChange={handleChange}
              />
            </div>

            <div className="input-row">
              <div className="input-group">
                <label>City</label>
                <input
                  type="text"
                  name="city"
                  required
                  placeholder="New York"
                  value={formData.city}
                  onChange={handleChange}
                />
              </div>

              <div className="input-group">
                <label>ZIP / Postal Code</label>
                <input
                  type="text"
                  name="zipCode"
                  required
                  placeholder="10001"
                  value={formData.zipCode}
                  onChange={handleChange}
                />
              </div>
            </div>
          </section>

          <section className="form-section">
            <h3>Payment Details</h3>
            <div className="input-group">
              <label>Card Number</label>
              <input
                type="text"
                name="cardNumber"
                required
                placeholder="4532 •••• •••• 8890"
                maxLength="19"
                value={formData.cardNumber}
                onChange={handleChange}
              />
            </div>

            <div className="input-row">
              <div className="input-group">
                <label>Expiration Date</label>
                <input
                  type="text"
                  name="expDate"
                  required
                  placeholder="MM/YY"
                  maxLength="5"
                  value={formData.expDate}
                  onChange={handleChange}
                />
              </div>

              <div className="input-group">
                <label>CVV</label>
                <input
                  type="password"
                  name="cvv"
                  required
                  placeholder="123"
                  maxLength="4"
                  value={formData.cvv}
                  onChange={handleChange}
                />
              </div>
            </div>
          </section>

          <button type="submit" className="place-order-btn">
            Place Order (${grandTotal})
          </button>
        </form>

        {/* Right Side: Order Summary */}
        <aside className="order-summary-card">
          <h3>Order Summary</h3>
          <div className="summary-items">
            {cart.map((item) => (
              <div key={item.id} className="summary-item">
                <img src={item.thumbnail} alt={item.title} />
                <div className="summary-item-info">
                  <h4>{item.title}</h4>
                  <p>Qty: {item.quantity}</p>
                </div>
                <span>${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>

          <div className="summary-totals">
            <div className="summary-row">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="summary-row">
              <span>Flat Shipping</span>
              <span>${shipping.toFixed(2)}</span>
            </div>
            <hr />
            <div className="summary-row total">
              <span>Total</span>
              <strong>${grandTotal}</strong>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}