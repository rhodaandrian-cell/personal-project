import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import useFetch from "../hooks/useFetch";

const API = "http://localhost:3001";

export default function ProductsPage() {
  const { data: products, loading, error, refetch } = useFetch(`${API}/products`);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredProducts = useMemo(() => {
    const list = Array.isArray(products) ? products : [];
    const term = searchTerm.trim().toLowerCase();
    if (!term) return list;
    return list.filter((p) => (p.name || "").toLowerCase().includes(term));
  }, [products, searchTerm]);

  if (loading) return <p>Loading products...</p>;
  if (error)
    return (
      <div>
        <p style={{ color: "crimson" }}>{error}</p>
        <button onClick={refetch} style={{ padding: "8px 12px" }}>
          Retry
        </button>
      </div>
    );

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