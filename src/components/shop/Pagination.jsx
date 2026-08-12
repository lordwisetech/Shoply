import React from "react";


export function Pagination({ currentPage, totalPages, onPageChange }) {
  if (totalPages <= 1) return null;

  return (
    <div className="pagination d-flex justify-content-center mt-5">
      <button
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        className="btn btn-outline-secondary rounded me-1"
      >
        &laquo;
      </button>

      {[...Array(totalPages)].map((_, i) => (
        <button
          key={i + 1}
          onClick={() => onPageChange(i + 1)}
          className={`btn me-1 rounded ${
            currentPage === i + 1 ? "btn-primary text-white" : "btn-outline-secondary"
          }`}
        >
          {i + 1}
        </button>
      ))}

      <button
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        className="btn btn-outline-secondary rounded"
      >
        &raquo;
      </button>
    </div>
  );
}