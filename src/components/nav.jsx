import React from 'react'

function nav() {
  return (
    <> 
        <nav className="navbar"> 
      <h2 className="logo">Shoply</h2>

        <div className="nav-links">
          <a href="/">Home</a>
          <a href="/products">Products</a>
          <a href="/cart">Cart</a>
          <a href="/login">Login</a>
        </div>
        </nav>
    
 </> )
}

export default nav
