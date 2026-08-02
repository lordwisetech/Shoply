import React, { useState } from "react";
import "../products.css";
import { useQuery } from "@tanstack/react-query";
import { fetchProductCartegory } from "./api/api";

function Category({ category, setCategory }) {
  const [isOpen, setIsOpen] = useState(false);

  // Fetch available categories from API for dropdown list
  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["Categories"],
    queryFn: fetchProductCartegory,
  });

  if (isLoading) {
    return <span>Loading categories...</span>;
  }

  if (isError) {
    return <span>Error loading categories: {error.message}</span>;
  }

  const categoryFromApi = data || [];

  return (
    <div className="category-dropdown">
      <button
        className="category-button"
        onClick={() => setIsOpen(!isOpen)}
        type="button"
      >
        {/* Display selected category name or default button text */}
        {category && category !== "All Categories" ? category : "Select Category"}

        <span className={isOpen ? "arrow rotate" : "arrow"}>▼</span>
      </button>

      {isOpen && (
        <div className="category-menu">
          {/* Option to clear category selection */}
          <button
            type="button"
            onClick={() => {
              setCategory("All Categories");
              setIsOpen(false);
            }}
          >
            All Categories
          </button>

          {/* Map through API categories */}
          {categoryFromApi.map((catego) => (
            <button
              key={catego.slug || catego}
              type="button"
              onClick={() => {
                setCategory(catego.slug || catego);
                setIsOpen(false);
              }}
            >
              {catego.name || catego}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default Category;