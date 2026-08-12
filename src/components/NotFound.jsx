import React from "react";
import { Link } from "react-router";

export default function NotFound() {
  return (
    <>
     

      {/* Top Banner / Breadcrumb Header */}
      <div 
        className="container-fluid py-5 text-center bg-dark"
        style={{
          marginTop: "100px",
          backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('https://images.unsplash.com/photo-1610832958506-aa56368176cf?auto=format&fit=crop&w=1200&q=80')",
          backgroundSize: "cover",
          backgroundPosition: "center"
        }}
      >
        <h1 className="text-white display-6 fw-bold">404 Error</h1>
        <ol className="breadcrumb justify-content-center mb-0">
          <li className="breadcrumb-item">
            <Link to="/" className="text-primary text-decoration-none" style={{ color: "#81c408" }}>Home</Link>
          </li>
          <li className="breadcrumb-item text-white active" aria-current="page">404</li>
        </ol>
      </div>

      {/* 404 Main Error Body */}
      <div className="container-fluid py-5">
        <div className="container py-5 text-center">
          <div className="row justify-content-center">
            <div className="col-lg-6">
              {/* Warning Icon */}
              <div className="mb-3">
                <i 
                  className="fas fa-exclamation-triangle display-1" 
                  style={{ color: "#ffb524" }}
                ></i>
              </div>

              {/* Big 404 Text */}
              <h1 
                className="display-1 fw-bold mb-2" 
                style={{ color: "#81c408", fontSize: "6rem" }}
              >
                404
              </h1>

              <h2 className="mb-4 text-dark fw-bold">Page Not Found</h2>
              
              <p className="mb-4 text-muted">
                We couldn't find the page you're looking for. It might have been moved, deleted, or perhaps the URL was mistyped.
              </p>

              {/* Action Buttons */}
              <div className="d-flex justify-content-center gap-3">
                <Link
                  to="/"
                  className="btn border border-secondary rounded-pill py-3 px-5 text-primary fw-bold"
                  style={{ borderColor: "#81c408", color: "#81c408" }}
                >
                  <i className="fas fa-home me-2"></i> Back to Home
                </Link>

                <Link
                  to="/shop"
                  className="btn rounded-pill py-3 px-5 text-white fw-bold"
                  style={{ backgroundColor: "#81c408" }}
                >
                  <i className="fas fa-shopping-bag me-2"></i> Visit Shop
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Component */}
      <Footer />
    </>
  );
}

// Matching Footer Component included directly below for full code
function Footer() {
  return (
    <footer className="container-fluid bg-dark text-white-50 footer pt-5 mt-5">
      <div className="container py-5">
        <div className="pb-4 mb-4 border-bottom border-secondary">
          <div className="row g-4 align-items-center">
            <div className="col-lg-3">
              <Link to="/" className="text-decoration-none">
                <h1 className="text-primary mb-0" style={{ color: "#81c408" }}>Shoplys</h1>
                <p className="text-secondary mb-0">Fresh & Organic Products</p>
              </Link>
            </div>
            <div className="col-lg-6">
              <div className="position-relative mx-auto">
                <input
                  className="form-control border-0 w-100 py-3 ps-4 pe-5 rounded-pill"
                  type="number"
                  placeholder="Your Email"
                />
                <button
                  type="submit"
                  className="btn btn-primary border-0 border-secondary py-3 px-4 position-absolute rounded-pill text-white"
                  style={{ top: 0, right: 0, backgroundColor: "#81c408" }}
                >
                  Subscribe Now
                </button>
              </div>
            </div>
            <div className="col-lg-3">
              <div className="d-flex justify-content-end pt-3">
                <a className="btn btn-outline-secondary me-2 btn-md-square rounded-circle" href="#">
                  <i className="fab fa-twitter text-white"></i>
                </a>
                <a className="btn btn-outline-secondary me-2 btn-md-square rounded-circle" href="#">
                  <i className="fab fa-facebook-f text-white"></i>
                </a>
                <a className="btn btn-outline-secondary me-2 btn-md-square rounded-circle" href="#">
                  <i className="fab fa-youtube text-white"></i>
                </a>
                <a className="btn btn-outline-secondary btn-md-square rounded-circle" href="#">
                  <i className="fab fa-linkedin-in text-white"></i>
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="row g-5">
          <div className="col-lg-3 col-md-6">
            <h4 className="text-light mb-3">Why People Like Us!</h4>
            <p className="mb-4">
              We deliver fresh organic products directly to your doorstep with guaranteed fast delivery and high quality.
            </p>
          </div>
          <div className="col-lg-3 col-md-6">
            <h4 className="text-light mb-3">Shop Info</h4>
            <div className="d-flex flex-column justify-content-start">
              <Link className="btn btn-link text-white-50 text-decoration-none p-0 mb-2" to="/about">About Us</Link>
              <Link className="btn btn-link text-white-50 text-decoration-none p-0 mb-2" to="/contact">Contact Us</Link>
              <Link className="btn btn-link text-white-50 text-decoration-none p-0 mb-2" to="/privacy">Privacy Policy</Link>
              <Link className="btn btn-link text-white-50 text-decoration-none p-0 mb-2" to="/terms">Terms & Condition</Link>
            </div>
          </div>
          <div className="col-lg-3 col-md-6">
            <h4 className="text-light mb-3">Account</h4>
            <div className="d-flex flex-column justify-content-start">
              <Link className="btn btn-link text-white-50 text-decoration-none p-0 mb-2" to="/profile">My Account</Link>
              <Link className="btn btn-link text-white-50 text-decoration-none p-0 mb-2" to="/cart">Shopping Cart</Link>
              <Link className="btn btn-link text-white-50 text-decoration-none p-0 mb-2" to="/checkout">Checkout</Link>
            </div>
          </div>
          <div className="col-lg-3 col-md-6">
            <h4 className="text-light mb-3">Contact</h4>
            <p>Address: 123 Street, New York, USA</p>
            <p>Email: Email@Example.com</p>
            <p>Phone: +0123 4567 8910</p>
          </div>
        </div>
      </div>
      <div className="container-fluid copyright bg-dark py-4 text-center text-white border-top border-secondary">
        <small>&copy; {new Date().getFullYear()} Shoplys. All rights reserved.</small>
      </div>
    </footer>
  );
}