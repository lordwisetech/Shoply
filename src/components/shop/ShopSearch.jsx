import React from "react";

export function ShopSearch({ searchTerm, setSearchTerm }) {
  const styles = {
    container: {
      display: "flex",
      alignItems: "center",
      gap: "12px", // Creates clean spacing between input and icon
      width: "100%",
    },
    input: {
      flex: 1,
      padding: "12px 20px",
      borderRadius: "30px",
      border: "1px solid #81c408",
      fontSize: "1rem",
      outline: "none",
      backgroundColor: "#ffffff",
    },
    iconSpan: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      width: "48px",
      height: "48px",
      flexShrink: 0,
      borderRadius: "50%",
      border: "1px solid #81c408", // Green border
      backgroundColor: "#e9ecef", // Gray background
      color: "#81c408", // Green icon color
    },
  };

  return (
    <div style={styles.container}>
      <input
        type="search"
        placeholder="Search products..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={styles.input}
      />

      <span style={styles.iconSpan}>
        <i className="fa fa-search"></i>
      </span>
    </div>
  );
}