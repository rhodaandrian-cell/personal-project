import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";

const API = "http://localhost:3001";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadProducts() {
      try {
        setError("");
        setLoading(true);

        const res = await fetch(`${API}/products`);
        if (!res.ok) throw new Error("Failed to fetch products");

        const data = await res.json();
        setProducts(data);
      } catch (e) {
        setError(e.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    }

    loadProducts();
  }, []);

  const filteredProducts = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();
    if (!term) return products;
    return products.filter((p) => (p.name || "").toLowerCase().includes(term));
  }, [products, searchTerm]);

  if (loading) return <p>Loading products...</p>;
  if (error) return <p style={{ color: "crimson" }}>{error}</p>;

  return (
    <section>
      <h1>Products</h1>

      <label style={{ display: "block", margin: "12px 0" }}>
        Search:
        <input
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Type a product name..."
          style={{ marginLeft: 8, padding: 6, width: "min(420px, 100%)" }}
        />
      </label>

      {filteredProducts.length === 0 ? (
        <p>No products match “{searchTerm}”.</p>
      ) : (
        <ul style={{ paddingLeft: 18 }}>
          {filteredProducts.map((p) => (
            <li key={p.id} style={{ marginBottom: 8 }}>
              <Link to={`/products/${p.id}`}>
                {p.name} — ${Number(p.price).toFixed(2)}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}