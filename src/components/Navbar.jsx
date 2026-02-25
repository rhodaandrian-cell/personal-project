import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <header
      style={{
        background: "white",
        borderBottom: "1px solid #e5e7eb",
        padding: "1rem 0",
      }}
    >
      <nav
        style={{
          maxWidth: 1000,
          margin: "0 auto",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "0 1rem",
        }}
      >
        <h2 style={{ fontWeight: 600 }}>Admin Portal</h2>

        <div style={{ display: "flex", gap: "1.5rem" }}>
          <NavLink to="/">Home</NavLink>
          <NavLink to="/products">Products</NavLink>
          <NavLink to="/add">Add Product</NavLink>
        </div>
      </nav>
    </header>
  );
}