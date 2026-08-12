import '../assets/css/bootstrap.min.css';
import '../assets/css/style.css';
import React, { useState, useEffect, useRef } from 'react';
import { NavLink, Link, useNavigate } from 'react-router';

function Nav({ cart = [] }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isNavOpen, setIsNavOpen] = useState(false); // Mobile menu toggle state
  const [showCartBox, setShowCartBox] = useState(false); // Cart preview dropdown toggle state
  
  const cartRef = useRef(null);
  const navigate = useNavigate();

  // Calculate actual total number of items in cart
  const totalCartCount = cart.reduce(
    (total, item) => total + (item.quantity || 1),
    0
  );

  // Calculate cart subtotal
  const cartSubtotal = cart.reduce(
    (total, item) => total + (item.price || 0) * (item.quantity || 1),
    0
  );

  // Listen to window scroll to smoothly hide topbar
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close cart dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (cartRef.current && !cartRef.current.contains(event.target)) {
        setShowCartBox(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Toggle mobile menu state
  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  // Close mobile menu & cart preview box
  const closeAllMenus = () => {
    setIsNavOpen(false);
    setShowCartBox(false);
  };

  // Helper for green active link dynamic styling
  const activeLinkStyle = ({ isActive }) => ({
    color: isActive ? '#81c408' : '', // Green theme color when active
    fontWeight: isActive ? '600' : 'normal',
  });

  return (
    <div className="container-fluid fixed-top px-0" style={{ transition: 'all 0.3s ease' }}>
      
      {/* Topbar: Smoothly hides on scroll */}
      <div 
        className="container topbar bg-primary d-none d-lg-block"
        style={{
          transition: 'all 0.3s ease-in-out',
          maxHeight: isScrolled ? '0px' : '50px',
          opacity: isScrolled ? 0 : 1,
          overflow: 'hidden',
          paddingTop: isScrolled ? '0' : '8px',
          paddingBottom: isScrolled ? '0' : '8px',
        }}
      >
        <div className="d-flex justify-content-between">
          <div className="top-info ps-2">
            <small className="me-3">
              <i className="fas fa-map-marker-alt me-2 text-secondary"></i>
              <a href="#" className="text-white">123 Street, New York</a>
            </small>
            <small className="me-3">
              <i className="fas fa-envelope me-2 text-secondary"></i>
              <a href="#" className="text-white">Email@Example.com</a>
            </small>
          </div>
          <div className="top-link pe-2">
            <a href="#" className="text-white"><small className="text-white mx-2">Privacy Policy</small>/</a>
            <a href="#" className="text-white"><small className="text-white mx-2">Terms of Use</small>/</a>
            <a href="#" className="text-white"><small className="text-white ms-2">Sales and Refunds</small></a>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className={`bg-white ${isScrolled ? 'shadow-sm' : ''}`} style={{ transition: 'all 0.3s ease' }}>
        <div className="container px-0">
          <nav className="navbar navbar-light bg-white navbar-expand-xl px-3 px-xl-0">
            <Link to="/" className="navbar-brand" onClick={closeAllMenus}>
              <h1 className="text-primary display-6 mb-0">Shoplys</h1>
            </Link>

            {/* Mobile Hamburger Button */}
            <button
              className="navbar-toggler py-2 px-3"
              type="button"
              onClick={toggleNav}
              aria-expanded={isNavOpen}
              aria-label="Toggle navigation"
            >
              <span className="fa fa-bars text-primary"></span>
            </button>

            {/* Collapsible Menu Controlled by React State */}
            <div 
              className={`collapse navbar-collapse bg-white ${isNavOpen ? 'show' : ''}`} 
              id="navbarCollapse"
            >
              <div className="navbar-nav mx-auto">
                <NavLink to="/" end className="nav-item nav-link" style={activeLinkStyle} onClick={closeAllMenus}>
                  Home
                </NavLink>
                <NavLink to="/shop" className="nav-item nav-link" style={activeLinkStyle} onClick={closeAllMenus}>
                  Shop
                </NavLink>
                <NavLink to="/cart" className="nav-item nav-link" style={activeLinkStyle} onClick={closeAllMenus}>
                  Shop Cart
                </NavLink>
                <NavLink to="/checkout" className="nav-item nav-link" style={activeLinkStyle} onClick={closeAllMenus}>
                  Checkout
                </NavLink>
                <NavLink to="/contact" className="nav-item nav-link" style={activeLinkStyle} onClick={closeAllMenus}>
                  Contact
                </NavLink>
              </div>

              <div className="d-flex align-items-center m-3 me-0">
                
                {/* Cart Icon & Mini Cart Preview Box */}
                <div className="position-relative me-4 my-auto" ref={cartRef}>
                  <button
                    className="btn p-0 border-0 bg-transparent text-dark position-relative"
                    onClick={() => setShowCartBox(!showCartBox)}
                    aria-label="Toggle Cart Preview"
                  >
                    <i className="fa fa-shopping-bag fa-2x"></i>
                    <span
                      className="position-absolute rounded-circle d-flex align-items-center justify-content-center text-white px-1 fw-bold"
                      style={{
                        top: '-5px',
                        left: '18px',
                        height: '20px',
                        minWidth: '20px',
                        fontSize: '0.75rem',
                        backgroundColor: '#81c408'
                      }}
                    >
                      {totalCartCount}
                    </span>
                  </button>

                  {/* Dynamic Floating Cart Box Dropdown */}
                  {showCartBox && (
                    <div
                      className="position-absolute bg-white shadow-lg rounded-3 p-3 border"
                      style={{
                        top: '45px',
                        right: '0',
                        width: '320px',
                        zIndex: 1050,
                        borderTop: '3px solid #81c408'
                      }}
                    >
                      <div className="d-flex justify-content-between align-items-center pb-2 mb-2 border-bottom">
                        <h6 className="mb-0 fw-bold">Shopping Cart ({totalCartCount})</h6>
                        <button 
                          className="btn-close btn-sm" 
                          onClick={() => setShowCartBox(false)} 
                        ></button>
                      </div>

                      {cart.length === 0 ? (
                        <div className="text-center py-4">
                          <i className="fas fa-shopping-cart display-6 text-muted mb-2"></i>
                          <p className="text-muted small mb-0">Your cart is currently empty.</p>
                        </div>
                      ) : (
                        <>
                          {/* Cart Product Items */}
                          <div style={{ maxHeight: '220px', overflowY: 'auto' }} className="pe-1">
                            {cart.map((item) => (
                              <div key={item.id} className="d-flex align-items-center mb-3 pb-2 border-bottom">
                                <img
                                  src={item.thumbnail || item.image || "https://placehold.co/50x50"}
                                  alt={item.title}
                                  className="rounded me-2 border"
                                  style={{ width: '48px', height: '48px', objectFit: 'cover' }}
                                />
                                <div className="flex-grow-1 overflow-hidden me-2">
                                  <p className="mb-0 small fw-bold text-truncate">{item.title}</p>
                                  <small className="text-muted">
                                    {item.quantity} x ${item.price?.toFixed(2)}
                                  </small>
                                </div>
                                <div className="fw-bold small text-end" style={{ color: '#81c408' }}>
                                  ${((item.price || 0) * (item.quantity || 1)).toFixed(2)}
                                </div>
                              </div>
                            ))}
                          </div>

                          {/* Subtotal & Action Buttons */}
                          <div className="pt-2 border-top">
                            <div className="d-flex justify-content-between fw-bold mb-3">
                              <span>Subtotal:</span>
                              <span style={{ color: '#81c408' }}>${cartSubtotal.toFixed(2)}</span>
                            </div>

                            <div className="d-flex gap-2">
                              <button
                                className="btn btn-outline-dark btn-sm w-100 rounded-pill"
                                onClick={() => {
                                  setShowCartBox(false);
                                  navigate('/cart');
                                }}
                              >
                                View Cart
                              </button>
                              <button
                                className="btn text-white btn-sm w-100 rounded-pill"
                                style={{ backgroundColor: '#81c408' }}
                                onClick={() => {
                                  setShowCartBox(false);
                                  navigate('/checkout');
                                }}
                              >
                                Checkout
                              </button>
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  )}
                </div>

                {/* Profile Icon */}
                <Link to="/profile" className="my-auto" onClick={closeAllMenus}>
                  <i className="fas fa-user fa-2x"></i>
                </Link>

              </div>
            </div>
          </nav>
        </div>
      </div>

    </div>
  );
}

export default Nav;