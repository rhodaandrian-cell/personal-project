import { NavLink } from "react-router-dom";

const linkStyle = ({ isActive }) => ({
  marginRight: 12,
  textDecoration: "none",
  fontWeight: isActive ? 700 : 400,
});

export default function Navbar() {
  return (
    <header style={{ borderBottom: "1px solid #ddd" }}>
      <nav style={{ padding: "1rem", maxWidth: 1000, margin: "0 auto" }}>
        <NavLink to="/" style={linkStyle}>Home</NavLink>
        <NavLink to="/products" style={linkStyle}>Products</NavLink>
        <NavLink to="/add" style={linkStyle}>Add Product</NavLink>
      </nav>
    </header>
  );
}