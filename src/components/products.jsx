import { useQuery } from "@tanstack/react-query";
import "../products.css";
import { 
  fetchAllproducts, 
  fetchSearchProducts, 
  fetchProductsByCategory 
} from "./api/api";
import Nav from "./nav.jsx";
import "../Home.css";
import { useEffect, useState } from "react";
import { Link } from "react-router";
import Category from "./category.jsx";

function Products() {
  // --- STATE MANAGEMENT ---
  const [category, setCategory] = useState("All Categories");
  const [userInput, setUserinput] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(0);

  const limit = 10;
  const skip = page * limit;

  // --- HANDLERS ---
  const handleSearch = (e) => {
    e.preventDefault();
    if (userInput.trim() === "") return;
    setSearchQuery(userInput);
    setUserinput("");
    
  };

  const nextPageButton = () => setPage((prev) => prev + 1);
  const previousPage = () => setPage((prev) => Math.max(0, prev - 1));

  // Auto-scroll when search query changes
  useEffect(() => {
    if (searchQuery !== "") {
      document.getElementById("search-results")?.scrollIntoView({
        behavior: "smooth",
      });
    }
  }, [searchQuery]);

  // Auto-scroll when category selection changes
  useEffect(() => {
    if (category !== "All Categories" && category !== "") {
      document.getElementById("category-results")?.scrollIntoView({
        behavior: "smooth",
      });
    }
  }, [category]);

  // --- REACT QUERY FETCHES ---

  // 1. Fetch All Products (Paginated)
  const { 
    isLoading: allLoading, 
    isError: allIsError, 
    data: allData, 
    error: allError 
  } = useQuery({
    queryKey: ["All products", page],
    queryFn: () => fetchAllproducts(skip, limit),
  });

  // 2. Fetch Search Results (Enabled only when searchQuery exists)
  const {
    isLoading: searchLoading,
    data: searchData,
  } = useQuery({
    queryKey: ["search", searchQuery],
    queryFn: () => fetchSearchProducts(searchQuery),
    enabled: searchQuery !== "",
  });

  // 3. Fetch Products By Category (Enabled when category is selected)
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

  // Derived data
  const searchDataResult = searchData?.products ?? [];
  const categoryProductsResult = categoryData?.products ?? [];
  const defaultProducts = allData?.products ?? [];

  if (allLoading) return <h1>Loading...</h1>;
  if (allIsError) return <h2>{allError.message}</h2>;

  return (
    <>
      <Nav />
      <div className="products-page">
        {/* Header */}
        <section className="products-header">
          <div>
            <span>OUR STORE</span>
            <h1>Explore Products</h1>
            <p>Discover quality products picked for you.</p>
          </div>
          <div className="product-count">
            <strong>{allData?.total || 0}</strong>
            <p>All Products</p>
          </div>
          <div className="product-count">
            <strong>{defaultProducts.length}</strong>
            <p>Current page Products</p>
          </div>
        </section>

        {/* Search & Category Filter Tools */}
        <section className="products-tools">
          <div className="search-box">
            <form onSubmit={handleSearch} className="search-box">
              <input
                type="text"
                placeholder="Search products..."
                value={userInput}
                onChange={(e) => setUserinput(e.target.value)}
              />
              <button type="submit">Search</button>
            </form>
          </div>

          {/* Category Component */}
          <Category category={category} setCategory={setCategory} />
        </section>

        {/* SEARCH RESULTS SECTION */}
        {searchLoading && <p>Searching products...</p>}
        {searchDataResult.length > 0 && (
          <section id="search-results" className="search-results">
            <div className="search-results-header">
              <span>SEARCH RESULTS</span>
              <h2>Results for "{searchQuery}"</h2>
              <p>{searchDataResult.length} products found</p>
            </div>

            <div className="products-grid">
              {searchDataResult.map((product) => (
                <ArticleCard key={product.id} product={product} />
              ))}
            </div>
          </section>
        )}

        {/* CATEGORY FILTER RESULTS SECTION */}
        {category !== "All Categories" && category !== "" && (
          <section id="category-results" className="category-results">
            <div className="search-results-header">
              <span>CATEGORY FILTER</span>
              <h2>Category: {category}</h2>
            </div>

            {categoryLoading && <p>Loading category products...</p>}
            {categoryIsError && <p>Error: {categoryError.message}</p>}

            <div className="products-grid">
              {categoryProductsResult.map((product) => (
                <ArticleCard key={product.id} product={product} />
              ))}
            </div>
          </section>
        )}

        {/* ALL PRODUCTS (DEFAULT LIST) */}
        <h1 className="text-code">ALL PRODUCTS</h1>
        <section className="products-grid">
          {defaultProducts.map((product) => (
            <ArticleCard key={product.id} product={product} />
          ))}
        </section>

        {/* PAGINATION */}
        <div className="pagination">
          {page > 0 && (
            <button onClick={previousPage} className="pagination-btn">
              ← Previous
            </button>
          )}

          <span className="page-number">Page {page}</span>

          <button onClick={nextPageButton} className="pagination-btn">
            Next →
          </button>
        </div>
      </div>
    </>
  );
}

// Reusable Product Card Component inside the file
function ArticleCard({ product }) {
  return (
    <article className="product-card">
      <div className="product-image">
        <img src={product.thumbnail} alt={product.title} />
        <span className="category-badge">{product.category}</span>
      </div>

      <div className="product-content">
        <div className="rating">⭐ {product.rating}</div>
        <Link to={`/products/${product.id}`} className="product-title-link">
          <h2>{product.title}</h2>
        </Link>
        <div className="product-footer">
          <strong>${product.price}</strong>
          <button type="button">Add +</button>
        </div>
      </div>
    </article>
  );
}

export default Products;