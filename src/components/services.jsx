import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router';
import { fetchAllproducts } from './api/api';

// Import template styles
import '../assets/css/bootstrap.min.css';
import '../assets/css/style.css';

// Theme styles array to preserve the template's alternating card colors
const CARD_THEMES = [
  {
    cardBg: 'bg-secondary border-secondary',
    contentBg: 'bg-primary',
    titleColor: 'text-white',
    defaultBadge: '20% OFF',
  },
  {
    cardBg: 'bg-dark border-dark',
    contentBg: 'bg-light',
    titleColor: 'text-primary',
    defaultBadge: 'Free Delivery',
  },
  {
    cardBg: 'bg-primary border-primary',
    contentBg: 'bg-secondary',
    titleColor: 'text-white',
    defaultBadge: 'Special Deal',
  },
];

function Services() {
  // Fetch 3 products from DummyJSON
  const { isLoading, isError, data, error } = useQuery({
    queryKey: ['featured-banner-products'],
    queryFn: () => fetchAllproducts(0, 3), // limit = 3
  });

  const products = data?.products?.slice(0, 3) ?? [];

  if (isLoading) {
    return (
      <div className="container-fluid service py-5">
        <div className="container py-5 text-center">
          <h2>Loading Banners...</h2>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="container-fluid service py-5">
        <div className="container py-5 text-center">
          <h2>Error loading offers: {error?.message}</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="container-fluid service py-5">
      <div className="container py-5">
        <div className="row g-4 justify-content-center">
          {products.map((product, index) => {
            const theme = CARD_THEMES[index % CARD_THEMES.length];
            
            // Format dynamic discount text from API data if available
            const promoBadge = product.discountPercentage 
              ? `${Math.round(product.discountPercentage)}% OFF`
              : theme.defaultBadge;

            return (
              <div key={product.id} className="col-md-6 col-lg-4">
                {/* Working Router Link with Product ID */}
                <Link to={`/products/${product.id}`} className="text-decoration-none">
                  <div className={`service-item ${theme.cardBg} rounded border`}>
                    
                    {/* Product Thumbnail */}
                    <img
                      src={product.thumbnail}
                      className="img-fluid rounded-top w-100"
                      alt={product.title}
                      style={{ height: '250px', objectFit: 'cover' }}
                    />

                    {/* Banner Content Overlay */}
                    <div className="px-4 rounded-bottom">
                      <div className={`service-content ${theme.contentBg} text-center p-4 rounded`}>
                        <h5 className={`${theme.titleColor} text-truncate`}>
                          {product.title}
                        </h5>
                        <h3 className="mb-0">{promoBadge}</h3>
                      </div>
                    </div>

                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Services;