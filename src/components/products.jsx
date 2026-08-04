import { useQuery } from "@tanstack/react-query";
import "../products.css";
import "./Cart.css"; // Dedicated cart styling
import { 
  fetchAllproducts, 
  fetchSearchProducts, 
  fetchProductsByCategory 
} from "./api/api";
import Nav from "./nav.jsx";
import "../Home.css";
import { useEffect, useState } from "react";
import { Link,useNavigate } from "react-router";
import Category from "./category.jsx";



function Products({ cart, setCart }) {
  // --- STATE MANAGEMENT ---
  const [category, setCategory] = useState("All Categories");
  const [userInput, setUserinput] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(0);
  const navigate = useNavigate();

  // --- CART STATE ---
  
  const [isCartOpen, setIsCartOpen] = useState(false);

  // --- CART ACTIONS ---
  const addToCart = (product) => {
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

  const removeFromCart = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  const updateQuantity = (id, amount) => {
    setCart((prevCart) =>
      prevCart
        .map((item) => {
          if (item.id === id) {
            const newQty = item.quantity + amount;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean)
    );
  };

  const totalCartItems = cart.reduce((total, item) => total + item.quantity, 0);
  const totalPrice = cart
    .reduce((total, item) => total + item.price * item.quantity, 0)
    .toFixed(2);

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

  // Auto-scrolls
  useEffect(() => {
    if (searchQuery !== "") {
      document.getElementById("search-results")?.scrollIntoView({ behavior: "smooth" });
    }
  }, [searchQuery]);

  useEffect(() => {
    if (category !== "All Categories" && category !== "") {
      document.getElementById("category-results")?.scrollIntoView({ behavior: "smooth" });
    }
  }, [category]);

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

  if (allLoading) return <h1>Loading...</h1>;
  if (allIsError) return <h2>{allError.message}</h2>;

  return (
    <>
      <Nav />

      {/* Floating Cart Trigger Button */}
      <button className="cart-trigger-btn" onClick={() => setIsCartOpen(true)}>
        🛒 Cart ({totalCartItems})
      </button>

      {/* Cart Drawer */}
      <div className={`cart-overlay ${isCartOpen ? "open" : ""}`} onClick={() => setIsCartOpen(false)}>
        <div className="cart-drawer" onClick={(e) => e.stopPropagation()}>
          <div className="cart-header">
            <h2>Your Cart ({totalCartItems})</h2>
            <button className="close-cart-btn" onClick={() => setIsCartOpen(false)}>✕</button>
          </div>

          <div className="cart-items">
            {cart.length === 0 ? (
              <p className="empty-cart-msg">Your cart is currently empty.</p>
            ) : (
              cart.map((item) => (
                <div key={item.id} className="cart-item">
                  <img src={item.thumbnail} alt={item.title} className="cart-item-img" />
                  <div className="cart-item-details">
                    <h4>{item.title}</h4>
                    <p className="cart-item-price">${item.price}</p>
                    <div className="qty-controls">
                      <button onClick={() => updateQuantity(item.id, -1)}>-</button>
                      <span>{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, 1)}>+</button>
                    </div>
                  </div>
                  <button className="remove-btn" onClick={() => removeFromCart(item.id)}>
                    🗑️
                  </button>
                </div>
              ))
            )}
          </div>

          {cart.length > 0 && (
            <div className="cart-footer">
              <div className="cart-total">
                <span>Total:</span>
                <strong>${totalPrice}</strong>
              </div>
              <button 
  className="checkout-btn" 
  onClick={() => {
    setIsCartOpen(false);
    navigate('/checkout');
  }}
>
  Proceed to Checkout
</button>
            </div>
          )}
        </div>
      </div>

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

          <Category category={category} setCategory={setCategory} />
        </section>

        {/* SEARCH RESULTS */}
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
                <ArticleCard key={product.id} product={product} onAddToCart={addToCart} />
              ))}
            </div>
          </section>
        )}

        {/* CATEGORY FILTER RESULTS */}
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
                <ArticleCard key={product.id} product={product} onAddToCart={addToCart} />
              ))}
            </div>
          </section>
        )}

        {/* ALL PRODUCTS (DEFAULT LIST) */}
        <h1 className="text-code">ALL PRODUCTS</h1>
        <section className="products-grid">
          {defaultProducts.map((product) => (
            <ArticleCard key={product.id} product={product} onAddToCart={addToCart} />
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

// Reusable Product Card Component
function ArticleCard({ product, onAddToCart }) {
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
          <button className="add-to-cart-btn" onClick={() => onAddToCart(product)}>
            Add to Cart
          </button>
        </div>
      </div>
    </article>
  );
}

export default Products;