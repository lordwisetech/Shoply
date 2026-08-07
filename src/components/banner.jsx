import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router';
import { fetchOneproducts } from './api/api';

// Import template styles
import '../assets/css/bootstrap.min.css';
import '../assets/css/style.css';

function PromoBanner() {
  // Fetch a featured product (e.g., ID 1) from DummyJSON
  const featuredId = 1;

  const { isLoading, isError, data: product, error } = useQuery({
    queryKey: ['featured-banner-product', featuredId],
    queryFn: () => fetchOneproducts(featuredId),
  });

  if (isLoading) {
    return (
      <div className="container-fluid banner bg-secondary my-5 py-5 text-center text-white">
        <h2>Loading Special Offer...</h2>
      </div>
    );
  }

  if (isError || !product) {
    return (
      <div className="container-fluid banner bg-secondary my-5 py-5 text-center text-white">
        <h2>Error loading banner offer: {error?.message}</h2>
      </div>
    );
  }

  return (
    <div className="container-fluid banner bg-secondary my-5">
      <div className="container py-5">
        <div className="row g-4 align-items-center">
          
          {/* Text Content Column */}
          <div className="col-lg-6">
            <div className="py-4">
              <h1 className="display-3 text-white text-truncate">{product.title}</h1>
              <p className="fw-normal display-3 text-dark mb-4">in Our Store</p>
              <p className="mb-4 text-dark lead">{product.description}</p>
              
              {/* Working Router Link */}
              <Link 
                to={`/products/${product.id}`} 
                className="banner-btn btn border-2 border-white rounded-pill text-dark py-3 px-5 text-decoration-none fw-bold"
              >
                BUY NOW
              </Link>
            </div>
          </div>

          {/* Image & Price Badge Column */}
          <div className="col-lg-6">
            <div className="position-relative">
              <img 
                src={product.thumbnail} 
                className="img-fluid w-100 rounded" 
                alt={product.title}
                style={{ height: '400px', objectFit: 'cover' }}
              />

              {/* Floating Price Circle Badge */}
              <div 
                className="d-flex align-items-center justify-content-center bg-white rounded-circle position-absolute" 
                style={{ 
                  width: '140px', 
                  height: '140px', 
                  top: '0', 
                  left: '0', 
                  boxShadow: '0 4px 12px rgba(0,0,0,0.15)' 
                }}
              >
                <div className="d-flex flex-column text-center">
                  <span className="h2 mb-0 fw-bold text-primary">${product.price}</span>
                  <span className="h6 text-muted mb-0">Special Price</span>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default PromoBanner;