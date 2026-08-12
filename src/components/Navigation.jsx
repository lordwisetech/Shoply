import '../assets/css/bootstrap.min.css';
import '../assets/css/style.css';
import React, { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router';

function Nav() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isNavOpen, setIsNavOpen] = useState(false); // Mobile menu toggle state

  // Listen to window scroll to smoothly hide the topbar
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

  // Toggle mobile menu state
  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  // Close mobile menu when a link is clicked
  const closeNav = () => {
    setIsNavOpen(false);
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
            <Link to="/" className="navbar-brand" onClick={closeNav}>
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
                <NavLink to="/" end className="nav-item nav-link" style={activeLinkStyle} onClick={closeNav}>
                  Home
                </NavLink>
                <NavLink to="/shop" className="nav-item nav-link" style={activeLinkStyle} onClick={closeNav}>
                  Shop
                </NavLink>
                <NavLink to="/cart" className="nav-item nav-link" style={activeLinkStyle} onClick={closeNav}>
                  Shop Cart
                </NavLink>
                <NavLink to="/checkout" className="nav-item nav-link" style={activeLinkStyle} onClick={closeNav}>
                  Checkout
                </NavLink>
                <NavLink to="/contact" className="nav-item nav-link" style={activeLinkStyle} onClick={closeNav}>
                  Contact
                </NavLink>
              </div>

              <div className="d-flex align-items-center m-3 me-0">
                <button
                  className="btn-search btn border border-secondary btn-md-square rounded-circle bg-white me-4"
                  data-bs-toggle="modal"
                  data-bs-target="#searchModal"
                >
                  <i className="fas fa-search text-primary"></i>
                </button>
                <Link to="/cart" className="position-relative me-4 my-auto" onClick={closeNav}>
                  <i className="fa fa-shopping-bag fa-2x"></i>
                  <span
                    className="position-absolute bg-secondary rounded-circle d-flex align-items-center justify-content-center text-dark px-1"
                    style={{ top: '-5px', left: '15px', height: '20px', minWidth: '20px' }}
                  >
                    3
                  </span>
                </Link>
                <Link to="/profile" className="my-auto" onClick={closeNav}>
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