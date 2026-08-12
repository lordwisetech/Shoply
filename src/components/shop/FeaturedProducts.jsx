import React from "react";


export function FeaturedProducts({ items = [] }) {
  return (
    <div className="col-lg-12">
      <h4 className="mb-3">Featured products</h4>
      {items.slice(0, 3).map((item) => (
        <div key={item.id} className="d-flex align-items-center justify-content-start mb-3">
          <div className="rounded me-4" style={{ width: "100px", height: "100px", flexShrink: 0 }}>
            <img
              src={item.thumbnail || item.image}
              className="img-fluid rounded"
              alt={item.title}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </div>
          <div>
            <h6 className="mb-2 text-truncate" style={{ maxWidth: "150px" }}>
              {item.title}
            </h6>
            <div className="d-flex mb-2">
              <i className="fa fa-star text-secondary"></i>
              <i className="fa fa-star text-secondary"></i>
              <i className="fa fa-star text-secondary"></i>
              <i className="fa fa-star text-secondary"></i>
              <i className="fa fa-star"></i>
            </div>
            <div className="d-flex mb-2">
              <h5 className="fw-bold me-2">${item.price}</h5>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}