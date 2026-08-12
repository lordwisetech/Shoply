import React, { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import Navbar from "../Navigation.jsx"; 
import { fetchProducts } from "../api/api"; 
import Footer from "../Footer.jsx";

import { ShopSearch } from "./ShopSearch";
import { ShopSort } from "./ShopSort";
import { ShopSidebar } from "./ShopSidebar";
import { ProductCard } from "./productCard";
import { Pagination } from "./Pagination";
import SinglePage from './singlepage.jsx';

// Dedicated Styled Loading Component with Hover Animations
function LoadingShop() {
  const [isHovered, setIsHovered] = useState(false);

  const containerStyle = {
    padding: "45px 65px",
    borderRadius: "24px",
    backgroundColor: "#ffffff",
    border: isHovered ? "2px solid #81c408" : "2px solid #e9ecef",
    boxShadow: isHovered
      ? "0 12px 30px rgba(129, 196, 8, 0.25)"
      : "0 4px 15px rgba(0, 0, 0, 0.06)",
    transform: isHovered ? "translateY(-6px) scale(1.02)" : "translateY(0) scale(1)",
    transition: "all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)",
    cursor: "pointer",
    textAlign: "center",
    maxWidth: "420px",
    width: "100%",
  };

  return (
    <div className="d-flex justify-content-center align-items-center py-5 my-5">
      <div
        style={containerStyle}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="mb-3">
          <i
            className="fas fa-shopping-bag fa-spin display-3"
            style={{
              color: "#81c408",
              filter: isHovered ? "drop-shadow(0 4px 8px rgba(129, 196, 8, 0.4))" : "none",
              transition: "filter 0.3s ease",
            }}
          ></i>
        </div>
        <h3
          className="fw-bold mb-2"
          style={{
            color: isHovered ? "#81c408" : "#2d3748",
            transition: "color 0.3s ease",
          }}
        >
          Loading Shop...
        </h3>
        <p className="text-muted mb-0 small">Getting fresh products ready for you</p>
      </div>
    </div>
  );
}

export default function Shop({ cart = [], setCart }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [maxPrice, setMaxPrice] = useState(1500);
  const [sortBy, setSortBy] = useState("default");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Fetch API products
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });

  // Safely ensure we always work with an array regardless of API payload format
  const products = useMemo(() => {
    if (!data) return [];
    if (Array.isArray(data)) return data;
    if (Array.isArray(data.products)) return data.products; // For APIs returning { products: [...] }
    return [];
  }, [data]);

  // Dynamically compute category counts safely
  const categories = useMemo(() => {
    if (!products.length) return [{ name: "all", count: 0 }];
    
    const countMap = products.reduce((acc, item) => {
      const cat = item.category || "uncategorized";
      acc[cat] = (acc[cat] || 0) + 1;
      return acc;
    }, {});

    return [
      { name: "all", count: products.length },
      ...Object.keys(countMap).map((catName) => ({
        name: catName,
        count: countMap[catName],
      })),
    ];
  }, [products]);

  // Filter and Sorting pipeline
  const filteredProducts = useMemo(() => {
    return products
      .filter((item) => {
        const matchesSearch =
          item.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.description?.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesCategory =
          selectedCategory === "all" ||
          item.category?.toLowerCase() === selectedCategory.toLowerCase();

        const matchesPrice = (item.price || 0) <= maxPrice;

        return matchesSearch && matchesCategory && matchesPrice;
      })
      .sort((a, b) => {
        if (sortBy === "price-low") return a.price - b.price;
        if (sortBy === "price-high") return b.price - a.price;
        if (sortBy === "rating") return (b.rating || 0) - (a.rating || 0);
        return 0;
      });
  }, [products, searchTerm, selectedCategory, maxPrice, sortBy]);

  // Pagination calculation
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage) || 1;
  const displayedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredProducts.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredProducts, currentPage]);

  const handleAddToCart = (product) => {
    if (!setCart) return;
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

  // Styled Loading State
  if (isLoading) {
    return (
      <>
        <Navbar />
        <LoadingShop />
        <Footer />
      </>
    );
  }

  if (isError) return <h2 className="text-center py-5 text-danger">Error: {error?.message}</h2>;

  return (
    <>
      <Navbar />
      <SinglePage/>

      <div className="container-fluid fruite py-5">
        <div className="container py-5">
          <h1 className="mb-4">Shop Products</h1>

          <div className="row g-4 mb-4 align-items-center">
            <div className="col-xl-4">
              <ShopSearch searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
            </div>
            <div className="col-xl-4 ms-auto">
              <ShopSort sortBy={sortBy} setSortBy={setSortBy} />
            </div>
          </div>

          <div className="row g-4">
            <ShopSidebar
              categories={categories}
              selectedCategory={selectedCategory}
              onSelectCategory={(cat) => {
                setSelectedCategory(cat);
                setCurrentPage(1);
              }}
              maxPrice={maxPrice}
              onPriceChange={setMaxPrice}
              featuredItems={products.slice(0, 3)}
            />

            <div className="col-lg-9">
              <div className="row g-4">
                {displayedProducts.length > 0 ? (
                  displayedProducts.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      onAddToCart={handleAddToCart}
                    />
                  ))
                ) : (
                  <div className="col-12 text-center py-5">
                    <h3>No products found matching your active filters.</h3>
                    <button
                      className="btn btn-primary text-white mt-3 px-4 py-2"
                      onClick={() => {
                        setSearchTerm("");
                        setSelectedCategory("all");
                        setMaxPrice(1500);
                        setSortBy("default");
                      }}
                    >
                      Reset All Filters
                    </button>
                  </div>
                )}

                <div className="col-12">
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}