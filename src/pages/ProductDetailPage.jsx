import { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

const API = "http://localhost:3001";

export default function ProductDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [priceInput, setPriceInput] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const priceRef = useRef(null);

  useEffect(() => {
    async function loadProduct() {
      try {
        setError("");
        setSuccess("");
        setLoading(true);

        const res = await fetch(`${API}/products/${id}`);
        if (!res.ok) throw new Error("Product not found");

        const data = await res.json();
        setProduct(data);
        setPriceInput(String(data.price ?? ""));
      } catch (e) {
        setError(e.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    }

    loadProduct();
  }, [id]);

  async function handleUpdatePrice(e) {
    e.preventDefault();
    setSuccess("");
    setError("");

    const newPrice = Number(priceInput);
    if (Number.isNaN(newPrice) || newPrice <= 0) {
      setError("Price must be a number greater than 0.");
      priceRef.current?.focus();
      return;
    }

    setSaving(true);
    try {
      const res = await fetch(`${API}/products/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ price: newPrice }),
      });

      if (!res.ok) throw new Error("Failed to update price");

      const updated = await res.json();
      setProduct(updated);
      setSuccess("Price updated!");
    } catch (e2) {
      setError(e2.message || "Something went wrong");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete() {
    const ok = window.confirm("Delete this product? This cannot be undone.");
    if (!ok) return;

    setError("");
    setSuccess("");
    setDeleting(true);

    try {
      const res = await fetch(`${API}/products/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete product");

      navigate("/products");
    } catch (e) {
      setError(e.message || "Something went wrong");
    } finally {
      setDeleting(false);
    }
  }

  if (loading) return <p>Loading product...</p>;
  if (error && !product) return <p style={{ color: "crimson" }}>{error}</p>;
  if (!product) return null;

  return (
    <section>
      <Link to="/products">← Back</Link>

      <h1 style={{ marginTop: 12 }}>{product.name}</h1>
      <p>{product.description}</p>

      <p>
        <b>Category:</b> {product.category}
      </p>
      <p>
        <b>Current Price:</b> ${Number(product.price).toFixed(2)}
      </p>
      <p>
        <b>Stock:</b> {product.stock}
      </p>
      <p>
        <b>SKU:</b> {product.sku}
      </p>

      <hr style={{ margin: "16px 0" }} />

      <h2>Edit Price</h2>

      {error && <p style={{ color: "crimson" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>{success}</p>}

      <form
        onSubmit={handleUpdatePrice}
        style={{ display: "flex", gap: 10, alignItems: "center" }}
      >
        <input
          ref={priceRef}
          value={priceInput}
          onChange={(e) => setPriceInput(e.target.value)}
          inputMode="decimal"
          aria-label="New price"
          style={{ padding: 8, width: 160 }}
        />
        <button type="submit" disabled={saving} style={{ padding: "8px 12px" }}>
          {saving ? "Saving..." : "Update"}
        </button>
      </form>

      <hr style={{ margin: "16px 0" }} />

      <button
        onClick={handleDelete}
        disabled={deleting}
        style={{
          padding: "10px 14px",
          border: "1px solid #ddd",
          cursor: deleting ? "not-allowed" : "pointer",
        }}
      >
        {deleting ? "Deleting..." : "Delete Product"}
      </button>
    </section>
  );
}