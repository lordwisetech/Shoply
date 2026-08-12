import React from "react";
import { FeaturedProducts } from "./FeaturedProducts";

// Helper function to return a related Font Awesome icon based on category name
const getCategoryIcon = (categoryName = "") => {
  const cat = categoryName.toLowerCase();

  if (cat === "all") return "fas fa-th-large";
  if (cat.includes("fruit") || cat.includes("apple")) return "fas fa-apple-alt";
  if (cat.includes("veg") || cat.includes("carrot")) return "fas fa-carrot";
  if (cat.includes("grocery") || cat.includes("food")) return "fas fa-shopping-basket";
  if (cat.includes("beverage") || cat.includes("drink")) return "fas fa-wine-bottle";
  if (cat.includes("beauty") || cat.includes("skin") || cat.includes("care")) return "fas fa-spa";
  if (cat.includes("fragrance") || cat.includes("perfume")) return "fas fa-spray-can";
  if (cat.includes("furniture") || cat.includes("decor")) return "fas fa-couch";
  if (cat.includes("electronic") || cat.includes("laptop") || cat.includes("phone")) return "fas fa-laptop";
  if (cat.includes("cloth") || cat.includes("shirt") || cat.includes("dress") || cat.includes("fashion")) return "fas fa-tshirt";
  if (cat.includes("shoe") || cat.includes("footwear")) return "fas fa-shoe-prints";
  if (cat.includes("watch")) return "fas fa-clock";
  if (cat.includes("jewel") || cat.includes("accessory")) return "fas fa-gem";
  if (cat.includes("sport") || cat.includes("fitness")) return "fas fa-dumbbell";
  if (cat.includes("car") || cat.includes("auto")) return "fas fa-car";

  return "fas fa-tag"; // Fallback icon for any unhandled category
};

export function ShopSidebar({
  categories = [],
  selectedCategory,
  onSelectCategory,
  maxPrice,
  onPriceChange,
  featuredItems = [],
}) {
  return (
    <div className="col-lg-3">
      <div className="row g-4">
        {/* Categories List */}
        <div className="col-lg-12">
          <div className="mb-3">
            <h4>Categories</h4>
            <ul className="list-unstyled fruite-categorie">
              {categories.map((cat) => (
                <li
                  key={cat.name}
                  onClick={() => onSelectCategory(cat.name)}
                  style={{ cursor: "pointer" }}
                >
                  <div
                    className={`d-flex justify-content-between fruite-name py-1 ${
                      selectedCategory === cat.name ? "text-primary fw-bold" : ""
                    }`}
                  >
                    <span className="text-capitalize">
                      {/* Dynamic Icon Rendering */}
                      <i className={`${getCategoryIcon(cat.name)} me-2`}></i>
                      {cat.name}
                    </span>
                    <span>({cat.count})</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Price Slider */}
        <div className="col-lg-12">
          <div className="mb-3">
            <h4 className="mb-2">Max Price: ${maxPrice}</h4>
            <input
              type="range"
              className="form-range w-100"
              min="0"
              max="1500"
              step="10"
              value={maxPrice}
              onChange={(e) => onPriceChange(Number(e.target.value))}
            />
          </div>
        </div>

        {/* Featured Products */}
        <FeaturedProducts items={featuredItems} />

        {/* Banner */}
        <div className="col-lg-12">
          <div className="position-relative">
            <img
              src="https://images.unsplash.com/photo-1610832958506-aa56368176cf?auto=format&fit=crop&w=1200&q=80"
              className="img-fluid w-100 rounded"
              alt="Banner"
            />
            <div
              className="position-absolute"
              style={{ top: "50%", right: "10px", transform: "translateY(-50%)" }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
}