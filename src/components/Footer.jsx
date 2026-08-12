import React, { useState } from 'react';
import { Link } from 'react-router';

// Import template styles
import '../assets/css/bootstrap.min.css';
import '../assets/css/style.css';

function Footer() {
  const [email, setEmail] = useState('');

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email) return;
    alert(`Subscribed with: ${email}`);
    setEmail('');
  };

  return (
    <div className="container-fluid bg-dark text-white-50 footer pt-5 mt-5">
      <div className="container py-5">
        
        {/* Top Header & Newsletter Subscription Row */}
        <div className="pb-4 mb-4" style={{ borderBottom: '1px solid rgba(226, 175, 24, 0.5)' }}>
          <div className="row g-4 align-items-center">
            
            {/* Brand Logo / Title */}
            <div className="col-lg-3">
              <Link to="/" className="text-decoration-none">
                <h1 className="text-primary mb-0">Shoply</h1>
                <p className="text-secondary mb-0">Fresh products</p>
              </Link>
            </div>

            {/* Newsletter Input Form */}
            <div className="col-lg-6">
              <form onSubmit={handleSubscribe} className="position-relative mx-auto">
                <input
                  className="form-control border-0 w-100 py-3 px-4 rounded-pill"
                  type="email"
                  placeholder="Your Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <button
                  type="submit"
                  className="btn btn-primary border-0 py-3 px-4 position-absolute rounded-pill text-white"
                  style={{ top: 0, right: 0 }}
                >
                  Subscribe Now
                </button>
              </form>
            </div>

            {/* Social Media Links */}
            <div className="col-lg-3">
              <div className="d-flex justify-content-lg-end pt-3">
                <a className="btn btn-outline-secondary me-2 btn-md-square rounded-circle" href="#!">
                  <i className="fab fa-twitter"></i>
                </a>
                <a className="btn btn-outline-secondary me-2 btn-md-square rounded-circle" href="#!">
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a className="btn btn-outline-secondary me-2 btn-md-square rounded-circle" href="#!">
                  <i className="fab fa-youtube"></i>
                </a>
                <a className="btn btn-outline-secondary btn-md-square rounded-circle" href="#!">
                  <i className="fab fa-linkedin-in"></i>
                </a>
              </div>
            </div>

          </div>
        </div>

        {/* Footer Navigation Columns */}
        <div className="row g-5">
          
          {/* Column 1: About */}
          <div className="col-lg-3 col-md-6">
            <div className="footer-item">
              <h4 className="text-light mb-3">Why People Like us!</h4>
              <p className="mb-4">
                typesetting, remaining essentially unchanged. It was 
                popularised in the 1960s with the like Aldus PageMaker including of Lorem Ipsum.
              </p>
              <Link to="/about" className="btn border-secondary py-2 px-4 rounded-pill text-primary text-decoration-none">
                Read More
              </Link>
            </div>
          </div>

          {/* Column 2: Shop Info Links */}
          <div className="col-lg-3 col-md-6">
            <div className="d-flex flex-column text-start footer-item">
              <h4 className="text-light mb-3">Shop Info</h4>
              <Link className="btn-link text-decoration-none" to="/about">About Us</Link>
              <Link className="btn-link text-decoration-none" to="/contact">Contact Us</Link>
              <Link className="btn-link text-decoration-none" to="/privacy">Privacy Policy</Link>
              <Link className="btn-link text-decoration-none" to="/terms">Terms & Condition</Link>
              <Link className="btn-link text-decoration-none" to="/returns">Return Policy</Link>
              <Link className="btn-link text-decoration-none" to="/faqs">FAQs & Help</Link>
            </div>
          </div>

          {/* Column 3: Account Links */}
          <div className="col-lg-3 col-md-6">
            <div className="d-flex flex-column text-start footer-item">
              <h4 className="text-light mb-3">Account</h4>
              <Link className="btn-link text-decoration-none" to="/account">My Account</Link>
              <Link className="btn-link text-decoration-none" to="/products">Shop details</Link>
              <Link className="btn-link text-decoration-none" to="/cart">Shopping Cart</Link>
              <Link className="btn-link text-decoration-none" to="/wishlist">Wishlist</Link>
              <Link className="btn-link text-decoration-none" to="/orders">Order History</Link>
              <Link className="btn-link text-decoration-none" to="/international-orders">International Orders</Link>
            </div>
          </div>

          {/* Column 4: Contact Info */}
          <div className="col-lg-3 col-md-6">
            <div className="footer-item">
              <h4 className="text-light mb-3">Contact</h4>
              <p>Address: 1429 Netus Rd, NY 48247</p>
              <p>Email: Example@gmail.com</p>
              <p>Phone: +0123 4567 8910</p>
              <p>Payment Accepted</p>
              <img src="../payment.png" className="img-fluid" alt="Accepted Payment Methods" />
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}

export default Footer;