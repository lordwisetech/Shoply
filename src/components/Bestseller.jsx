import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router';
import { fetchAllproducts } from './api/api';

// Import template styles
import '../assets/css/bootstrap.min.css';
import '../assets/css/style.css';

// Helper function to dynamically render stars based on API rating
const renderStars = (rating = 0) => {
  const stars = [];
  const fullStars = Math.floor(rating);
  
  for (let i = 0; i < 5; i++) {
    if (i < fullStars) {
      stars.push(<i key={i} className="fas fa-star text-primary"></i>);
    } else if (i === fullStars && rating % 1 >= 0.5) {
      stars.push(<i key={i} className="fas fa-star-half-alt text-primary"></i>);
    } else {
      stars.push(<i key={i} className="fas fa-star text-muted"></i>);
    }
  }
  return stars;
};

function BestsellerProducts() {
  // Fetch 10 products (skipping the first 10 so we get variety)
  const { isLoading, isError, data, error } = useQuery({
    queryKey: ['bestseller-products'],
    queryFn: () => fetchAllproducts(10, 10), // skip = 10, limit = 10
  });

  const products = data?.products ?? [];
  
  // Split the data into the two layout groups matching the template
  const horizontalProducts = products.slice(0, 6); // First 6
  const verticalProducts = products.slice(6, 10);  // Last 4

  if (isLoading) {
    return (
      <div className="container-fluid py-5 text-center">
        <h2>Loading Bestsellers...</h2>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="container-fluid py-5 text-center">
        <h2>Error loading products: {error?.message}</h2>
      </div>
    );
  }

  return (
    <div className="container-fluid py-5">
      <div className="container py-5">
        
        {/* Header Section */}
        <div className="text-center mx-auto mb-5" style={{ maxWidth: '700px' }}>
          <h1 className="display-4">Bestseller Products</h1>
          <p>
            Discover our top-rated and most popular items, loved by customers worldwide. 
            Quality assured, highly rated, and ready to be shipped directly to you.
          </p>
        </div>

        <div className="row g-4">
          
          {/* Top 6 Products (Horizontal Layout) */}
          {horizontalProducts.map((product) => (
            <div key={product.id} className="col-lg-6 col-xl-4">
              <div className="p-4 rounded bg-light">
                <div className="row align-items-center">
                  <div className="col-6">
                    <img 
                      src={product.thumbnail} 
                      className="img-fluid rounded-circle w-100 bg-white" 
                      alt={product.title}
                      style={{ aspectRatio: '1/1', objectFit: 'contain', padding: '10px' }}
                    />
                  </div>
                  <div className="col-6">
                    <Link to={`/products/${product.id}`} className="h5 text-decoration-none text-truncate d-block" title={product.title}>
                      {product.title}
                    </Link>
                    <div className="d-flex my-3">
                      {renderStars(product.rating)}
                    </div>
                    <h4 className="mb-3">${product.price}</h4>
                    <Link to={`/products/${product.id}`} className="btn border border-secondary rounded-pill px-3 text-primary text-decoration-none">
                      <i className="fa fa-eye me-2 text-primary"></i> View Detail
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Bottom 4 Products (Vertical Layout) */}
          {verticalProducts.map((product) => (
            <div key={product.id} className="col-md-6 col-lg-6 col-xl-3">
              <div className="text-center">
                <img 
                  src={product.thumbnail} 
                  className="img-fluid rounded bg-light w-100" 
                  alt={product.title}
                  style={{ height: '250px', objectFit: 'contain', padding: '1rem' }}
                />
                <div className="py-4">
                  <Link to={`/products/${product.id}`} className="h5 text-decoration-none text-truncate d-block px-2" title={product.title}>
                    {product.title}
                  </Link>
                  <div className="d-flex my-3 justify-content-center">
                    {renderStars(product.rating)}
                  </div>
                  <h4 className="mb-3">${product.price}</h4>
                  <Link to={`/products/${product.id}`} className="btn border border-secondary rounded-pill px-3 text-primary text-decoration-none">
                    <i className="fa fa-eye me-2 text-primary"></i> View Detail
                  </Link>
                </div>
              </div>
            </div>
          ))}

        </div>
      </div>
    </div>
  );
}

export default BestsellerProducts;