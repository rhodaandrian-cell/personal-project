import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const API = "http://localhost:3001";

export default function ProductDetailPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadProduct() {
      try {
        setError("");
        setLoading(true);

        const res = await fetch(`${API}/products/${id}`);
        if (!res.ok) throw new Error("Product not found");

        const data = await res.json();
        setProduct(data);
      } catch (e) {
        setError(e.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    }

    loadProduct();
  }, [id]);

  if (loading) return <p>Loading product...</p>;
  if (error) return <p style={{ color: "crimson" }}>{error}</p>;
  if (!product) return null;

  return (
    <section>
      <Link to="/products">← Back</Link>

      <h1 style={{ marginTop: 12 }}>{product.name}</h1>
      <p>{product.description}</p>

      <p><b>Category:</b> {product.category}</p>
      <p><b>Price:</b> ${Number(product.price).toFixed(2)}</p>
      <p><b>Stock:</b> {product.stock}</p>
      <p><b>SKU:</b> {product.sku}</p>
    </section>
  );
}