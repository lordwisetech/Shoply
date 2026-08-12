import React from "react";


export function ShopSort({ sortBy, setSortBy }) {
  return (
    <div className="bg-light ps-3 py-3 rounded d-flex justify-content-between mb-4">
      <label htmlFor="sort-select" className="me-2">Default Sorting:</label>
      <select
        id="sort-select"
        className="border-0 form-select-sm bg-light me-3"
        value={sortBy}
        onChange={(e) => setSortBy(e.target.value)}
      >
        <option value="default">Nothing</option>
        <option value="price-low">Price: Low to High</option>
        <option value="price-high">Price: High to Low</option>
        <option value="rating">Popularity</option>
      </select>
    </div>
  );
}