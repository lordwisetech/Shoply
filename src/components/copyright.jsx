import React from 'react';
import { Link } from 'react-router';

// Import template styles
import '../assets/css/bootstrap.min.css';
import '../assets/css/style.css';

function Copyright() {
  const currentYear = new Date().getFullYear();

  return (
    <div className="container-fluid copyright bg-dark py-4">
      <div className="container">
        <div className="row">
          
          {/* Copyright Text */}
          <div className="col-md-6 text-center text-md-start mb-3 mb-md-0">
            <span className="text-light">
              <Link to="/" className="text-white text-decoration-none me-1">
                <i className="fas fa-copyright text-light me-2"></i>
                Shoply
              </Link>
              . All rights reserved {currentYear}.
            </span>
          </div>

          {/* Credits */}
          <div className="col-md-6 my-auto text-center text-md-end text-white">
            Designed By{' '}
            <a 
              className="border-bottom text-white text-decoration-none" 
              href="https://htmlcodex.com" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              HTML Codex
            </a>
            {' '}brougth to life by{' '}
            <a 
              className="border-bottom text-white text-decoration-none" 
              href="https://github.com/lordwisetech" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              Mayowa
            </a>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Copyright;