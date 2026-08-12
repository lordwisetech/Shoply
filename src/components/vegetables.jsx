import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';

// Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import { fetchProductsByCategory } from './api/api';

function FeaturedPhones({ setCart }) {
  // Fetch smartphones dynamically from DummyJSON
  const { isLoading, isError, data, error } = useQuery({
    queryKey: ['category-smartphones'],
    queryFn: () => fetchProductsByCategory('smartphones'),
  });

  const phoneProducts = data?.products ?? [];

  const addToCart = (product) => {
    if (!setCart) {
      console.warn("setCart prop was not passed to FeaturedPhones component!");
      return;
    }

    setCart((prevCart = []) => {
      const existing = prevCart.find((item) => item.id === product.id);
      if (existing) {
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  return (
    <div className="container-fluid vesitable py-5">
      <div className="container py-5">
        <h1 className="mb-4">Featured Smartphones</h1>

        {isLoading ? (
          <div className="py-5 text-center">
            <h2>Loading Phones...</h2>
          </div>
        ) : isError ? (
          <div className="py-5 text-center">
            <h2>Error: {error?.message}</h2>
          </div>
        ) : phoneProducts.length === 0 ? (
          <div className="py-5 text-center">
            <h3>No phones available.</h3>
          </div>
        ) : (
          <Swiper
            modules={[Autoplay, Navigation, Pagination]}
            spaceBetween={25}
            slidesPerView={1}
            autoplay={{ delay: 3500, disableOnInteraction: false }}
            navigation
            pagination={{ clickable: true }}
            breakpoints={{
              576: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              992: { slidesPerView: 3 },
              1200: { slidesPerView: 4 },
            }}
            className="py-4"
          >
            {phoneProducts.map((product) => (
              <SwiperSlide key={product.id}>
                <div className="border border-primary rounded position-relative vesitable-item h-100 d-flex flex-column justify-content-between">
                  
                  {/* Image Container */}
                  <div className="vesitable-img">
                    <img
                      src={product.thumbnail}
                      className="img-fluid w-100 rounded-top"
                      alt={product.title}
                      style={{ height: '220px', objectFit: 'cover' }}
                    />
                  </div>

                  {/* Category Tag */}
                  <div
                    className="text-white bg-primary px-3 py-1 rounded position-absolute"
                    style={{ top: '10px', right: '10px', textTransform: 'capitalize' }}
                  >
                    {product.category}
                  </div>

                  {/* Card Body */}
                  <div className="p-4 rounded-bottom text-start d-flex flex-column flex-grow-1 justify-content-between">
                    <div>
                      {/* Functional Router Link */}
                      <Link to={`/products/${product.id}`} className="text-decoration-none text-dark">
                        <h4 className="text-truncate">{product.title}</h4>
                      </Link>
                      <p className="text-muted text-truncate">{product.description}</p>
                    </div>

                    <div className="d-flex justify-content-between align-items-center flex-lg-wrap mt-3">
                      <p className="text-dark fs-5 fw-bold mb-0">${product.price}</p>
                      <button
                        type="button"
                        className="btn border border-secondary rounded-pill px-3 text-primary"
                        style={{ borderColor: "#81c408" }}
                        onClick={() => addToCart(product)}
                      >
                        <i className="fa fa-shopping-bag me-2 text-primary"></i> Add to cart
                      </button>
                    </div>
                  </div>

                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>
    </div>
  );
}

export default FeaturedPhones;