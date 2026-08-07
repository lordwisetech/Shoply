import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
import '../assets/css/bootstrap.min.css';
import '../assets/css/style.css';

import { 
  fetchAllproducts, 
  fetchSearchProducts, 
  fetchProductsByCategory 
} from "./api/api";

const CATEGORIES_LIST = [
  { label: "All Products", value: "All Categories" },
  { label: "Groceries", value: "groceries" },
  { label: "Beauty", value: "beauty" },
  { label: "Fragrances", value: "fragrances" },
  { label: "Furniture", value: "furniture" }
];

function Products({ setCart }) {
  // --- STATE MANAGEMENT ---
  const [category, setCategory] = useState("All Categories");
  const [userInput, setUserinput] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(0);

  const limit = 8;
  const skip = page * limit;

  // --- CART ACTION ---
  const addToCart = (product) => {
    if (!setCart) return;
    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.id === product.id);
      if (existing) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  // --- HANDLERS ---
  const handleSearch = (e) => {
    e.preventDefault();
    if (userInput.trim() === "") return;
    setCategory("All Categories"); // Clear category so search results take priority
    setSearchQuery(userInput);
  };

  const nextPageButton = () => setPage((prev) => prev + 1);
  const previousPage = () => setPage((prev) => Math.max(0, prev - 1));

  // --- REACT QUERY FETCHES ---
  const { 
    isLoading: allLoading, 
    isError: allIsError, 
    data: allData, 
    error: allError 
  } = useQuery({
    queryKey: ["All products", page],
    queryFn: () => fetchAllproducts(skip, limit),
  });

  const { isLoading: searchLoading, data: searchData } = useQuery({
    queryKey: ["search", searchQuery],
    queryFn: () => fetchSearchProducts(searchQuery),
    enabled: searchQuery !== "",
  });

  const {
    isLoading: categoryLoading,
    isError: categoryIsError,
    data: categoryData,
    error: categoryError,
  } = useQuery({
    queryKey: ["category", category],
    queryFn: () => fetchProductsByCategory(category),
    enabled: category !== "" && category !== "All Categories",
  });

  const searchDataResult = searchData?.products ?? [];
  const categoryProductsResult = categoryData?.products ?? [];
  const defaultProducts = allData?.products ?? [];

  // Determine active product list to render
  const displayedProducts = searchQuery !== "" 
    ? searchDataResult 
    : (category !== "All Categories" ? categoryProductsResult : defaultProducts);

  const isCurrentLoading = searchQuery !== "" 
    ? searchLoading 
    : (category !== "All Categories" ? categoryLoading : allLoading);

  return (
    <div className="container-fluid fruite py-5">
      <div className="container py-5">
        <div className="tab-class text-center">
          
          {/* Header + Search Bar + Category Pills */}
          <div className="row g-4 mb-4 align-items-center">
            <div className="col-lg-4 text-start">
              <h1>Our Products</h1>
            </div>

            <div className="col-lg-8">
              {/* Functional Search Form */}
              {/* Template Styled Search Bar */}
<form onSubmit={handleSearch} className="d-flex justify-content-end mb-4">
  <div className="position-relative w-100" style={{ maxWidth: "450px" }}>
    <input
      type="text"
      className="form-control border-2 border-secondary w-100 py-3 px-4 rounded-pill"
      placeholder="Search products..."
      value={userInput}
      onChange={(e) => setUserinput(e.target.value)}
      style={{ paddingRight: "120px" }}
    />
    <button
      type="submit"
      className="btn btn-primary border-2 border-secondary py-3 px-4 position-absolute rounded-pill text-white h-100"
      style={{ top: 0, right: 0 }}
    >
      <i className="fa fa-search me-1"></i> Search
    </button>
  </div>
</form>

              {/* Category Pills */}
              <ul className="nav nav-pills d-inline-flex text-center">
                {CATEGORIES_LIST.map((cat, index) => (
                  <li key={index} className="nav-item">
                    <button
                      className={`nav-link d-flex m-2 py-2 bg-light rounded-pill border-0 ${
                        category === cat.value && searchQuery === "" ? "active" : ""
                      }`}
                      onClick={() => {
                        setUserinput("");
                        setSearchQuery("");
                        setCategory(cat.value);
                      }}
                    >
                      <span className="text-dark" style={{ width: "130px" }}>
                        {cat.label}
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Products Grid */}
          <div className="tab-content">
            <div className="tab-pane fade show p-0 active">
              
              {isCurrentLoading ? (
                <div className="py-5"><h2>Loading Products...</h2></div>
              ) : allIsError || categoryIsError ? (
                <div className="py-5"><h2>Error: {allError?.message || categoryError?.message}</h2></div>
              ) : displayedProducts.length === 0 ? (
                <div className="py-5"><h3>No products found.</h3></div>
              ) : (
                <div className="row g-4">
                  {displayedProducts.map((product) => (
                    <div key={product.id} className="col-md-6 col-lg-4 col-xl-3">
                      <div className="rounded position-relative fruite-item border border-secondary">
                        
                        {/* Image */}
                        <div className="fruite-img">
                          <img 
                            src={product.thumbnail} 
                            className="img-fluid w-100 rounded-top" 
                            alt={product.title}
                            style={{ height: '220px', objectFit: 'cover' }}
                          />
                        </div>

                        {/* Category Badge */}
                        <div 
                          className="text-white bg-secondary px-3 py-1 rounded position-absolute" 
                          style={{ top: "10px", left: "10px" }}
                        >
                          {product.category}
                        </div>

                        {/* Info Body */}
                        <div className="p-4 border-top-0 rounded-bottom text-start">
                          <Link to={`/products/${product.id}`} className="text-decoration-none text-dark">
                            <h4 className="text-truncate">{product.title}</h4>
                          </Link>
                          <p className="text-muted text-truncate">{product.description}</p>
                          
                          <div className="d-flex justify-content-between align-items-center flex-lg-wrap">
                            <p className="text-dark fs-5 fw-bold mb-0">${product.price}</p>
                            <button 
                              className="btn border border-secondary rounded-pill px-3 text-primary"
                              onClick={() => addToCart(product)}
                            >
                              <i className="fa fa-shopping-bag me-2 text-primary"></i> Add to cart
                            </button>
                          </div>
                        </div>

                      </div>
                    </div>
                  ))}
                </div>
              )}

            </div>
          </div>

          {/* Pagination Controls */}
          {searchQuery === "" && category === "All Categories" && (
            <div className="d-flex justify-content-center align-items-center gap-3 mt-5">
              {page > 0 && (
                <button onClick={previousPage} className="btn btn-primary rounded-pill text-white px-4">
                  ← Previous
                </button>
              )}
              <span className="fw-bold">Page {page + 1}</span>
              <button onClick={nextPageButton} className="btn btn-primary rounded-pill text-white px-4">
                Next →
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}

export default Products;