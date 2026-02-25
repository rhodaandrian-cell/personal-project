import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <section>
      <div
        style={{
          background: "white",
          padding: "3rem 2rem",
          borderRadius: "10px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
          textAlign: "center",
        }}
      >
        <h1 style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>
          Admin Portal
        </h1>

        <p
          style={{
            fontSize: "1.1rem",
            color: "#6b7280",
            maxWidth: "600px",
            margin: "0 auto 2rem",
          }}
        >
          Manage your store efficiently. Add new products, update pricing,
          track inventory, and maintain full control over your catalog.
        </p>

        <div style={{ display: "flex", justifyContent: "center", gap: "1rem" }}>
          <Link
            to="/products"
            style={{
              background: "#2563eb",
              color: "white",
              padding: "12px 20px",
              borderRadius: "6px",
              textDecoration: "none",
              fontWeight: "500",
            }}
          >
            View Products
          </Link>

          <Link
            to="/add"
            style={{
              background: "#e5e7eb",
              color: "#111827",
              padding: "12px 20px",
              borderRadius: "6px",
              textDecoration: "none",
              fontWeight: "500",
            }}
          >
            Add Product
          </Link>
        </div>
      </div>
    </section>
  );
}